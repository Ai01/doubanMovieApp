import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPLACE_SIGN } from '../constants';

const textOverflowStyle = { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' };

class MovieCard extends Component {
  render() {
    const { movieData, style } = this.props;
    if (!movieData) {
      return '没有电影信息';
    }
    let { posterUrl, grade, name, resourceLink } = movieData;
    return (
      <div className={'movieCardContainer'} style={style}>
        <div className={'movieImage'}>
          {posterUrl ? <img src={posterUrl} alt={name} /> : <div className={'movieImagePlaceholder'}>图片不见了</div>}
        </div>
        <div className={'movieInfoContainer'}>
          <div className={'movieInfoItem'}>
            <span>电影名称:</span>
            <a href={resourceLink} style={textOverflowStyle}>
              {name || REPLACE_SIGN}
            </a>
          </div>
          <div className={'movieInfoItem'}>
            <span>评分:</span>
            <span style={textOverflowStyle}>{grade || REPLACE_SIGN}</span>
          </div>
        </div>
        <style jsx>{`
          .movieCardContainer {
            margin: 10px;
          }
          .movieImage {
            display: inline-block;
            margin-right: 10px;
            vertical-align: top;
            width: 135px;
          }
          .movieImage img {
            width: 135px;
            height: 200px;
          }
          .movieImagePlaceholder {
            width: 135px;
            height: 200px;
            padding-top: 90px;
            background: grey;
            text-align: center;
          }
          .movieInfoContainer {
            display: inline-block;
            width: calc( 100% - 145px);
          }
          .movieInfoItem {
            margin: 10px;
            display: flex;
          }
          .movieInfoItem a {
            flex: 1;
          }
          .movieInfoItem span {
            margin-right: 10px;
          }
        `}</style>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.object,
  style: PropTypes.object,
};

export default MovieCard;
