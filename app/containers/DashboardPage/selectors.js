import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardPage state domain
 */
export const selectDashboardPageDomain = () => (state) => state.get('dashboardPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardPage
 */

export const makeSelectDashboardPage = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.toJS()
);

export const makeSelectScanIds = () => createSelector(
  makeSelectDashboardPage(),
  (state) => state.scanIds
);

export const makeSelectMarkers = () => createSelector(
  makeSelectDashboardPage(),
  (state) => state.markers
);

export default makeSelectDashboardPage;
