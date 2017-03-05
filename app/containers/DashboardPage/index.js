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
import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter } from 'victory';

import DashboardPanel from 'components/DashboardPanel';
import QuaternionDisplay from 'components/QuaternionDisplay';
import Row from 'components/Row';
import Col from 'components/Col';
import Grid from 'components/Grid';
import Img from 'components/Img';

import FirebaseService from 'services/firebaseService';

import makeSelectDashboardPage, * as selectors from './selectors';
import messages from './messages';
import { addScanData } from './actions';
import { markersReactShape } from './reducer';

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
  font-size: 3em;
  margin-bottom: 0;
`;

const DashboardSubheader = styled.p`
  width: 100%;
  text-align: right;
  margin: 0;
`;

const PaddedCol = styled(Col)`
  padding: 0 0 15px 0;
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
      snapshotVals
    );
  };

  handleUpdateLastRenderedImage = (snapshot) => {
    const snapshotVals = snapshot.val();
    let promise = FirebaseService.getStorage().ref(`image/${snapshotVals['SCAN_ID']}.jpg`).getDownloadURL();
    promise.then((url) => {
      this.setState({
        lastScanImageUrl: url
      })
    }, (err) => {
      this.setState({
        lastScanImageUrl: ''
      })
    });
  };

  componentWillMount() {
    let self = this;
    let ref = FirebaseService.getDatabase().ref('scans').orderByChild("SCAN_ID").limitToLast(3).on("child_added", this.updateStoreCallback);
    FirebaseService.getDatabase().ref('scans').orderByChild("SCAN_ID").limitToLast(1).on("child_added", this.handleUpdateLastRenderedImage);
  }

  componentWillUnmount() {
    FirebaseService.getDatabase().ref('scans').off("child_added", this.updateStoreCallback);
    FirebaseService.getDatabase().ref('scans').off("child_added", this.handleUpdateLastRenderedImage);
  }

  render() {
    let lastScanId = this.props.scanIds[0];
    let date = new Date(0);
    date.setUTCSeconds(lastScanId);
    let timeData = this.props.scanIds.map((scanId, index) => {
      let date = new Date();
      date.setUTCSeconds(scanId);
      return {
        time: index + 1,
        markerIdCount: Object.values(this.props.markerObjects[scanId].cubeIds).length
      }
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
          <Row>
            <PaddedCol xs={12} lg={6}>
              <DashboardPanel title="Markers Detected" padded={false}>
                <VictoryChart>
                  <VictoryAxis dependentAxis orientation={'left'} tickFormat={tick => Number(tick)}/>
                  <VictoryScatter data={timeData} x="time" y="markerIdCount" />
                  <VictoryAxis tickValues={['3 scans ago', '2 scans ago', 'last scan']} />
                </VictoryChart>
              </DashboardPanel>
            </PaddedCol>
            <PaddedCol xs={12} lg={6}>
              <DashboardPanel title="Last Scanned Image" padded={false} style={{overflow: 'hidden'}}>
                <Img src={this.state.lastScanImageUrl} alt="Last scanned image" spinnerWrapperStyle={{width: '100%'}} />
              </DashboardPanel>
            </PaddedCol>
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
  markerObjects: React.PropTypes.objectOf(markersReactShape)
};

const mapStateToProps = createStructuredSelector({
  scanIds: selectors.makeSelectScanIds(),
  markerObjects: selectors.makeSelectMarkers()
});

function mapDispatchToProps(dispatch) {
  return {
    addScanData: (scanVal) => dispatch(addScanData(scanVal)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
