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
import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter } from 'victory';

import DashboardPanel from 'components/DashboardPanel';
import QuaternionDisplay from 'components/QuaternionDisplay';
import Row from 'components/Row';
import Col from 'components/Col';
import Grid from 'components/Grid';
import Img from 'components/Img';

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
`;

const DashboardSubheader = styled.p`
  width: 100%;
  text-align: right;
  padding-right: 30px;
`;

const PaddedRow = styled(Row)`
  padding: 30px 0;
`;

export class DashboardPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      lastScanImageUrl: ''
    }
  }

  updateStoreCallback = (snapshot) => {
    const snapshotVals = snapshot.val();
    this.props.addScanData(
      snapshotVals.SCAN_ID,
      snapshotVals.SCAN_CORNERS,
      snapshotVals.SCAN_MARKER_IDS,
      snapshotVals.SCAN_POSES
    );
  };

  componentWillMount() {
    let self = this;
    let ref = FirebaseService.getDatabase().ref('scans').orderByChild("SCAN_ID").limitToLast(3).on("child_added", this.updateStoreCallback);
    FirebaseService.getDatabase().ref('scans').orderByChild("SCAN_ID").limitToLast(1).once("value", (snapshot) => {
      const snapshotVals = snapshot.val();
      console.log(snapshotVals);
      let urlPromise = FirebaseService.getStorage().ref(`image/${Object.keys(snapshotVals)[0]}.jpg`).getDownloadURL();
      urlPromise.then((url) => {
        console.log(url);
        self.setState({
          lastScanImageUrl: url
        })
      }, (err) => {

      });
    });
  }

  componentWillUnmount() {
    FirebaseService.getDatabase().ref().off("child_added", this.updateStoreCallback);
  }

  render() {
    let lastScanId = this.props.scanIds[this.props.scanIds.length - 1];
    console.log(lastScanId);
    let date = new Date(0);
    date.setUTCSeconds(lastScanId);
    console.log(date);
    let lastQuaternion = this.props.poses[lastScanId];
    let quaternion = undefined;
    try {
      lastQuaternion = lastQuaternion[0];
      console.log(lastQuaternion);
      quaternion = new THREE.Quaternion(lastQuaternion.x, lastQuaternion.y, lastQuaternion.z, lastQuaternion.w);
      console.log(quaternion);
    } catch(e) {

    }

    let timeData = this.props.scanIds.map((id, index, array) => {
      return { time: index + 1, markerIdCount: this.props.markerIds[id].length }
    });

    return (
      <DashboardArticle>
        <Helmet
          title="DashboardPage"
          meta={[
            { name: 'description', content: 'Description of DashboardPage' },
          ]}
        />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <DashboardHeader>
                <FormattedMessage {...messages.header} />
              </DashboardHeader>
              <DashboardSubheader>
                Last Scan: {`${date.toLocaleTimeString()} on ${date.toLocaleDateString()}`}
              </DashboardSubheader>
              <br/>
            </Col>
          </Row>
          <PaddedRow>
            <Col xs={12} md={6}>
              <DashboardPanel title="Markers Detected" padded={false}>
                <VictoryChart>
                  <VictoryAxis dependentAxis orientation={'left'} tickValues={[0, 1, 2]}/>
                  <VictoryScatter data={timeData} x="time" y="markerIdCount" />
                  <VictoryAxis tickValues={['2 scans ago', '1 scan ago', 'last scan']}/>
                </VictoryChart>
              </DashboardPanel>
            </Col>
            <Col xs={12} md={6}>
              <DashboardPanel title="Last Scanned Image" padded={false} style={{overflow: 'hidden'}}>
                <Img src={this.state.lastScanImageUrl} alt="Last scanned image" spinnerWrapperStyle={{width: '100%'}} />
              </DashboardPanel>
            </Col>
          </PaddedRow>
          <Row>
            <Col xs={12}>
              <DashboardPanel style={{height: 900}}
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
            </Col>
          </Row>
        </Grid>
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
