import * as React from 'react';
import { Entity } from '@doday/lib';
import { Page, PageHeader } from '@doday/shared';
import { config } from '../../config';
import { RouteComponentProps } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button, Typography } from '@material-ui/core';

export class ActivityOverviewComponentClass extends React.Component<
  Partial<RouteComponentProps> & WithTranslation
> {
  private get actions() {
    const { history, t } = this.props;
    return config.entities.map((entity: Entity, index: number) => (
      <Button
        variant="contained"
        color="primary"
        key={index}
        onClick={() => history!.push(`/dashboard/builder/${entity.name}`)}
      >
        {t('overview.actions.create')}
      </Button>
    ));
  }

  render() {
    return (
      <Page header={<PageHeader>{this.actions}</PageHeader>}>
        <Typography variant="h1">{this.props.t('overview.title')}</Typography>
        <Typography variant="h2">{this.props.t('overview.title')}</Typography>
        <Typography variant="h3">{this.props.t('overview.title')}</Typography>
        <Typography variant="subtitle1">
          {this.props.t('overview.title')}
        </Typography>
        <Typography variant="subtitle2">
          {this.props.t('overview.title')}
        </Typography>
        <Typography variant="body1">
          {this.props.t('overview.title')}
        </Typography>
        <Typography variant="body2">
          {this.props.t('overview.title')}
        </Typography>
        <Typography variant="caption">
          {this.props.t('overview.title')}
        </Typography>
        <Typography variant="button">
          {this.props.t('overview.title')}
        </Typography>
      </Page>
    );
  }
}

export const ActivityOverview = withTranslation('activities')(
  ActivityOverviewComponentClass
);
