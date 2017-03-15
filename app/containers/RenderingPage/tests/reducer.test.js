
import { fromJS } from 'immutable';
import renderingPageReducer from '../reducer';

describe('renderingPageReducer', () => {
  it('returns the initial state', () => {
    expect(renderingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
