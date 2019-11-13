import _ from 'lodash';
import { auth } from './firebase';

export const API_URL = 'http://localhost:5000/api';

export interface Headers {
  [key: string]: string;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class APIServiceClass {
  constructor(
    private _authToken?: string,
    private _exp?: number,
    private _defaultLng?: string
  ) {
    this._updateTokenDaemon();
  }

  private _current?: APIRequest;
  private _inProgress: boolean = false;

  public getNewExp = async () => {
    const newExp = await this.request()
      .json()
      .get(`${API_URL}/user/token/exp`);
    this._exp = newExp;
  };

  public isAuthorized = () => {
    return !this._needUpdateToken();
  };

  public request = (): APIRequest => {
    this._current = new APIRequest(this.defaultHeaders());
    return this._current;
  };

  private _updateTokenDaemon = async () => {
    this._updateToken();
    setTimeout(() => {
      this._updateTokenDaemon();
    }, 1000 * 60);
  };

  private _updateToken = async () => {
    if (!this._needUpdateToken() || this._inProgress) return;
    this.updateToken(true);
  };

  public updateToken = async (force: boolean) => {
    this._inProgress = true;
    if (auth.currentUser) {
      const newToken = await auth.currentUser.getIdToken(force);
      this.token = newToken;
      this.getNewExp();
    }
    this._inProgress = false;
  };

  private _needUpdateToken = (): boolean | undefined => {
    const exp = () => {
      const date = new Date(0);
      return this._exp && date.setUTCSeconds(this._exp);
    };
    if (exp) {
      const diff = exp()! - Date.now();
      return !isNaN(diff) && diff / 1000 / 60 < 10;
    }
    return;
  };

  private defaultHeaders() {
    const defaultHeaders = {
      'Accept-Language': this._defaultLng || 'en',
    };
    if (this._updateToken) this._updateToken();
    if (this._authToken) {
      defaultHeaders['Authorization'] = `Bearer ${this._authToken}`;
    }
    return defaultHeaders;
  }

  set token(newAuthToken: string | undefined) {
    this._authToken = newAuthToken;
  }

  get token(): string | undefined {
    return this._authToken;
  }

  set defaultLng(lng: string) {
    this._defaultLng = lng;
  }
}

export const APIService = new APIServiceClass();

export class APIRequest {
  constructor(headers: Headers) {
    this._headers = headers;
  }

  private _headers: Headers;
  private _isPureRequest: boolean = false;

  public headers(headers: Headers): APIRequest {
    this._headers = {
      ...this._headers,
      ...headers,
    };
    return this;
  }

  public json(): APIRequest {
    this._headers = {
      ...this._headers,
      'Content-type': 'application/json',
      Accept: 'application/json',
    };
    return this;
  }

  public pure(): APIRequest {
    this._isPureRequest = true;
    return this;
  }

  public get(endpoint: string) {
    const request = this.request('GET');
    return this.makeRequest(endpoint, request);
  }

  public post<T>(endpoint: string, body: T) {
    const request = this.request('POST', body);
    return this.makeRequest(endpoint, request);
  }

  public put<T>(endpoint: string, body: T) {
    const request = this.request('PUT', body);
    return this.makeRequest(endpoint, request);
  }

  public delete<T>(endpoint: string, body: T) {
    const request = this.request('DELETE', body);
    return this.makeRequest(endpoint, request);
  }

  private request<T>(method: Method, body?: T): RequestInit {
    return {
      method,
      headers: this.normalizeHeaders(),
      body:
        body &&
        (typeof body !== 'string' && !(body instanceof FormData)
          ? JSON.stringify(body)
          : body),
    };
  }

  private makeRequest = (endpoint: string, request: RequestInit) => {
    return this._isPureRequest
      ? fetch(endpoint, request)
      : fetch(endpoint, request)
          .then(res => {
            return res.json();
          })
          .catch(error => error);
  };

  private normalizeHeaders() {
    const normalizedHeaders = [];
    for (const key in this._headers) {
      normalizedHeaders.push([key, this._headers[key]]);
    }
    return normalizedHeaders;
  }
}

export const createAPIUrl = (params?: any) => ({
  auth: {
    signin: `${API_URL}/auth/signin`,
    me: `${API_URL}/auth/me`,
  },
  dodays: {
    get: `${API_URL}/nodes?labels=Module`,
  },
});
