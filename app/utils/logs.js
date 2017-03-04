
import ErrorGenerator from './errors';

/**
 *
 * @param level
 */
export const validateLoggerLevel = (level) => {
  if (!Object.values(Logger.levels).includes(level)) {
    throw ErrorGenerator.generate(ErrorGenerator.types.error,
      'errors',
      Logger.toString(),
      'generate',
      'Level parameter does not match types in Logger.levels'
    );
  }
};

/**
 *
 * @param level
 * @param logString
 */
export const writeToConsole = (level, logString) => {
  validateLoggerLevel(level);
  switch(level) {
    case Logger.levels.info:
    case Logger.levels.debug:
      console.log(logString);
      break;
    case Logger.levels.warning:
      console.warn(logString);
      break;
    case Logger.levels.error:
      console.error(logString);
      break;
    default:
      throw ErrorGenerator.generate(ErrorGenerator.types.error,
        'logKeys.js',
        'Logger',
        'log',
        'All Logger.levels cases should be handled explicitly.')
  }
};

/**
 *
 */
export default class Logger {
  constructor() {
    throw ErrorGenerator.generate(ErrorGenerator.types.error,
      'logKeys.js',
      'Logger',
      'constructor',
      'Logger is Abstract, construction not allowed.'
    );
  }

  /**
   *
   * @param level
   * @param message
   */
  static log(level, message) {
    const logString = `${level}: ${message}`;
    writeToConsole(level, logString);
    return logString;
  }

  /**
   *
   * @param level
   * @param fileName
   * @param className
   * @param functionName
   * @param message
   * @param displayTime
   */
  static detailLog(level=Logger.levels.info, fileName, className=null, functionName, message, displayTime=false) {
    let location = `${fileName}.`;
    // Add className if exists
    if (className) {
      location += `${className}.`;
    }
    let timingString = displayTime ? ` at ${Date.now()}` : '';
    let logString = `${level} in ${location}${functionName}: ${message}${timingString}`;
    writeToConsole(level, logString);
    return logString;
  }
}

Logger.levels = {
  info: 'INFO',
  debug: 'DEBUG',
  warning: 'WARN',
  error: 'ERR'
};
