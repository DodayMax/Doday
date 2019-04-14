import * as React from 'react';
import * as cuid from 'cuid';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {
  LayoutBlock,
  Input,
  Text,
  Marker,
  Button,
  ButtonSize,
  ButtonGroup,
  Icons,
} from '@components';
import { ParsedUrlView } from './parsed-url-view/parsed-url-view';
import Select from 'react-select';
import {
  TypographySize,
  TypographyColor,
  StandartSizes,
  Activity,
} from '@root/lib/common-interfaces';
import { activityTypeColor, detectURL } from '@root/lib/utils';
import {
  ClearParsedMetadataAction,
  CreateAndTakeDodayAction,
  ParseUrlMetadataAction,
  SelectGoalAction,
} from '@root/ducks/builder/actions';
import { Tag } from '@root/lib/models/entities/Tag';
import { Goal } from '@root/lib/models/entities/Goal';
import { SerializedDoday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { CustomDatePicker } from '../shared/_atoms/custom-datepicker';

const css = require('./_builder.module.scss');

interface DodayBuilderProps {
  loading: boolean;
  isUrlParsing: boolean;
  parsedMetadata?: any;
  goals: Goal[];
  selectedGoal?: Goal;
  activityType: Activity;
  createAndTakeDoday: (doday: SerializedDoday) => CreateAndTakeDodayAction;
  selectGoalActionCreator: (goal: Goal) => SelectGoalAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedMetadataActionCreator: () => ClearParsedMetadataAction;
}

interface DodayBuilderState {
  dodayName: string;
  selectedTags?: Tag[];
  parsingFinished?: string;
  date: Date;
  isPublic: boolean;
}

export class DodayBuilder extends React.Component<
  DodayBuilderProps,
  DodayBuilderState
> {
  constructor(props: DodayBuilderProps) {
    super(props);

    this.state = {
      dodayName: '',
      date: new Date(),
      isPublic: false,
    };
  }

  shouldComponentUpdate(nextProps): boolean {
    if (this.props.isUrlParsing && !nextProps.isUrlParsing) {
      const parsedTags =
        nextProps.parsedMetadata && nextProps.parsedMetadata.keywords;
      const mappedTags =
        parsedTags &&
        parsedTags.map(tag => ({
          label: tag,
          value: tag,
        }));
      this.setState({
        dodayName: '',
        selectedTags: this.state.selectedTags
          ? (mappedTags && this.state.selectedTags.concat(mappedTags)) ||
            this.state.selectedTags
          : [],
      });
    }

    return true;
  }

  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });

  onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = String(e.target.value);
    const matches = detectURL(value);

    if (matches) {
      // parse meta of the link on server
      matches.map(url => this.props.parseUrlMetadataActionCreator(url));
    }

    this.setState({
      dodayName: value,
    });
  };

  handleChangeDate = date => {
    this.setState({
      date,
    });
  };

  handleCreateDoday = () => {
    const { parsedMetadata, activityType = 'do', selectedGoal } = this.props;

    if (this.state.dodayName || parsedMetadata) {
      const resource = parsedMetadata && {
        ...parsedMetadata,
        did: cuid(),
      };

      this.props.createAndTakeDoday({
        did: cuid(),
        activityType,
        type: DodayTypes.Doday,
        name: this.state.dodayName || parsedMetadata.title,
        tags:
          this.state.selectedTags &&
          this.state.selectedTags.map(tag => tag.value),
        date: this.state.date.getTime(),
        resource: resource,
        public: this.state.isPublic,
        relatedGoal: selectedGoal && selectedGoal.did,
      });
    }
  };

  handleGoalSelect = selected => {
    const goal =
      this.props.goals &&
      this.props.goals.find(goal => goal.did === selected.value);
    this.props.selectGoalActionCreator(goal);
  };

  render() {
    const {
      loading,
      activityType,
      clearParsedMetadataActionCreator,
      isUrlParsing,
      goals = [],
      selectedGoal,
      parsedMetadata,
    } = this.props;

    const { isPublic } = this.state;

    const goalsForSelect = goals.map(goal => ({
      label: goal.name,
      value: goal.did,
    }));

    return (
      <>
        <LayoutBlock insideElementsMargin valign="vflex-end">
          <Text size={TypographySize.s} color={TypographyColor.Disabled}>
            activity type:
          </Text>
          <Marker
            rounded
            color={activityTypeColor(this.props.activityType)}
            text={activityType}
          />
        </LayoutBlock>
        <Input
          size={StandartSizes.large}
          autofocus
          value={this.state.dodayName}
          onChange={this.onChangeInput}
          onPressEnter={this.handleCreateDoday}
          placeholder="Enter name or paste link..."
        />
        <ParsedUrlView
          onClose={() => {
            this.setState({
              // TODO: replace only removed parsed link from text
              dodayName: '',
            });
            clearParsedMetadataActionCreator();
          }}
          loading={isUrlParsing}
          parsedMetadata={parsedMetadata}
        />
        <LayoutBlock childFlex padding="2rem 0">
          <LayoutBlock childFlex flex={1}>
            <Select
              value={selectedGoal && selectedValueFromGoal(selectedGoal)}
              onChange={this.handleGoalSelect}
              placeholder="Related to goal"
              options={goalsForSelect}
            />
          </LayoutBlock>
          <LayoutBlock childFlex flex={1} margin="0 0 0 1rem">
            <CustomDatePicker
              icon={<Icons.Clock />}
              minDate={new Date()}
              selected={this.state.date}
              onChange={this.handleChangeDate}
              className={css.datePickerInput}
            />
          </LayoutBlock>
        </LayoutBlock>
        <LayoutBlock childFlex flex={1} padding="0 0 2rem">
          <div>
            <AsyncCreatableSelect
              value={this.state.selectedTags}
              onChange={(value: Tag[]) => {
                this.setState({ selectedTags: value });
              }}
              placeholder="Add tags that other people can easily find your doday"
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={this.promiseOptions}
            />
          </div>
        </LayoutBlock>
        <LayoutBlock
          insideElementsMargin
          align="flex-end"
          valign="vflex-center"
        >
          <ButtonGroup>
            <Button
              active={!isPublic}
              size={ButtonSize.small}
              text={'Private'}
              onClick={() => this.setState({ isPublic: false })}
            />
            <Button
              active={isPublic}
              size={ButtonSize.small}
              text={'Public'}
              onClick={() => this.setState({ isPublic: true })}
            />
          </ButtonGroup>
          <Button
            primary
            isLoading={loading}
            text={'Create'}
            onClick={this.handleCreateDoday}
          />
        </LayoutBlock>
      </>
    );
  }
}

const selectedValueFromGoal = (goal: Goal) => ({
  label: goal.name,
  value: goal.did,
});
