/*
 *
 * RenderingPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import * as THREE from 'three';

import FirebaseService from 'services/firebaseService';

import * as cssConstants from 'constants/cssConstants';

import Grid from 'components/Grid';
import Col from 'components/Col';
import Row from 'components/Row';
import PageOverlay from 'components/PageOverlay';
import Button from 'components/Button';
import QuaternionDisplay from 'components/QuaternionDisplay';

import makeSelectRenderingPage from './selectors';
import messages from './messages';

export class RenderingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      cube_ids: [],
      quaternions: {},
      tvecs: {},
      openDisplay: false
    }
  }

  handleLastScanData = (snapshot) => {
    const snapshotVals = snapshot.val();
    console.log(snapshotVals);
    let quaternions = {};
    let tvecs = {};
    let cube_ids = snapshotVals.CUBE_IDS;
    cube_ids.forEach((cube_id) => {
      quaternions[cube_id] = snapshotVals.QUATERNIONS[cube_id];
      tvecs[cube_id] = snapshotVals.TVECS[cube_id];
    });
    this.setState({
      cube_ids,
      tvecs,
      quaternions
    });
  };

  toggleDisplayOpen = () => {
    this.setState((state) => { return {openDisplay: !state.openDisplay}});
  };

  componentWillMount() {
    FirebaseService.getDatabase().ref('scans').orderByChild("SCAN_ID").limitToLast(1).on("child_added", this.handleLastScanData);
  }

  componentWillUnmount() {
    FirebaseService.getDatabase().ref('scans').off("child_added", this.handleLastScanData);
  }

  render() {
    let quaternionArray = Object.values(this.state.quaternions).map((quaternion) => {
      if(quaternion !== undefined)
        return THREE.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    });

    return (
      <Grid>
        <Helmet
          title="RenderingPage"
          meta={[
            { name: 'description', content: 'Description of RenderingPage' },
          ]}
        />
        <Row>
          <Col xs={12}>
            <h1>
              hi
            </h1>
            <Button color={cssConstants.colors.primary} onClick={this.toggleDisplayOpen}>
              { this.state.openDisplay ? 'Close' : 'Open' }
            </Button>
          </Col>
        </Row>
        <PageOverlay type={PageOverlay.types.light}
                     open={this.state.openDisplay}
                     onClose={this.toggleDisplayOpen}>
          <QuaternionDisplay quaternions={this.state.quaternions}
                             tvecs={this.state.tvecs}
                             cube_ids={this.state.cube_ids} />
        </PageOverlay>
      </Grid>
    );
  }
}

RenderingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  RenderingPage: makeSelectRenderingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderingPage);
