/**
 * Created by elswe on 1/5/2017.
 */

import ErrorGenerator, { validateErrorType } from '../errors';

describe(ErrorGenerator, () => {
  const testFileName = 'testFileName';
  const testClassName = 'testClassName';
  const testFunctionName = 'testFunctionName';
  const testMessage = 'testLogMessage';

  it('does not allow instantiation, throws error instead.', () => {
    const errorFunc = () => {
      const errorGenerator = new ErrorGenerator();
    };
    expect(errorFunc).toThrow();
  });

  it('throws an error on an invalid error type', () => {
    const invalidErrorType = 'notAValidErrorType';
    expect(Object.values(ErrorGenerator.types)).not.toContain(invalidErrorType);
    const errorFunc = () => {
      ErrorGenerator.generate(invalidErrorType, testFileName, testClassName, testFunctionName, testMessage);
    };
    expect(errorFunc).toThrow();
  });

  it('does not throw an error on any valid error type', () => {
    Object.values(ErrorGenerator.types).forEach((type) => {
      const errorFunc = () => {
        ErrorGenerator.generate(type, testFileName, testClassName, testFunctionName, testMessage);
      };
      expect(errorFunc).not.toThrow();
    });
  });

});

describe('validateErrorType', () => {
  it('throws an error on an invalid error type', () => {
    const invalidErrorType = 'notAValidErrorType';
    const errorFunc = () => {
      validateErrorType(invalidErrorType);
    };
    expect(errorFunc).toThrow();
  });

  it('does not throw an error on a valid error type', () => {
    const noErrorFunc = () => {
      Object.values(ErrorGenerator.types).forEach((type) => {
        validateErrorType(type);
      });
    };
    expect(noErrorFunc).not.toThrow();
  });
});
