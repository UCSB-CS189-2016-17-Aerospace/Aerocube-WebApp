/**
*
* Col
*
*/

import React from 'react';
import styled from 'styled-components';

import { Col as FlexboxCol } from 'react-flexbox-grid';

import * as cssQueries from 'constants/cssQueries';

const xlgQuery = (props) => {
  return `
    @media (${cssQueries.minWidth(cssQueries.xlg)}) {
      flex-basis: calc(100% * ${props => props.xlg}/12);
      max-width: calc(100% * ${props => props.xlg}/12);
    }
  `
};

const StyledCol = styled(FlexboxCol)`
  && {
    margin: 0;
    ${ props => props.xlg ? xlgQuery(props) : ''}
    
    @media(${cssQueries.maxWidth(cssQueries.xs)}) {
      ${ props => props.xsHidden ? 'display: none;' : ''}  
    }
    @media(${cssQueries.minWidth(cssQueries.xs)}) and (${cssQueries.maxWidth(cssQueries.sm)}) {
      ${ props => props.smHidden ? 'display: none;' : ''}  
    }
    @media(${cssQueries.minWidth(cssQueries.sm)}) and (${cssQueries.maxWidth(cssQueries.md)}) {
      ${ props => props.mdHidden ? 'display: none;' : ''}  
    }
    @media(${cssQueries.minWidth(cssQueries.md)}) {
      ${ props => props.lgHidden ? 'display: none;' : ''}  
    }
  }
`;

function Col(props) {
  return (
    <StyledCol {...props} />
  );
}

let SizeType = React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]);

Col.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  /* Number of columns */
  xs: SizeType,
  sm: SizeType,
  md: SizeType,
  lg: SizeType,
  xlg: React.PropTypes.number,
  /* Offset by number of columns */
  xsOffset: React.PropTypes.number,
  smOffset: React.PropTypes.number,
  mdOffset: React.PropTypes.number,
  lgOffset: React.PropTypes.number,
  /* Hide in size range if true */
  xsHidden: React.PropTypes.bool,
  smHidden: React.PropTypes.bool,
  mdHidden: React.PropTypes.bool,
  lgHidden: React.PropTypes.bool,
  /*  */
  tagName: React.PropTypes.string,
  children: React.PropTypes.any
};

Col.defaultProps = {
  className: '',
  style: {},
  tagName: 'div',
  xsHidden: false,
  smHidden: false,
  mdHidden: false,
  lgHidden: false
};

export default Col;
