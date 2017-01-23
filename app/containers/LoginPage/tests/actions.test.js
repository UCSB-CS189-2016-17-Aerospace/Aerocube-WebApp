
import * as actions from '../actions';
import * as constants from '../constants';

describe('LoginPage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: constants.DEFAULT_ACTION,
      };
      expect(actions.defaultAction()).toEqual(expected);
    });
  });

  describe('UpdateEmail Action', () => {
    it('has a type of UPDATE_EMAIL', () => {
      expect(actions.updateEmail('').type).toEqual(constants.UPDATE_EMAIL);
    });

    it('passes an unchanged email parameter on to the created action', () => {
      const newTestEmail = 'thisTestEmail';
      expect(actions.updateEmail(newTestEmail).email).toEqual(newTestEmail)
    });
  });

  describe('UpdatePassword Action', () => {
    it('has a type of UPDATE_PASSWORD', () => {
      expect(actions.updatePassword('').type).toEqual(constants.UPDATE_PASSWORD);
    });

    it('passes an unchanged email parameter on to the created action', () => {
      const newTestPassword = 'badPasswordForTesting';
      expect(actions.updateEmail(newTestPassword).email).toEqual(newTestPassword)
    });
  })
});
