import cuid from 'cuid';
import { ModuleSysname, Module, NodeLabel } from '@doday/lib';

export const modules: Module[] = [
  {
    did: cuid(),
    labels: [NodeLabel.Module],
    public: false,
    createdAt: new Date(),
    sysname: ModuleSysname.SignButtons,
  },
  {
    did: cuid(),
    labels: [NodeLabel.Module],
    public: false,
    createdAt: new Date(),
    sysname: ModuleSysname.NavigationStack,
  },
];
