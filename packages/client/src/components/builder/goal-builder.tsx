import * as React from 'react';
import * as cuid from 'cuid';
import { LayoutBlock, Button, Text, Input } from '@components';
import {
  TypographySize,
  TypographyColor,
  StandartSizes,
} from '@root/lib/common-interfaces';
import ReactDatePicker from 'react-datepicker';
import { SerializedGoal } from '@root/lib/models/entities/Goal';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { CreateGoalAction } from '@root/ducks/builder/actions';

const css = require('./_builder.module.scss');

interface GoalBuilderProps {
  loading: boolean;
  ownerDID: string;
  createGoalActionCreator: (goal: SerializedGoal) => CreateGoalAction;
}

interface GoalBuilderState {
  goalName: string;
  startDate: Date;
  endDate: Date;
}

export class GoalBuilder extends React.Component<
  GoalBuilderProps,
  GoalBuilderState
> {
  constructor(props: GoalBuilderProps) {
    super(props);

    this.state = {
      goalName: '',
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  handleCreateGoal = () => {
    if (this.state.goalName) {
      this.props.createGoalActionCreator({
        did: cuid(),
        type: DodayTypes.Goal,
        name: this.state.goalName,
        ownerDID: this.props.ownerDID,
        startDate: this.state.startDate.getTime(),
        endDate: this.state.endDate.getTime(),
      });
    }
  };

  render() {
    const { loading } = this.props;
    return (
      <>
        <LayoutBlock insideElementsMargin valign="vflex-end">
          <Text size={TypographySize.s} color={TypographyColor.Disabled}>
            create new goal:
          </Text>
        </LayoutBlock>
        <Input
          size={StandartSizes.large}
          autofocus
          value={this.state.goalName}
          onChange={e => {
            this.setState({
              goalName: e.target.value,
            });
          }}
          onPressEnter={this.handleCreateGoal}
          placeholder="Enter name or paste link..."
        />
        <LayoutBlock align="space-between" padding="2rem 0">
          <ReactDatePicker
            minDate={new Date()}
            selected={this.state.startDate}
            onChange={date => {
              this.setState({
                startDate: date,
              });
            }}
            className={css.datePickerInput}
          />
          <ReactDatePicker
            minDate={new Date()}
            selected={this.state.endDate}
            onChange={date => {
              this.setState({
                endDate: date,
              });
            }}
            className={css.datePickerInput}
          />
        </LayoutBlock>
        <LayoutBlock
          insideElementsMargin
          align="flex-end"
          valign="vflex-center"
        >
          <Button
            primary
            isLoading={loading}
            text={'Create'}
            onClick={this.handleCreateGoal}
          />
        </LayoutBlock>
      </>
    );
  }
}
