/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import CircularProgress from 'material-ui/CircularProgress'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import FirebaseService from '../../services/firebaseService';
import LoginPage from '../LoginPage/index';

import * as globalSelectors from './selectors';
import * as globalActions from './actions';

import styles from './styles.css';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.muiTheme = getMuiTheme(baseTheme, {
      palette: {
        primary1Color: 'darkslategrey',
        accent1Color: '#00cabb',
        pickerHeaderColor: this.primary1Color
      }
    });

    this.state = {
      loading: true,
      auth: null,
    };
  }

  componentWillMount() {
    FirebaseService.setAuthObserver(this.onAuthSuccess, this.onAuthRemoved);
  }

  componentDidMount() {
    let self = this;
    /* Get Page and Body Dimensions */
    let docDOMRect = window.document.body.getBoundingClientRect();
    let bodyDOMRect = window.document.getElementById('app-content').getBoundingClientRect();
    self.props.updateViewSizes(docDOMRect.width, docDOMRect.height, bodyDOMRect.width, bodyDOMRect.height);
    window.addEventListener('resize', () => {
      let docDOMRect = window.document.body.getBoundingClientRect();
      let bodyDOMRect = window.document.getElementById('app-content').getBoundingClientRect();
      self.props.updateViewSizes(docDOMRect.width, docDOMRect.height, bodyDOMRect.width, bodyDOMRect.height);
    }, false);
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

  renderLoadingDialog = () => {
    return (
      <div className={styles.loadingWrapper}>
        <h1>Loading</h1>
        <CircularProgress />
      </div>
    )
  };

  renderLogoutButton = () => {
    let self = this;
    return (
      <a className={styles.logoutText} onClick={self.handleLogout}>
        logout
      </a>
    )
  };

  render() {
    let self = this;
    let body = null;
    if(self.state.loading) {
      body = this.renderLoadingDialog();
    } else {
      body = React.Children.toArray(this.props.children)
    }

    let logoutButton = null;
    if(self.state.auth && !self.state.loading) {
      logoutButton = self.renderLogoutButton();
    }

    return (
      <MuiThemeProvider muiTheme={ self.muiTheme }>
        <div className={styles.container} id="app-content">
          { body }
          { logoutButton }
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,

  /* Actions */
  changeRoute: React.PropTypes.func,
  updateViewSizes: React.PropTypes.func.isRequired,
  setNavOpen: React.PropTypes.func.isRequired,

  /* Selectors */
  navOpen: React.PropTypes.bool.isRequired,
  location: React.PropTypes.any.isRequired
};

function mapDispatchToProps(dispatch) {
  return Object.assign({
    changeRoute: (url) => dispatch(push(url))
  }, bindActionCreators(globalActions, dispatch));
}

const structuredSelector = createStructuredSelector({
  navOpen: globalSelectors.selectNavOpen(),
  location: globalSelectors.selectLocationState()
});

function mapStateToProps(state, ownProps) {
  return structuredSelector;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);