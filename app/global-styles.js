import { injectGlobal } from 'styled-components';
import * as cssConstants from './constants/cssConstants';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: ${cssConstants.colors.lightBackground};
  }

  body {
    font-family: ${cssConstants.bodyFont};
  }

  body.fontLoaded {
    font-family: ${cssConstants.bodyFont};
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
  
  .app-content {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    padding: 0;
    width: 100%;
  }
  
  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  a {
    font-family: ${cssConstants.headerFont}
  ;

  p,
  label {
    font-family: ${cssConstants.bodyFont};
    line-height: 1.5em;
    font-weight: ${cssConstants.weights.bodyThin};
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
