/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';

import background from './stardust.png';

const WrappingArticle = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: rgba(0,0,0,0.2);
  background: url('./stardust.png') repeat;
`;

const Header = styled.h1`
  font-weight: 500;
  font-size: 4em;
  color: whitesmoke;
  text-align: center;
`;

const SubHeader = styled.div`
  color: whitesmoke;
  font-size: 1.5em;
  font-weight: 300;
`;

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <WrappingArticle
               style={{background: `url(${background}) repeat`}}>
        <Header>
          Your Fire Nation
        </Header>
        <SubHeader>
          Isn't this pretty?
        </SubHeader>
      </WrappingArticle>
    );
  }
}
