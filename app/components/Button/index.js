/**
 *
 * Button.react.js
 *
 * A common button wrapped by an A component.
 */

import React from 'react';
import styled from 'styled-components';

import A from '../A/index.js';

import * as cssConstants from '../../constants/cssConstants';

const StyledButton = styled.button`
  user-select: none;
  border-radius: 2px;
  border: none;
  padding: 1em 2em;
  cursor: pointer;
  box-shadow: ${props => props.shadow ? cssConstants.lightShadow : 'none'};
  background: ${props => (props.color != false) ? props.color : cssConstants.colors.lightBackground};
  color: ${props => (props.color != false) ? cssConstants.colors.textLight : cssConstants.colors.text};
  transition: all 200ms ease-in-out;
  
  &:hover {
    filter: brightness(95%);
  }
`;

function Button(props) {

  return (
    <A onClick={props.onClick}
       className={props.wrapperClassName}
       type=""
       targetRoute={props.targetRoute}
       href={props.href}>
      <StyledButton className={props.className}
                    style={props.style}
                    color={props.color}
                    type={props.type}
                    disabled={props.disabled}
                    shadow={props.shadow}>
        { props.children }
      </StyledButton>
    </A>
  );
}

Button.propTypes = {
  // From Parent
  children: React.PropTypes.node,
  // Target
  targetRoute: React.PropTypes.string,
  href: React.PropTypes.string,
  // Behavior
  onClick: React.PropTypes.func,
  type: React.PropTypes.oneOf([
    'submit',
    'reset',
    'button',
    'menu'
  ]),
  disabled: React.PropTypes.bool,
  // Styles
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  wrapperClassName: React.PropTypes.string,
  shadow: React.PropTypes.bool,
  color: React.PropTypes.oneOf([
    cssConstants.colors.primary,
    cssConstants.colors.secondary,
    cssConstants.colors.tertiary,
    false
  ])

};

Button.defaultProps = {
  children: null,
  targetRoute: null,
  href: null,
  onClick: () => {},
  type: 'button',
  disabled: false,
  style: {},
  className: '',
  wrapperClassName: '',
  shadow: false,
  color: false
};

export default Button;
