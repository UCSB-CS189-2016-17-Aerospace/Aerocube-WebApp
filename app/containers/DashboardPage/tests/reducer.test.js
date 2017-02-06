
import { fromJS } from 'immutable';
import dashboardPageReducer, {initialState} from '../reducer';

describe('dashboardPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardPageReducer(undefined, {})).toEqual(initialState);
  });
});
