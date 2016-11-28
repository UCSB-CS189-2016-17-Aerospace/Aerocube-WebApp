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

import styles from './styles.css';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.muiTheme = getMuiTheme(baseTheme, {
      palette: {
        primary1Color: 'darkslategrey',
        accent1Color: '#00cabb',
        pickerHeaderColor: this.primary1Color
      }
    });
  }
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    let self = this;
    return (
      <MuiThemeProvider muiTheme={ self.muiTheme }>
        <div className={styles.container}>
          {React.Children.toArray(this.props.children)}
        </div>
      </MuiThemeProvider>
    );
  }
}
