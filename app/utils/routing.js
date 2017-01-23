/**
 * Created by elswe on 1/3/2017.
 */

import ErrorGenerator from './errors';

export default class RouteGenerator {
  constructor() {
    throw ErrorGenerator.generate(ErrorGenerator.types.error,
      'routing.js',
      'RouteGenerator',
      'constructor',
      'RouteGenerator is Abstract, construction not allowed.'
    );
  }

  static generateRouteString = (route=RouteGenerator.routes.notFound, args=undefined) => {
    let argArray = undefined;
    if(args) {
      if(Array.isArray(args))
        argArray = args;
      else
        argArray = [args];
    }
    switch (route) {
      case RouteGenerator.routes.home:
        return '/';
      case RouteGenerator.routes.notFound:
        return '/404';
      default:
        throw new Error('Invalid route');
    }
  };
}

RouteGenerator.routes = {
  home: 'routes/HOME',
  notFound: 'routes/NOT_FOUND'
};
