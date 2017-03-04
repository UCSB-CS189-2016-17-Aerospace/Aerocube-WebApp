/**
*
* LeftNavLayout
*
*/

import React from 'react';
import styled from 'styled-components';

import * as cssConstants from 'constants/cssConstants';

import LeftNav from 'components/LeftNav';
import LeftNavElement from 'components/LeftNavElement';


const LayoutArticle = styled.article`
  display: flex;
  flex-direction: row;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const RightBodySection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
  width: calc(100vw - ${cssConstants.leftNavWidth + 15}px);
  max-width: calc(100vw - ${cssConstants.leftNavWidth + 15}px);
  margin-left: ${cssConstants.leftNavWidth}px;
  top: 0;
  right: 0;
  bottom: 0;
`;

class LeftNavLayout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LayoutArticle>
        <LeftNav>
          { this.props.navChildren }
        </LeftNav>
        <RightBodySection>
          { this.props.children }
        </RightBodySection>
      </LayoutArticle>
    );
  }
}

LeftNavLayout.propTypes = {

};

LeftNavLayout.defaultProps = {
  navChildren: []
};

export default LeftNavLayout;
