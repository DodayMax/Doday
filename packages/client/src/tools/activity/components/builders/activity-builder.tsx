import * as React from 'react';
import * as cuid from 'cuid';
import * as moment from 'moment';
import { connect } from 'react-redux';
import Slider, { Handle } from 'rc-slider';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {
  LayoutBlock,
  Icons,
  Switcher,
  SwitcherItem,
  CustomDatePicker,
} from '@shared';
import { Space, ActivityType } from '@root/lib/common-interfaces';
import { detectURL, durationToLabel } from '@root/lib/utils';
import { Tag } from '@root/lib/models/entities/tag';
import { ParsedUrlView, BuilderProps } from '@root/components/pages/builder';
import {
  SerializedResource,
  Resource,
} from '@root/lib/models/entities/resource';
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
  DodayLike,
  ProgressLike,
} from '@root/tools/types';
import {
  ParseUrlMetadataAction,
  ClearParsedUrlMetadataAction,
  SetActivityTypeAction,
} from '../../duck/actions';
import {
  SerializedActivity,
  SerializedActivityProgress,
  ActivityProgress,
  Activity,
} from '../../entities/activity';
import { WithTranslation, withTranslation } from 'react-i18next';
import DoneIcon from '@material-ui/icons/Done';
import ScheduleIcon from '@material-ui/icons/Schedule';
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
} from '@material-ui/core';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { config } from '@root/styles/config';

const vars = require('@styles/_config.scss');

const css = (theme: Theme) =>
  createStyles({
    margin: {
      margin: `0 ${theme.spacing.unit}px`,
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

interface ActivityBuilderProps extends BuilderProps {}

interface PropsFromConnect {
  loading: boolean;
  isUrlParsing: boolean;
  parsedMetadata?: any;
  activityType: ActivityType;
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
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedUrlMetadataActionCreator: () => ClearParsedUrlMetadataAction;
}

interface ActivityBuilderState {
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
  WithTranslation &
  WithStyles;

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
      tagInputValue: '',
      selectedTags: [],
    };
  }

  shouldComponentUpdate(nextProps): boolean {
    if (this.props.isUrlParsing && !nextProps.isUrlParsing) {
      const parsedTags =
        nextProps.parsedMetadata && nextProps.parsedMetadata.keywords;
      this.setState({
        dodayName: '',
        selectedTags: this.state.selectedTags
          ? this.state.selectedTags.concat(parsedTags)
          : parsedTags,
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

    const activity: Activity = {
      did: cuid(),
      activityType,
      type: DodayType.Activity,
      duration: this.state.estimateTime,
      name: this.state.dodayName || parsedMetadata.title,
      tags: this.state.selectedTags || [],
      public: this.state.isPublic,
      ownerDID,
      created: new Date(),
    };

    const progress: ActivityProgress = {
      date: this.state.date,
      dateIsLocked: this.state.dateIsLocked,
      completed: false,
      ownerDID,
    };

    if (this.state.isPublic) {
      /** Just create Activity(Doday) node */
      this.props.createDodayActionCreator({ doday: activity, resource });
    } else {
      /** Create Activity(Doday) node and Progress node */
      this.props.createAndTakeDodayActionCreator({
        doday: activity,
        progress,
        resource,
      });
    }
  };

  handleEstimateTimeChange = props => {
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
            <Icons.InlineLoader />
          ) : (
            <Switcher
              items={this.activitTypesSwitcherItems}
              onChange={item => setActivityTypeActionCreator(item)}
              render={type => activityIconByType(type, 30, vars.gray8)}
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
          InputLabelProps={{
            FormLabelClasses: {
              root: classes.label,
            },
          }}
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
            <Icons.InlineLoader />
          )}
        </LayoutBlock>
      </>
    );
  }
}

export const activityIconByType = (
  type: ActivityType,
  size = 20,
  color = vars.black,
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
)(
  withTranslation('activities')(withStyles(css)(ActivityBuilderComponentClass))
);
