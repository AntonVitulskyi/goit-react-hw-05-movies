import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from 'services/movieAPI';
import styles from './Cast.module.css';

export default function Cast() {
  const [searchedCast, setSearchedCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchMovieCast(movieId)
      .then(data => setSearchedCast(data.cast))
      .catch(err => err)
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.list}>
          {searchedCast.length > 0 ? (
            searchedCast.map(actor => (
              <li key={actor.id} className={styles.item}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    height="150px"
                  />
                </div>
                <div className={styles.rightBox}>
                  <h3>{actor.original_name}</h3>
                  <p>
                    Character:{' '}
                    <span className={styles.value}>{actor.character}</span>
                  </p>
                  <p>
                    Popularity:{' '}
                    <span className={styles.value}>{actor.popularity}</span>
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className={styles.noCast}> No cast for this movie </p>
          )}
        </ul>
      )}
    </>
  );
}
