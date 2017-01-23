import { injectGlobal } from 'styled-components';
import * as cssConstants from './constants/cssConstants';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-weight: 200;
  }

  body.fontLoaded {
    font-family: ${cssConstants.sansSerifFont};
  }

  #app {
    background-color: ${cssConstants.colors.lightBackground};
    min-height: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    > div {
      min-height: 100%;
      min-width: 100%;
      display: flex;
      flex-direction: column;
      flex-grow: 100;
    }
  }
  
  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  p,
  label {
    font-family: ${cssConstants.serifFont};
    line-height: 1.5em;
    font-weight: 200;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  label,
  img, 
  svg, {
    user-select: none;
  }
  
  button, 
  img, 
  svg, 
  a {
    transition: all 200ms ease-in-out;
  }
  
  /* Fade-in Images */
  img, svg {
    animation: ${cssConstants.animationKeyframes.fadeIn} 500ms ease-in-out forwards!important;
  }
  
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar:hover {
    display: inherit;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 3px lightgray;
    background: whitesmoke;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #d4d4d4;
    transition: background 200ms;
    opacity: 0.8;
  }
  
  ::-webkit-scrollbar-thumb:window-inactive {
    background: lightgray;
  }

`;
