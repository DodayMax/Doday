import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import { actions as builderActions } from '@ducks/builder';
import { RootState } from '@root/lib/models';
import {
  SetBuilderSuccessFlagAction,
  ClearBuilderAction,
} from '@root/ducks/builder/actions';
import { Page, PageHeader } from '../../shared/_molecules/page';

import {
  Pageflow,
  PageWrapperChildContext,
} from '../../shared/_support/pageflow';
import { WithTools } from '@root/tools/types';

export interface BuilderProps {}

interface PropsFromConnect {
  success?: boolean;
  setBuilderSuccessFlag: (state?: boolean) => SetBuilderSuccessFlagAction;
  clearBuilderActionCreator: () => ClearBuilderAction;
}

@Pageflow({ path: '/builder' })
export class Builder extends React.Component<
  BuilderProps & WithTools & Partial<PropsFromConnect> & RouteComponentProps
> {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  componentDidUpdate(prevProps) {
    if (this.props.success) {
      this.props.history.push('/');
      this.props.clearBuilderActionCreator();
      this.props.setBuilderSuccessFlag(undefined);
    }
  }

  onRequestClose = () => {
    this.props.clearBuilderActionCreator();
    if (this.context.requestClose) {
      this.context.requestClose();
    }
  };

  renderBuilder = () => {
    const { activeTools } = this.props;

    return activeTools.map(tool =>
      tool.config.entities.map(entity => {
        const Builder = tool.components.builders[entity.type];
        return (
          <Route
            key={entity.name}
            path={`/builder/${entity.name}`}
            render={() => <Builder activeTools={activeTools} />}
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

const mapState = (state: RootState) => ({
  success: state.builder.status.success,
});

export default withRouter(
  connect(
    mapState,
    { ...builderActions }
  )(Builder)
);
