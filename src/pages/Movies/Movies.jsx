import Container from 'components/Container/Container';

import Loader from 'components/Loader/Loader';
import { Notify } from 'notiflix';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMovieByQuery } from 'services/movieAPI';
import styles from './Movies.module.css';

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const query = searchParams.get('query');
  const searchRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setSearchParams({ query: searchRef.current.value });
    searchRef.current.value = '';
  };

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      fetchMovieByQuery(searchParams)
        .then(data => {
          setFoundMovies([...data.results]);
          if (data.results.length === 0) {
            Notify.info('No movie found');
          }
        })
        .catch(err => err)
        .finally(() => setIsLoading(false));
    }
  }, [query]);

  return (
    <Container>
      <div className={styles.navBox}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            ref={searchRef}
            type="text"
            placeholder="Type movie name"
            required
          />
          <button className={styles.submitBtn} type="submit">
            Search
          </button>
        </form>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.results}>
          <ul className={styles.list}>
            {foundMovies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={`${movie.id}`}
                  state={{ from: location }}
                  className={styles.link}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
