/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import * as loginSelectors from './selectors';
import * as loginActions from './actions';
import styles from './styles.css';
import firebaseService from '../../services/firebaseService';

import background from './asanoha-400px.png';

import { Button, FormControl } from 'react-bootstrap';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  handleSubmit = (evt) => {
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    let userPromise = firebaseService.loginUser(this.props.email, this.props.password);
    userPromise.then((user) => {
      if(user)
        alert(`Success! You are now logged in as ${user.email}`);
    }, (err) => {
      alert(`Code: ${err.code} \r\n Message: ${err.message}`);
    });
  };

  handleUpdateEmail = (evt) => {
    this.props.updateEmail(evt.target.value);
  };

  handleUpdatePassword = (evt) => {
    this.props.updatePassword(evt.target.value);
  };

  render() {
    return (
      <div className={styles.loginPage} style={{background: `url(${background}) center repeat`}}>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Here you can login to the YourFireNation site.' },
          ]}
        />
        <form onSubmit={(evt) => this.handleSubmit(evt)} className={styles.loginForm}>
          <h1>
            Login
          </h1>
          <FormControl type="email" placeholder="email" onChange={this.handleUpdateEmail} />
          <FormControl type="password" placeholder="password" onChange={this.handleUpdatePassword} />
          <Button className={styles.blockButton} type="submit" onClick={this.props.handleSubmit}>
            Let's go!~
          </Button>
          <br/>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  updateEmail: React.PropTypes.func,
  updatePassword: React.PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  email: loginSelectors.selectEmail(),
  password: loginSelectors.selectPassword()
});

function mapDispatchToProps(dispatch) {
  return {
    updateEmail: (email) => dispatch(loginActions.updateEmail(email)),
    updatePassword: (password) => dispatch(loginActions.updatePassword(password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
