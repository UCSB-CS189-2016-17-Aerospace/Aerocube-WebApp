import { createSelector } from 'reselect';

/**
 * Direct selector to the logPage state domain
 */
const selectLogPageDomain = () => (state) => state.get('logPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LogPage
 */

const makeSelectLogPage = () => createSelector(
  selectLogPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectLogPage;
export {
  selectLogPageDomain,
};
