import * as React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { TypographySize } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '../shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text } from '@components';
import { actions as dodaysActions } from '@ducks/doday-app';
import { Doday } from '@root/lib/models/entities/Doday';
import { Goal } from '@root/lib/models/entities/Goal';
import { Button, ButtonSize } from '../shared/_atoms/button';
import {
  DeleteDodayAction,
  FetchSelectedDodayAction,
} from '@root/ducks/doday-app/actions';
import { Marker } from '../shared/_atoms/marker';
import { activityTypeColor, isGoal } from '@root/lib/utils';

interface DodayDetailsProps {}

interface PropsFromConnect {
  selectedDoday: Doday;
  deleteDoday: (doday: Doday) => DeleteDodayAction;
}

@(withRouter as any)
class DodayDetails extends React.Component<
  DodayDetailsProps & PropsFromConnect & RouteComponentProps<any>
> {
  render() {
    const { history, selectedDoday } = this.props;

    if (!selectedDoday) {
      return 'Loading...';
    }

    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        text={'Delete'}
        // onClick={() => this.props.deleteDoday(selectedDoday)}
      />,
    ];

    const status = [
      <Marker
        key={1}
        rounded
        color={activityTypeColor(selectedDoday.activityType)}
        text={selectedDoday.activityType}
      />,
    ];

    return (
      <Page header={<PageHeader status={status} actions={actions} />}>
        <Text>{selectedDoday.name}</Text>
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  selectedDoday: state.dodayApp.selectedDoday,
});

export default connect(
  mapState,
  {
    deleteDoday: dodaysActions.deleteDodayActionCreator,
  }
)(DodayDetails);
