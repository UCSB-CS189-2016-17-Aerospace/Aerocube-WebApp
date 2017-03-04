/**
*
* PageOverlay
*
*/

import React from 'react';
import styled, { css } from 'styled-components';

import A from 'components/A';

import * as cssConstants from 'constants/cssConstants';

const OpacityTransition = css`
  transition: opacity 500ms ease-in-out;
`;

const PageOverlayWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  animation: ${cssConstants.animations.fadeIn};
  opacity: ${props => props.hiding ? 0 : 1};
  ${OpacityTransition}
`;

const CloseButton = styled(A)`
  position: fixed;
  top: 30px;
  right: 30px;
  font-size: 16px;
  font-weight: bold;
  opacity: 1;
  cursor: pointer;
  z-index: 1002;
`;

const Background = styled.div`
  opacity: ${props => props.hiding ? 0 : props.opacity};
  ${OpacityTransition}
  background: ${props => props.type == PageOverlay.types.dark ? '#202020' : '#FFFFFF'};
  position: fixed;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ChildWrapper = styled.div`
  opacity: ${props => props.hiding ? 0 : 1};
  ${OpacityTransition}
  z-index: 1001;
  position: fixed;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

class PageOverlay extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      hiding: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open != this.state.open && !nextProps.open)
      this.handleClose();
    else {
      this.setState({
        open: nextProps.open
      }, () => {
        if(nextProps.open)
          this.disableBodyScroll();
      });
    }
  }

  handleClose = () => {
    this.setState({
      hiding: true
    }, () => {
      setTimeout(() => {
        this.setState({
          open: false,
          hiding: false
        }, () => this.props.onClose());
        this.enableBodyScroll();
      }, 500);
    })
  };

  disableBodyScroll = () => {
    document.body.style.overflowY = 'hidden';
  };

  enableBodyScroll = () => {
    document.body.style.overflowY = 'auto';
  };

  render() {

    let exitButton = this.props.showExitButton ? (
        <CloseButton onClick={this.handleClose}>
          Exit
        </CloseButton>
      ) : null;

    return this.state.open ? (
      <PageOverlayWrapper hiding={this.state.hiding}>
        { exitButton }
        <Background opacity={this.props.opacity}
                    hiding={this.state.hiding}
                    type={this.props.type} />
        <ChildWrapper hiding={this.state.hiding} className={this.props.className} style={this.props.style}>
        { this.props.children }
        </ChildWrapper>
      </PageOverlayWrapper>
    ) : null;
  }
}

PageOverlay.types = {
  dark: 'dark',
  light: 'light'
};

PageOverlay.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  opacity: React.PropTypes.number,
  type: React.PropTypes.oneOf(Object.values(PageOverlay.types)).isRequired,
  open: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func,
  showExitButton: React.PropTypes.bool
};

PageOverlay.defaultProps = {
  className: '',
  style: {},
  opacity: 0.9,
  type: PageOverlay.types.light,
  onClose: () => {},
  showExitButton: true
};

export default PageOverlay;
