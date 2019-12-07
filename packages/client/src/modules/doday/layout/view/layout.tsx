import React, { useEffect } from 'react';
import Media from 'react-media';
import { DesktopLayout } from './desktop-layout/desktop-layout';
import { MobileLayout } from './mobile-layout/mobile-layout';
import { LayoutType } from '@doday/lib';

export const LayoutContext = React.createContext(null as LayoutType);

export const Layout = () => {
  useEffect(() => {
    /**
     * Load default core modules for basic layout spots
     */
    // loadModule(ModuleSysname.Topbar, ModuleType.Core);
  }, []);

  return (
    <Media query={`(max-width: 768px)`}>
      {matches =>
        matches ? (
          <LayoutContext.Provider value={LayoutType.Mobile}>
            <MobileLayout />
          </LayoutContext.Provider>
        ) : (
          <LayoutContext.Provider value={LayoutType.Desktop}>
            <DesktopLayout />
          </LayoutContext.Provider>
        )
      }
    </Media>
  );
};
