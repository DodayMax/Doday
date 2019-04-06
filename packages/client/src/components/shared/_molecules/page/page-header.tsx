import * as React from 'react';
import { LayoutBlock, ClickableIcon, Icons } from '@components';
import { withRouter, RouteComponentProps } from 'react-router';

const vars = require('@styles/_config.scss');
const css = require('./_page-header.module.scss');

interface PageHeaderProps extends Partial<RouteComponentProps> {}

@(withRouter as any)
export class PageHeader extends React.Component<PageHeaderProps> {
  render() {
    return (
      <LayoutBlock
        align="flex-end"
        valign="flex-center"
        className={css.headerContainer}
      >
        <ClickableIcon
          onClick={() => {
            this.props.history.push('/');
          }}
        >
          <Icons.Close color={vars.gray6} width={30} height={30} />
        </ClickableIcon>
      </LayoutBlock>
    );
  }
}
