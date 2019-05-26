import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import {
  TypographySize,
  TypographyColor,
  Space,
} from '@root/lib/common-interfaces';
import { Page, PageHeader } from '@shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text, Icons, CustomDatePicker } from '@shared';
import { actions as dodaysApiActions } from '@ducks/api/dodays-api-actions';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { Button, ButtonSize } from '@shared/_atoms/button';
import { Marker } from '@shared/_atoms/marker';
import {
  activityTypeColor,
  youtubeIDFromURL,
  durationToLabel,
  durationToMinutes,
} from '@root/lib/utils';
import { Resource } from '@root/lib/models/entities/resource';
import { LayoutBlock } from '@shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
} from '@root/ducks/doday-details/actions';
import { Pageflow } from '@root/components/shared/_support/pageflow';
import {
  TakeDodayAction,
  UntakeDodayAction,
} from '@root/ducks/api/dodays-api-actions/actions';
import { Activity } from '../../entities/activity';
import { DodayType, ProgressLike } from '@root/tools/types';
import { activityIconByType } from '../builders/activity-builder';
import { WithTranslation, withTranslation } from 'react-i18next';
import ScheduleIcon from '@material-ui/icons/Schedule';

const vars = require('@styles/_config.scss');
const css = require('./activity-details.module.scss');

interface ActivityDetailsProps {}

interface ActivityDetailsState {
  date: Date;
  dateIsLocked: boolean;
}

