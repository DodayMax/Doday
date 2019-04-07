import * as React from 'react';
import { connect } from 'react-redux';
import { TypographySize } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '../shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text } from '@components';
import { actions as dodaysActions } from '@ducks/doday-app';
import { Doday } from '@root/lib/models/entities/Doday';
import { Goal } from '@root/lib/models/entities/Goal';
import { Button, ButtonSize } from '../shared/_atoms/button';
import { DeleteDodayAction } from '@root/ducks/doday-app/actions';

interface DodayDetailsProps {}

interface PropsFromConnect {
  dodays: (Doday | Goal)[];
  deleteDoday: (doday: Doday) => DeleteDodayAction;
}

@(withRouter as any)
class DodayDetails extends React.Component<
  DodayDetailsProps & PropsFromConnect & RouteComponentProps<any>
> {
  render() {
    const { dodays, history, match } = this.props;
    const doday =
      dodays.length && dodays.find(doday => doday.did === match.params.id);

    if (!doday) {
      history.push('/');
    }

    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        text={'Delete'}
        onClick={() => this.props.deleteDoday(doday as Doday)}
      />,
    ];

    return (
      <Page header={<PageHeader actions={actions} />}>
        {doday ? <Text text={doday.name} size={TypographySize.h1} /> : null}
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  dodays: state.dodayApp.dodays,
});

export default connect(
  mapState,
  {
    deleteDoday: dodaysActions.deleteDodayActionCreator,
  }
)(DodayDetails);
