import * as React from 'react';
import { LayoutBlock } from '../shared/_atoms/layout-block';

const css = require('./_landing.module.scss');

export class Landing extends React.Component {
  render() {
    return <LayoutBlock className={css.landingContainer} />;
  }
}
