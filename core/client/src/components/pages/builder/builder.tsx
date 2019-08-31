import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import ducks, { ClearBuilderAction } from '@doday/duck';
import { Page, PageHeader, Pageflow } from '@doday/shared';

import { WithTools } from '@doday/lib';

export interface BuilderProps {}

interface PropsFromConnect {
  success?: boolean;
  clearBuilderActionCreator: () => ClearBuilderAction;
}

@Pageflow({ path: '/dashboard/builder' })
export class Builder extends React.Component<
  BuilderProps & WithTools & Partial<PropsFromConnect> & RouteComponentProps
> {
  onRequestClose = () => {
    this.props.clearBuilderActionCreator();
  };

  renderBuilder = () => {
    const { activeTools } = this.props;

    return activeTools.map(tool =>
      tool.config.entities.map(entity => {
        const Builder = tool.components.builders[entity.type];
        return (
          <Route
            key={entity.name}
            path={`/dashboard/builder/${entity.name}`}
            render={routerProps => (
              <Builder {...routerProps} activeTools={activeTools} />
            )}
          />
        );
      })
    );
  };

  render() {
    return (
      <Page header={<PageHeader withClose onClose={this.onRequestClose} />}>
        {this.renderBuilder()}
      </Page>
    );
  }
}

export default withRouter(
  connect(
    undefined,
    { ...ducks.builder.actions }
  )(Builder)
);
