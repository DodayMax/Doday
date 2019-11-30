import cuid from 'cuid';
import {
  ModuleSysname,
  Module,
  NodeLabel,
  Entity,
  ModuleProgress,
} from '@doday/lib';

export const modules: Entity<Module, ModuleProgress>[] = [
  {
    doday: {
      did: cuid(),
      labels: [NodeLabel.Module],
      public: false,
      createdAt: new Date(),
      sysname: ModuleSysname.SignButtons,
    },
    progress: {
      did: cuid(),
      labels: [NodeLabel.Progress],
      public: false,
      createdAt: new Date(),
      active: true,
    },
  },
  {
    doday: {
      did: cuid(),
      labels: [NodeLabel.Module],
      public: false,
      createdAt: new Date(),
      sysname: ModuleSysname.NavigationStack,
    },
    progress: {
      did: cuid(),
      labels: [NodeLabel.Progress],
      public: false,
      createdAt: new Date(),
      active: true,
    },
  },
  {
    doday: {
      did: cuid(),
      labels: [NodeLabel.Module],
      public: false,
      createdAt: new Date(),
      sysname: ModuleSysname.Layout,
    },
    progress: {
      did: cuid(),
      labels: [NodeLabel.Progress],
      public: false,
      createdAt: new Date(),
      active: true,
    },
  },
  {
    doday: {
      did: cuid(),
      labels: [NodeLabel.Module],
      public: false,
      createdAt: new Date(),
      sysname: ModuleSysname.Toast,
    },
    progress: {
      did: cuid(),
      labels: [NodeLabel.Progress],
      public: false,
      createdAt: new Date(),
      active: true,
    },
  },
  {
    doday: {
      did: cuid(),
      labels: [NodeLabel.Module],
      public: false,
      createdAt: new Date(),
      sysname: ModuleSysname.Dialog,
    },
    progress: {
      did: cuid(),
      labels: [NodeLabel.Progress],
      public: false,
      createdAt: new Date(),
      active: true,
    },
  },
  {
    doday: {
      did: cuid(),
      labels: [NodeLabel.Module],
      public: false,
      createdAt: new Date(),
      sysname: ModuleSysname.Topbar,
    },
    progress: {
      did: cuid(),
      labels: [NodeLabel.Progress],
      public: false,
      createdAt: new Date(),
      active: true,
    },
  },
];
