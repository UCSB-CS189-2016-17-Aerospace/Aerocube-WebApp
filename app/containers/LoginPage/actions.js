/*
 *
 * LoginPage actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function updateEmail(email) {
  return {
    type: constants.UPDATE_EMAIL,
    email: email
  }
}

export function updatePassword(password) {
  return {
    type: constants.UPDATE_PASSWORD,
    password: password
  }
}
