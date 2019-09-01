import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';
import ducks, { FetchSelectedDodayAction } from '@doday/duck';
import { PageWrapperChildContext } from '@doday/shared';
import { RootState, WithTools, DodayLike, ToolBeacon } from '@doday/lib';
import { ToolWrapper } from '@root/components/tool-wrapper/tool-wrapper';
import { withTranslation, WithTranslation } from 'react-i18next';

interface DodayDetailsProps {}

interface PropsFromConnect {
  activeTools: { [key: string]: ToolBeacon };
  selectedDoday: DodayLike;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
}

interface DodayDetailsState {}

type Props = DodayDetailsProps &
  WithTools &
  WithTranslation &
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
    const { selectedDoday, activeTools, t } = this.props;

    if (!selectedDoday) {
      return 'Loading...';
    }

    const selectedDodayType = selectedDoday && selectedDoday.type;
    const tool =
      activeTools &&
      Object.values(activeTools).find(
        tool =>
          tool.config.entities &&
          !!tool.config.entities.find(
            entity => entity.type === selectedDodayType
          )
      );

    return (
      <ToolWrapper
        tool={tool}
        place="detail"
        dodayType={selectedDodayType}
        isProgress={false}
        t={t}
      />
    );
  }
}

const mapState = (state: RootState) => ({
  activeTools: state.auth.activeTools,
  selectedDoday: state.details.selectedDoday,
});

export default connect(
  mapState,
  {
    fetchSelectedDodayActionCreator:
      ducks.details.actions.fetchSelectedDodayActionCreator,
  }
)(withTranslation(['activities', 'shell'])(DodayDetails));
