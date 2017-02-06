/*
 *
 * DashboardPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as THREE from 'three';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryPie } from 'victory';

import DashboardPanel from 'components/DashboardPanel';
import QuaternionDisplay from 'components/QuaternionDisplay';
import Row from 'components/Row';

import FirebaseService from 'services/firebaseService';

import makeSelectDashboardPage, {
  makeSelectScanPoses,
  makeSelectScanMarkerIds,
  makeSelectScanCorners,
  makeSelectScanIds
} from './selectors';
import messages from './messages';
import { addScanData } from './actions';

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let ref = FirebaseService.getDatabase().ref().orderByChild("SCAN_ID").on("child_added", (snapshot) => {
      const snapshotVals = snapshot.val();
      this.props.addScanData(
        snapshotVals.SCAN_ID,
        snapshotVals.SCAN_CORNERS,
        snapshotVals.SCAN_MARKER_IDS,
        snapshotVals.SCAN_POSES
      );
      console.log(snapshot.val())
    });
  }

  render() {
    let lastScanId = this.props.scanIds[this.props.scanIds.length - 1];
    let lastQuaternion = this.props.poses[lastScanId];
    let quaternion = lastQuaternion ? THREE.Quaternion(lastQuaternion.x, lastQuaternion.y, lastQuaternion.z, lastQuaternion.w) : undefined;

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
            <QuaternionDisplay quaternion={quaternion}/>
          </DashboardPanel>
        </Row>
        <br/>
      </DashboardArticle>
    );
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addScanData: React.PropTypes.func.isRequired,
  scanIds: React.PropTypes.arrayOf(React.PropTypes.number),
  markerIds: React.PropTypes.object,
  corners: React.PropTypes.object,
  poses: React.PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  DashboardPage: makeSelectDashboardPage(),
  scanIds: makeSelectScanIds(),
  markerIds: makeSelectScanMarkerIds(),
  poses: makeSelectScanPoses(),
  corners: makeSelectScanCorners()
});

function mapDispatchToProps(dispatch) {
  return {
    addScanData: (scanId, corners, markerIds, poses) => dispatch(addScanData(scanId, corners, markerIds, poses)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
