/*
 *
 * LogPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import makeSelectLogPage from './selectors';
import messages from './messages';

import * as cssConstants from 'constants/cssConstants';

import Grid from 'components/Grid';
import LogList from 'components/LogList';

const LogArticle = styled.article`
  height: 100%;
`;

export class LogPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LogArticle>
        <Helmet
          title="LogPage"
          meta={[
            { name: 'description', content: 'Description of LogPage' },
          ]}
        />
        <LogList/>
      </LogArticle>
    );
  }
}

LogPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  LogPage: makeSelectLogPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogPage);
