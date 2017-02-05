/*
 *
 * DashboardPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryPie } from 'victory';

import DashboardPanel from 'components/DashboardPanel';
import QuaternionDisplay from 'components/QuaternionDisplay';
import Row from 'components/Row';


import makeSelectDashboardPage from './selectors';
import messages from './messages';

const DashboardArticle = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
`;

const DashboardHeader = styled.h1`
  font-weight: bold;
  padding-left: 30px;
  font-size: 3em;
  margin-bottom: 0.25em;
`;

export class DashboardPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {

    return (
      <DashboardArticle>
        <Helmet
          title="DashboardPage"
          meta={[
            { name: 'description', content: 'Description of DashboardPage' },
          ]}
        />
        <DashboardHeader>
          <FormattedMessage {...messages.header} />
        </DashboardHeader>
        <Row>
          <DashboardPanel>
            <VictoryChart>
              <VictoryLine/>
            </VictoryChart>
          </DashboardPanel>
          <DashboardPanel>
            <VictoryChart>
              <VictoryPie/>
            </VictoryChart>
          </DashboardPanel>
        </Row>
        <Row>
          <DashboardPanel style={{height: 800}}
                          size={DashboardPanel.lg}
                          padded={false}
                          title={
                            <h1>
                              <b>
                                <FormattedMessage {...messages.quaternionSimulationHeader}/>
                              </b>
                            </h1>
                          }>
            <QuaternionDisplay/>
          </DashboardPanel>
        </Row>
      </DashboardArticle>
    );
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  DashboardPage: makeSelectDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
