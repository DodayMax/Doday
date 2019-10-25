import React, { useEffect } from 'react';
import Media from 'react-media';
import { DesktopLayout } from './desktop-layout/desktop-layout';
import { MobileLayout } from './mobile-layout/mobile-layout';
import { loadModule } from '@root/modules/loader';
import { ModuleSysname, ModuleType } from '@doday/lib';

export const Layout = () => {
  useEffect(() => {
    /**
     * Load default core modules for basic layout spots
     */
    loadModule(ModuleSysname.topbar, ModuleType.core);
  }, []);

  return (
    <Media query={`(max-width: 768px)`}>
      {matches => (matches ? <MobileLayout /> : <DesktopLayout />)}
    </Media>
  );
};
