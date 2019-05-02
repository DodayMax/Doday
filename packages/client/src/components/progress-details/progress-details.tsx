import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';
import * as detailsActions from '@ducks/doday-details/actions';
import { Pageflow, PageWrapperChildContext } from '@root/components/pageflow';
import { RootState } from '@root/lib/models';
import { DodayLike, DodayTypes } from '@root/lib/models/entities/common';
import ActivityDetails from '@root/components/tools/activities/details/activity-details';

interface DodayDetailsProps {}

interface PropsFromConnect {
  selectedProgress: DodayLike;
  fetchSelectedDodayActionCreator: (
    did: string
  ) => detailsActions.FetchSelectedDodayAction;
}

interface DodayDetailsState {}

type Props = DodayDetailsProps &
  Partial<PropsFromConnect> &
  RouteComponentProps<any>;

@Pageflow({ path: '/progress/:did' })
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

  render() {
    const { selectedDoday } = this.props;

    switch (selectedDoday.type) {
      case DodayTypes.Activity:
        return <ActivityDetails />;
      default:
        return null;
    }
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
