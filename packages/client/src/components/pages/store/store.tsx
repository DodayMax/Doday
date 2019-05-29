import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '@ducks/store';
import { Text } from '../../shared/_atoms/typography';
import { Page, PageHeader } from '../../shared/_molecules/page';
import { TypographySize, Space } from '@root/lib/common-interfaces';
import { Pageflow } from '../../shared/_support/pageflow';
import { RootState } from '@root/lib/models';
import { FetchPublicDodaysForStoreAction } from '@root/ducks/store/actions';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { DodayLike } from '@root/tools/types';
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
} from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    cardMedia: {
      paddingTop: '56.25%', // 16:9
      backgroundColor: theme.palette.divider,
    },
    page: {
      marginBottom: '2rem',
    },
  });

interface StoreProps {}

interface PropsFromConnect {
  dodays: DodayLike[];
  fetchPublicDodaysForStoreActionCreator(
    params: DodaysQueryParams
  ): FetchPublicDodaysForStoreAction;
}

@Pageflow({ path: '/store' })
class StoreClassComponent extends React.Component<
  StoreProps & Partial<PropsFromConnect> & WithStyles
> {
  componentDidMount() {
    this.props.fetchPublicDodaysForStoreActionCreator({});
  }

  render() {
    const { dodays, classes } = this.props;
    return (
      <Page header={<PageHeader withClose />} className={classes.page}>
        <LayoutBlock
          flex="1"
          align="flexCenter"
          spaceAbove={Space.Medium}
          spaceBelow={Space.Medium}
        >
          <TextField
            id="doday-search"
            label={'Search for doday'}
            margin="normal"
            InputProps={{
              classes: {
                input: classes.dodayname,
              },
            }}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.label,
              },
            }}
          />
        </LayoutBlock>
        <Grid container spacing={8}>
          {dodays.map(doday => (
            <Grid item key={doday.did} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  image={(doday.resource && doday.resource.image) || ''}
                  title="Image title"
                  className={classes.cardMedia}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    {doday.name}
                  </Typography>
                  <Typography>
                    {doday.resource && doday.resource.description}
                  </Typography>
                </CardContent>
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
});

export const Store = connect(
  mapState,
  { ...actions }
)(withStyles(css)(StoreClassComponent));
