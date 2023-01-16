import Container from 'components/Container/Container';
import Loader from 'components/Loader/Loader';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrandingMovies } from 'services/movieAPI';
import styles from './Home.module.css';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrandingMovies()
      .then(data => setTrendingMovies(data))
      .catch(err => err)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <h2>Trending movies today</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.list}>
          {trendingMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`} className={styles.link}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
