import * as React from 'react';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import ducks, { ChangeDodayAppRouteAction } from '@doday/duck';
import { RouteComponentProps } from 'react-router';
import {
  DodayAppQueryParams,
  RootState,
  WithTools,
  DodayLike,
} from '@doday/lib';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      minWidth: '28rem',
      maxWidth: '3rem',
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100vh - 64px)`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  });

export interface DodayAppProps extends React.HTMLAttributes<HTMLElement> {}

interface PropsFromConnect {
  loading: boolean;
  route: string;
  routeParams: DodayAppQueryParams;
  dodays: DodayLike[];
  changeDodayAppRouteActionCreator: (
    route: string
  ) => ChangeDodayAppRouteAction;
}

export class DodayAppComponent extends React.Component<
  DodayAppProps &
    WithTools &
    Partial<PropsFromConnect> &
    Partial<RouteComponentProps> &
    WithStyles
> {
  componentDidMount() {
    const { activeTools, location } = this.props;
    activeTools.map(tool => {
      if (location.pathname.startsWith(tool.config.route)) {
        this.props.changeDodayAppRouteActionCreator(tool.config.route);
      }
    });
  }

  getDodaysToRender = () => {
    return this.props.dodays || [];
  };

  handleDodayCellClick = (route: string, doday: DodayLike) => {
    this.props.history.push(route);
  };

  renderCellByDodayType = (item: DodayLike, index) => {
    this.props.activeTools.map(tool => {
      const entity = tool.config.entities.find(
        entity => entity.type === item.type
      );
      if (entity != undefined) {
        const Tag = tool.components.cells[entity.type].progress;
        return (
          <Tag doday={item} key={cuid()} onClick={this.handleDodayCellClick} />
        );
      }
    });
  };

  private renderDodayApp = () => {
    const {
      loading,
      activeTools,
      history,
      location,
      match,
      classes,
    } = this.props;
    const tool = activeTools.find(
      tool => tool.config.route === this.props.route
    );
    if (tool)
      return (
        <tool.components.dodayApp
          loading={loading}
          className={classes.container}
          history={history}
          location={location}
          match={match}
        />
      );
    return undefined;
  };

  // renderContent() {
  //   const { changeDodayAppDateActionCreator, loading } = this.props;

  //   const totalDurationOfTheDay = this.getDodaysToRender()
  //     .filter(
  //       doday =>
  //         doday.type === DodayType.Activity &&
  //         doday.progress &&
  //         !doday.progress.completed
  //     )
  //     .map((doday: DodayLike) => {
  //       return doday && durationToMinutes(doday.duration);
  //     })
  //     .reduce((a, b) => a + b, 0);

  //   return (
  //     <>
  //       <TodayTopBar
  //         date={chosenDate!}
  //         changeDate={changeDodayAppDateActionCreator!}
  //       />
  //       {totalDurationOfTheDay > 8 * 60 ? (
  //         <LayoutBlock
  //           className={css.bannerContainer}
  //           spaceAbove={Space.Small}
  //           direction="column"
  //           valign="vflexCenter"
  //         >
  //           <Text>Your day is overloading!</Text>
  //           <Button
  //             onClick={() =>
  //               this.props.planOutActionCreator(chosenDate.getTime())
  //             }
  //             primary
  //             size={ButtonSize.small}
  //           >
  //             Plan out!
  //           </Button>
  //         </LayoutBlock>
  //       ) : null}
  //       <Grid
  //         loading={loading}
  //         items={this.getDodaysToRender()}
  //         renderCell={this.renderCellByDodayType}
  //       />
  //     </>
  //   );
  // }

  render() {
    const { classes } = this.props;
    return (
      <section className={classes.container}>{this.renderDodayApp()}</section>
    );
  }
}

const mapState = ({ dodayApp }: RootState) => ({
  loading: dodayApp.status.loading,
  route: dodayApp.status.route,
  routeParams: dodayApp.status.routeParams,
});

export default connect(
  mapState,
  {
    ...ducks.dodayApp.actions,
    ...ducks.settings.actions,
    ...ducks.details.actions,
    ...ducks.api.actions,
  }
)(withStyles(styles)(DodayAppComponent));