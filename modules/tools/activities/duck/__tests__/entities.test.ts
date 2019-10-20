import {
  deserializedActivity,
  serializedActivity,
  deserialzedActivityProgress,
  serializedActivityProgress,
  serializeActivity,
  deserializeActivity,
  serializeActivityProgress,
  ActivityProgress,
  deserializeActivityProgress,
  SerializedActivityProgress,
  isEntity,
  NodeType,
} from '@doday/lib';

describe('Test activities serialize helper functions', () => {
  it('serialize activity', () => {
    expect(serializeActivity(deserializedActivity)).toEqual(serializedActivity);
  });

  it('serialize activity with undefined', () => {
    expect(serializeActivity(undefined)).toEqual(undefined);
  });

  it('deserialize activity', () => {
    expect(deserializeActivity(serializedActivity)).toEqual(
      deserializedActivity
    );
  });

  it('deserialize activity with undefined', () => {
    expect(deserializeActivity(undefined)).toEqual(undefined);
  });

  it('serialize activity progress', () => {
    expect(serializeActivityProgress(deserialzedActivityProgress)).toEqual(
      serializedActivityProgress
    );
  });

  it('serialize activity progress with undefined', () => {
    expect(serializeActivityProgress(undefined)).toEqual(undefined);
  });

  it('serialize partial activity progress', () => {
    const partialProgress: Partial<ActivityProgress> = {
      completed: true,
      completedAt: new Date(),
    };
    const serialized = serializeActivityProgress(partialProgress);
    expect(serialized!.hasOwnProperty('completed')).toBe(true);
    expect(serialized!.hasOwnProperty('completedAt')).toBe(true);
    expect(serialized!.hasOwnProperty('date')).toBe(false);
    expect(serialized!.hasOwnProperty('tookAt')).toBe(false);
  });

  it('deserialize activity progress', () => {
    expect(deserializeActivityProgress(serializedActivityProgress)).toEqual(
      deserialzedActivityProgress
    );
  });

  it('deserialize activity progress with undefined', () => {
    expect(deserializeActivityProgress(undefined)).toEqual(undefined);
  });

  it('deserialize activity partial progress', () => {
    const partialProgress: Partial<SerializedActivityProgress> = {
      date: Date.now(),
    };
    const deserialized = deserializeActivityProgress(partialProgress);
    expect(deserialized!.hasOwnProperty('date')).toBe(true);
    expect(deserialized!.hasOwnProperty('tookAt')).toBe(false);
    expect(deserialized!.hasOwnProperty('completedAt')).toBe(false);
  });

  it('isEntity returns correct value', () => {
    expect(isEntity(deserializedActivity)).toBe(true);
    deserializedActivity.type = NodeType.Hero;
    expect(isEntity(deserializedActivity)).toBe(false);
  });
});
