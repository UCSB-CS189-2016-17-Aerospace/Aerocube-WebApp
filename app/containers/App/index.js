/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import A from 'components/A';
import Button from 'components/Button';
import LoadingScreen from 'components/LoadingScreen';
import withProgressBar from 'components/ProgressBar';
import LeftNavLayout from 'components/LeftNavLayout';
import LeftNavElement from 'components/LeftNavElement';

import FirebaseService from 'services/firebaseService';

import * as globalSelectors from './selectors';
import * as globalActions from './actions';

import * as strings from 'constants/strings';
import * as cssConstants from 'constants/cssConstants';

const AppWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100%;
  height: 100%;
`;

const LogoutButton = styled(A)`
  color: ${cssConstants.colors.textMuted};
  position: fixed;
  top: 0;
  right: 0;
  text-align: right;
  z-index: 5;
  padding: 5px;
  transition: all 200ms ease-in-out;
  
  &:hover {
    
  }
`;

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      auth: null,
    };
  }

  componentWillMount() {
    FirebaseService.setAuthObserver(this.onAuthSuccess, this.onAuthRemoved);
  }

  onAuthSuccess = (user) => {
    let self = this;
    setTimeout(() => {
      self.setState({
        auth: user,
        loading: false
      })
    }, 500);
  };

  onAuthRemoved = () => {
    let self = this;
    self.setState({
      loading: true,
      auth: null
    }, () => {
      setTimeout(() => {
        self.setState({
          loading: false
        });
        self.props.changeRoute('/login');
      }, 1000)
    })
  };

  handleLogout = (evt) => {
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    FirebaseService.signOut()
  };

  render() {
    let body = null;
    if(this.state.loading) {
      body = <LoadingScreen loading={this.state.loading}/>
    } else {
      body = React.Children.toArray(this.props.children)
    }

    let logoutButton = null;
    if(this.state.auth && !this.state.loading) {
      logoutButton = (
        <Button color={cssConstants.colors.primary}
                targetRoute={'/'}
                onClick={this.handleLogout}>
          Logout
        </Button>
      );
    }
    let leftNavItems = (this.state.auth && !this.state.loading) ? (
      [
        <LeftNavElement key="1" targetRoute={'/upload'}>Upload</LeftNavElement>,
        <LeftNavElement key="2" targetRoute={'/dashboard'}>Dashboard</LeftNavElement>,
        <LeftNavElement key="3" targetRoute={'/logs'}>Logs</LeftNavElement>,
        <LeftNavElement key="4" targetRoute={'/render'}>Rendering</LeftNavElement>,
        <LeftNavElement targetRoute={'/'}
                        key="0"
                        onClick={this.handleLogout}>
          Logout
        </LeftNavElement>,
      ]
    ) : (
      <LeftNavElement targetRoute={'/login'}
                      key="0">
        Login
      </LeftNavElement>
    );

    return (
      <LeftNavLayout navChildren={leftNavItems}>
        <Helmet
          titleTemplate={`%s | ${strings.siteName}`}
          defaultTitle={`${strings.siteName}`}
          meta={[
            { name: 'description', content: '' },
          ]}
        />
        { body }
      </LeftNavLayout>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,

  /* Actions */
  changeRoute: React.PropTypes.func,

  /* Selectors */

};

function mapDispatchToProps(dispatch) {
  return Object.assign({
    changeRoute: (url) => dispatch(push(url))
  }, bindActionCreators(globalActions, dispatch));
}

const structuredSelector = createStructuredSelector({

});

function mapStateToProps(state, ownProps) {
  return structuredSelector;
}

export default withProgressBar(connect(mapStateToProps, mapDispatchToProps)(App));
