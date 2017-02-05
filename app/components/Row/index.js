/**
*
* Row
*
*/

import React from 'react';
import styled from 'styled-components';


import * as cssConstants from 'constants/cssConstants';
import * as cssQueries from 'constants/cssQueries';


const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: space-between;
  align-items: flex-start;
  width: 100%;
  
  @media(${cssQueries.maxWidth(cssQueries.sm)}) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

function Row(props) {
  return (
    <StyledRow className={props.className} style={props.style}>
      {
        React.Children.map(props.children, (child) => {
          return child
        })
      }
    </StyledRow>
  );
}

Row.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object
};

Row.defaultProps = {
  className: '',
  style: {}
};

export default Row;
