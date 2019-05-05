import * as React from 'react';
import { Route, match } from 'react-router-dom';
import i18next from 'i18next';

const { translate } = require('react-i18next');

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

interface ShellProps {
  match?: match;
}

import { Grid } from '@shared';

export class MobileShell extends React.Component<
  ShellProps & TranslationProps
> {
  render() {
    return (
      <>
        <Route
          exact
          path={`/`}
          render={() => <Grid items={[]} cellType="DodayCell" />}
        />
        <Route path={`/paths`} render={() => <div>Paths</div>} />
        <Route path={`/store`} render={() => <div>Store</div>} />
        <button className="control_button" onClick={() => {}} />
        <button className="drawer_button">=</button>
      </>
    );
  }
}

export default translate()(MobileShell);
