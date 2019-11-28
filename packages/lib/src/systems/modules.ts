import { ReducersMapObject, AnyAction, Middleware } from 'redux';
import { NodeLabel } from '../models/nodes';
import { AnySpot, SpotObject } from './spots';
import { RouteModel, Route } from './routes';
import { RootState } from '../models';

/**
 * Type of Activity
 */

export enum ModuleSysname {
  Layout = 'layout',
  System = 'system',
  Auth = 'auth',
  Navigation = 'navigation',
  Toast = 'toast',
  Dialog = 'dialog',
  Topbar = 'topbar',
  StoreFilter = 'store-filter',
  StoreGrid = 'store-grid',
}

export enum ModuleType {
  Redux = 'redux',
  View = 'view',
}

export type ModuleConfig<Spot> = {
  /**
   * Sysname of the module
   */
  sysname: ModuleSysname;
  /**
   * Type of the module
   */
  type: ModuleType;
  /**
   * Specify node for which the module has view
   */
  node?: NodeLabel;
  /**
   * Layout spot that the module uses
   */
  spot?: Spot;
  /**
   * If module has another modules in Dependencies
   */
  dependencies?: ModuleSysname[];
};

/** Module class */
export class ModuleObject<
  Spot = AnySpot,
  Actions = { [key: string]: () => AnyAction },
  Selectors = { [key: string]: (state: RootState) => any },
  State = any,
  ActionTypes extends AnyAction = AnyAction
> implements Dynamic {
  /**
   * Needed for the system to properly load modules
   */
  status!: {
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  };
  /**
   * Sysname and ModuleType for now
   */
  config!: ModuleConfig<Spot>;
  /**
   * Get view for module
   */
  getView?(): ModuleView;
  /**
   * If module provide interface to interact with it
   */
  acitons?: Actions;
  /**
   * If module provide some state to store data
   */
  selectors?: Selectors;
  /**
   * Redux dynamic module for this module
   * If you need manually plug this module to store or
   * this module doesn't have view with Redux module in
   * it's dependencies
   */
  getReduxModule?(): IModule<State, ActionTypes>;
  /**
   * Provided new instances for the System
   */
  provided?: {
    /**
     * New Routes to register in the System
     */
    routes?: RouteModel[];
    /**
     * New Spots provided by module for the System
     */
    spots?: SpotObject[];
  };
  /**
   * Translations for the module (if it needs them)
   */
  translations?: {
    [lang: string]: object;
  };
}

export interface Dynamic {
  status: {
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  };
}

export type WithRoute = {
  route: Route;
};

export interface ModuleView<P = any> {
  component: React.ComponentType<P>;
  dependencies: IModule<any>[];
}

export interface IModule<State = {}, Actions extends AnyAction = AnyAction> {
  /**
   * Id of the module
   */
  id: string;
  /**
   * Reducers for the module
   */
  reducerMap?: ReducersMapObject<State, Actions>;
  /**
   * Middlewares to add to the store
   */
  middlewares?: Middleware[];
  /**
   * These actions are dispatched immediately after adding the module in the store
   */
  initialActions?: AnyAction[];
  /**
   * These actions are dispatched immediatly before removing the module from the store
   */
  finalActions?: AnyAction[];
  /**
   * Specifies if the module is retained forever in the store
   */
  retained?: boolean;
}
