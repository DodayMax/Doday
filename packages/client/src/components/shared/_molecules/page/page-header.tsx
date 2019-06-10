import * as React from 'react';
import * as cuid from 'cuid';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { config } from '@styles/config';
import { LayoutBlock } from '@shared';
import { withRouter, RouteComponentProps } from 'react-router';
import { RootState } from '@root/lib/models';
import { PageWrapperChildContext } from '../../_decorators/pageflow';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  IconButton,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    headerContainer: {
      color: theme.palette.action.active,
      height: `${64}px`,
      boxSizing: 'border-box',
      padding: `0 ${config.paddings.paddingL}rem`,
    },
  });

export interface PageHeaderAction {
  title: string;
  action: () => void;
  className?: string;
}

interface PageHeaderProps extends Partial<RouteComponentProps> {
  status?: React.ReactElement<any>[];
  /** Use actions to add items to collapsed action menu */
  actions?: PageHeaderAction[];
  withClose?: boolean;
  onClose?: () => void;
}

interface PropsFromConnect {
  route: string;
}

interface PageHeaderState {
  anchor?: HTMLElement;
}

const ITEM_HEIGHT = 48;

@(withRouter as any)
class PageHeaderComponentClass extends React.Component<
  PageHeaderProps & Partial<PropsFromConnect> & WithStyles,
  PageHeaderState
> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  private handleOpen = (event: React.MouseEvent<any>) =>
    this.setState({ anchor: event.currentTarget });

  private handleClose = () => this.setState({ anchor: undefined });

  render() {
    const {
      status,
      actions,
      onClose,
      children,
      withClose,
      classes,
    } = this.props;

    return (
      <LayoutBlock className={classes.headerContainer}>
        <LayoutBlock
          align="flexStart"
          valign="vflexCenter"
          insideElementsMargin
        >
          {status}
        </LayoutBlock>
        <LayoutBlock
          insideElementsMargin
          flex="1"
          align="flexEnd"
          valign="vflexCenter"
        >
          {children}
          {actions && !!actions.length && (
            <>
              <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={this.state.anchor}
                open={!!this.state.anchor}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                {actions.map(item => (
                  <MenuItem
                    key={cuid()}
                    onClick={() => {
                      this.handleClose();
                      item.action();
                    }}
                    className={item.className}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
          {withClose && (
            <IconButton
              onClick={() => {
                if (this.context.requestClose) this.context.requestClose();
                setTimeout(() => {
                  this.props.history.push('/dashboard');
                  if (onClose) {
                    onClose();
                  }
                }, 200);
              }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          )}
        </LayoutBlock>
      </LayoutBlock>
    );
  }
}

const mapState = (state: RootState) => ({
  route: state.dodayApp.status.route,
});

export const PageHeader = connect(mapState)(
  withStyles(css)(PageHeaderComponentClass)
);
