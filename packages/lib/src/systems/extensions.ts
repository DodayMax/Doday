import { NodeLabel } from '../models';
import { ModuleSysname } from './modules';
import { ToolSysname } from './tools';

export enum ExtensionSysname {}

/** Tool class */
export class ExtensionObject {
  /**
   * Sysname of the extension
   */
  sysname!: ExtensionSysname;
  /**
   * Which props could be added to Entities with this Extension
   */
  props!: string[];
  /**
   * Extended Entities
   * For what entities will this extension be available
   */
  entities!: NodeLabel[];
  /**
   * Extension-forming modules
   */
  modules!: ModuleSysname[];
  /**
   * If `Extension` has another modules in Dependencies
   */
  dependencies?: (ModuleSysname | ToolSysname)[];
}
