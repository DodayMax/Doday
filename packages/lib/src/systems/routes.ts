import { BASE_ROUTES, STACKED_ROUTES } from '../constants';
import { encodeQueryData } from '../utils';

export class DodayRoute {
  constructor(private _path: string) {}

  private _params = '';

  /**
   * Base routes of the doday app (not closable)
   */
  static base = {
    store: {
      page: new DodayRoute(`${BASE_ROUTES.store}`),
    },
    profile: {
      page: new DodayRoute(`${BASE_ROUTES.profile}`),
    },
  };

  /**
   * Stacked routes of the doday app
   * (pushed in navigation stack, closable)
   */
  static stacked = {
    dodays: {
      id: (id: string) => {
        return new DodayRoute(`${STACKED_ROUTES.dodays}/${id}`);
      },
    },
    progress: {
      id: (id: string) => {
        return new DodayRoute(`${STACKED_ROUTES.progress}/${id}`);
      },
    },
    builder: (tool: string) =>
      new DodayRoute(`${STACKED_ROUTES.builder}/${tool}`),
  };

  /**
   * Query params for the new route
   */
  public query = (params?: { [key: string]: string | number }) => {
    let paramsString = '';
    if (params) paramsString = `?${encodeQueryData(params)}`;

    this._params = paramsString;
  };

  /**
   * Parse new route to string
   */
  public toString = () => {
    return `${this._path}${this._params}`;
  };

  /**
   * Parse route from url to object
   * { path: string, params: { [key]: value } }
   */
  static parseRoute = (route: string) => {
    console.log(route);
    const parts = route.split('?');
    const base = parts[0];
    const params = {};
    console.log(parts);
    if (parts.length > 1) {
      const hashes = route.slice(route.indexOf('?') + 1).split('&');
      hashes.map(hash => {
        const [key, val] = hash.split('=');
        params[key] = decodeURIComponent(val);
      });
    }

    return {
      path: base,
      params,
    };
  };
}
