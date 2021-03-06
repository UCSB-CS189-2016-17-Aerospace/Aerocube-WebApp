/**
*
* LogOutput
*
*/

import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scroll = Scroll.scroller;

import * as cssConstants from 'constants/cssConstants';

import Alert from 'components/Alert';

const LogSection = styled.section`
  width: 100%;
  border-radius: 2px;
  background: #181818;
  color: white;
  font-size: 15px;
  line-height: 18px;
  font-family: monospace;
  padding: 30px 0;
`;

const lineNumberWidth = 40;

const LineNumbersWrapper = styled.div`
  width: ${lineNumberWidth}px;
  max-width: ${lineNumberWidth}px;
  position: fixed;
  background-color: darkslategray;
  height: 100%;
  flex-grow: 1;
  flex-shrink: 0;
`;

const LogLineWrapper = styled(Element)`
  font-family: monospace;
  color: white;
  font-size: inherit;
  line-height: inherit;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  padding: 3px 0 4px 0;
  cursor: pointer;
  z-index: 3;
  width: 100%;
  transition: all 200ms ease-in-out;
  &:hover {
    background: darkslategray;
    filter: brightness(90%);
  }
`;

const LineNumber = styled.label`
  font-family: ${cssConstants.monospaceFont};
  text-align: right;
  height: 100%;
  width: ${lineNumberWidth}px;
  padding: 1px 5px 0 0;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  flex-shrink: 0;
  color: ${cssConstants.colors.textLight};
  z-index: 3;
  transition: all 200ms ease-in-out;
`;

const LineText = styled.p`
  font-family: ${cssConstants.monospaceFont};
  color: ${cssConstants.colors.textLight};
  font-weight: 300;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  padding: 1px 30px 0 10px;
  width: 100%;
  z-index: 3;
  transition: all 200ms ease-in-out;
`;

class LogOutput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      alertMessage: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loading != this.state.loading) {
      this.setState({
        loading: nextProps.loading
      }, () => {
        if(!nextProps.loading) {
          this.onLoad();
        }
      });
    }
  }

  onLoad = () => {
    scroll.scrollTo(this.props.scrollToLine, {
      duration: 400,
      delay: 50,
      smooth: true,
      offset: -50,
      isDynamic: true
    })
  };

  render() {
    let alert = this.state.alertMessage.length > 0 ? (
        <Alert show={this.state.alertMessage.length > 0}
               header={"Copied!"}
               message={this.state.alertMessage}
               type={Alert.getInfoAlertType()}
               float={true}
               showHideButton={true}
               hideAfter={1.5}
               onHide={() => this.setState({alertMessage: ''})}
        />
      ) : null;

    let lines = this.props.lines.map((lineString, index, array) => {
      let shortenedString = lineString.match(/.{0,200}/g)[0] + ((lineString.length > 200) ? ' ...' : '');
      return (
        <CopyToClipboard text={lineString} key={index} onCopy={() => this.setState({alertMessage: shortenedString})}>
          <LogLineWrapper name={`L${index + 1}`}>
            <LineNumber>
              { index + 1 }
            </LineNumber>
            <LineText>
              { lineString }
            </LineText>
          </LogLineWrapper>
        </CopyToClipboard>
      )
    });
    return (
      <LogSection>
        { alert }
        { lines }
      </LogSection>
    );
  }
}

LogOutput.propTypes = {
  lines: React.PropTypes.arrayOf(React.PropTypes.string),
  loading: React.PropTypes.bool,
  scrollToLine: React.PropTypes.string
};

LogOutput.defaultProps = {
  lines: [''],
  loading: true,
  scrollToLine: ''
};

export default LogOutput;
