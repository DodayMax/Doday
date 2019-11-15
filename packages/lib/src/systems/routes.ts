import { encodeQueryData } from '../utils';
import { ModuleSysname } from './modules';

export class DodayRoute {
  constructor(private _base: string) {
    this._path = `/${this._base}`;
    this._parts.push(`/${this._base}`);
  }

  private _path = '';

  private _parts: string[] = [];

  private _params: { [key: string]: string } | undefined;

  private _queryParams: { [key: string]: string } | undefined;
  private _queryParamsString: string = '';

  private _payload: any;

  /**
   * Add another static part of the route
   */
  public part = (part: string) => {
    this._path += `/${part}`;
    this._parts.push(`${part}`);
    return this;
  };

  /**
   * Set params for new route
   */
  public params = (params?: { [key: string]: string }) => {
    let paramsString = '';
    if (params) {
      paramsString = `${Object.values(params)
        .map(param => param.toLowerCase())
        .join('/')}`;
      this._path += `/:${Object.keys(params).join('/:')}`;
    }
    this._params = {
      ...this.params,
      ...params,
    };
    this._parts.push(paramsString);
    return this;
  };

  /**
   * Query params for the new route
   */
  public query = (query?: { [key: string]: string }) => {
    let queryParamsString = '';
    if (query) queryParamsString = `?${encodeQueryData(query)}`;
    this._queryParams = query;
    this._queryParamsString = queryParamsString;
    return this;
  };

  /**
   * Attach payload to the route object
   */
  public payload = (payload?: any) => {
    if (payload) {
      this._payload = payload;
    }
    return this;
  };

  /**
   * Parse new route to `Route` object
   */
  public build = (): Route => {
    return {
      path: this._path,
      base: this._base,
      params: this._params,
      query: this._queryParams,
      payload: this._payload,
      url: `${this._parts.join('/')}${this._queryParamsString}`,
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
  /**
   * Sysname of the new route
   */
  sysname: string;
  /**
   * Path for the new route, for example `/dodays/:id/details`
   */
  path: string;
  /**
   * Type of the new route - Base, Stacked or Sidebar
   */
  type: RouteType;
  /**
   * RegExp object to test route for compliance
   */
  pattern: RegExp;
  /**
   * Helper function to create `Route` to use it for navigation
   */
  create: (...params: string[]) => DodayRoute;
  /**
   * Helper function to parse some url to this Route object
   */
  parse: (path: string) => Route;
  /**
   * Sysname of the Module that provides this route
   */
  provider: ModuleSysname;
}

export interface Route {
  path: string;
  base: string;
  params?: { [key: string]: string };
  query?: { [key: string]: string };
  payload?: any;
  url: string;
}

export enum RouteSysname {
  Store = 'store',
  Profile = 'profile',
  Activities = 'activities',
  DodayDetails = 'doday.details',
  DodayProgress = 'doday.progress',
  DodayBuilder = 'doday.builder',
  Welcome = 'welcome',
}

export enum RouteType {
  Base = 'base',
  Stacked = 'stacked',
  Sidebar = 'sidebar',
}
