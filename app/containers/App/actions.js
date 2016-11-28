/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import * as constants from './constants';

export function setNavOpen(open) {
  return {
  type: constants.TOGGLE_NAV,
    open
  };
}

export function updateViewSizes(width, height, bodyWidth, bodyHeight) {
  return {
    type: constants.UPDATE_VIEW_SIZES,
    width: width,
    height: height,
    bodyWidth: bodyWidth,
    bodyHeight: bodyHeight
  };
}