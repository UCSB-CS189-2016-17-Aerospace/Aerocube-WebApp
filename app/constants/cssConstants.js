import { keyframes } from 'styled-components';

/** Sizes **/

export const navbarHeight = 60;

export const footerHeight = 35;

export const leftNavWidth = 200;

/** Color **/

const primaryColor = '#623C65';

const secondaryColor = '#03cabb';

const tertiaryColor = '';

const lightBackgroundColor = '#fdfdfd';

const darkBackgroundColor = 'darkslategray';

const blackBackgroundColor = '#191a19';

const textColor = 'darkslategray';

const textMutedColor = 'lightgray';

const textLightColor = 'white';

export const colors = {
  primary: primaryColor,
  secondary: secondaryColor,
  tertiary: tertiaryColor,
  lightBackground: lightBackgroundColor,
  darkBackground: darkBackgroundColor,
  blackBackground: blackBackgroundColor,
  text: textColor,
  textMuted: textMutedColor,
  textLight: textLightColor
};

/** Font Weights **/

const headerThinWeight = 200;

const headerNormalWeight = 500;

const headerThickWeight = 700;

const bodyNormalWeight = 200;

const bodyThickWeight = 500;

const bodyThickerWeight = 700;

export const weights = {
  headerThin: headerThinWeight,
  headerNormal: headerNormalWeight,
  headerThick: headerThickWeight,
  bodyNormal: bodyNormalWeight,
  bodyThick: bodyThickWeight,
  bodyThicker: bodyThickerWeight
};

/** Fonts **/

export const serifFont = `'Lora', Georgia, Times, 'Times New Roman', serif`;

export const sansSerifFont = `'Catamaran', 'Helvetica Neue', Helvetica, Arial, sans-serif`;

export const monospaceFont = `'Source Code Pro', monospace`;

export const bodyFont = serifFont;

export const headerFont = sansSerifFont;


/** Misc **/

export const lightShadow = `rgba(0, 0, 0, 0.117647) 0 1px 6px, rgba(0, 0, 0, 0.117647) 0 1px 4px`;

export const lightenDiv = `inset 0 0 100px 100px rgba(255, 255, 255, 0.1)`;

/** Keyframes **/

const fadeInKeyframe = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const fadeOutKeyframe = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

export const animationKeyframes = {
  fadeIn: fadeInKeyframe,
  fadeOut: fadeOutKeyframe
};

export const animations = {
  fadeIn: `${fadeInKeyframe} 500ms ease-in-out forwards!important`,
  fadeOut: `${fadeInKeyframe} 500ms ease-in-out forwards!important`
};
