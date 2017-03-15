/**
*
* HoverReveal
*
*/

import React from 'react';
import styled from 'styled-components';

import { xlightShadow, colors } from 'constants/cssConstants';

const Wrapper = styled.div`
  text-decoration: none;
  color: inherit;
  background: inherit;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  box-shadow: ${ props => props.shadow ? xlightShadow : ''};
  border-radius: 2px;
  
  & * {
    border-radius: 2px;
  }
`;

const TopLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;
  transition: opacity ${props => props.transitionSeconds}s ease-in-out;
  
  & > * {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  
  &:hover {
    opacity: ${props => props.hoverOpacity};
    transition: opacity ${props => props.transitionSeconds}s ease-in-out;
  }
`;

const ChildLayer = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  
  & > * {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
`;

class HoverReveal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper className={this.props.className}
               style={this.props.style}
               shadow={this.props.shadow}>
        <TopLayer transitionSeconds={this.props.transitionSeconds}
                  hoverOpacity={this.props.hoverOpacity}>
          { this.props.hoverContent }
        </TopLayer>
        <ChildLayer>
          { this.props.children }
        </ChildLayer>
      </Wrapper>
    );
  }
}

HoverReveal.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  hoverContent: React.PropTypes.node,
  hoverOpacity: React.PropTypes.number,
  shadow: React.PropTypes.bool,
  transitionSeconds: React.PropTypes.number,
};

HoverReveal.defaultProps = {
  className: '',
  style: {},
  shadow: true,
  transitionSeconds: 0.4,
  hoverOpacity: 1
};

export default HoverReveal;
