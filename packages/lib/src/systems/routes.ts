import { encodeQueryData } from '../utils';
import { ModuleSysname } from './modules';

export class DodayRoute {
  constructor(private _path: string) {}

  private _params: { [key: string]: string } | undefined;
  private _paramsString = '';

  /**
   * Query params for the new route
   */
  public query = (params?: { [key: string]: string }) => {
    let paramsString = '';
    if (params) paramsString = `?${encodeQueryData(params)}`;
    this._params = params;
    this._paramsString = paramsString;
  };

  /**
   * Parse new route to string
   */
  public build = (): Route => {
    return {
      path: this._path,
      params: this._params,
      url: `${this._path}${this._paramsString}`,
    };
  };
}

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

  private _registeredRoutes: { [key: string]: RouteModel } = {};

  /**
   * Registered routes
   */
  public get routes() {
    return this._registeredRoutes;
  }

  /**
   * Register new routes in the system
   */
  public registerRoutes = (routes?: RouteModel[]) => {
    if (!routes) return;
    routes.forEach(route => {
      this._registeredRoutes = {
        ...this._registeredRoutes,
        [route.sysname]: route,
      };
    });
  };

  public test = (path: string): RouteModel | undefined => {
    let matchedRoutes: RouteModel[] = [];
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

  public static getInstance(): RouteSystem {
    if (RouteSystem._instance) {
      return RouteSystem._instance;
    }
    return (RouteSystem._instance = new RouteSystem());
  }
}

const DodayRoutes = new RouteSystem();

export { DodayRoutes };

export interface RouteModel {
  sysname: string;
  path: string;
  type: RouteType;
  pattern: RegExp;
  create: (...params: string[]) => DodayRoute;
  parse: (path: string) => Route;
  provider: ModuleSysname;
}

export interface Route {
  path: string;
  params?: { [key: string]: string };
  query?: { [key: string]: string };
  payload?: any;
  url: string;
}

export enum RouteType {
  Base = 'base',
  Stacked = 'stacked',
  Sidebar = 'sidebar',
}
