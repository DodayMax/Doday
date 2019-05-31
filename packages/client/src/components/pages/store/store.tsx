import * as React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { actions } from '@ducks/store';
import { Page } from '../../shared/_molecules/page';
import { Space } from '@root/lib/common-interfaces';
import { RootState } from '@root/lib/models';
import { FetchPublicDodaysForStoreAction } from '@root/ducks/store/actions';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { DodayLike, ToolBeacon } from '@root/tools/types';
import { LayoutBlock } from '@root/components/shared';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
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
                label={capitalize(entity.name)}
                onClick={() => {
                  console.log(`filter by: ${entity.name}`);
                }}
              />
            ))
          )}
        </LayoutBlock>
        <Grid container spacing={8}>
          {dodays.map(doday => (
            <Grid item key={doday.did} xs={12} sm={6} md={4}>
              <Card
                onClick={() => this.props.history.push(`/dodays/${doday.did}`)}
              >
                <CardActionArea>
                  {doday.resource && doday.resource.image && (
                    <CardMedia
                      image={(doday.resource && doday.resource.image) || ''}
                      title="Image title"
                      className={classes.cardMedia}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="subtitle2" component="h2">
                      {doday.name}
                    </Typography>
                    <Typography>
                      {doday.resource && doday.resource.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant="outlined" size="small">
                    Take
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
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
