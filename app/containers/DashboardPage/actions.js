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

export function addScanData(scanVal) {
  let scanMarkerObjects = scanVal.SCAN_MARKERS;
  if(scanMarkerObjects === undefined)
    return {
      type: null
    };
  let markerUniqueIds = scanMarkerObjects.map((markerObject) => {
    return `${markerObject.aerocubeFace} - ${markerObject.aerocubeID}`;
  });
  let corners = {};
  let distances = {};
  let quaternions = {};
  let cubeIds = {};
  let cubeFaceIds = {};
  scanMarkerObjects.forEach((markerObject, index) => {
    corners[markerUniqueIds[index]] = markerObject.corners;
    distances[markerUniqueIds[index]] = markerObject.distance;
    quaternions[markerUniqueIds[index]] = markerObject.quaternion;
    cubeIds[markerUniqueIds[index]] = markerObject.aerocubeID;
    cubeFaceIds[markerUniqueIds[index]] = markerObject.aerocubeFace;
  });
  return {
    type: ADD_SCAN_DATA,
    scanId: scanVal.SCAN_ID,
    markers: {
      markerUniqueIds,
      corners,
      distances,
      quaternions,
      cubeIds,
      cubeFaceIds
    }
  }
}
