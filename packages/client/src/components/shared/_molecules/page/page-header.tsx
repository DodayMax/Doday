import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LayoutBlock, ClickableIcon, Icons } from '@shared';
import { withRouter, RouteComponentProps } from 'react-router';
import { RootState } from '@root/lib/models';
import { PageWrapperChildContext } from '../../_support/pageflow';

const vars = require('@styles/_config.scss');
const css = require('./_page-header.module.scss');

interface PageHeaderProps extends Partial<RouteComponentProps> {
  status?: React.ReactElement<any>[];
  actions?: React.ReactElement<any>[];
  withClose?: boolean;
  onClose?: () => void;
}

interface PropsFromConnect {
  route: string;
}

@(withRouter as any)
class PageHeaderComponentClass extends React.Component<
  PageHeaderProps & Partial<PropsFromConnect>
> {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  render() {
    const { status, actions, onClose, children, withClose, route } = this.props;
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
                if (this.context.requestClose) this.context.requestClose();
                setTimeout(() => {
                  this.props.history.push(route);
                  if (onClose) {
                    onClose();
                  }
                }, 200);
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

const mapState = (state: RootState) => ({
  route: state.dodayApp.status.route,
});

export const PageHeader = connect(mapState)(PageHeaderComponentClass);
