/**
*
* A
*
*/

import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router';

import * as cssConstants from '../../constants/cssConstants';

/**
 * A javascript routing optimized 'a' tag
 *
 * Note: When used for javascript routing, this *does* handle ctrl-click or shift-click as a normal 'a' tag would
 * as long as the user's focus was on the browser application being used when ctrl or shift are pressed (for the key
 * event to be registered). These functions are handled via the react-router <Link /> Element
 *
 * Usage: Use props.href for standard HTML linking and use props.targetRoute for javascript routing in conjunction with
 * utils/Routes.js to keep instances of typed strings to one location.
 *
 */

const LinkStyle = css`
  cursor: pointer;
  text-decoration: none;
  color: ${cssConstants.colors.primary};
  transition: all 200ms ease-in-out;
  
  &:hover {
    text-decoration: none;
    color: ${cssConstants.colors.textMuted};
  }
  
  &:focus {
    outline: none;
  }
`;

const StyledLink = styled(Link)`${LinkStyle}`;

const StyledA = styled.a`${LinkStyle}`;

function A(props) {
  return props.targetRoute ? (
    <StyledLink className={props.className}
                id={props.id}
                onClick={props.onClick}
                to={props.targetRoute}>
      { props.children }
    </StyledLink>
    ) : (
    <StyledA
      className={props.className}
      id={ props.id }
      onClick={ props.onClick }
      href={ props.href ? props.href : props.targetRoute }>
      { props.children }
    </StyledA>
  );
}

A.propTypes = {
  /* Props from Parent */
  children: React.PropTypes.node,
  // Target
  targetRoute: React.PropTypes.string,
  href: React.PropTypes.string,
  // Behavior
  onClick: React.PropTypes.func,
  // Styles
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  style: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array])
};

A.defaultProps = {
  targetRoute: null,
  href: null,
  className: '',
  id: '',
  onClick: () => {}
};


export default A;
