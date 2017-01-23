/**
 * Created by elswe on 1/5/2017.
 */

import Logger, { writeToConsole, validateLoggerLevel } from '../logs';

describe(Logger, () => {
  it('does not allow instantiation, throws error instead.', () => {
    const errorFunc = () => {
      const logger = new Logger();
    };
    expect(errorFunc).toThrow();
  });

  describe(Logger.log, () => {
    it('correctly constructs a log string', () => {
      const testLogMessage = 'testLogMessage';
      Object.values(Logger.levels).forEach((level) => {
        const loggedString = Logger.log(level, testLogMessage);
        expect(loggedString).toContain(testLogMessage);
        expect(loggedString).toContain(level);
      });
    });
  });

  describe(Logger.detailLog, () => {
    const testLogFileName = 'testFileName';
    const testLogClassName = 'testClassName';
    const testLogFunctionName = 'testFunctionName';
    const testLogMessage = 'testLogMessage';

    it('correctly constructs a log string', () => {
      const loggedString = Logger.detailLog(Logger.levels.info, testLogFileName, testLogClassName, testLogFunctionName, testLogMessage);
      expect(loggedString).toContain(testLogFileName);
      expect(loggedString).toContain(testLogClassName);
      expect(loggedString).toContain(testLogFunctionName);
      expect(loggedString).toContain(testLogMessage);
      expect(loggedString).toEqual(`${Logger.levels.info} in ${testLogFileName}.${testLogClassName}.${testLogFunctionName}: ${testLogMessage}`);
    });

    it('correctly constructs a log string without a className provided', () => {
      const loggedString = Logger.detailLog(Logger.levels.info, testLogFileName, undefined, testLogFunctionName, testLogMessage);
      expect(loggedString).toContain(testLogFileName);
      expect(loggedString).not.toContain(testLogClassName);
      expect(loggedString).toContain(testLogFunctionName);
      expect(loggedString).toContain(testLogMessage);
      expect(loggedString).toEqual(`${Logger.levels.info} in ${testLogFileName}.${testLogFunctionName}: ${testLogMessage}`)
    });

    it('correctly applies the proper levels to the log string', () => {
      Object.values(Logger.levels).forEach((level) => {
        const loggedString = Logger.detailLog(level, testLogFileName, testLogClassName, testLogFunctionName, testLogMessage);
        expect(loggedString).toContain(level);
      });
    });
  });
});

describe('writeToConsole', () => {
  const testLogString = 'testLogString';

  beforeEach(() => {
    console.log = jasmine.createSpy("log");
    console.warn = jasmine.createSpy("warn");
    console.error = jasmine.createSpy("error");
  });

  it('handles levels.info and levels.debug with a console.log call', () => {
    writeToConsole(Logger.levels.info, testLogString);
    expect(console.log).toHaveBeenCalled();
    writeToConsole(Logger.levels.debug, testLogString);
    expect(console.log).toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('handles levels.warn with a console.warn call', () => {
    writeToConsole(Logger.levels.warning, testLogString);
    expect(console.log).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('handles levels.error with a console.error call', () => {
    writeToConsole(Logger.levels.error, testLogString);
    expect(console.log).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });
});

describe('validateLoggerLevel', () => {
  it('throws an error on level argument not from Logger.levels', () => {
    const invalidLevelString = 'notAProperLevel';
    expect(Object.values(Logger.levels)).not.toContain(invalidLevelString);
    const errorFunc = () => {
      validateLoggerLevel(invalidLevelString);
    };
    expect(errorFunc).toThrow();
  });
});
