import axios from 'axios';

const API_KEY = '56e8a9f881b2c7281d6a93cec630170a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrandingMovies = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  return data.results;
};

export const fetchMovieDetails = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return data;
};

export const fetchMovieCast = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return data;
};

export const fetchMovieReviews = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return data;
};

export const fetchMovieByQuery = async query => {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&${query}`
  );
  return data;
};
