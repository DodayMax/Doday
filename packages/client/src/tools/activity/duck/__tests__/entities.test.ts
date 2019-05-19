import {
  serializeActivity,
  deserializeActivity,
  serializeActivityProgress,
  deserializeActivityProgress,
  isActivity,
} from '../../entities/activity';
import {
  deserializedActivity,
  serializedActivity,
  deserialzedActivityProgress,
  serializedActivityProgress,
} from '@root/lib/common-interfaces/fake-data';
import { DodayType } from '@root/tools/types';

describe('Test activities serialize helper functions', () => {
  it('serialize activity', () => {
    expect(serializeActivity(deserializedActivity)).toEqual(serializedActivity);
  });

  it('deserialize activity', () => {
    expect(deserializeActivity(serializedActivity)).toEqual(
      deserializedActivity
    );
  });

  it('serialize activity progress', () => {
    expect(serializeActivityProgress(deserialzedActivityProgress)).toEqual(
      serializedActivityProgress
    );
  });

  it('deserialize activity progress', () => {
    expect(deserializeActivityProgress(serializedActivityProgress)).toEqual(
      deserialzedActivityProgress
    );
  });

  it('isActivity returns correct value', () => {
    expect(isActivity(deserializedActivity)).toBe(true);
    deserializedActivity.type = DodayType.FlashCard;
    expect(isActivity(deserializedActivity)).toBe(false);
  });
});
