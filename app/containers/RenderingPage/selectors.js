import { createSelector } from 'reselect';

/**
 * Direct selector to the renderingPage state domain
 */
const selectRenderingPageDomain = () => (state) => state.get('renderingPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RenderingPage
 */

const makeSelectRenderingPage = () => createSelector(
  selectRenderingPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRenderingPage;
export {
  selectRenderingPageDomain,
};
