import { createSelector } from 'reselect';

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

/**
 * The global state selectors
 */

export const selectGlobalDomain = () => (state) => state.get('global');

export const selectGlobal = () => createSelector(
  selectGlobalDomain(),
  (state) => state.toJS()
);

export const selectNavOpen = () => createSelector(
  selectGlobal(),
  (state) => state.navOpen
);

export const selectPageWidth = () => createSelector(
  selectGlobal(),
  (state) => state.pageWidth
);

export const selectPageHeight = () => createSelector(
  selectGlobal(),
  (state) => state.pageHeight
);

export const selectBodyWidth = () => createSelector(
  selectGlobal(),
  (state) => state.bodyWidth
);

export const selectBodyHeight = () => createSelector(
  selectGlobal(),
  (state) => state.bodyHeight
);

export {
  selectLocationState,
};
