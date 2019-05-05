import * as React from 'react';
import * as cuid from 'cuid';
import { connect } from 'react-redux';
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
} from '@shared';
import Select from 'react-select';
import {
  TypographySize,
  TypographyColor,
  Size,
  Space,
  ActivityType,
} from '@root/lib/common-interfaces';
import { activityTypeColor, detectURL } from '@root/lib/utils';
import { Tag } from '@root/lib/models/entities/tag';
import { DodayTypes } from '@root/lib/models/entities/common';
import { CustomDatePicker } from '@root/components/shared/_atoms/custom-datepicker';
import {
  SerializedActivity,
  SerializedActivityProgress,
} from '@root/lib/models/entities/Activity';
import { ParsedUrlView } from '@root/components/pages/builder';
import { SerializedResource } from '@root/lib/models/entities/resource';
import {
  CreateActivityAction,
  CreateAndTakeActivityAction,
  ParseUrlMetadataAction,
  ClearActivitiesBuilderAction,
  ClearParsedUrlMetadataAction,
  FetchActivityTypesAction,
} from '@tools/activities/duck/actions';
import * as activityBuilderActions from '@tools/activities/duck/actions';
import { RootState } from '@root/lib/models';

const css = require('./activity-builder.module.scss');

interface ActivityBuilderProps {}

interface PropsFromConnect {
  loading: boolean;
  isUrlParsing: boolean;
  parsedMetadata?: any;
  activityType: ActivityType;
  ownerDID: string;
  fetchActivityTypesActionCreator: () => FetchActivityTypesAction;
  createActivityActionCreator: (
    activity: SerializedActivity,
    resource: SerializedResource
  ) => CreateActivityAction;
  createAndTakeActivityActionCreator: (
    activity: SerializedActivity,
    progress: SerializedActivityProgress,
    resource?: SerializedResource
  ) => CreateAndTakeActivityAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedUrlMetadataActionCreator: () => ClearParsedUrlMetadataAction;
  clearActivitiesBuilderActionCreator: () => ClearActivitiesBuilderAction;
}

interface ActivityBuilderState {
  dodayName: string;
  selectedTags?: Tag[];
  parsingFinished?: string;
  date: Date;
  dateIsLocked: boolean;
  isPublic: boolean;
  estimateTime: string;
}

type Props = ActivityBuilderProps & Partial<PropsFromConnect>;

export class ActivityBuilder extends React.Component<
  Props,
  ActivityBuilderState
> {
  constructor(props: Props) {
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
    const { parsedMetadata, activityType = 'do', ownerDID } = this.props;

    const resource = parsedMetadata && {
      ...parsedMetadata,
      did: cuid(),
    };

    const activity: SerializedActivity = {
      did: cuid(),
      activityType,
      type: DodayTypes.Activity,
      duration: this.state.estimateTime,
      name: this.state.dodayName || parsedMetadata.title,
      tags:
        this.state.selectedTags &&
        this.state.selectedTags.map(tag => tag.value),
      public: this.state.isPublic,
      owner: ownerDID,
      ownerDID,
    };

    const progress: SerializedActivityProgress = {
      date: this.state.date.getTime(),
      dateIsLocked: this.state.dateIsLocked,
    };

    if (this.state.isPublic) {
      /** Just create Activity(Doday) node */
      this.props.createActivityActionCreator(activity, resource);
    } else {
      /** Create Activity(Doday) node and Progress node */
      this.props.createAndTakeActivityActionCreator(
        activity,
        progress,
        resource
      );
    }
  };

  handleGoalSelect = selected => {
    // const goal =
    //   this.props.goals &&
    //   this.props.goals.find(goal => goal.did === selected.value);
    // this.props.selectGoalActionCreator(goal);
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
      clearParsedUrlMetadataActionCreator,
      isUrlParsing,
      parsedMetadata,
    } = this.props;

    const { isPublic } = this.state;

    // const goalsForSelect = goals.map(goal => ({
    //   label: goal.name,
    //   value: goal.did,
    // }));

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
            clearParsedUrlMetadataActionCreator();
          }}
          loading={isUrlParsing}
          parsedMetadata={parsedMetadata}
        />
        <LayoutBlock
          childFlex
          paddingAbove={Space.Small}
          paddingBelow={Space.Small}
        >
          <LayoutBlock childFlex flex={'1'}>
            <Select
              isDisabled={this.state.isPublic}
              onChange={this.handleGoalSelect}
              placeholder="Related to goal"
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
        <LayoutBlock childFlex flex={'1'} paddingBelow={Space.Small}>
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

// export const selectedValueFromGoal = (goal: Goal) => ({
//   label: goal.name,
//   value: goal.did,
// });

const mapState = (state: RootState) => ({
  ownerDID: state.auth.hero && state.auth.hero.did,
  activityType: state.builder.activity.activityType,
  isUrlParsing: state.builder.activity.isUrlParsing,
  parsedMetadata: state.builder.activity.parsedMetadata,
  loading: state.builder.status.loading,
  success: state.builder.status.success,
});

export default connect(
  mapState,
  { ...activityBuilderActions.actionCreators }
)(ActivityBuilder);
