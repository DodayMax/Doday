import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';
import ducks, { FetchSelectedDodayAction } from '@doday/duck';
import { PageWrapperChildContext } from '@doday/shared';
import { RootState, WithTools, DodayLike } from '@doday/lib';

interface DodayDetailsProps {}

interface PropsFromConnect {
  selectedDoday: DodayLike;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
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

    const tool = Object.values(activeTools).find(
      tool =>
        !!tool.config.entities.find(entity => entity.type === selectedDodayType)
    );
    if (tool) {
      const Component = tool.views.details[selectedDodayType].public;
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
      ducks.details.actions.fetchSelectedDodayActionCreator,
  }
)(DodayDetails);
