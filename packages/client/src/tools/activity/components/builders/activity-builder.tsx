import * as React from 'react';
import * as cuid from 'cuid';
import { connect } from 'react-redux';
import Slider, { Handle } from 'rc-slider';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import { LayoutBlock, Icons, Switcher, SwitcherItem } from '@shared';
import { Space, ActivityType } from '@root/lib/common-interfaces';
import { detectURL, durationToLabel } from '@root/lib/utils';
import { Tag } from '@root/lib/models/entities/tag';
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
import DoneIcon from '@material-ui/icons/Done';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
} from '@material-ui/core';

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
  });

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
  date: string;
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
      date: '2019-02-12',
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

  handleChangeDate = e => {
    this.setState({
      date: e.target.value,
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
      date: new Date(this.state.date).getTime(),
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
          <Typography variant="h6">{t('builder.activityType')}:</Typography>
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
          <TextField
            id="date"
            disabled={this.state.isPublic}
            label={t('activities:builder.date')}
            type="date"
            value={this.state.date}
            onChange={this.handleChangeDate}
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.inputLabel,
              },
            }}
          />
          <Tooltip
            title={
              <Typography variant="body1">
                Lock the date, so that Doday app can't change it using automatic
                algorithms for planning
              </Typography>
            }
            placement="top"
            className={classes.tooltip}
          >
            <IconButton
              onClick={() =>
                this.setState({ dateIsLocked: !this.state.dateIsLocked })
              }
            >
              {this.state.dateIsLocked ? (
                <LockIcon color="primary" />
              ) : (
                <LockOpenIcon />
              )}
            </IconButton>
          </Tooltip>
        </LayoutBlock>
        <LayoutBlock spaceBelow={Space.Small} direction="column">
          <LayoutBlock
            insideElementsMargin
            valign="vflexCenter"
            spaceBelow={Space.XSmall}
          >
            <Typography variant="h6">{t('builder.estimateTime')}:</Typography>
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
  color = vars.black
) => {
  switch (type) {
    case 'do':
      return (
        <Tooltip
          title={
            <Typography variant="body1">{`Activity type: ${type}`}</Typography>
          }
          placement="right"
        >
          <DoneIcon key={cuid()} />
        </Tooltip>
      );
    case 'read':
      return <Icons.ActivityReadType key={cuid()} />;
    case 'watch':
      return <Icons.ActivityWatchType key={cuid()} />;
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
