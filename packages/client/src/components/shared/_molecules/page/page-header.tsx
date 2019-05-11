import * as React from 'react';
import { LayoutBlock, ClickableIcon, Icons } from '@shared';
import { withRouter, RouteComponentProps } from 'react-router';

const vars = require('@styles/_config.scss');
const css = require('./_page-header.module.scss');

interface PageHeaderProps extends Partial<RouteComponentProps> {
  status?: React.ReactElement<any>[];
  actions?: React.ReactElement<any>[];
  withClose?: boolean;
  onClose?: () => void;
}

@(withRouter as any)
export class PageHeader extends React.Component<PageHeaderProps> {
  render() {
    const { status, actions, onClose, children, withClose } = this.props;
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
          flex="1"
          align="flex-end"
          valign="vflex-center"
          className={css.headerActions}
        >
          {actions || children}
          {withClose && (
            <ClickableIcon
              hover
              onClick={() => {
                setTimeout(() => {
                  this.props.history.goBack();
                }, 200);
                if (onClose) {
                  onClose();
                }
              }}
            >
              <Icons.Close color={vars.gray6} width={30} height={30} />
            </ClickableIcon>
          )}
        </LayoutBlock>
      </LayoutBlock>
    );
  }
}
