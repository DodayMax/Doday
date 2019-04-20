import * as React from 'react';
import * as cuid from 'cuid';
import Tooltip from 'rc-tooltip';
import Slider, { Handle } from 'rc-slider';
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
  Size,
  Activity,
  Space,
} from '@root/lib/common-interfaces';
import { activityTypeColor, detectURL } from '@root/lib/utils';
import {
  ClearParsedMetadataAction,
  CreateAndTakeDodayAction,
  ParseUrlMetadataAction,
  SelectGoalAction,
  CreateDodayAction,
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
  createDodayActionCreator: (doday: SerializedDoday) => CreateDodayAction;
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
  dateIsLocked: boolean;
  isPublic: boolean;
  estimateTime: string;
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
      dateIsLocked: false,
      estimateTime: 'PT60M',
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

    const resource = parsedMetadata && {
      ...parsedMetadata,
      did: cuid(),
    };

    const newDoday = {
      did: cuid(),
      activityType,
      type: DodayTypes.Doday,
      duration: this.state.estimateTime,
      name: this.state.dodayName || parsedMetadata.title,
      tags:
        this.state.selectedTags &&
        this.state.selectedTags.map(tag => tag.value),
      date: this.state.date.getTime(),
      dateIsLocked: this.state.dateIsLocked,
      resource: resource,
      public: this.state.isPublic,
      relatedGoal: selectedGoal && selectedGoal.did,
    };

    if (this.state.isPublic) {
      delete newDoday.relatedGoal;
      this.props.createDodayActionCreator(newDoday);
    } else {
      this.props.createAndTakeDoday(newDoday);
    }
  };

  handleGoalSelect = selected => {
    const goal =
      this.props.goals &&
      this.props.goals.find(goal => goal.did === selected.value);
    this.props.selectGoalActionCreator(goal);
  };

  handleEstimateTimeChange = props => {
    const { value, dragging, index, ...restProps } = props;
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const time = hours ? `${hours}h ${minutes}m` : `${minutes}m`;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={time}
        visible={dragging}
        placement="top"
        key={index}
        overlayClassName={css.timeTooltip}
      >
        <Handle value={time} {...restProps} />
      </Tooltip>
    );
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
          size={Size.Large}
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
        <LayoutBlock
          childFlex
          paddingTop={Space.Small}
          paddingBottom={Space.Small}
        >
          <LayoutBlock childFlex flex={'1'}>
            <Select
              isDisabled={this.state.isPublic}
              value={selectedGoal && selectedValueFromGoal(selectedGoal)}
              onChange={this.handleGoalSelect}
              placeholder="Related to goal"
              options={goalsForSelect}
            />
          </LayoutBlock>
          <LayoutBlock childFlex flex={'1'} spaceLeft={Space.XSmall}>
            <CustomDatePicker
              lightBorder
              withLocker
              isLocked={this.state.dateIsLocked}
              icon={<Icons.Clock />}
              minDate={new Date()}
              selected={this.state.date}
              onChange={this.handleChangeDate}
              onLocked={() =>
                this.setState({
                  dateIsLocked: !this.state.dateIsLocked,
                })
              }
              className={css.datePickerInput}
            />
          </LayoutBlock>
        </LayoutBlock>
        <LayoutBlock spaceBelow={Space.Small} direction="column">
          <Text color={TypographyColor.Disabled}>Estimate time:</Text>
          <Slider
            min={0}
            max={8 * 60}
            defaultValue={60}
            onChange={value =>
              this.setState({
                estimateTime: `PT${value}M`,
              })
            }
            handle={this.handleEstimateTimeChange}
            step={10}
          />
        </LayoutBlock>
        <LayoutBlock childFlex flex={'1'} paddingBottom={Space.Small}>
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
              onClick={() => this.setState({ isPublic: false })}
            >
              Private
            </Button>
            <Button
              active={isPublic}
              size={ButtonSize.small}
              onClick={() => {
                this.setState({ isPublic: true });
              }}
            >
              Public
            </Button>
          </ButtonGroup>
          <Button
            primary
            disabled={!this.state.dodayName && !parsedMetadata}
            isLoading={loading}
            onClick={this.handleCreateDoday}
          >
            Create
          </Button>
        </LayoutBlock>
      </>
    );
  }
}

export const selectedValueFromGoal = (goal: Goal) => ({
  label: goal.name,
  value: goal.did,
});
