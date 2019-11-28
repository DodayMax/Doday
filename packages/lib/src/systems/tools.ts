import { EntityConfig } from '../models';
import { ModuleSysname } from './modules';

export enum ToolSysname {
  Store = 'store',
  Profile = 'profile',
  Activities = 'activities',
}

/** Tool class */
export class ToolObject {
  /**
   * Sysname of the tool
   */
  sysname!: ToolSysname;
  /**
   * Tool-forming modules
   */
  modules!: ModuleSysname[];
  /**
   * Provided new instances for the System
   */
  provided?: {
    /**
     * New Entities that the module provides
     */
    entities: EntityConfig[];
  };
  /**
   * If `Tool` has another modules in Dependencies
   */
  dependencies?: (ModuleSysname | ToolSysname)[];
}
