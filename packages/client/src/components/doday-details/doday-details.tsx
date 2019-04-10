import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { TypographySize } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '../shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text } from '@components';
import { actions as dodaysActions } from '@ducks/doday-app';
import { Doday } from '@root/lib/models/entities/Doday';
import { Button, ButtonSize } from '../shared/_atoms/button';
import {
  DeleteDodayAction,
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
} from '@root/ducks/doday-app/actions';
import { Marker } from '../shared/_atoms/marker';
import { activityTypeColor } from '@root/lib/utils';

interface DodayDetailsProps {}

interface PropsFromConnect {
  selectedDoday: Doday;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  deleteDoday: (doday: Doday) => DeleteDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

@(withRouter as any)
class DodayDetails extends React.Component<
  DodayDetailsProps & PropsFromConnect & RouteComponentProps<any>
> {
  componentDidMount() {
    //fetch selected doday with graphQL
    const did = this.props.match.params.did;
    this.props.fetchSelectedDodayActionCreator(did);
  }

  render() {
    const {
      history,
      selectedDoday,
      clearSelectedDodayActionCreator,
    } = this.props;

    if (!selectedDoday) {
      return 'Loading...';
    }

    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        text={'Delete'}
        onClick={() => {
          this.props.deleteDoday(selectedDoday);
          history.push('/');
        }}
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
      <Page
        header={
          <PageHeader
            status={status}
            actions={actions}
            onClose={clearSelectedDodayActionCreator}
          />
        }
      >
        <Text size={TypographySize.s}>
          {moment(selectedDoday.date).format('ll')}
        </Text>
        <Text size={TypographySize.h1}>{selectedDoday.name}</Text>
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
    ...dodaysActions,
  }
)(DodayDetails);
