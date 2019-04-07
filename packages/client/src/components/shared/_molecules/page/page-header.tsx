import * as React from 'react';
import { LayoutBlock, ClickableIcon, Icons } from '@components';
import { withRouter, RouteComponentProps } from 'react-router';

const vars = require('@styles/_config.scss');
const css = require('./_page-header.module.scss');

interface PageHeaderProps extends Partial<RouteComponentProps> {
  actions?: React.ReactElement<any>[];
  onClose?: () => void;
}

@(withRouter as any)
export class PageHeader extends React.Component<PageHeaderProps> {
  render() {
    const { actions, onClose } = this.props;
    return (
      <LayoutBlock
        align="flex-end"
        valign="vflex-center"
        className={css.headerContainer}
      >
        {actions}
        <ClickableIcon
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
    );
  }
}
