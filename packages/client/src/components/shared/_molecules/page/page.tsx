import * as React from 'react';
import { LayoutBlock } from '@components';
import * as H from 'history';
import { withRouter } from 'react-router';

const css = require('./_page.module.scss');

interface PageProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactElement<any>;
}

@(withRouter as any)
export class Page extends React.Component<PageProps, {}> {
  render() {
    return (
      <div className={css.scroll}>
        {this.props.header}
        <div className={css.pageContainer}>
          <LayoutBlock direction="column">{this.props.children}</LayoutBlock>
        </div>
      </div>
    );
  }
}