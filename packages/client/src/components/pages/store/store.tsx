import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { actions } from '@ducks/store';
import { Page, PageChildContext } from '../../shared/_molecules/page';
import { Space } from '@root/lib/common-interfaces';
import { RootState } from '@root/lib/models';
import { FetchPublicDodaysForStoreAction } from '@root/ducks/store/actions';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { ToolBeacon } from '@root/tools/types';
import { LayoutBlock, Icons, Masonry } from '@shared';
import {
  Grid,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  TextField,
  Chip,
  CardActionArea,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { capitalize } from '@root/lib/utils';
import { RouteComponentProps } from 'react-router';
import { config } from '@root/styles/config';
import { MasonryItem } from './store-item';
import { DodayLike } from '@root/lib/models/entities/common';

const css = (theme: Theme) =>
  createStyles({
    searchInput: {
      fontSize: '2.6rem',
    },
    searchLabel: {
      fontSize: '2.6rem',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
      backgroundColor: theme.palette.divider,
    },
    page: {
      marginBottom: '2rem',
    },
    store: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    paddedLabel: {
      paddingRight: `${config.spacing.spaceXXS}px`,
    },
    container: {
      marginBottom: '3rem',
    },
  });

interface StoreProps {}

interface PropsFromConnect {
  dodays: DodayLike[];
  activeTools: ToolBeacon[];
  fetchPublicDodaysForStoreActionCreator(
    params: DodaysQueryParams
  ): FetchPublicDodaysForStoreAction;
}

class StoreClassComponent extends React.Component<
  StoreProps &
    Partial<PropsFromConnect> &
    Partial<RouteComponentProps> &
    WithStyles
> {
  public static contextTypes = {
    scrollContainer: PropTypes.any,
  };

  public context!: PageChildContext;

  componentDidMount() {
    this.props.fetchPublicDodaysForStoreActionCreator({});
  }

  render() {
    const { dodays, activeTools, classes } = this.props;

    return (
      <Page isStatic className={classnames(classes.page, classes.store)}>
        <LayoutBlock
          flex="1"
          align="flexCenter"
          valign="vflexEnd"
          spaceAbove={Space.Medium}
          spaceBelow={Space.Medium}
        >
          <LayoutBlock spaceBelow={Space.Small} spaceRight={Space.Medium}>
            <SearchIcon color="disabled" />
          </LayoutBlock>
          <TextField
            id="doday-search"
            label={'Search for doday'}
            InputProps={{
              classes: {
                input: classes.searchInput,
              },
            }}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.searchLabel,
              },
            }}
          />
        </LayoutBlock>
        <LayoutBlock align="flexCenter" spaceBelow={Space.Medium}>
          {activeTools.map(tool =>
            tool.config.entities.map(entity => (
              <Chip
                key={tool.config.sysname}
                label={capitalize(entity.name)}
                onClick={() => {
                  console.log(`filter by: ${entity.name}`);
                }}
              />
            ))
          )}
        </LayoutBlock>
        <Grid container>
          <Masonry
            items={dodays}
            layoutClassName={classes.container}
            itemComponent={MasonryItem}
            alignCenter={true}
            loadingElement={<span>Loading...</span>}
            hasMore={false}
            isLoading={false}
            onInfiniteLoad={() => console.log('load batch')}
            columnWidth={200}
            columnGutter={10}
            getState={() => this.props.dodays}
            scrollAnchor={this.context.scrollContainer}
            scrollOffset={0}
          />
        </Grid>
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  dodays: state.store.dodays,
  activeTools: state.auth.activeTools,
});

export const Store = connect(
  mapState,
  { ...actions }
)(withStyles(css)(StoreClassComponent));
