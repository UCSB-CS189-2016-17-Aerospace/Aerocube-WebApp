
import React from 'react';

import QueryTuple, { isQueryString } from '../mediaQueries';

describe(QueryTuple, () => {
  it('may be constructed with an array or string', () => {
    const noErrorFunc = () =>  {
      const testQueryTuple = new QueryTuple('testString');
      const testQueryTuple2 = new QueryTuple(['testString1', 'testString2']);
    };
    expect(noErrorFunc).not.toThrow();
  });

  it('may not be constructed with an array containing non-string elements or a non-string object', () => {
    const errorFunc = () => {
      const testQueryTuple = new QueryTuple(2);
    };
    expect(errorFunc).toThrow();

    const errorFunc2 = () => {
      const testQueryTuple = new QueryTuple(['asdf', 0]);
    };
    expect(errorFunc2).toThrow();
  });

  it('properly constructs a string from its constructor arguments', () => {
    const queryString = 'testQueryString';
    const ruleString = 'ruleString';

    const queryTuple = new QueryTuple(queryString, ruleString);
    expect(queryTuple.toString()).toContain('@media');
    expect(queryTuple.toString()).toContain(queryString);
    expect(queryTuple.toString()).toContain(ruleString);
  });

  it('does not contain \'and\' unless there are multiple queryStrings', () => {
    const queryStrings = ['testQueryString1', 'testQueryString2'];
    const ruleString = 'ruleString';
    const queryTuple = new QueryTuple(queryStrings, ruleString);
    expect(queryTuple.toString()).toContain('and');
    const queryString = 'testQueryString';
    const queryTuple2 = new QueryTuple(queryString, ruleString);
    expect(queryTuple2.toString()).not.toContain('and');
  });
});

describe(isQueryString, () => {
  it('is truthy if the queryStrings parameter is a string', () => {
    const isQueryStringResult = isQueryString('a string');
    expect(isQueryStringResult).toBeTruthy();
  });

  it('is truthy if the queryStrings parameter is an array of strings', () => {
    const isQueryStringResult = isQueryString(['a string', 'another string']);
    expect(isQueryStringResult).toBeTruthy();
  });

  it('is falsy if the queryStrings parameter is an array containing any non-string elements', () => {
    const isQueryStringResult = isQueryString(['a string', 0]);
    expect(isQueryStringResult).toBeFalsy();
  });

  it('is falsy if the queryStrings parameter is not a string or array of strings', () => {
    const isQueryStringResult = isQueryString(0);
    expect(isQueryStringResult).toBeFalsy();
  });
});
