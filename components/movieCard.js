import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MovieCard extends Component {
  render() {
    const { movieData } = this.props;
    if (!movieData) {
      return '没有电影信息';
    }
    const { posterUrl, grade, name, resourceLink } = movieData;
    return (
      <div className={'movieCardContainer'}>
        <div className={'movieImage'}>
          <img src={posterUrl} alt={name} />
        </div>
        <div className={'movieInfoContainer'}>
          <div className={'movieInfoItem'}>
            <span>电影名称:</span>
            <a href={resourceLink}>{name}</a>
          </div>
          <div className={'movieInfoItem'}>
            <span>评分:</span>
            <span>{grade}</span>
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
          }
          .movieImage img {
            width: 135px;
            height: 200px;
          }
          .movieInfoContainer {
            display: inline-block;
          }
          .movieInfoItem {
            margin: 10px;
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
};

export default MovieCard;
