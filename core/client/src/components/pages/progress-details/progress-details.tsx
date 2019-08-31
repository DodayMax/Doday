import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';
import ducks, { FetchSelectedProgressAction } from '@doday/duck';
import { Pageflow, PageWrapperChildContext } from '@doday/shared';
import { RootState, WithTools, DodayLike } from '@doday/lib';

interface ProgressDetailsProps {}

interface PropsFromConnect {
  selectedDoday: DodayLike;
  fetchSelectedProgressActionCreator: (
    did: string
  ) => FetchSelectedProgressAction;
}

interface ProgressDetailsState {}

type Props = ProgressDetailsProps &
  WithTools &
  Partial<PropsFromConnect> &
  RouteComponentProps<any>;

@Pageflow({ path: '/dashboard/progress/:did' })
@(withRouter as any)
class ProgressDetails extends React.Component<Props, ProgressDetailsState> {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  componentDidMount() {
    const did = this.props.match.params.did;
    this.props.fetchSelectedProgressActionCreator(did);
  }

  componentDidUpdate(prevProps) {
    const did = this.props.match.params.did;
    if (prevProps.match.params.did !== did) {
      this.props.fetchSelectedProgressActionCreator(did);
    }
  }

  render() {
    const { selectedDoday, activeTools } = this.props;

    const selectedDodayType = selectedDoday && selectedDoday.type;

    const tool = activeTools.find(
      tool =>
        !!tool.config.entities.find(entity => entity.type === selectedDodayType)
    );
    if (tool) {
      const Component = tool.components.details[selectedDodayType].progress;
      return <Component />;
    }

    return undefined;
  }
}

const mapState = (state: RootState) => ({
  selectedDoday: state.dodayDetails.selectedDoday,
});

export default connect(
  mapState,
  {
    fetchSelectedProgressActionCreator:
      ducks.details.actions.fetchSelectedProgressActionCreator,
  }
)(ProgressDetails);
