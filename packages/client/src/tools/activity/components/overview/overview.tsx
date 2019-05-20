import * as React from 'react';
import { Page, PageHeader, Button } from '@root/components/shared';
import { config } from '../../config';
import { RouteComponentProps } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';

export class ActivityOverviewComponentClass extends React.Component<
  Partial<RouteComponentProps> & WithTranslation
> {
  private get actions() {
    const { history, t } = this.props;
    return config.entities.map((entity, index) => (
      <Button
        primary
        key={index}
        onClick={() => history.push(`/builder/${entity.name}`)}
      >
        {t('overview.actions.create')}
      </Button>
    ));
  }

  render() {
    return (
      <Page header={<PageHeader actions={this.actions} />}>
        {this.props.t('overview.title')}
      </Page>
    );
  }
}

export const ActivityOverview = withTranslation('activities')(
  ActivityOverviewComponentClass
);
