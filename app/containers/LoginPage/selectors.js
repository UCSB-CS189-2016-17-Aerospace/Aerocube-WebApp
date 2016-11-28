import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = () => (state) => state.get('loginPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginPage
 */

export const selectLoginPage = () => createSelector(
  selectLoginPageDomain(),
  (substate) => ((substate) ? (substate).toJS() : {})
);


export const selectEmail = () => createSelector(
  selectLoginPage(),
  (state) => state.email
);

export const selectPassword = () => createSelector(
  selectLoginPage(),
  (state) => state.password
);
