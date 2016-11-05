import React from 'react';
import styles from './style.css';

export default class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="dialog-register" title="Register new user">
        <form>
          <fieldset>
            <div id="login-button">
              <div className={styles.login}><span >Login></span></div><div className={styles.register}><span>Register</span></div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}