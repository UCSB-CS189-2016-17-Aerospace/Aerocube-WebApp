import { createSelector } from 'reselect';

/**
 * Direct selector to the uploadForm state domain
 */
const selectUploadFormDomain = () => (state) => state.get('uploadForm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UploadForm
 */

const selectUploadForm = () => createSelector(
  selectUploadFormDomain(),
  (substate) => substate.toJS()
);

export default selectUploadForm;
export {
  selectUploadFormDomain,
};
