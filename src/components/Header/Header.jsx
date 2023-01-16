import Container from 'components/Container/Container';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.headerNav}>
      <Container>
        <nav className={styles.navigation}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navLinkActive : styles.navLink
            }
            to="/"
          >
            Home{' '}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navLinkActive : styles.navLink
            }
            to="/movies"
          >
            Movies{' '}
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}
