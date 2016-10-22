/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import styles from './styles.css';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <article className={styles.article}>
        <h1 className={styles.header}>
          Your Fire Nation
        </h1>
        <p className={styles.subHeader}>
          Isn't this pretty?
        </p>
      </article>
    );
  }
}
