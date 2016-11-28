import expect from 'expect';
import { fromJS } from 'immutable';

import loginPageReducer from '../reducer';
import * as constants from '../constants';
import * as actions from '../actions';

let defaultEmail = '';
let defaultPassword = '';

describe('loginPageReducer', () => {
  it('returns the initial state when no action is matched', () => {
    expect(loginPageReducer(undefined, {})).toEqual(
      fromJS({
        email: defaultEmail,
        password: defaultPassword
      })
    );
  });

  it('updates email when an UPDATE_EMAIL action is matched', () => {
    const newTestEmail = 'newTestEmail@email.com';
    expect(loginPageReducer(undefined, actions.updateEmail(newTestEmail))).toEqual(
      fromJS({
        email: newTestEmail,
        password: defaultPassword
      })
    );
  });

  it('updates password when an UPDATE_PASSWORD action is matached', () => {
    const newTestPassword = 'newPassword';
    expect(loginPageReducer(undefined, actions.updatePassword(newTestPassword))).toEqual(
      fromJS({
        email: defaultEmail,
        password: newTestPassword
      })
    );
  });
});
