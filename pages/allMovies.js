import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { Pagination, message } from 'antd';

import PageLayout from '../layout/pageLayout';
import MovieCard from '../components/movieCard';

const pageSize = 10;

const getMoviesData = async (page, pageSize) => {
  try {
    const res = await fetch(`http://localhost:8040/movies?page=${page || 1}`);

    if (res.ok) {
      const data = await res.json();
      const { movies, moviesTotalAmount } = data || {};
      return {
        movies: movies ? movies : [],
        moviesTotalAmount: moviesTotalAmount ? moviesTotalAmount : 0,
      };
    } else {
      const errorMessage = await res.text();
      message.error(errorMessage);
    }
  } catch (e) {
    console.log(e);
  }
};

class AllMovies extends Component {
  state = {
    moviesTotalAmount: 0,
    movies: [],
  };

  static getInitialProps = async () => {
    const movie = await getMoviesData();
    return movie || {};
  };

  componentWillMount() {
    const { movies, moviesTotalAmount } = this.props;
    this.setState({
      movies,
      moviesTotalAmount,
    });
  }

  changePage = async function(page, pageSize) {
    const data = await getMoviesData(page, pageSize);
    this.setState(data);
  };

  render() {
    const { movies, moviesTotalAmount } = this.state;
    return (
      <PageLayout>
        {movies ? (
          <div>
            {movies.map(data => {
              return <MovieCard movieData={data} key={data && data._id} />;
            })}
            <Pagination total={moviesTotalAmount} pageSize={pageSize} onChange={this.changePage.bind(this)} />
          </div>
        ) : null}
      </PageLayout>
    );
  }
}

AllMovies.propTypes = {
  moviesData: PropTypes.array,
  moviesTotalAmount: PropTypes.number,
};

export default AllMovies;
