import ErrorGenerator from './errors';

export default class QueryTuple {
  constructor(queryStrings, ruleString) {
    if(!isQueryString(queryStrings)) {
      throw generateQueryStringsError()
    }
    this.queries = Array.isArray(queryStrings) ? queryStrings : [queryStrings];
    this.rules = ruleString;
  }

  toString() {
    let queries = '';
    this.queries.forEach((query, index, array) => {
      queries += `(${query})`;
      if(index != array.length - 1) {
        queries += ' and '
      }
    });
    return `@media ${queries} {${this.rules}}`;
  }

}

/**
 *
 * @param queryStrings
 * @returns {boolean|*}
 */
export const isQueryString = (queryStrings) => {
  return typeof queryStrings === 'string' || (
      Array.isArray(queryStrings) &&
      queryStrings.every((element) => {
        return typeof element === 'string'
      })
    );
};

export const generateQueryStringsError = () => ErrorGenerator.generate(ErrorGenerator.types.error,
  'cssMediaQueries',
  'QueryTuple',
  'Constructor',
  'Not a query tuple'
);

