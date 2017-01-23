/**
 * Created by elswe on 1/1/2017.
 */

export const validateErrorType = (type) => {
  if(!Object.values(ErrorGenerator.types).includes(type)) {
    throw ErrorGenerator.generate(ErrorGenerator.types.error,
      'errors',
      ErrorGenerator.toString(),
      'generate',
      'Type parameter does not match types in ErrorGenerator.types');
  }
};

export default class ErrorGenerator {
  constructor() {
    throw ErrorGenerator.generate(ErrorGenerator.types.error,
      'errors.js',
      'ErrorGenerator',
      'constructor',
      'ErrorGenerator is Abstract, construction not allowed.'
    );
  }

  /**
   *
   * @param type
   * @param fileName
   * @param className
   * @param functionName
   * @param message
   * @param displayTime
   * @returns {Error}
   */
  static generate(type=ErrorGenerator.types.error, fileName, className=null, functionName, message, displayTime=false) {
    validateErrorType(type);
    let location = `${fileName}.`;
    // Add className if exists
    if(className) {
      location += `${className}.`;
    }
    let timingString = displayTime ? ` at ${Date.now()}` : '';
    let errorString = `${type} in ${location}${functionName}: ${message}${timingString}`;

    return new Error(errorString)
  }
}

ErrorGenerator.types = {
  warning: 'WARN',
  error: 'ERR'
};