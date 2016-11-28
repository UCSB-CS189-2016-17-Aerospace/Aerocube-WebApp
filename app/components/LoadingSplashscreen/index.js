/**
*
* LoadingSplashscreen
*
*/

import React from 'react';

import styles from './styles.css';

class LoadingSplashscreen extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.loadingSplashscreen}>
        <h1>Loading</h1>
        <CircularProgress />
      </div>
    );
  }
}

export default LoadingSplashscreen;
