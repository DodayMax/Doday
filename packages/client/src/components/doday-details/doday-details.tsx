import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { TypographySize, TypographyColor } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '../shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text, Icons, EditableDatePicker } from '@components';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { Doday, SerializedDoday } from '@root/lib/models/entities/Doday';
import { Button, ButtonSize } from '../shared/_atoms/button';
import {
  DeleteDodayAction,
  RemoveDodayAction,
  UpdateDodayAction,
} from '@root/ducks/doday-app/actions';
import { Marker } from '../shared/_atoms/marker';
import { activityTypeColor, youtubeIDFromURL } from '@root/lib/utils';
import { Resource } from '@root/lib/models/entities/Resource';
import { LayoutBlock } from '../shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  UpdateSelectedDodayAction,
} from '@root/ducks/doday-details/actions';

const css = require('./doday-details.module.scss');

const initialState: DodayDetailsState = {
  updates: {},
  dirty: false,
};

interface DodayDetailsProps {}

interface DodayDetailsState {
  updates: {
    name?: string;
    date?: Date;
  };
  dirty: boolean;
}

interface PropsFromConnect {
  loading: boolean;
  myDID?: string;
  selectedDoday: Doday;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  updateDodayActionCreator: (
    did: string,
    updates: Partial<SerializedDoday>
  ) => UpdateDodayAction;
  deleteDoday: (doday: Doday) => DeleteDodayAction;
  removeDoday: (doday: Doday) => RemoveDodayAction;
  updateSelectedDodayActionCreator: (
    did: string,
    updates: Partial<Doday>
  ) => UpdateSelectedDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

@(withRouter as any)
class DodayDetails extends React.Component<
  DodayDetailsProps & PropsFromConnect & RouteComponentProps<any>,
  DodayDetailsState
> {
  constructor(props) {
    super(props);

    this.state = {
      updates: {},
      dirty: false,
    };
  }

  componentDidMount() {
    //fetch selected doday with graphQL
    const did = this.props.match.params.did;
    this.props.fetchSelectedDodayActionCreator(did);
  }

  getYouTubeLink = (resource: Resource) => {
    if (resource && resource.provider === 'YouTube') {
      const youtubeID = youtubeIDFromURL(resource.url);
      if (youtubeID) {
        return `https://www.youtube.com/embed/${youtubeID}`;
      }
    }
  };

  render() {
    const {
      loading,
      history,
      selectedDoday,
      updateSelectedDodayActionCreator,
      clearSelectedDodayActionCreator,
      updateDodayActionCreator,
      myDID,
    } = this.props;

    const { dirty, updates } = this.state;

    if (!selectedDoday) {
      return 'Loading...';
    }

    const IAMOwner =
      selectedDoday.owner.did && myDID && selectedDoday.owner.did === myDID;

    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        text={'Delete'}
        onClick={() => {
          if (IAMOwner) {
            this.props.deleteDoday(selectedDoday);
          } else {
            this.props.removeDoday(selectedDoday);
          }
          history.push('/');
        }}
      />,
    ];

    // Add owner actions
    if (IAMOwner && dirty) {
      actions.unshift(
        <Button
          primary
          key={2}
          disabled={!dirty}
          size={ButtonSize.small}
          text={loading ? 'Saving...' : 'Save'}
          onClick={() => {
            updateDodayActionCreator(selectedDoday.did, {
              date: updates.date.getTime(),
            });
            updateSelectedDodayActionCreator(selectedDoday.did, updates);
            this.setState(initialState);
          }}
        />
      );
    }

    const status = [
      <Marker
        key={1}
        rounded
        color={activityTypeColor(selectedDoday.activityType)}
        text={selectedDoday.activityType}
      />,
    ];

    const resource = selectedDoday.resource;
    const videoPreview = resource && resource.image;
    const youtubeLink = this.getYouTubeLink(resource);

    return (
      <Page
        header={
          <PageHeader
            status={status}
            actions={actions}
            onClose={clearSelectedDodayActionCreator}
          />
        }
      >
        <LayoutBlock insideElementsMargin>
          <EditableDatePicker
            selectedDate={updates.date || selectedDoday.date}
            onChange={date =>
              this.setState({
                dirty:
                  moment(date).format('ll') !==
                  moment(selectedDoday.date).format('ll'),
                updates: { date },
              })
            }
          />
          {youtubeLink && (
            <LayoutBlock insideElementsMargin valign="vflex-center">
              <Icons.Goal width={16} height={16} />
              <Text size={TypographySize.s}>25m 27s</Text>
              <Text size={TypographySize.s} color={TypographyColor.Disabled}>
                (3% of your day)
              </Text>
            </LayoutBlock>
          )}
        </LayoutBlock>
        <Text size={TypographySize.h1}>{selectedDoday.name}</Text>
        {youtubeLink && (
          <div
            className={css.videoWrapper}
            style={{
              background: `url(${videoPreview})`,
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
        )}
        <Text>{resource.description}</Text>
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  loading: state.dodayDetails.loading,
  myDID: state.auth.hero && state.auth.hero.did,
  selectedDoday: state.dodayDetails.selectedDoday,
});

export default connect(
  mapState,
  {
    ...dodaysActions,
    ...dodayDetailsActions,
  }
)(DodayDetails);
