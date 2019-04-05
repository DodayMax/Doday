import * as React from 'react';
import { connect } from 'react-redux';
import { Doday, TypographySize } from '@root/lib/common-interfaces';
import { Page } from '../shared/_molecules/page';
import { RouteComponentProps } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text } from '@components';

interface DodayDetailsProps {}

interface PropsFromConnect {
  dodays: Doday[];
}

class DodayDetails extends React.Component<
  DodayDetailsProps & PropsFromConnect & RouteComponentProps<any>
> {
  render() {
    const { dodays, history, match } = this.props;
    const doday =
      dodays.length && dodays.find(doday => doday.id === match.params.id);

    return (
      <Page history={history}>
        {doday ? <Text text={doday.name} size={TypographySize.h1} /> : null}
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  dodays: state.dodayApp.dodays,
});

export default connect(mapState)(DodayDetails);
