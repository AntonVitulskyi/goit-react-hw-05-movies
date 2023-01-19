import Container from 'components/Container/Container';
import Goback from 'components/GoBack/GoBack';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services/movieAPI';
import styles from './MovieDetails.module.css';

export default function MovieDetails() {
  const [searchedDetails, setSearchedDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchMovieDetails(movieId)
      .then(data => setSearchedDetails(data))
      .catch(err => err)
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <Container>
      <Goback />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.box}>
          <div>
            <img
              width="240px"
              src={`https://image.tmdb.org/t/p/w500/${searchedDetails.poster_path}`}
              alt={searchedDetails.tagline}
            />
          </div>
          <div className={styles.rightBox}>
            <h1 className={styles.mainTitle}>
              {searchedDetails.original_title}
            </h1>
            <ul className={styles.list}>
              {searchedDetails.vote_average === 0 ? (
                ''
              ) : (
                <li>
                  {' '}
                  Rating:
                  <span className={styles.value}>
                    {' '}
                    {searchedDetails.vote_average}
                  </span>
                </li>
              )}
              <li>
                Release date:{' '}
                <span className={styles.value}>
                  {' '}
                  {searchedDetails.release_date}{' '}
                </span>
              </li>
              <li>
                Duration:
                <span className={styles.value}>
                  {' '}
                  {Math.floor(searchedDetails.runtime / 60)} h {`  `}
                  {Math.floor(searchedDetails.runtime % 60)} m{' '}
                </span>
              </li>
              {searchedDetails.budget > 0 ? (
                <li>
                  Budget:
                  <span className={styles.value}>
                    {' '}
                    {new Intl.NumberFormat().format(searchedDetails.budget)} $
                  </span>{' '}
                </li>
              ) : (
                ''
              )}
            </ul>
            <p className={styles.overview}>{searchedDetails.overview}</p>

            <div className={styles.more}>
              <Link
                className={styles.link}
                to={`cast`}
                state={{ from: location.state?.from }}
              >
                Cast
              </Link>
              <Link
                className={styles.link}
                to={`reviews`}
                state={{ from: location.state?.from }}
              >
                Reviews
              </Link>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </Container>
  );
}
