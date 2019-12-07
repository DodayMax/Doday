import React from 'react';
import Media from 'react-media';
import { DesktopTopbar } from './desktop-topbar/desktop-topbar';
import { MobileTopbar } from './mobile-topbar/mobile-topbar';

export const Topbar = () => {
  return (
    <Media query={`(max-width: 768px)`}>
      {matches => (matches ? <MobileTopbar /> : <DesktopTopbar />)}
    </Media>
  );
};
