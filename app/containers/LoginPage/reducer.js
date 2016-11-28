/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  email: '',
  password: ''
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case constants.DEFAULT_ACTION:
      return state;
    case constants.UPDATE_EMAIL:
      // Standard way of updating the immutable
      return state.set('email', action.email);
    case constants.UPDATE_PASSWORD:
      // Alternate way of doing it, probably slower, may be necessary for complex operations
      let js = (state).toJS();
      js.password = action.password;
      return fromJS(js);
    default:
      return state;
  }
}

export default loginPageReducer;
