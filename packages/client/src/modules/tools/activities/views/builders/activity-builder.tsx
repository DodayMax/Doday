import * as React from 'react';
import * as cuid from 'cuid';
import { connect } from 'react-redux';
import Slider, { Handle } from 'rc-slider';
import { WithTranslation, withTranslation } from 'react-i18next';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
  LayoutBlock,
  Icons,
  Switcher,
  SwitcherItem,
  CustomDatePicker,
  ParsedUrlView,
} from '@doday/shared';
import {
  config,
  WithTools,
  RootState,
  Space,
  detectURL,
  durationToLabel,
  Resource,
  DodayLike,
  ProgressLike,
  NodeType,
  ActivityType,
  Activity,
  ActivityProgress,
} from '@doday/lib';
import * as activitiesBuilderActions from '../../duck';
import ducks, {
  CreateDodayAction,
  CreateAndTakeDodayAction,
} from '@doday/ducks';
import {
  ParseUrlMetadataAction,
  ClearParsedUrlMetadataAction,
  SetActivityTypeAction,
  PinActivityAction,
} from '../../duck/actions';
import {
  createStyles,
  Typography,
  Theme,
  withStyles,
  WithStyles,
  Tooltip,
  TextField,
  Chip,
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { RouteComponentProps } from 'react-router';
import { ActivityBuilderState } from '../../duck/reducer';

const css = (theme: Theme) =>
  createStyles({
    margin: {
      margin: `0 ${theme.spacing(1)}px`,
    },
    dodayname: {
      fontSize: '2.6rem',
    },
    label: {
      fontSize: '2.2rem',
    },
    input: {
      fontSize: '1.4rem',
    },
    inputLabel: {
      fontSize: '1.6rem',
    },
    dateContainer: {
      width: '40%',
    },
    spaced: {
      marginBottom: `${config.spacing.spaceXS}px`,
    },
  });

export interface ActivityBuilderProps {}

export interface PropsFromConnect {
  loading: boolean;
  isUrlParsing: boolean;
  parsedMetadata?: any;
  activityType: ActivityType;
  pinned?: boolean;
  ownerDID: string;
  createDodayActionCreator(payload: {
    doday: DodayLike;
    resource: Resource;
  }): CreateDodayAction;
  createAndTakeDodayActionCreator(payload: {
    doday: DodayLike;
    progress: ProgressLike;
    resource?: Resource;
  }): CreateAndTakeDodayAction;
  setActivityTypeActionCreator(type: ActivityType): SetActivityTypeAction;
  pinActivityActionCreator(value: boolean): PinActivityAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedUrlMetadataActionCreator: () => ClearParsedUrlMetadataAction;
}

export interface ActivityBuilderLocalState {
  dodayName: string;
  tagInputValue: string;
  selectedTags: string[];
  parsingFinished?: string;
  date: Date;
  dateIsLocked: boolean;
  isPublic: boolean;
  estimateTime: string;
}

type Props = ActivityBuilderProps &
  WithTools &
  Partial<PropsFromConnect> &
  Partial<RouteComponentProps> &
  WithTranslation &
  WithStyles &
  WithTheme;

export class ActivityBuilderComponentClass extends React.Component<
  Props,
  ActivityBuilderLocalState
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      dodayName: '',
      date: new Date(),
      isPublic: false,
      dateIsLocked: false,
      estimateTime: 'PT60M',
      tagInputValue: '',
      selectedTags: [],
    };
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    if (this.props.isUrlParsing && !nextProps.isUrlParsing) {
      const parsedTags =
        nextProps.parsedMetadata && nextProps.parsedMetadata.keywords;
      this.setState({
        dodayName: '',
        selectedTags: parsedTags
          ? this.state.selectedTags
            ? this.state.selectedTags.concat(parsedTags)
            : parsedTags
          : this.state.selectedTags,
      });
    }

    return true;
  }

  onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = String(e.target.value);
    const matches = detectURL(value);

    if (matches) {
      // parse meta of the link on server
      matches.map(url => this.props.parseUrlMetadataActionCreator!(url));
    }

    this.setState({
      dodayName: value,
    });
  };

  handleChangeDate = (date: Date) => {
    this.setState({
      date,
    });
  };

  handleCreateDoday = () => {
    const { parsedMetadata, activityType, pinned, ownerDID } = this.props;

    const resource = parsedMetadata && {
      ...parsedMetadata,
      did: cuid(),
    };

    const activity: Activity = {
      did: cuid(),
      activityType: activityType!,
      type: NodeType.Activity,
      duration: this.state.estimateTime,
      name: this.state.dodayName || parsedMetadata.title,
      tags: this.state.selectedTags || [],
      public: this.state.isPublic,
      ownerDID: ownerDID!,
      created: new Date(),
    };

    const progress: ActivityProgress = {
      date: this.state.date,
      dateIsLocked: this.state.dateIsLocked,
      pinned,
      completed: false,
      ownerDID,
    };

    if (this.state.isPublic) {
      /** Just create Activity(Doday) node */
      this.props.createDodayActionCreator!({ doday: activity, resource });
    } else {
      /** Create Activity(Doday) node and Progress node */
      this.props.createAndTakeDodayActionCreator!({
        doday: activity,
        progress,
        resource,
      });
    }
    this.props.history!.push('/dashboard');
  };

  handleEstimateTimeChange = (props: any) => {
    const { value, dragging, index, ...restProps } = props;
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const time = hours ? `${hours}h ${minutes}m` : `${minutes}m`;
    return (
      <Tooltip open={dragging} title={time} placement="top">
        <Handle value={time} {...restProps} />
      </Tooltip>
    );
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      // enter
      this.handleCreateDoday();
    }
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
      classes,
      pinned,
      theme,
      t,
    } = this.props;

    const { isPublic } = this.state;

    return (
      <>
        <LayoutBlock insideElementsMargin valign="vflexCenter">
          <Typography variant="subtitle2">
            {t('builder.activityType')}:
          </Typography>
          {loading || isUrlParsing ? (
            <Icons.InlineLoader color={theme.palette.action.active} />
          ) : (
            <Switcher
              items={this.activitTypesSwitcherItems}
              onChange={(item: ActivityType) =>
                setActivityTypeActionCreator!(item)
              }
              render={(type: ActivityType) =>
                activityIconByType(type, 30, config.colors.grey8)
              }
            />
          )}
        </LayoutBlock>
        <TextField
          id="dodayname-input"
          label={t('builder.namePlaceholder')}
          value={this.state.dodayName}
          onChange={this.onChangeInput}
          margin="normal"
          onKeyDown={this.onKeyDown}
          InputProps={{
            classes: {
              input: classes.dodayname,
            },
          }}
        />
        <ParsedUrlView
          onClose={() => {
            this.setState({
              // TODO: replace only removed parsed link from text
              dodayName: '',
            });
            clearParsedUrlMetadataActionCreator!();
          }}
          loading={isUrlParsing}
          parsedMetadata={parsedMetadata}
        />
        <LayoutBlock
          paddingAbove={Space.Small}
          paddingBelow={Space.Small}
          className={classes.dateContainer}
        >
          <CustomDatePicker
            disabled={this.state.isPublic}
            lightBorder
            withLocker
            isLocked={this.state.dateIsLocked}
            icon={<ScheduleIcon />}
            minDate={new Date()}
            selected={this.state.date}
            onChange={this.handleChangeDate}
            tooltip={t('activities:builder.lockDateTooltip')}
            onLocked={() =>
              this.setState({
                dateIsLocked: !this.state.dateIsLocked,
              })
            }
          />
          <Tooltip
            title={
              <Typography variant="caption">
                {t('builder.pinDodayTooltip')}
              </Typography>
            }
            placement="top"
          >
            {
              <IconButton
                onClick={() => this.props.pinActivityActionCreator!(!pinned)}
              >
                {pinned ? <Icons.Pin color="primary" /> : <Icons.Pin />}
              </IconButton>
            }
          </Tooltip>
        </LayoutBlock>
        <LayoutBlock spaceBelow={Space.Small} direction="column">
          <LayoutBlock
            insideElementsMargin
            valign="vflexCenter"
            spaceBelow={Space.XSmall}
          >
            <Typography variant="subtitle2">
              {t('builder.estimateTime')}:
            </Typography>
            <Chip
              label={durationToLabel(this.state.estimateTime, {
                hour: t('shell:time.h'),
                minute: t('shell:time.m'),
              })}
              color="default"
            />
          </LayoutBlock>
          <Slider
            min={0}
            max={8 * 60}
            defaultValue={60}
            onChange={value =>
              this.setState({
                estimateTime: `PT${value}M`,
              })
            }
            step={5}
          />
        </LayoutBlock>
        <LayoutBlock childFlex flex={'1'} paddingBelow={Space.Small}>
          <LayoutBlock direction="column" flex="1">
            <TextField
              id="standard-with-placeholder"
              label="Write tag and hit enter to describe your doday"
              placeholder="HTML, React, etc."
              value={this.state.tagInputValue}
              onChange={e => this.setState({ tagInputValue: e.target.value })}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  this.setState({
                    selectedTags: [
                      ...this.state.selectedTags,
                      this.state.tagInputValue,
                    ],
                    tagInputValue: '',
                  });
                }
              }}
              InputProps={{
                classes: {
                  input: classes.tagInput,
                },
              }}
            />
            <LayoutBlock wrap spaceAbove={Space.Small} insideElementsMargin>
              {this.state.selectedTags.map((tag, index) => {
                return (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={e => {
                      const newArray = [...this.state.selectedTags];
                      newArray.splice(index, 1);
                      this.setState({
                        selectedTags: newArray,
                      });
                    }}
                    className={classes.spaced}
                  />
                );
              })}
            </LayoutBlock>
          </LayoutBlock>
        </LayoutBlock>
        <LayoutBlock insideElementsMargin align="flexEnd" valign="vflexCenter">
          <FormControlLabel
            control={
              <Switch
                checked={isPublic}
                onChange={() =>
                  this.setState({ isPublic: !this.state.isPublic })
                }
                color="primary"
              />
            }
            label={t('builder.public')}
          />
          {!loading ? (
            <Button
              color="primary"
              variant="contained"
              disabled={!this.state.dodayName && !parsedMetadata}
              onClick={this.handleCreateDoday}
            >
              {t('builder.create')}
            </Button>
          ) : (
            <Icons.InlineLoader color={theme.palette.action.active} />
          )}
        </LayoutBlock>
      </>
    );
  }
}

