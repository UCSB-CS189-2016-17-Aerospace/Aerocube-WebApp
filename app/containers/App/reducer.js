/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import * as constants from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  navOpen: false,
  pageHeight: 0,
  pageWidth: 0,
  bodyHeight: 0,
  bodyWidth: 0
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATE_VIEW_SIZES: {
      return state.set('pageHeight', action.height)
        .set('pageWidth', action.width)
        .set('bodyHeight', action.bodyHeight)
        .set('bodyWidth', action.bodyWidth);
    }
    case constants.TOGGLE_NAV:
      return state.set('navOpen', action.open);
    default:
      return state;
  }
}

export default appReducer;
