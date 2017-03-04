/**
*
* Grid
*
*/

import React from 'react';
import styled from 'styled-components';
import { Grid as FlexboxGrid } from 'react-flexbox-grid';

export const StyledGrid = styled(FlexboxGrid)`
  ${props => props.fluid ? 'margin: 0; padding: 0;' : ''}
  max-width: 100%;
`;

function Grid(props) {
  return (
    <StyledGrid {...props}>
    </StyledGrid>
  );
}

Grid.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  fluid: React.PropTypes.bool,
  tagName: React.PropTypes.string,
  children: React.PropTypes.any
};

export default Grid;
