import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { TypographySize, TypographyColor } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '../shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text, Icons } from '@components';
import { actions as dodaysActions } from '@ducks/doday-app';
import { Doday } from '@root/lib/models/entities/Doday';
import { Button, ButtonSize } from '../shared/_atoms/button';
import {
  DeleteDodayAction,
  RemoveDodayAction,
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
} from '@root/ducks/doday-app/actions';
import { Marker } from '../shared/_atoms/marker';
import { activityTypeColor, youtubeIDFromURL } from '@root/lib/utils';
import { Resource } from '@root/lib/models/entities/Resource';
import { LayoutBlock } from '../shared/_atoms/layout-block';

const css = require('./doday-details.module.scss');

interface DodayDetailsProps {}

interface PropsFromConnect {
  myDID?: string;
  selectedDoday: Doday;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  deleteDoday: (doday: Doday) => DeleteDodayAction;
  removeDoday: (doday: Doday) => RemoveDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

@(withRouter as any)
class DodayDetails extends React.Component<
  DodayDetailsProps & PropsFromConnect & RouteComponentProps<any>
> {
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
      history,
      selectedDoday,
      clearSelectedDodayActionCreator,
      myDID,
    } = this.props;

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

    const status = [
      <Marker
        key={1}
        rounded
        color={activityTypeColor(selectedDoday.activityType)}
        text={selectedDoday.activityType}
      />,
      <Text>{IAMOwner ? 'I am owner' : ''}</Text>,
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
          <Text size={TypographySize.s}>
            {moment(selectedDoday.date).format('ll')}
          </Text>
          {youtubeLink && (
            <LayoutBlock insideElementsMargin>
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
  myDID: state.auth.hero && state.auth.hero.did,
  selectedDoday: state.dodayApp.selectedDoday,
});

export default connect(
  mapState,
  {
    ...dodaysActions,
  }
)(DodayDetails);
