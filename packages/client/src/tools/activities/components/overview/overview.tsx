import * as React from 'react';
import { Page, PageHeader, Button } from '@root/components/shared';
import { config } from '../../config';
import { capitalize } from '@root/lib/utils';
import { RouteComponentProps } from 'react-router';

export class ActivityOverview extends React.Component<
  Partial<RouteComponentProps>
> {
  private get actions() {
    const { history } = this.props;
    return config.entities.map((entity, index) => (
      <Button
        primary
        key={index}
        onClick={() => history.push(`/builder/${entity.name}`)}
      >
        {`New ${capitalize(entity.name)}`}
      </Button>
    ));
  }

  render() {
    return <Page header={<PageHeader actions={this.actions} />}>Overview</Page>;
  }
}
