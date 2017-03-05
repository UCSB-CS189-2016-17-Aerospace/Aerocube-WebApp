/*
 *
 * DashboardPage reducer
 *
 */

import { fromJS } from 'immutable';
import React from 'react';
import {
  DEFAULT_ACTION,
  ADD_SCAN_DATA
} from './constants';

export const initialState = fromJS({
  scanIds: [],
  markers: {}
});

export const markersReactShape = React.PropTypes.shape({
  markerUniqueIds: React.PropTypes.arrayOf(React.PropTypes.string),
  cubeIds: React.PropTypes.objectOf(React.PropTypes.number),
  cubeFaceIds: React.PropTypes.objectOf(React.PropTypes.number),
  corners: React.PropTypes.objectOf(React.PropTypes.array),
  distances: React.PropTypes.objectOf(React.PropTypes.number),
  quaternions: React.PropTypes.objectOf(React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    z: React.PropTypes.number,
    w: React.PropTypes.number
  }))
});

function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_SCAN_DATA:
      // Add scan ID
      let newState = state.set('scanIds', state.get('scanIds').concat([Number(action.scanId)]).slice(-3));
      // Add corners
      newState = newState.setIn(['markers', action.scanId], action.markers);
      return newState;
    default:
      return state;
  }
}

export default dashboardPageReducer;
