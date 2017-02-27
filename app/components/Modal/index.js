
import React from 'react';
import styled from 'styled-components';

import A from 'components/A';
import PageOverlay from 'components/PageOverlay';

import * as cssConstants from 'constants/cssConstants';
import * as cssQueries from 'constants/cssQueries'

const Background = styled(PageOverlay)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding-top: 5vh;
`;

const ModalBody = styled.section`
  max-width: 1200px;
  width: 95%;
  background: white;
  border-radius: 4px;
  box-shadow: ${cssConstants.lightShadow};
  z-index: 801;
  overflow-y: auto;
  max-height: 80vh;
  @media (${cssQueries.maxWidth(cssQueries.sm)}) {
  max-height: 90vh;
  }
`;

const Title = styled.h1`
  z-index: 801;
  font-size: 42px;
  color: ${props => props.type == PageOverlay.types.dark ? cssConstants.colors.textLight : cssConstants.colors.text};
  @media (${cssQueries.maxWidth(cssQueries.sm)}) {
    display: none;
  }
`;

const ClickableBackground = styled.div`
  position: fixed;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 800;
`;

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    });
  }

  render() {
    let title = this.props.title ? (
        <Title type={this.props.type}>
          {this.props.title}
        </Title>
      ) : null;
    return (
        <Background type={this.props.type}
                    open={this.state.open}
                    showExitButton={this.props.showExitButton}
                    opacity={this.props.opacity}
                    onClose={this.props.onClose}>
          { title }
          <ModalBody>
            { this.props.children }
          </ModalBody>
          {
            this.props.closeOnClickOutside ? (
                <A onClick={() => this.setState({open: false})}>
                  <ClickableBackground />
                </A>
            ) : null
          }
        </Background>
    );
  }
}

Modal.types = PageOverlay.types;

Modal.propTypes = {
  /* styles */
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  type: React.PropTypes.oneOf(Object.values(PageOverlay.types)),
  opacity: React.PropTypes.number,
  /* Behavior */
  open: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func,
  closeOnClickOutside: React.PropTypes.bool,
  /* Content */
  children: React.PropTypes.any,
  title: React.PropTypes.string,
  showExitButton: React.PropTypes.bool,
};

Modal.defaultProps = {
  closeButton: false,
  type: PageOverlay.types.dark,
  className: '',
  style: {},
  showExitButton: false,
  onClose: () => {},
  closeOnClickOutside: false
};

export default Modal;
