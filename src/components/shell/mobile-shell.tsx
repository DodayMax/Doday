import * as React from 'react';
import { Route, match } from 'react-router-dom';
import i18next from 'i18next';
import Drawer from 'react-drag-drawer';
import { dodays } from '@root/lib/fake-data/dodays';

const { translate } = require('react-i18next');

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

interface ShellProps {
  match?: match;
}

import { Grid, Builder, Drawer as DodayDrawer } from '@components';

export class MobileShell extends React.Component<ShellProps & TranslationProps> {
  render() {
    return (
      <>
        <Route exact path={`/`} render={() => <Grid items={dodays} cellType="DodayCell" />} />
        <Route path={`/paths`} render={() => <div>Paths</div>} />
        <Route path={`/store`} render={() => <div>Store</div>} />
        <button
          className="control_button"
          onClick={() => {
            
          }}
        ></button>
        <button className="drawer_button">=</button>
        <Drawer
          onRequestClose={() => {
          }}
          modalElementClass={"modal"}
        >
          <Builder
          />
        </Drawer>
        <Drawer
          direction='left'
          onRequestClose={() => {}}
          modalElementClass={"sidebar"}
        >
          <Route path="/" component={DodayDrawer} />
        </Drawer>
      </>
    );
  }
}

export default translate()(MobileShell);