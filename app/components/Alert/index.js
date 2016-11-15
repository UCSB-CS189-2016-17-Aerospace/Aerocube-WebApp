/**
*
* Alert
*
*/

import React from 'react';

import styles from './styles.css';

import isMobileDevice from '../../utils/deviceChecker';

class Alert extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      show: props.show
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }

  static getInfoAlertType = () => {
    return styles.infoAlert;
  };

  static getErrorAlertType = () => {
    return styles.errorAlert;
  };

  static getWarningAlertType = () => {
    return styles.warningAlert;
  };

  static getSuccessAlertType = () => {
    return styles.successAlert;
  };

  handleHideAfter = (seconds) => {
    if(seconds > 0){
      setTimeout(() => {
        this.handleHide();
      }, seconds * 1000)
    }
  };

  handleHide = () => {
    this.setState({
      show: false
    })
  };

  render() {
    // Do not show
    if(!this.state.show) {
      return null;
    }
    // Use Alert function
    if(isMobileDevice() && this.props.useAlertOnMobile) {
      let type = this.props.type !== this.getInfoAlertType() ? this.props.type : undefined;
      window.alert(`${type}${type ? ':' : undefined} ${this.props.header}\n\n${this.props.message}`);
      return null;
    }
    this.handleHideAfter(this.props.hideAfter);
    // Determine styling
    let alertStyles = [
      styles.alert,
      this.props.type,
      this.props.block ? styles.blockAlert : '',
      this.props.className
    ].join(' ');

    let headerStyles = [
      styles.alertHeader,
      this.props.headerClassName
    ].join(' ');

    let messageStyles = [
      styles.alertMessage,
      this.props.messageClassName
    ].join(' ');
    // Render normally
    return (
      <div className={alertStyles}
           style={this.props.style}>
        <h2 className={headerStyles}
            style={this.props.headerStyle}>
          { this.props.header }
        </h2>
        <p className={messageStyles}
           style={this.props.messageStyle}>
          { this.props.message }
        </p>
        {
          this.props.showHideButton && this.props.type != Alert.getErrorAlertType() ? (
            <button className={styles.hideButton}
                  onClick={() => this.handleHide()}>
              Hide Me!
            </button>
          ) : null
        }
      </div>
    );
  }
}

Alert.propTypes = {
  /* Styles */
  // Override styles of the outer div element
  style: React.PropTypes.object,
  // Override styles of the header h2 element
  headerStyle: React.PropTypes.object,
  // Override styles of the message p element
  messageStyle: React.PropTypes.object,
  // Add classes to the outer div element
  className: React.PropTypes.string,
  // Add classes to the header h2 element
  headerClassName: React.PropTypes.string,
  // Add classes to the message p element
  messageClassName: React.PropTypes.string,
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
  style: {},
  headerStyle: {},
  messageStyle: {},
  className: '',
  headerClassName: '',
  messageClassName: '',
  block: false,
  useAlertOnMobile: false,
  hideAfter: 0,
  showHideButton: false
};

export default Alert;
