import reducer, { initialState } from './reducer';
import {
  ActionConstants,
  fetchActivityTypes,
  setActivityTypeActionCreator,
  createActivityActionCreator,
  takeActivityActionCreator,
  createAndTakeActivityActionCreator,
  parseUrlMetadataActionCreator,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  clearActivitiesBuilderActionCreator,
} from './actions';
import {
  serializedActivity,
  partialProgress,
} from '@root/lib/common-interfaces/fake-data';
import { ActivityType } from '@root/lib/common-interfaces';

describe('builder duck', () => {
  describe('builder action creators', () => {
    it('fetch activity types action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.FETCH_ACTIVITY_TYPES,
      };
      expect(fetchActivityTypes()).toEqual(expectedActionObject);
    });

    it('set activity type action creator', () => {
      const type: ActivityType = 'read';
      const expectedActionObject = {
        type: ActionConstants.SET_ACTIVITY_TYPE,
        payload: type,
      };
      expect(setActivityTypeActionCreator(type)).toEqual(expectedActionObject);
    });

    it('create doday action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.CREATE_ACTIVITY,
        payload: serializedActivity,
      };
      expect(createActivityActionCreator(serializedActivity)).toEqual(
        expectedActionObject
      );
    });

    it('take doday action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.TAKE_ACTIVITY,
        payload: partialProgress,
      };
      expect(takeActivityActionCreator(partialProgress)).toEqual(
        expectedActionObject
      );
    });

    it('create doday and progress action creator', () => {
      const payload = {
        activity: serializedActivity,
        progress: partialProgress,
      };
      const expectedActionObject = {
        type: ActionConstants.CREATE_AND_TAKE_ACTIVITY,
        payload,
      };
      expect(
        createAndTakeActivityActionCreator(payload.activity, payload.progress)
      ).toEqual(expectedActionObject);
    });

    it('parse url metadata action creator', () => {
      const url = 'https://www.youtube.com/watch?v=snjnJCZhXUM';
      const expectedActionObject = {
        type: ActionConstants.PARSE_URL,
        payload: url,
      };
      expect(parseUrlMetadataActionCreator(url)).toEqual(expectedActionObject);
    });

    it('set url parsing progress action creator', () => {
      const state = true;
      const expectedActionObject = {
        type: ActionConstants.SET_URL_PARSING_PROGRESS,
        payload: state,
      };
      expect(setUrlParsingProgressActionCreator(state)).toEqual(
        expectedActionObject
      );
    });

    it('set parsed url metadata object action creator', () => {
      const metadata = {
        description:
          'In this video we will set up a quick application that uses the Neo4j driver for Node.js. neo4j is a graph database that is used for storing data that is dyna...',
        icon: 'https://www.youtube.com/yts/img/favicon_144-vfliLAfaB.png',
        image: 'https://i.ytimg.com/vi/snjnJCZhXUM/maxresdefault.jpg',
        keywords: [
          'node.js neo4j',
          'neo4j nodejs',
          'neo4j driver',
          'node.js cypher',
        ],
        language: 'ru',
        provider: 'YouTube',
        title: 'Node.js With Neo4j - Freestyle Coding [2]',
        type: 'video.other',
        url: 'https://www.youtube.com/watch?v=snjnJCZhXUM',
      };
      const expectedActionObject = {
        type: ActionConstants.SET_PARSED_URL_METADATA_OBJECT,
        payload: metadata,
      };
      expect(setParsedUrlMetadataObjectActionCreator(metadata)).toEqual(
        expectedActionObject
      );
    });

    it('clear parsed metadata action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.CLEAR_ACTIVITIES_BUILDER,
      };
      expect(clearActivitiesBuilderActionCreator()).toEqual(
        expectedActionObject
      );
    });
  });

  describe('builder reducer', () => {
    it('set activity types reducer', () => {
      const types: ActivityType = 'read';
      expect(
        reducer(initialState, setActivityTypeActionCreator(types))
      ).toEqual(types);
    });

    it('set builder url parsing progress flag reducer', () => {
      const state = true;
      expect(
        reducer(initialState, setUrlParsingProgressActionCreator(state))
          .isUrlParsing
      ).toBe(true);
    });

    it('set parsed url metadata object reducer', () => {
      const metadata = {
        description:
          'In this video we will set up a quick application that uses the Neo4j driver for Node.js. neo4j is a graph database that is used for storing data that is dyna...',
        icon: 'https://www.youtube.com/yts/img/favicon_144-vfliLAfaB.png',
        image: 'https://i.ytimg.com/vi/snjnJCZhXUM/maxresdefault.jpg',
        keywords: [
          'node.js neo4j',
          'neo4j nodejs',
          'neo4j driver',
          'node.js cypher',
        ],
        language: 'ru',
        provider: 'YouTube',
        title: 'Node.js With Neo4j - Freestyle Coding [2]',
        type: 'video.other',
        url: 'https://www.youtube.com/watch?v=snjnJCZhXUM',
      };
      expect(
        reducer(initialState, setParsedUrlMetadataObjectActionCreator(metadata))
          .parsedMetadata.url
      ).toEqual(metadata.url);
    });

    it('clear parsed metadata reducer', () => {
      const parsedMetadata = {
        description:
          'In this video we will set up a quick application that uses the Neo4j driver for Node.js. neo4j is a graph database that is used for storing data that is dyna...',
        icon: 'https://www.youtube.com/yts/img/favicon_144-vfliLAfaB.png',
        image: 'https://i.ytimg.com/vi/snjnJCZhXUM/maxresdefault.jpg',
        keywords: [
          'node.js neo4j',
          'neo4j nodejs',
          'neo4j driver',
          'node.js cypher',
        ],
        language: 'ru',
        provider: 'YouTube',
        title: 'Node.js With Neo4j - Freestyle Coding [2]',
        type: 'video.other',
        url: 'https://www.youtube.com/watch?v=snjnJCZhXUM',
      };
      const state = {
        ...initialState,
        parsedMetadata,
      };
      expect(
        reducer(state, clearActivitiesBuilderActionCreator()).parsedMetadata
      ).toBe(undefined);
    });
  });
});