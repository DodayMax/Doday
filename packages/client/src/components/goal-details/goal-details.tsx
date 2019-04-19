import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { Page, PageHeader } from '../shared/_molecules/page';
import { Button, ButtonSize } from '../shared/_atoms/button';
import { LayoutBlock } from '../shared/_atoms/layout-block';
import { Text } from '../shared/_atoms/typography';
import { TypographySize } from '@root/lib/common-interfaces';
import { RootState } from '@root/lib/models';
import { FetchSelectedGoalAction } from '@root/ducks/doday-details/actions';
import { Goal } from '@root/lib/models/entities/Goal';
import { DeleteGoalAction } from '@root/ducks/doday-app/actions';
import { Pageflow, PageWrapperChildContext } from '../pageflow';

interface GoalDetailsProps {}
interface PropsFromConnect {
  selectedGoal: Goal;
  deleteGoalActionCreator: (did: string) => DeleteGoalAction;
  fetchSelectedGoalActionCreator: (did: string) => FetchSelectedGoalAction;
}
interface GoalDetailsState {}

@Pageflow({ path: '/goals/:did' })
@(withRouter as any)
class GoalDetails extends React.Component<
  GoalDetailsProps & PropsFromConnect & RouteComponentProps<any>,
  GoalDetailsState
> {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  onRequestClose = () => {
    if (this.context.requestClose) {
      this.context.requestClose();
    }
  };

  componentDidMount() {
    //fetch selected doday with graphQL
    const did = this.props.match.params.did;
    this.props.fetchSelectedGoalActionCreator(did);
  }

  render() {
    const { history, selectedGoal } = this.props;
    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        onClick={() => {
          this.props.deleteGoalActionCreator(selectedGoal && selectedGoal.did);
          history.push('/');
        }}
      >
        Delete goal
      </Button>,
    ];

    return (
      <Page
        header={<PageHeader actions={actions} onClose={this.onRequestClose} />}
      >
        <LayoutBlock insideElementsMargin>
          {/* <EditableDatePicker
            selected={updates.date || selectedDoday.date}
            onChange={date =>
              this.setState({
                dirty:
                  moment(date).format('ll') !==
                  moment(selectedDoday.date).format('ll'),
                updates: { date },
              })
            }
          /> */}
        </LayoutBlock>
        <Text size={TypographySize.h1}>
          {selectedGoal && selectedGoal.name}
        </Text>
        {/* {selectedDoday.relatedGoal && (
          <Text color={TypographyColor.Disabled} size={TypographySize.m}>
            {selectedDoday.relatedGoal.name}
          </Text>
        )} */}
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  selectedGoal: state.dodayDetails.selectedGoal,
});

export default connect(
  mapState,
  {
    ...dodaysActions,
    ...dodayDetailsActions,
  }
)(GoalDetails);
