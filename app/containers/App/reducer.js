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
  navOpen: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case constants.TOGGLE_NAV:
      return state.set('navOpen', action.open);
    default:
      return state;
  }
}

export default appReducer;