export const activityIconByType = (
  type: ActivityType,
  size = 20,
  color = config.colors.black,
  tooltipPlacement: TooltipProps['placement'] = 'top'
) => {
  switch (type) {
    case 'do':
      return (
        <Tooltip
          key={cuid()}
          title={
            <Typography variant="caption">{`Activity type: ${type}`}</Typography>
          }
          placement={tooltipPlacement}
        >
          <Icons.ActivityDoType width={3} height={3} key={cuid()} />
        </Tooltip>
      );
    case 'read':
      return (
        <Tooltip
          key={cuid()}
          title={
            <Typography variant="caption">{`Activity type: ${type}`}</Typography>
          }
          placement={tooltipPlacement}
        >
          <Icons.ActivityReadType width={3} height={3} key={cuid()} />
        </Tooltip>
      );
    case 'watch':
      return (
        <Tooltip
          key={cuid()}
          title={
            <Typography variant="caption">{`Activity type: ${type}`}</Typography>
          }
          placement={tooltipPlacement}
        >
          <Icons.ActivityWatchType width={3} height={3} key={cuid()} />
        </Tooltip>
      );
  }
};

const mapState = (state: RootState) => ({
  ownerDID: state.auth.hero && state.auth.hero.did,
  activityType:
    state.activities && (state.activities as ActivityBuilderState).activityType,
  pinned: state.activities && (state.activities as ActivityBuilderState).pinned,
  isUrlParsing:
    state.activities && (state.activities as ActivityBuilderState).isUrlParsing,
  parsedMetadata:
    state.activities &&
    (state.activities as ActivityBuilderState).parsedMetadata,
});

export const ActivityBuilder = connect(
  mapState,
  {
    ...ducks.sidebar.actions,
    ...activitiesBuilderActions.actions.actionCreators,
  }
)(
  withTranslation('activities')(
    withStyles(css)(withTheme(ActivityBuilderComponentClass))
  )
);
