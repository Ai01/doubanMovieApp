const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();
// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});

const URL = require('url');

const sign = (ticket, noncestr, timestamp, url) => {
  const JsSHA = require('jssha');
  const str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
  const shaObj = new JsSHA(str, 'TEXT');
  return shaObj.getHash('SHA-1', 'HEX');
};

app.prepare().then(() => {
  const server = express();
  const cacheInfo = {};

  server.get('/getSign', (req, res) => {
    console.log('get /getSign');
    const rp = require('request-promise');
    const timeStamp = () => parseInt(new Date().getTime() / 1000);
    let ticket, token, timestamp;
    let nonceStr = Math.random()
      .toString(36)
      .substr(2, 15);
    const appId = 'wxc79eb78d9e6c6efd';
    const secret = '391b5dee8e15384aa843583994f684f0';
    const url = req.query.url;

    if (!cacheInfo.startTime || !cacheInfo.ticket || timeStamp() - 7200 > cacheInfo.startTime) {
      console.log('not use cacheInfo');
      // const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appId=wxfc9c5237ebf480aa&secret=2038576336804a90992b8dbe46cd5948';
      const url =
        'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appId=' + appId + '&secret=' + secret;
      rp(url, (error, response, body) => {})
        .then(response => JSON.parse(response).access_token)
        .then(json => {
          console.log('token--->' + json);
          token = json;
          const url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=' + token;
          return rp(url, (error, response, body) => {});
        })
        .then(response => JSON.parse(response).ticket)
        .then(json => {
          console.log('ticket--->' + json);
          cacheInfo.startTime = timeStamp();
          cacheInfo.ticket = json;
          ticket = json;
          console.log(cacheInfo);
        })
        .catch(error => console.log(error));
    } else {
      console.log('use cacheInfo');
      ticket = cacheInfo.ticket;
    }
    timestamp = timeStamp();
    let signature = sign(ticket, nonceStr, timestamp, url);
    console.log('--->' + signature);
    res.json({ appId: appId, secret: secret, timestamp: timestamp, nonceStr: nonceStr, signature: signature });
  });

  // Use the `renderAndCache` utility defined below to serve pages
  // server.get('/', (req, res) => {
  //   renderAndCache(req, res, '/');
  // });

  server.get('/MP_verify_8R2baQlPyzNB5X2w.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/MP_verify_8R2baQlPyzNB5X2w.txt'));
  });

  server.get('/product', (req, res) => {
    renderAndCache(req, res, '/product');
  });

  server.get('/about', (req, res) => {
    renderAndCache(req, res, '/about');
  });

  server.get('/join', (req, res) => {
    renderAndCache(req, res, '/join');
  });

  server.get('/blog', (req, res) => {
    renderAndCache(req, res, '/blog');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);
  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`);
    res.send(ssrCache.get(key));
    return;
  }

  // If not let's render the page into HTML
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page

      console.log(`CACHE MISS: ${key}`);
      ssrCache.set(key, html);
      res.send(html);
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}
