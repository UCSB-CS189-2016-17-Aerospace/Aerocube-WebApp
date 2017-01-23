/**
*
* LoadingScreen
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

import LoadingCircle from '../LoadingCircle/LoadingCircle';
import messages from './messages';

const BrightenFullScreenDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: white;
  opacity: ${props => props.opacity};
  z-index: 100;
`;

const LoadingCircleWrapper = styled.div`
  padding: 40px 0;
`;

class LoadingScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.loading && !this.state.loading) {
      this.props.onLoad();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loading != this.state.loading) {
      this.setState({
        loading: nextProps.loading
      })
    }
  }

  componentDidMount() {
    if(this.props.timeoutSeconds > 0) {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, this.props.timeoutSeconds)
    }
  }

  render() {
    return this.state.loading ? (
      <BrightenFullScreenDiv className={this.props.className} style={this.props.style} opacity={this.props.opacity}>
        <h1>
          <b>
            <FormattedMessage {...this.props.headerMessage} />
          </b>
        </h1>
        <p>
          <FormattedMessage {...this.props.subHeaderMessage} />
        </p>
        <br/>
        <LoadingCircleWrapper>
          <LoadingCircle/>
        </LoadingCircleWrapper>
      </BrightenFullScreenDiv>
    ) : null;
  }
}

LoadingScreen.propTypes = {
  // Styles
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  opacity: React.PropTypes.number,

  // Functionality
  timeoutSeconds: React.PropTypes.number,
  onLoad: React.PropTypes.func,

  // Controlled State
  loading: React.PropTypes.bool.isRequired,

  // Strings
  headerMessage: React.PropTypes.object,
  subHeaderMessage: React.PropTypes.object
};

LoadingScreen.defaultProps = {
  opacity: 0.8,
  timeoutSeconds: 0,
  onLoad: () => {},
  headerMessage: messages.header,
  subHeaderMessage: messages.subHeader
};

export default LoadingScreen;
