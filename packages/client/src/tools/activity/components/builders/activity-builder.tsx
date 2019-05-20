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
  Button,
  ButtonSize,
  ButtonGroup,
  Icons,
  Switcher,
  SwitcherItem,
} from '@shared';
import {
  TypographySize,
  TypographyColor,
  Size,
  Space,
  ActivityType,
} from '@root/lib/common-interfaces';
import { detectURL } from '@root/lib/utils';
import { Tag } from '@root/lib/models/entities/tag';
import { CustomDatePicker } from '@root/components/shared/_atoms/custom-datepicker';
import { ParsedUrlView, BuilderProps } from '@root/components/pages/builder';
import { SerializedResource } from '@root/lib/models/entities/resource';
import * as activitiesBuilderActions from '../../duck';
import * as dodaysApiActions from '@ducks/api/dodays-api-actions';
import { RootState } from '@root/lib/models';
import {
  CreateDodayAction,
  CreateAndTakeDodayAction,
} from '@root/ducks/api/dodays-api-actions/actions';
import {
  SerializedDodayLike,
  SerializedProgressLike,
  WithTools,
  DodayType,
} from '@root/tools/types';
import {
  ParseUrlMetadataAction,
  ClearParsedUrlMetadataAction,
  SetActivityTypeAction,
} from '../../duck/actions';
import {
  SerializedActivity,
  SerializedActivityProgress,
} from '../../entities/activity';
import { WithTranslation, withTranslation } from 'react-i18next';

const vars = require('@styles/_config.scss');
const css = require('./activity-builder.module.scss');

interface ActivityBuilderProps extends BuilderProps {}

interface PropsFromConnect {
  loading: boolean;
  isUrlParsing: boolean;
  parsedMetadata?: any;
  activityType: ActivityType;
  ownerDID: string;
  createDodayActionCreator(
    doday: SerializedDodayLike,
    resource: SerializedResource
  ): CreateDodayAction;
  createAndTakeDodayActionCreator(payload: {
    doday: SerializedDodayLike;
    progress: SerializedProgressLike;
    resource?: SerializedResource;
  }): CreateAndTakeDodayAction;
  setActivityTypeActionCreator(type: ActivityType): SetActivityTypeAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedUrlMetadataActionCreator: () => ClearParsedUrlMetadataAction;
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

type Props = ActivityBuilderProps &
  WithTools &
  Partial<PropsFromConnect> &
  WithTranslation;

export class ActivityBuilderComponentClass extends React.Component<
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
        (parsedTags &&
          parsedTags.map(tag => ({
            label: tag,
            value: tag,
          }))) ||
        [];
      this.setState({
        dodayName: '',
        selectedTags: this.state.selectedTags
          ? this.state.selectedTags.concat(mappedTags)
          : mappedTags,
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
    const { parsedMetadata, activityType, ownerDID } = this.props;

    const resource = parsedMetadata && {
      ...parsedMetadata,
      did: cuid(),
    };

    const activity: SerializedActivity = {
      did: cuid(),
      activityType,
      type: DodayType.Activity,
      duration: this.state.estimateTime,
      name: this.state.dodayName || parsedMetadata.title,
      tags:
        this.state.selectedTags &&
        this.state.selectedTags.map(tag => tag.value),
      public: this.state.isPublic,
      ownerDID,
    };

    const progress: SerializedActivityProgress = {
      date: this.state.date.getTime(),
      dateIsLocked: this.state.dateIsLocked,
      completed: false,
      ownerDID,
    };

    if (this.state.isPublic) {
      /** Just create Activity(Doday) node */
      this.props.createDodayActionCreator(activity, resource);
    } else {
      /** Create Activity(Doday) node and Progress node */
      this.props.createAndTakeDodayActionCreator({
        doday: activity,
        progress,
        resource,
      });
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

  private get activitTypesSwitcherItems(): SwitcherItem[] {
    return ['do', 'read', 'watch'];
  }

  render() {
    const {
      loading,
      clearParsedUrlMetadataActionCreator,
      setActivityTypeActionCreator,
      isUrlParsing,
      parsedMetadata,
      t,
    } = this.props;

    const { isPublic } = this.state;

    // const goalsForSelect = goals.map(goal => ({
    //   label: goal.name,
    //   value: goal.did,
    // }));

    return (
      <>
        <LayoutBlock insideElementsMargin valign="vflex-center">
          <Text size={TypographySize.s} color={TypographyColor.Disabled}>
            {t('builder.activityType')}:
          </Text>
          {loading || isUrlParsing ? (
            <Icons.InlineLoader />
          ) : (
            <Switcher
              items={this.activitTypesSwitcherItems}
              onChange={item => setActivityTypeActionCreator(item)}
              render={type => activityIconByType(type, 30, vars.gray8)}
            />
          )}
        </LayoutBlock>
        <Input
          size={Size.Large}
          value={this.state.dodayName}
          onChange={this.onChangeInput}
          onPressEnter={this.handleCreateDoday}
          placeholder={t('builder.namePlaceholder')}
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
          <CustomDatePicker
            disabled={this.state.isPublic}
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
        <LayoutBlock spaceBelow={Space.Small} direction="column">
          <Text color={TypographyColor.Disabled}>
            {t('builder.estimateTime')}:
          </Text>
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
            step={5}
          />
        </LayoutBlock>
        <LayoutBlock childFlex flex={'1'} paddingBelow={Space.Small}>
          <div>
            <AsyncCreatableSelect
              value={this.state.selectedTags}
              onChange={(value: Tag[]) => {
                this.setState({ selectedTags: value });
              }}
              placeholder={t('builder.tagsPlaceholder')}
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
              {t('builder.private')}
            </Button>
            <Button
              active={isPublic}
              size={ButtonSize.small}
              onClick={() => {
                this.setState({ isPublic: true });
              }}
            >
              {t('builder.public')}
            </Button>
          </ButtonGroup>
          <Button
            primary
            disabled={!this.state.dodayName && !parsedMetadata}
            isLoading={loading}
            onClick={this.handleCreateDoday}
          >
            {t('builder.create')}
          </Button>
        </LayoutBlock>
      </>
    );
  }
}

export const activityIconByType = (
  type: ActivityType,
  size = 20,
  color = vars.black
) => {
  switch (type) {
    case 'do':
      return <Icons.ActivityDoType width={size} height={size} color={color} />;
    case 'read':
      return (
        <Icons.ActivityReadType width={size} height={size} color={color} />
      );
    case 'watch':
      return (
        <Icons.ActivityWatchType width={size} height={size} color={color} />
      );
  }
};

const mapState = (state: RootState) => ({
  ownerDID: state.auth.hero && state.auth.hero.did,
  activityType: state.builder.tools.activities.activityType,
  isUrlParsing: state.builder.tools.activities.isUrlParsing,
  parsedMetadata: state.builder.tools.activities.parsedMetadata,
  loading: state.builder.status.loading,
});

export const ActivityBuilder = connect(
  mapState,
  {
    ...dodaysApiActions.actions.actionCreators,
    ...activitiesBuilderActions.actions.actionCreators,
  }
)(withTranslation('activities')(ActivityBuilderComponentClass));
