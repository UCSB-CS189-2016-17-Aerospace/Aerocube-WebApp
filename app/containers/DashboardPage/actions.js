/*
 *
 * DashboardPage actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_SCAN_DATA
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addScanData(scanId, corners, markerIds, poses) {
  return {
    type: ADD_SCAN_DATA,
    scanId,
    corners,
    markerIds,
    poses
  }
}
