/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { Button, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import * as loginSelectors from './selectors';
import * as loginActions from './actions';
import styles from './styles.css';

import FirebaseService from '../../services/firebaseService';
import Alert from '../../components/Alert';

import background from './pattern.png';


export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      header: '',
      alertType: Alert.getInfoAlertType(),
      showPassword: false
    }
  }

  componentWillMount() {
    FirebaseService.setAuthObserver(this.onAuthSuccess, this.onAuthRemoved);
  }

  onAuthSuccess = () => {
    let self = this;
    setTimeout(() => {
      self.props.changeRoute('/upload');
    }, 200);
  };

  onAuthRemoved = () => {

  };

  handleSubmit = (evt) => {
    let self = this;
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    self.setState({
      message: 'We are attempting to log you in',
      header: 'Please wait',
      alertType: Alert.getInfoAlertType()
    }, FirebaseService.loginUser(self.props.email, this.props.password, (message, isSuccess, promise) => {
      self.setState({
        message: message,
        header: isSuccess ? 'Success' : 'Error',
        alertType: isSuccess ? Alert.getSuccessAlertType() : Alert.getErrorAlertType()
      });
    }));
  };

  handleUpdateEmail = (evt) => {
    this.props.updateEmail(evt.target.value);
  };

  handleUpdatePassword = (evt) => {
    this.props.updatePassword(evt.target.value);
  };

  render() {
    let buttonStyles = [styles.loginButton, styles.blockButton];
    buttonStyles.concat(styles.disabledButton);

    return (
      <div className={styles.loginPage}>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Here you can login to the YourFireNation site.' },
          ]}
        />
        <Alert show={this.state.message.length > 0}
               header={this.state.header}
               message={this.state.message}
               type={this.state.alertType}
               showHideButton
        />
        <form onSubmit={(evt) => this.handleSubmit(evt)}
              className={styles.loginForm}>
          <h1>
            Login
          </h1>
          <FormControl type="email"
                       placeholder="email"
                       onChange={this.handleUpdateEmail}
          />
          <FormControl type={this.state.showPassword ? 'text' : 'password'}
                       className={styles.passwordInput}
                       placeholder="password"
                       onChange={this.handleUpdatePassword}
          />
          <span className={styles.showPasswordButton}
                onClick={() => this.setState({showPassword: !this.state.showPassword})}>
            { this.state.showPassword ? 'hide' : 'show' }
          </span>
          <Button className={buttonStyles.join(' ')}
                  disabled={this.props.email.length == 0 || this.props.password.length == 0}
                  type="submit"
                  onClick={this.props.handleSubmit}>
            Let's go!~
          </Button>
          <br/>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  /* Selectors */
  email: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  /* Actions */
  updateEmail: React.PropTypes.func.isRequired,
  updatePassword: React.PropTypes.func.isRequired,
  changeRoute: React.PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  email: loginSelectors.selectEmail(),
  password: loginSelectors.selectPassword()
});

function mapDispatchToProps(dispatch) {
  return Object.assign({
    changeRoute: (url) => dispatch(push(url))
  }, bindActionCreators(loginActions, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
