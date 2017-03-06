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
import ReactTable from 'react-table';
import ReactTableCss from 'react-table/react-table.css';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter, VictoryLabel } from 'victory';

import DashboardPanel from 'components/DashboardPanel';
import QuaternionDisplay from 'components/QuaternionDisplay';
import Row from 'components/Row';
import Col from 'components/Col';
import Grid from 'components/Grid';
import Img from 'components/Img';
import Button from 'components/Button';
import PageOverlay from 'components/PageOverlay';
import Modal from 'components/Modal';

import FirebaseService from 'services/firebaseService';
import * as cssConstants from 'constants/cssConstants';

import makeSelectDashboardPage, * as selectors from './selectors';
import messages from './messages';
import { addScanData } from './actions';
import { markersReactShape } from './reducer';

const faceNames = {
  0: 'Zenith',
  1: 'Nadir',
  2: 'Front',
  3: 'Right',
  4: 'Back',
  5: 'Left'
};

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
      scanImageUrl: '',
      openImageOverlay: false,
      openRenderOverlay: false,
      render_cube_ids: [],
      render_quaternions: {},
      render_tvecs: {}
    }
  }

  updateStoreCallback = (snapshot) => {
    const snapshotVals = snapshot.val();
    this.props.addScanData(
      snapshotVals
    );
  };

  handleDisplayImageOverlay = (scanId) => {
    let promise = FirebaseService.getStorage().ref(`image/${scanId}.jpg`).getDownloadURL();
    promise.then((url) => {
      console.log(url);
      this.setState({
        scanImageUrl: url,
        openImageOverlay: true
      })
    }, (err) => {
      this.setState({
        scanImageUrl: ''
      })
    });
  };

  handleRenderImageOverlay = (snapshot) => {
    const snapshotVals = snapshot.val();
    console.log(snapshotVals);
    let render_quaternions = {};
    let render_tvecs = {};
    let render_cube_ids = snapshotVals.CUBE_IDS;
    render_cube_ids.forEach((cube_id) => {
      render_quaternions[cube_id] = snapshotVals.QUATERNIONS[cube_id];
      render_tvecs[cube_id] = snapshotVals.TVECS[cube_id];
    });
    this.setState({
      render_cube_ids,
      render_tvecs,
      render_quaternions,
      openRenderOverlay: true
    });
  };

  handle3DRender = (id) => {
    FirebaseService.getDatabase().ref(`scans/${id}`).once("value", this.handleRenderImageOverlay)
  };

  handleCloseRenderDisplay = () => {
    this.setState({
      openRenderOverlay: false,
      render_cube_ids: [],
      render_quaternions: {},
      render_tvecs: {}
    });
  };

  componentWillMount() {
    let self = this;
    let ref = FirebaseService.getDatabase().ref('scans').orderByChild("SCAN_ID").limitToLast(20).on("child_added", this.updateStoreCallback);
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    FirebaseService.getDatabase().ref('scans').off("child_added", this.updateStoreCallback);
  }

  render() {
    let lastScanId = this.props.scanIds[0];
    let lastScanDate = new Date(0);
    lastScanDate.setUTCSeconds(lastScanId);
    let now = Date.now() / 1000;
    let cutoff = now - 24 * 60 * 60 * 1000;
    let timeData = this.props.scanIds.filter((scanId) => {
      return scanId >= cutoff;
    }).map((scanId, index) => {
      let date = new Date(scanId * 1000);
      console.log(date);
      return {
        time: date,
        markerIdCount: Object.values(this.props.markerObjects[scanId].cubeIds).length
      }
    });

    let tableColumns = [{
      header: 'Scan',
      columns: [{
        header: 'Scan ID',
        accessor: 'id'
      }, {
        header: 'Time of Scan',
        accessor: 'time'
      }]
    }, {
      header: 'Results',
      columns: [{
        header: 'Faces Detected',
        accessor: 'faces'
      }, {
        header: 'Marker Count',
        accessor: 'markers'
      }, {
        header: 'Aerocube Count',
        accessor: 'aerocubes'
      }, {
        header: 'Distance (cm)',
        accessor: 'distance'
      }]
    }];

    let tableData = this.props.scanIds.map((scanId) => {
      return {
        id: scanId,
        time: String(new Date(scanId * 1000).toLocaleTimeString(undefined, { month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })),
        faces: Object.values(this.props.markerObjects[scanId].cubeFaceIds).map((faceId, index) => {
          return `${index > 0 ? ', ' : ''}${faceNames[faceId]}`
        }),
        markers: this.props.markerObjects[scanId].markerUniqueIds.length,
        aerocubes: new Set(Object.values(this.props.markerObjects[scanId].cubeIds)).size,
        distance: Number(Object.values(this.props.markerObjects[scanId].distances)[0] * 100).toPrecision(2)
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
        <Grid>
          <Row>
            <Col xs={12}>
              <DashboardHeader>
                <FormattedMessage {...messages.header} />
              </DashboardHeader>
              <DashboardSubheader>
                Last Scan: {`${lastScanDate.toLocaleTimeString()} on ${lastScanDate.toLocaleDateString()}`}
              </DashboardSubheader>
              <br/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              <DashboardPanel title="Recent Marker Detections"
                              padded={false}>
                <VictoryChart>
                  <VictoryAxis dependentAxis
                               orientation={'left'}
                               tickCount={6}
                               domain={[0,6]}
                               label="Markers Detected"
                               tickFormat={tick => Number(tick)} />
                  <VictoryLine data={timeData}
                               x="time"
                               y="markerIdCount" />
                  <VictoryScatter data={timeData}
                                  x="time"
                                  y="markerIdCount" />
                  <VictoryAxis scale="time"
                               label="Scans from Oldest to Newest"
                               style={{tickLabels: {fontSize: '10px'}}} />
                </VictoryChart>
              </DashboardPanel>
            </Col>
          </Row>
          <br/>
          { this.props.scanIds.length > 0 ? (
            <Row>
              <Col xs={12}>
                <DashboardPanel title="Recent Scans"
                                style={{maxHeight: 'none'}}>
                  <ReactTable data={tableData}
                              columns={tableColumns}
                              defaultSorting={[{
                                id: 'id',
                                desc: true
                              }]}
                              style={{width: '100%'}}
                              SubComponent={
                                (row) => {
                                  return (
                                    <Row middle={Row.xs}
                                         center={Row.xs}
                                         style={{paddingTop: 10, paddingBottom: 10}}>
                                      <Col xs={6}>
                                        <Button onClick={() => this.handleDisplayImageOverlay(row.rowValues.id)} color={cssConstants.colors.primary}>
                                          View Scanned Image
                                        </Button>
                                      </Col>
                                      <Col xs={6}>
                                        <Button onClick={() => this.handle3DRender(row.rowValues.id)} color={cssConstants.colors.primary}>
                                          View 3D Render
                                        </Button>
                                      </Col>
                                    </Row>
                                  )
                                }
                              }
                  />
                </DashboardPanel>
              </Col>
            </Row>
            ) : null
          }
        </Grid>
        <PageOverlay type={PageOverlay.types.light}
                     open={this.state.openRenderOverlay}
                     onClose={this.handleCloseRenderDisplay}>
          <QuaternionDisplay quaternions={this.state.render_quaternions}
                             tvecs={this.state.render_tvecs}
                             cube_ids={this.state.render_cube_ids} />
        </PageOverlay>
        <Modal type={Modal.types.light}
               open={this.state.openImageOverlay}
               onClose={() => this.setState({openImageOverlay: false})}
               closeOnClickOutside={true}>
          <Img src={this.state.scanImageUrl}
               alt={`Image from scan ${this.state.scanImageUrl}`}
               spinnerWrapperStyle={{width: '100%'}} />
        </Modal>
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
