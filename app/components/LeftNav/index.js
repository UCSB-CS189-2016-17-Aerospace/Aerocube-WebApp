/**
*
* LeftNav
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import * as cssConstants from 'constants/cssConstants';
import * as cssQueries from 'constants/cssQueries';

import A from 'components/A';

const LeftNavSection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: calc(100vw - ${cssConstants.leftNavWidth}px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  width: ${cssConstants.leftNavWidth}px;
  max-width: ${cssConstants.leftNavWidth}px;
  min-width: ${cssConstants.leftNavWidth}px;
  background: ${cssConstants.colors.darkBackground};
  flex-grow: 1;
  flex-shrink: 0;
  border-right: 1px solid ${cssConstants.colors.primary};
  color: white;
  
  & > * {
  }
  
  & > *:hover {
    filter: brightness(95%);
  }
  @media(${cssQueries.maxWidth(cssQueries.sm)}) {
    position: relative; 
    top: none;
    left: none;
    bottom: none;
    right: none;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    border-right: none;
    flex-shrink: 0;
    flex-grow: 0; 
  }
`;

const LeftNavComponentWrapper = styled.a`
  width: 100%;
  padding: ${cssConstants.leftNavWidth/20}px ${cssConstants.leftNavWidth/10}px;
  cursor: pointer;
  user-select: none;
  background: ${cssConstants.colors.darkBackground};
  transition: all 200ms ease-in-out;
  &:hover {
    filter: brightness(90%);
  }
`;

const LeftNavHeader = styled(A)`
  height: 200px;
  font-size: 4em;
  font-weight: 300;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  color: white;
  background: inherit;
  user-select: none;
  
  &:hover {
    color: white;
    filter: brightness(90%);
  }
`;

const LeftNavDivider = styled.hr`
  width: 80%;
`;

class LeftNav extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LeftNavSection>
        <LeftNavHeader targetRoute={'/'}>
            ArGus
        </LeftNavHeader>
        <LeftNavDivider/>
        {
          React.Children.map(this.props.children, (child, index, array) => {
            return child
          })
        }
      </LeftNavSection>
    );
  }
}

LeftNav.propTypes = {

};

LeftNav.defaultProps = {
  children: []
};

export default LeftNav;
