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
import firebaseService from '../../services/firebase-service';

import background from './asanoha-400px.png';

import { Button, FormControl } from 'react-bootstrap';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    //firebaseService.registerUser('hyshion@gmail.com','yourfirenation');
    let user = firebaseService.loginUser('hyshion@gmail.com','yourfirenation');
    let authInfo = undefined;
    console.log(`authInfo: ${authInfo}`);
    user.then((v) => {
      console.log(v);
      authInfo = v;
      console.log(`authInfo: ${authInfo}`);
    }, (v) => {
    });
    // console.log(firebaseService.getCurrentUser());
  }

  handleSubmit = (evt) => {
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    let user = firebaseService.loginUser(this.props.email, this.props.password);
    user.then((v) => {
      console.log(v);
      alert(`Success! You are now logged in as ${v.email}`);
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
          title="LoginPage"
          meta={[
            { name: 'description', content: 'Description of LoginPage' },
          ]}
        />
        <form onSubmit={(evt) => this.handleSubmit(evt)} className={styles.loginForm}>
          <h1>
            Login
          </h1>
          <FormControl type="email" placeholder="email" onChange={this.handleUpdateEmail} />
          <FormControl type="password" placeholder="password" onChange={this.handleUpdatePassword} />
          <Button className={styles.blockButton} type="submit" onClick={(evt) => this.handleSubmit(evt)}>
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
