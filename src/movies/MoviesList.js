import React, { PureComponent } from 'react';
import Movie from './Movie';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMovies, resetMovie } from './actions';

class MoviesList extends PureComponent {

  componentDidMount() {
    const { getMovies, isLoaded, moviesLoadedAt } = this.props;
    const oneHour = 60 * 60 * 1000;
    if (!isLoaded || ((new Date()) - new Date(moviesLoadedAt)) > oneHour) {
      getMovies();
      // this.props.getMovies();
    }
  }

  componentWillUnmount() {
    const { resetMovie } = this.props;
    resetMovie();
  }

  render() {
    const { movies, isLoaded } = this.props
    if (!isLoaded) return <h1>Loading</h1>;
    return (  
      <MovieGrid>
        {movies.map(movie => <Movie key={movie.id} movie={movie} /> )}
      </MovieGrid>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  isLoaded: state.movies.moviesLoaded,
  moviesLoadedAt: state.movies.moviesLoadedAt
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMovies,
  resetMovie
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
  padding: 1rem;
`;