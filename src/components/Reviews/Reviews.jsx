import Container from 'components/Container/Container';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'services/movieAPI';
import styles from './Reviews.module.css';

export default function Reviews() {
  const [searchedReviews, setSearchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchMovieReviews(movieId)
      .then(data => setSearchedReviews(data.results))
      .catch(err => err)
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.list}>
          {searchedReviews.length > 0 ? (
            searchedReviews.map(review => (
              <li key={review.id} className={styles.item}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
                <p className={styles.date}>Created: {review.created_at}</p>
              </li>
            ))
          ) : (
            <p className={styles.noReview}> No reviews for this movie </p>
          )}
        </ul>
      )}
    </Container>
  );
}
