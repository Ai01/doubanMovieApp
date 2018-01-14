import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { Pagination } from 'antd';

import PageLayout from '../layout/pageLayout';
import MovieCard from '../components/movieCard';

const pageSize = 10;

const getMoviesData = async (page, pageSize) => {
  const res = await fetch(`http://localhost:8110/allMovies?page=${page || 1}&&pgaeSize=${pageSize || 10}`);
  const data = await res.json();
  return {
    moviesData: data ? data.moviesData : [],
    moviesTotalAmount: data ? data.moviesTotalAmount : 0,
  };
};

class AllMovies extends Component {
  state = {
    moviesTotalAmount: 0,
    moviesData: [],
  };

  static getInitialProps = async () => {
    return await getMoviesData();
  };

  componentWillMount() {
    const { moviesData, moviesTotalAmount } = this.props;
    this.setState({
      moviesData,
      moviesTotalAmount,
    });
  }

  changePage = async function(page, pageSize) {
    const data = await getMoviesData(page, pageSize);
    this.setState(data);
  };

  render() {
    const { moviesData, moviesTotalAmount } = this.state;
    return (
      <PageLayout>
        {moviesData.map(data => {
          return <MovieCard movieData={data} key={data && data._id} />;
        })}
        <Pagination total={moviesTotalAmount} pageSize={pageSize} onChange={this.changePage.bind(this)} />
      </PageLayout>
    );
  }
}

AllMovies.propTypes = {
  moviesData: PropTypes.array,
  moviesTotalAmount: PropTypes.number,
};

export default AllMovies;
