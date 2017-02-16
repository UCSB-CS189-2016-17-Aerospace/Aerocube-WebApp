import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardPage state domain
 */
const selectDashboardPageDomain = () => (state) => state.get('dashboardPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardPage
 */

const makeSelectDashboardPage = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.toJS()
);

const makeSelectScanIds = () => createSelector(
  makeSelectDashboardPage(),
  (state) => state.scans
);

const makeSelectScanCorners = (id=undefined) => createSelector(
  makeSelectDashboardPage(),
  (state) => id ? state.corners[id] : state.corners
);

const makeSelectScanMarkerIds = (id=undefined) => createSelector(
  makeSelectDashboardPage(),
  (state) => id ? state.markerIds[id] : state.markerIds
);

const makeSelectScanPoses = (id=undefined) => createSelector(
  makeSelectDashboardPage(),
  (state) => id ? state.poses[id] : state.poses
);


export default makeSelectDashboardPage;
export {
  selectDashboardPageDomain,
  makeSelectScanIds,
  makeSelectScanCorners,
  makeSelectScanMarkerIds,
  makeSelectScanPoses
};
