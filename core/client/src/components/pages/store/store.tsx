import * as React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ducks, {
  FetchPublicDodaysForStoreAction,
  SearchPublicDodaysForStoreAction,
  SetSearchFlagAction,
  SetSearchTermAction,
} from '@doday/ducks';
import { Page, LayoutBlock, Icons, Masonry } from '@doday/shared';
import {
  Space,
  RootState,
  ToolBeacon,
  capitalize,
  config,
  DodayLike,
} from '@doday/lib';
import { DodaysQueryParams } from '@doday/api';
import {
  Grid,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  TextField,
  Chip,
  WithTheme,
  withTheme,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { MasonryItem } from './store-item';

const css = (theme: Theme) =>
  createStyles({
    searchContainer: {
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
      overflowY: 'scroll',
      padding: '3rem 0',
    },
  });

interface StoreProps {}

interface PropsFromConnect {
  loading?: boolean;
  searching?: boolean;
  searchTerm?: string;
  totalCount?: number;
  dodays: DodayLike[];
  activeTools: { [key: string]: ToolBeacon };
  setSearchTermActionCreator(term: string): SetSearchTermAction;
  setSearchFlagActionCreator(value: boolean): SetSearchFlagAction;
  searchPublicDodaysForStoreActionCreator(
    params: DodaysQueryParams
  ): SearchPublicDodaysForStoreAction;
  fetchPublicDodaysForStoreActionCreator(
    params: DodaysQueryParams
  ): FetchPublicDodaysForStoreAction;
}

export const ITEMS_PER_PAGE = 10;

class StoreClassComponent extends React.Component<
  StoreProps &
    Partial<PropsFromConnect> &
    Partial<RouteComponentProps> &
    WithStyles &
    WithTheme
> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchPublicDodaysForStoreActionCreator({
    //   limit: ITEMS_PER_PAGE,
    // });
  }

  loadMore = () => {
    const { loading, totalCount, dodays, searching } = this.props;
    if (!loading && dodays.length < totalCount) {
      !searching
        ? this.props.fetchPublicDodaysForStoreActionCreator({
            skip: dodays.length,
            limit: ITEMS_PER_PAGE,
          })
        : this.props.searchPublicDodaysForStoreActionCreator({
            skip: dodays.length,
            limit: ITEMS_PER_PAGE,
          });
    }
  };

  onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (this.props.searchTerm) {
        this.props.searchPublicDodaysForStoreActionCreator({
          term: this.props.searchTerm,
          limit: ITEMS_PER_PAGE,
        });
        this.props.setSearchFlagActionCreator(true);
      } else {
        this.props.fetchPublicDodaysForStoreActionCreator({
          limit: ITEMS_PER_PAGE,
        });
        this.props.setSearchFlagActionCreator(false);
      }
    }
  };

  render() {
    const { loading, dodays, activeTools, classes, theme } = this.props;

    return (
      <Page permanent className={classnames(classes.page, classes.store)}>
        <Grid container>
          <Masonry
            header={() => (
              <LayoutBlock flex="1" align="flexCenter" direction="column">
                <LayoutBlock
                  flex="1"
                  align="flexCenter"
                  valign="vflexEnd"
                  spaceAbove={Space.Medium}
                  spaceBelow={Space.Medium}
                  className={classes.searchContainer}
                >
                  <LayoutBlock
                    spaceBelow={Space.Small}
                    spaceRight={Space.Medium}
                  >
                    <SearchIcon color="disabled" />
                  </LayoutBlock>
                  <TextField
                    fullWidth
                    id="doday-search"
                    label={'Search for doday'}
                    onChange={e =>
                      this.props.setSearchTermActionCreator(e.target.value)
                    }
                    onKeyDown={this.onSearch}
                    InputProps={{
                      classes: {
                        input: classes.searchInput,
                      },
                    }}
                  />
                </LayoutBlock>
                <LayoutBlock align="flexCenter" spaceBelow={Space.Medium}>
                  {Object.values(activeTools).map(
                    tool =>
                      !tool.loading &&
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
              </LayoutBlock>
            )}
            items={dodays}
            layoutClassName={classes.layout}
            containerClassName={classes.container}
            itemComponent={MasonryItem as any}
            alignCenter={true}
            loadingElement={
              <LayoutBlock
                align="flexCenter"
                paddingAbove={Space.XSmall}
                paddingBelow={Space.XSmall}
              >
                <Icons.InlineLoader color={theme.palette.action.active} />
              </LayoutBlock>
            }
            hasMore={true}
            isLoading={loading}
            onInfiniteLoad={this.loadMore}
            columnWidth={200}
            columnGutter={10}
            getState={() => this.props.dodays}
            scrollOffset={0}
            threshold={100}
          />
        </Grid>
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  loading: state.store.loading,
  searching: state.store.searching,
  searchTerm: state.store.searchTerm,
  totalCount: state.store.totalCount,
  dodays: state.store.dodays,
  activeTools: state.auth.activeTools,
});

export const Store = connect(
  mapState,
  { ...ducks.store.actions }
)(withStyles(css)(withTheme(StoreClassComponent)));
