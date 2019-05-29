import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';
import * as detailsActions from '@ducks/doday-details/actions';
import {
  Pageflow,
  PageWrapperChildContext,
} from '@root/components/shared/_decorators/pageflow';
import { RootState } from '@root/lib/models';
import { DodayLike, WithTools } from '@root/tools/types';

interface ProgressDetailsProps {}

interface PropsFromConnect {
  selectedDoday: DodayLike;
  fetchSelectedProgressActionCreator: (
    did: string
  ) => detailsActions.FetchSelectedProgressAction;
}

interface ProgressDetailsState {}

type Props = ProgressDetailsProps &
  WithTools &
  Partial<PropsFromConnect> &
  RouteComponentProps<any>;

@Pageflow({ path: '/progress/:did' })
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

    return null;
  }
}

const mapState = (state: RootState) => ({
  selectedDoday: state.dodayDetails.selectedDoday,
});

export default connect(
  mapState,
  {
    fetchSelectedProgressActionCreator:
      detailsActions.actionCreators.fetchSelectedProgressActionCreator,
  }
)(ProgressDetails);
