/**
*
* Row
*
*/

import React from 'react';
import styled from 'styled-components';
import { Row as FlexboxRow } from 'react-flexbox-grid';

import { xs, sm, md, lg } from 'constants/cssQueries';

const StyledRow = styled(FlexboxRow)`
  && {
    margin: 0;
  }
`;

function Row(props) {
  return (
    <StyledRow {...props} />
  );
}

Row.xs = 'xs';
Row.sm = 'sm';
Row.md = 'md';
Row.lg = 'lg';

let ModifierType = React.PropTypes.oneOf([Row.xs, Row.sm, Row.md, Row.lg]);

Row.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  reverse: React.PropTypes.bool,
  start: ModifierType,
  center: ModifierType,
  end: ModifierType,
  top: ModifierType,
  middle: ModifierType,
  bottom: ModifierType,
  around: ModifierType,
  between: ModifierType,
  first: ModifierType,
  last: ModifierType,
  tagName: React.PropTypes.string,
  children: React.PropTypes.any
};

Row.defaultProps = {
  className: '',
  style: {},
  reverse: false,
  tagName: 'div'
};

export default Row;