interface PropsFromConnect {
  loading: boolean;
  myDID?: string;
  selectedDoday: Activity;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  takeDodayActionCreator(payload: {
    did: string;
    type: DodayType;
    progress: Partial<ProgressLike>;
  }): TakeDodayAction;
  untakeDodayActionCreator(payload: {
    did: string;
    type: DodayType;
  }): UntakeDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

type Props = ActivityDetailsProps &
  Partial<PropsFromConnect> &
  Partial<RouteComponentProps<any>> &
  WithTranslation;

@(withRouter as any)
@Pageflow({ path: '/dodays/:did' })
export class ActivityDetailsComponentClass extends React.Component<
  Props,
  ActivityDetailsState
> {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      dateIsLocked: false,
    };
  }

  getYouTubeLink = (resource: Resource) => {
    if (resource && resource.provider === 'YouTube') {
      const youtubeID = youtubeIDFromURL(resource.url);
      if (youtubeID) {
        return `https://www.youtube.com/embed/${youtubeID}`;
      }
    }
  };

  isOwner = () => {
    const { selectedDoday, myDID } = this.props;
    return (
      selectedDoday.owner.did && myDID && selectedDoday.owner.did === myDID
    );
  };

  actions = () => {
    const { history, selectedDoday, loading, t } = this.props;
    const actions = [];

    if (selectedDoday.progress) {
      actions.push(
        <Button
          key={1}
          isLoading={loading}
          size={ButtonSize.small}
          onClick={() => {
            this.props.untakeDodayActionCreator({
              did: selectedDoday.did,
              type: selectedDoday.type,
            });
          }}
        >
          {t('activities:details.actions.untake')}
        </Button>
      );
    }

    return actions;
  };

  status = () => {
    const { selectedDoday } = this.props;
    const markers = [
      activityIconByType(selectedDoday.activityType, 30, vars.gray8),
    ];
    if (selectedDoday.resource && selectedDoday.resource.icon) {
      markers.push(
        <img
          className={css.resourceStatusIcon}
          src={selectedDoday.resource.icon}
        />
      );
    }
    return markers;
  };

  onRequestClose = () => {
    this.props.clearSelectedDodayActionCreator();
  };

  renderTakeDodayBlock = () => {
    const { selectedDoday, loading, t } = this.props;
    if (selectedDoday.progress) {
      return <>{t('activities:details.status.alreadyTaken')}</>;
    }

    return (
      <>
        <LayoutBlock>
          <CustomDatePicker
            borderless
            minDate={new Date()}
            icon={<ScheduleIcon />}
            selected={new Date(this.state.date)}
            onChange={date => {
              this.setState({
                date,
              });
            }}
          />
          <Button
            borderless
            active={this.state.dateIsLocked}
            onClick={() => {
              this.setState({
                dateIsLocked: !this.state.dateIsLocked,
              });
            }}
          >
            {this.state.dateIsLocked ? <Icons.Locked /> : <Icons.Unlocked />}
          </Button>
        </LayoutBlock>
        <Button
          isLoading={loading}
          primary
          onClick={() => {
            this.props.takeDodayActionCreator({
              did: selectedDoday.did,
              type: selectedDoday.type,
              progress: {
                date: this.state.date,
                dateIsLocked: this.state.dateIsLocked,
                completed: false,
                ownerDID: this.props.myDID,
              },
            });
          }}
        >
          {t('activities:details.actions.take')}
        </Button>
      </>
    );
  };

  render() {
    const { selectedDoday, t } = this.props;

    const resource = selectedDoday && selectedDoday.resource;
    const preview = resource && resource.image;
    const youtubeLink = this.getYouTubeLink(resource);

    return (
      <Page
        header={
          <PageHeader
            withClose
            status={selectedDoday && this.status()}
            actions={selectedDoday && this.actions()}
            onClose={this.onRequestClose}
          />
        }
      >
        {selectedDoday ? (
          <>
            <LayoutBlock insideElementsMargin>
              {selectedDoday.duration && (
                <LayoutBlock insideElementsMargin valign="vflexCenter">
                  <Icons.Duration width={16} height={16} />
                  <Text size={TypographySize.s}>
                    {durationToLabel(selectedDoday.duration, {
                      hour: t('shell:time.h'),
                      minute: t('shell:time.m'),
                    })}
                  </Text>
                  <Text
                    size={TypographySize.s}
                    color={TypographyColor.Disabled}
                  >
                    (
                    {t('activities:details.status.percentOfTheDay', {
                      percent: Math.round(
                        (durationToMinutes(selectedDoday.duration) / (8 * 60)) *
                          100
                      ),
                    })}
                    )
                  </Text>
                </LayoutBlock>
              )}
            </LayoutBlock>
            <Text
              spaceAbove={Space.Medium}
              spaceBelow={Space.Medium}
              size={TypographySize.h1}
            >
              {selectedDoday.name}
            </Text>
            {youtubeLink ? (
              <div
                className={css.videoWrapper}
                style={{
                  background: `url(${preview})`,
                  backgroundSize: 'contain',
                }}
              >
                <iframe
                  frameBorder="0"
                  src={youtubeLink}
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : preview ? (
              <div
                className={css.videoWrapper}
                style={{
                  background: `url(${preview})`,
                  backgroundSize: 'contain',
                }}
              />
            ) : null}
            <Text>{resource && resource.description}</Text>
            <LayoutBlock
              spaceAbove={Space.Medium}
              spaceBelow={Space.Medium}
              paddingAbove={Space.Medium}
              paddingBelow={Space.Medium}
              paddingLeft={Space.Medium}
              paddingRight={Space.Medium}
              direction="column"
              className={css.well}
            >
              <LayoutBlock align="spaceBetween" valign="vflexCenter">
                {this.renderTakeDodayBlock()}
              </LayoutBlock>
            </LayoutBlock>
          </>
        ) : null}
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  loading: state.dodayDetails.loading,
  myDID: state.auth.hero && state.auth.hero.did,
  selectedDoday: state.dodayDetails.selectedDoday,
});

export const ActivityDetails = connect(
  mapState,
  {
    ...dodaysActions,
    ...dodayDetailsActions,
    ...dodaysApiActions,
  }
)(withTranslation(['shell', 'activities'])(ActivityDetailsComponentClass));
