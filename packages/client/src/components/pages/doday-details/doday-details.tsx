import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';
import * as detailsActions from '@ducks/doday-details/actions';
import { PageWrapperChildContext } from '@root/components/shared/_decorators/pageflow';
import { RootState } from '@root/lib/models';
import { DodayLike, WithTools } from '@root/tools/types';

interface DodayDetailsProps {}

interface PropsFromConnect {
  selectedDoday: DodayLike;
  fetchSelectedDodayActionCreator: (
    did: string
  ) => detailsActions.FetchSelectedDodayAction;
}

interface DodayDetailsState {}

type Props = DodayDetailsProps &
  WithTools &
  Partial<PropsFromConnect> &
  RouteComponentProps<any>;

@(withRouter as any)
class DodayDetails extends React.Component<Props, DodayDetailsState> {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  componentDidMount() {
    const did = this.props.match.params.did;
    this.props.fetchSelectedDodayActionCreator(did);
  }

  componentDidUpdate(prevProps) {
    const did = this.props.match.params.did;
    if (prevProps.match.params.did !== did) {
      this.props.fetchSelectedDodayActionCreator(did);
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
      const Component = tool.components.details[selectedDodayType].public;
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
    fetchSelectedDodayActionCreator:
      detailsActions.actionCreators.fetchSelectedDodayActionCreator,
  }
)(DodayDetails);
