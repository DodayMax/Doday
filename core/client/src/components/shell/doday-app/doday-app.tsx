import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import ducks, { ChangeDodayAppRouteAction } from '@doday/duck';
import { RouteComponentProps } from 'react-router';
import {
  DodayAppQueryParams,
  RootState,
  WithTools,
  DodayLike,
} from '@doday/lib';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { withTranslation, WithTranslation } from 'react-i18next';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { ToolWrapper } from '@root/components/tool-wrapper/tool-wrapper';

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

const css = (theme: Theme) =>
  createStyles({
    dodayAppContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100vh - 64px)`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  });

export class DodayAppComponent extends React.Component<
  DodayAppProps &
    WithTools &
    WithStyles &
    Partial<PropsFromConnect> &
    Partial<RouteComponentProps> &
    WithTranslation
> {
  componentDidMount() {
    const { activeTools, location } = this.props;
    Object.values(activeTools).map(tool => {
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
    Object.values(this.props.activeTools).map(tool => {
      const entity = tool.config.entities.find(
        entity => entity.type === item.type
      );
      if (entity != undefined) {
        const Tag = tool.views.cells[entity.type].progress.component;
        return (
          <Tag
            doday={item}
            key={_.uniqueId('tag-')}
            onClick={this.handleDodayCellClick}
          />
        );
      }
    });
  };

  private renderDodayApp = () => {
    const { loading, activeTools, history, location, match, t } = this.props;
    const tool = Object.values(activeTools).find(
      tool => tool.config.route === this.props.route
    );
    return (
      <ToolWrapper
        tool={tool}
        place="app"
        loading={loading}
        history={history}
        location={location}
        match={match}
        t={t}
      />
    );
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
      <section className={classes.dodayAppContainer}>
        {this.renderDodayApp()}
      </section>
    );
  }
}

const mapState = ({ auth, dodayApp }: RootState) => ({
  loading: dodayApp.loading,
  route: dodayApp.route,
  routeParams: dodayApp.routeParams,
  activeTools: auth.activeTools,
});

export default connect(
  mapState,
  {
    ...ducks.dodayApp.actions,
    ...ducks.settings.actions,
    ...ducks.details.actions,
    ...ducks.api.actions,
  }
)(withTranslation('activities')(withStyles(css)(DodayAppComponent)));
