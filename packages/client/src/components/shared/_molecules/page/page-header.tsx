import * as React from 'react';
import { LayoutBlock, ClickableIcon, Icons } from '@components';
import { withRouter, RouteComponentProps } from 'react-router';

const vars = require('@styles/_config.scss');
const css = require('./_page-header.module.scss');

interface PageHeaderProps extends Partial<RouteComponentProps> {
  status?: React.ReactElement<any>[];
  actions?: React.ReactElement<any>[];
  onClose?: () => void;
}

@(withRouter as any)
export class PageHeader extends React.Component<PageHeaderProps> {
  render() {
    const { status, actions, onClose, children } = this.props;
    return (
      <LayoutBlock className={css.headerContainer}>
        <LayoutBlock
          align="flex-start"
          valign="vflex-center"
          className={css.headerStatus}
        >
          {status}
        </LayoutBlock>
        <LayoutBlock
          align="flex-end"
          valign="vflex-center"
          className={css.headerActions}
        >
          {actions || children}
          <ClickableIcon
            hover
            onClick={() => {
              this.props.history.push('/');
              if (onClose) {
                onClose();
              }
            }}
          >
            <Icons.Close color={vars.gray6} width={30} height={30} />
          </ClickableIcon>
        </LayoutBlock>
      </LayoutBlock>
    );
  }
}
