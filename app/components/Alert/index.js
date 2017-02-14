/**
*
* Alert
*
*/

import React from 'react';
import styled, {css} from 'styled-components';
import * as cssConstants from 'constants/cssConstants';

const AlertFloatWrapper = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  opacity: ${(props) => props.hiding ? 0 : 1};
  transition: opacity 500ms ease-in-out;
  flex-grow: 1;
`;

const AlertDiv = styled.div`
  padding: 1.5em 2em;
  margin: 0;
  color: darkslategray;
  background: whitesmoke;
  max-width: 100%;
  width: ${(props) => props.block ? '100%' : '600px'};
  border-radius: 2px;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647);
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
  opacity: ${(props) => props.hiding ? 0 : 1};
  transition: opacity 500ms ease-in-out;
  animation: ${cssConstants.animations.fadeIn};
  
  ${(props) => {
    switch(props.type) {
      case Alert.getErrorAlertType():
        return ErrorAlert;
      case Alert.getWarningAlertType():
        return WarningAlert;
      case Alert.getSuccessAlertType():
        return SuccessAlert;
      case Alert.getInfoAlertType():
        return InfoAlert;
    }
  }}
`;

const ErrorAlert = css`
  background: #D76C63;
  color: white;
`;

const WarningAlert = css`
  background: #DBA45E;
  color: white;
`;

const SuccessAlert = css`
  background: #41976f;
  color: white;
`;

const InfoAlert = css`
  background: whitesmoke;
  color: darkslategray;
`;

const HideButton = styled.button`
  margin-top: 0.25em;
  font-size: 0.9em;
  float: right;
  transition: all 200ms ease-in-out;
  
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    transition: all 200ms ease-in-out;
  }
`;

const AlertHeader = styled.h2`
  margin: 0 0 0.5em 0;
`;

const AlertMessage = styled.p`
  margin: 0.25em 0;
`;

class Alert extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      hiding: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }

  static getInfoAlertType = () => {
    return 'infoAlert';
  };

  static getErrorAlertType = () => {
    return 'errorAlert';
  };

  static getWarningAlertType = () => {
    return 'warningAlert';
  };

  static getSuccessAlertType = () => {
    return 'successAlert';
  };

  handleHideAfter = (seconds) => {
    if(seconds > 0){
      setTimeout(() => {
        this.handleHide();
      }, seconds * 1000)
    }
  };

  handleHide = () => {
    if(this.state.show && !this.state.hiding) {
      this.setState({
        hiding: true
      }, () => {
        setTimeout(() => {
          this.setState({
            show: false,
            hiding: false
          }, () => this.props.onHide())
        }, 500);
      });
    }
  };

  render() {
    // Do not show
    if(!this.state.show) {
      return null;
    }
    // TODO: Use Alert function on mobile
    /*
    if(isMobileDevice() && this.props.useAlertOnMobile) {
      let type = this.props.type !== this.getInfoAlertType() ? this.props.type : undefined;
      window.alert(`${type}${type ? ':' : undefined} ${this.props.header}\n\n${this.props.message}`);
      return null;
    }
    */
    this.handleHideAfter(this.props.hideAfter);
    let alert = (
      <AlertDiv className={this.props.className}
                style={this.props.style}
                type={this.props.type}
                block={this.props.block}
                hiding={this.state.hiding}>
        <AlertHeader className={this.props.headerClassName}
                     style={this.props.headerStyle}>
          { this.props.header }
        </AlertHeader>
        <AlertMessage className={this.props.messageClassName}
                      style={this.props.messageStyle}>
          { this.props.message }
        </AlertMessage>
        {
          this.props.showHideButton && this.props.type != Alert.getErrorAlertType() ? (
              <HideButton className={this.props.buttonClassName}
                          style={this.props.buttonStyle}
                          onClick={() => this.handleHide()}>
                Hide Me!
              </HideButton>
            ) : null
        }
      </AlertDiv>
    );
    // Render normally
    return this.props.float ?(
        <AlertFloatWrapper hiding={this.state.hiding}>
          { alert }
        </AlertFloatWrapper>
      ) : alert
    ;
  }
}

Alert.propTypes = {
  /* Styles */
  float: React.PropTypes.bool,
  // Override styles of the outer div element
  style: React.PropTypes.object,
  // Override styles of the header h2 element
  headerStyle: React.PropTypes.object,
  // Override styles of the message p element
  messageStyle: React.PropTypes.object,
  // Override styles of the button element
  buttonStyle: React.PropTypes.object,
  // Add classes to the outer div element
  className: React.PropTypes.string,
  // Add classes to the header h2 element
  headerClassName: React.PropTypes.string,
  // Add classes to the message p element
  messageClassName: React.PropTypes.string,
  // Add classes to the button element
  buttonClassName: React.PropTypes.string,
  // Use 100% width
  block: React.PropTypes.bool,

  /* Config */
  useAlertOnMobile: React.PropTypes.bool,
  // Whether or not to show the alert
  show: React.PropTypes.bool.isRequired,
  // Automatically hide after hideAfter # of seconds
  hideAfter: React.PropTypes.number,
  // The text of the alert
  showHideButton: React.PropTypes.bool,
  onHide: React.PropTypes.func,

  /* Content */
  header: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired,
  // The type of alert, retrieved using an Alert.getType function
  type: React.PropTypes.oneOf([
      Alert.getInfoAlertType(),
      Alert.getErrorAlertType(),
      Alert.getSuccessAlertType(),
      Alert.getWarningAlertType()
    ]).isRequired
};

Alert.defaultProps = {
  float: false,
  style: {},
  headerStyle: {},
  messageStyle: {},
  buttonStyle: {},
  className: '',
  headerClassName: '',
  messageClassName: '',
  buttonClassName: '',
  block: false,
  useAlertOnMobile: false,
  hideAfter: 0,
  showHideButton: false,
  onHide: () => {}
};

export default Alert;
