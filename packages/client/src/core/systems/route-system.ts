import { RouteConfig } from '@doday/lib';

export class RouteSystem {
  protected static _instance: RouteSystem;

  constructor() {
    if (RouteSystem._instance) {
      throw new Error(
        'Instantiation failed: ' +
          'use RouteSystem.getInstance() instead of new.'
      );
    }
    RouteSystem._instance = this;
  }

  private _registeredRoutes: { [key: string]: RouteConfig } = {};

  /**
   * Registered routes
   */
  public get routes() {
    return this._registeredRoutes;
  }

  /**
   * Register new routes in the system
   */
  public registerRoutes = (routes?: RouteConfig[]) => {
    if (!routes) return;
    routes.forEach(route => {
      this._registeredRoutes = {
        ...this._registeredRoutes,
        [route.sysname]: route,
      };
    });
  };

  public test = (path: string): RouteConfig | undefined => {
    const matchedRoutes: RouteConfig[] = [];
    Object.values(this._registeredRoutes).forEach(route => {
      if (route.pattern.test(path)) {
        matchedRoutes.push(route);
      }
    });
    if (matchedRoutes.length) {
      return matchedRoutes[0];
    }
    return;
  };

  public static api(): RouteSystem {
    if (RouteSystem._instance) {
      return RouteSystem._instance;
    }
    return (RouteSystem._instance = new RouteSystem());
  }
}
