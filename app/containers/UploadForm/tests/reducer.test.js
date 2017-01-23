
import uploadFormReducer from '../reducer';
import { fromJS } from 'immutable';

describe('uploadFormReducer', () => {
  it('returns the initial state', () => {
    expect(uploadFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
