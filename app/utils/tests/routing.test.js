/**
 * Created by elswe on 1/5/2017.
 */

import RouteGenerator from '../routing';

describe(RouteGenerator, () => {
  it('does not allow instantiation, throws error instead.', () => {
    const errorFunc = () => {
      const routeGenerator = new RouteGenerator();
    };

    expect(errorFunc).toThrow();
  });

  it('throws an error on route argument not from RouteGenerator.routes', () => {
    const testString = 'notAProperRoute';
    expect(Object.values(RouteGenerator.routes)).not.toContain(testString);
    const errorFunc = () => {
      RouteGenerator.generateRouteString(testString);
    };
    expect(errorFunc).toThrow();
  });

  it('does not throw an error on route argument from RouteGenerator.routes, returns string', () => {
    Object.values(RouteGenerator.routes).forEach((route) => {
      let routeString = undefined;
      const noErrorFunc = () => {
        routeString = RouteGenerator.generateRouteString(route);
      };
      expect(noErrorFunc).not.toThrow();
      expect(typeof routeString === 'string' || routeString instanceof String).toBeTruthy();
    });
  });

});