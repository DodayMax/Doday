import * as React from 'react';
import { connect } from 'react-redux';
import { TypographySize } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '../shared/_molecules/page';
import { RouteComponentProps } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text } from '@components';
import { Doday } from '@root/lib/models/entities/Doday';
import { Goal } from '@root/lib/models/entities/Goal';

interface DodayDetailsProps {}

interface PropsFromConnect {
  dodays: (Doday | Goal)[];
}

class DodayDetails extends React.Component<
  DodayDetailsProps & PropsFromConnect & RouteComponentProps<any>
> {
  render() {
    const { dodays, match } = this.props;
    const doday =
      dodays.length && dodays.find(doday => doday.did === match.params.id);

    return (
      <Page header={<PageHeader />}>
        {doday ? <Text text={doday.name} size={TypographySize.h1} /> : null}
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  dodays: state.dodayApp.dodays,
});

export default connect(mapState)(DodayDetails);
