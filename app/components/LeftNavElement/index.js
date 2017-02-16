/**
*
* LeftNavElement
*
*/

import React from 'react';
import styled from 'styled-components';

import * as cssConstants from 'constants/cssConstants';

import A from 'components/A';

const NavElement = styled(A)`
  width: 100%;
  padding: ${cssConstants.leftNavWidth/20}px ${cssConstants.leftNavWidth/10}px;
  cursor: pointer;
  user-select: none;
  background: ${cssConstants.colors.darkBackground};
  transition: all 200ms ease-in-out;
  color: white;
  &:hover {
    filter: brightness(90%);
    color: ${cssConstants.colors.textLight};
  }
  &:active {
    filter: brightness(60%);
  }
`;

class LeftNavElement extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <NavElement {...this.props}>
        {
          React.Children.map(this.props.children, (child) => {
            return child
          })
        }
      </NavElement>
    );
  }
}

LeftNavElement.propTypes = {

};

export default LeftNavElement;
