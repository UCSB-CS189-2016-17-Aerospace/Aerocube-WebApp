
import { fromJS } from 'immutable';
import logPageReducer from '../reducer';

describe('logPageReducer', () => {
  it('returns the initial state', () => {
    expect(logPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
