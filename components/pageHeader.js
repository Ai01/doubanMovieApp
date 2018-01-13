import React, { Component } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

const MenuItem = Menu.Item;

class PageHeader extends Component {
  render() {
    return (
      <Menu
        mode={'horizontal'}
      >
        <MenuItem>
          <Link href={'/'}>
            <a> 主页 </a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={'/oneMovie'}>
            <a>一部电影</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={'/allMovies'}>
            <a>所有电影</a>
          </Link>
        </MenuItem>
      </Menu>
    );
  }
}

export default PageHeader;
