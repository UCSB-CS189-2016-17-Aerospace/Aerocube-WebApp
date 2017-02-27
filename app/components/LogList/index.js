/**
*
* LogList
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import FirebaseService from 'services/firebaseService'

import * as cssConstants from 'constants/cssConstants';

import A from 'components/A';
import Modal from 'components/Modal';
import LogOutput from 'components/LogOutput';
import PageOverlay from 'components/PageOverlay';
import Grid from 'components/Grid';
import Row from 'components/Row';
import Col from 'components/Col';

const LogListItem = styled(A)`
  margin: 10px 0;
  padding: 6px 10px 4px 10px;
  animation: ${cssConstants.animations.fadeIn};
  display: block;'
  text-align: left;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 18px;
  line-height: 22px;
  
  &:hover {
    background: ${cssConstants.colors.darkBackground};
    color: ${cssConstants.colors.textLight};
    box-shadow: ${cssConstants.lightShadow};
  }
`;

class LogList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      logKeys: [],
      openLog: '',
      logLines: []
    };
    this.log_ref = 'logs'
  }

  addLogKeys = (snapshot) => {
    let tempArray = [{ key: snapshot.key, time: Object.keys(snapshot.val())[0] }];
    this.setState((state) => ({
      logKeys: tempArray.concat(state.logKeys).sort((a, b) => b.time - a.time)
    }), () => console.log(this.state.logKeys))
  };

  openLog = (logKey) => {
    this.setState({
      openLog: logKey
    });
    FirebaseService.getDatabase().ref(this.log_ref + '/' + logKey).orderByKey().on("child_added", this.addLogLines)
  };

  addLogLines = (snapshot) => {
    this.setState((state) => ({
      logLines: state.logLines.concat([snapshot.val()])
    }));
  };

  closeLog = () => {
    FirebaseService.getDatabase().ref(this.log_ref + '/' + this.state.openLog).off("child_added", this.addLogLines);
    this.setState({
      openLog: '',
      logLines: []
    });
  };

  componentWillMount() {
    FirebaseService.getDatabase().ref(this.log_ref).orderByKey().limitToLast(20).on("child_added", this.addLogKeys);
  }

  componentWillUnmount() {
    FirebaseService.getDatabase().ref(this.log_ref).off("child_added", this.addLogKeys);
  }

  render() {
    return (
      <Grid>
        <Row center={Row.xs} middle={Row.xs}>
          <Col xs={12} md={10} lg={8}>
            <h1>
              Logs
            </h1>
          {
            this.state.logKeys.map((keyObj, index) => {
              let date = new Date(Number(keyObj.time) * 1000);
              return (
                <LogListItem key={index} onClick={() => this.openLog(keyObj.key)}>
                  <span>
                    {index + 1}. { keyObj.key }
                  </span>
                  <span>
                    { `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}` }
                  </span>
                </LogListItem>
              )
            })
          }
          </Col>
        </Row>
        <Modal open={this.state.openLog != ''}
               onClose={this.closeLog}
               showExitButton type={PageOverlay.types.light} opacity={1}
               title={`Log ID: ${this.state.openLog}`}>
          <LogOutput lines={this.state.logLines}/>
        </Modal>
      </Grid>
    );
  }
}

LogList.propTypes = {
  params: React.PropTypes.shape({
    logId: React.PropTypes.string
  })
};

export default LogList;
