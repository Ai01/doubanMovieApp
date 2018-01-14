import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../layout/pageLayout';
import MovieCard from '../components/movieCard';

class AllMovies extends Component {
  state = {};

  static getInitialProps() {
    return {
      moviesData: [
        {
          id: '5a5970df2b3c9706e0c81ec2',
          title: '天使爱美丽 / Le fabuleux destin d\'Amélie Poulain',
          start: '8.7',
          picUrl: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p803896904.jpg',
          link: 'https://movie.douban.com/subject/1292215/',
        },
      ],
    };
  }

  render() {
    const { moviesData } = this.props;
    console.log(moviesData);
    return (
      <PageLayout>
        {moviesData.map(data => {
          return (<MovieCard movieData={data} key={data && data.id} />);
        })}
      </PageLayout>
    );
  }
}

AllMovies.propTypes = {
  moviesData: PropTypes.array,
};

export default AllMovies;
