/*
 *
 * DashboardPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ADD_SCAN_DATA
} from './constants';

export const initialState = fromJS({
  corners: {},
  scans: [],
  markerIds: {},
  poses: {}
});

function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_SCAN_DATA:
      // Add scan ID
      let newState = state.set('scans', state.get('scans').push(Number(action.scanId)));
      // Add corners
      newState = newState.setIn(['corners', action.scanId], action.corners);
      newState = newState.setIn(['markerIds', action.scanId], action.markerIds);
      newState = newState.setIn(['poses', action.scanId], action.poses);
      return newState;
    default:
      return state;
  }
}

export default dashboardPageReducer;
