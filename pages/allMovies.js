import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Pagination, message } from 'antd';

import PageLayout from '../layout/pageLayout';
import MovieCard from '../components/movieCard';

const pageSize = 10;

const getMoviesData = async (page, pageSize) => {
  try {
    const res = await axios.get(`http://localhost:8040/movies?page=${page || 1}`, {
      withCredentials: true,
    });

    if (res && res.status === 200) {
      const data = res.data;
      const { movies, moviesTotalAmount } = data || {};
      return {
        movies: movies ? movies : [],
        moviesTotalAmount: moviesTotalAmount ? moviesTotalAmount : 0,
      };
    }
  } catch (e) {
    if (e && e.response) {
      const errorMessage = e.response.data || '没有错误消息';
      message.error(errorMessage);
    }
  }
};

class AllMovies extends Component {

  static getInitialProps = async () => {
    const moviesData = await getMoviesData();
    return moviesData || {};
  };

  state = {
    moviesTotalAmount: 0,
    movies: [],
  };

  componentWillMount() {
    const { movies, moviesTotalAmount } = this.props;
    this.setState({
      movies,
      moviesTotalAmount,
    });
  }

  changePage = async (page, pageSize) => {
    console.log(page, pageSize, this);
    const data = await getMoviesData(page, pageSize);
    this.setState(data);
  };

  renderMovies = (movies, moviesTotalAmount) => {
    return (
      <div style={{ paddingBottom: 20 }}>
        {movies.map(data => {
          return (
            <MovieCard movieData={data} key={data && data._id} style={{ width: '45%', display: 'inline-block' }} />
          );
        })}
        <Pagination
          style={{ float: 'right', marginBottom: 20 }}
          total={moviesTotalAmount}
          pageSize={pageSize}
          onChange={this.changePage}
        />
      </div>
    );
  };

  render() {
    const { movies, moviesTotalAmount } = this.state;
    return <PageLayout>{movies ? this.renderMovies(movies, moviesTotalAmount) : '没有资源'}</PageLayout>;
  }
}

AllMovies.propTypes = {
  moviesData: PropTypes.array,
  moviesTotalAmount: PropTypes.number,
};

export default AllMovies;
