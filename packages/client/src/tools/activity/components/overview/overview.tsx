import * as React from 'react';
import { Page, PageHeader } from '@root/components/shared';
import { config } from '../../config';
import { RouteComponentProps } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button, Typography } from '@material-ui/core';

export class ActivityOverviewComponentClass extends React.Component<
  Partial<RouteComponentProps> & WithTranslation
> {
  private get actions() {
    const { history, t } = this.props;
    return config.entities.map((entity, index) => (
      <Button
        variant="contained"
        color="primary"
        key={index}
        onClick={() => history.push(`/builder/${entity.name}`)}
      >
        {t('overview.actions.create')}
      </Button>
    ));
  }

  render() {
    return (
      <Page header={<PageHeader>{this.actions}</PageHeader>}>
        <Typography variant="h3">{this.props.t('overview.title')}</Typography>
      </Page>
    );
  }
}

export const ActivityOverview = withTranslation('activities')(
  ActivityOverviewComponentClass
);
