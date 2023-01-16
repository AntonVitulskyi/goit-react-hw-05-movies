import { useLocation, Link } from 'react-router-dom';
import styles from './GoBack.module.css';

const Goback = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Link className={styles.backLink} to={location.state?.from ?? '/'}>
      {'<Back'}
    </Link>
  );
};

export default Goback;
