/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import * as loginSelectors from './selectors';
import * as loginActions from './actions';

import firebaseService from '../../services/firebaseService';
import Alert from '../../components/Alert';
import Button from 'components/Button';
import * as cssConstants from 'constants/cssConstants';
import { maxWidth, sm } from 'constants/cssQueries';

import background from './pattern.png';

const ArticleWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url(${background}) repeat;
  padding: 30px 0;
`;

const LoginForm = styled.form`
  background: white;
  margin: 2em 0;
  padding: 3em 6em;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647);
  border-radius: 10px;
  color: darkslategray;
  width: 700px;
  max-width: 90%;
  animation: ${cssConstants.animations.fadeIn}
  
  @media(${maxWidth(sm)}) {
    padding: 2em;
  }
`;

const Input = styled.input`
  font-size: 1.25em;
  padding: 1em;
  background-color: white;
  border-radius: 2px;
  border: 1px solid lightgrey;
  box-shadow: 0 1px 3px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647);
  display: block;
  margin: 1em 0;
  color: darkslategray;
`;

const PasswordRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
`;

const EmailInput = styled(Input)`
  width: 100%;
`;

const PasswordInput = styled(Input)`
  padding-right: 4em;
  flex-grow: 1;
`;

const ShowPasswordbutton = styled(Button)`
  float: right;
  margin: 1em 0;
  flex-shrink: 0;
  color: gray;
  user-select: none;
  cursor: pointer;
  border: 1px solid lightgrey;
  box-shadow: 0 1px 3px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647);
  font-size: 1.25em;
  padding: 1em;
`;

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

  handleSubmit = (evt) => {
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    this.setState({
      message: 'We are attempting to log you in',
      header: 'Please wait',
      alertType: Alert.getInfoAlertType()
    }, firebaseService.loginUser(this.props.email, this.props.password, (message, isSuccess, promise) => {
      this.setState({
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

    return (
      <ArticleWrapper>
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
        <LoginForm onSubmit={(evt) => this.handleSubmit(evt)}>
          <h1>
            Login
          </h1>
          <EmailInput type="email"
                      placeholder="email"
                      onChange={this.handleUpdateEmail}
          />
          <PasswordRow>
            <PasswordInput type={this.state.showPassword ? 'text' : 'password'}
                   placeholder="password"
                   onChange={this.handleUpdatePassword}
            />
            <ShowPasswordbutton onClick={() => this.setState({showPassword: !this.state.showPassword})}>
              { this.state.showPassword ? 'hide' : 'show' }
            </ShowPasswordbutton>
          </PasswordRow>
          <br/>
          <Button disabled={this.props.email.length == 0 || this.props.password.length == 0}
                  color={cssConstants.colors.primary}
                  type="submit"
                  onClick={this.props.handleSubmit}>
            Let's go!~
          </Button>
          <br/>
        </LoginForm>
      </ArticleWrapper>
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
