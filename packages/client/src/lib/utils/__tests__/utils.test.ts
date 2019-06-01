import { isDirty } from '@root/lib/utils';
import { activity } from '@root/lib/common-interfaces/fake-data';

describe('test utils functions', () => {
  it('isDirty with empty updates object', () => {
    expect(isDirty(activity, {})).toBe(false);
    /** with isDateLocked updates */
    expect(isDirty(activity, { dateIsLocked: true })).toBe(true);
    /** with isDateLocked equal */
    expect(isDirty(activity, { dateIsLocked: false })).toBe(false);
    /** with isDateLocked undefined equal */
    activity.progress.dateIsLocked = undefined;
    expect(isDirty(activity, { dateIsLocked: false })).toBe(false);
    /** with pinned update */
    expect(isDirty(activity, { pinned: true })).toBe(true);
    /** with pinned equal update */
    expect(isDirty(activity, { pinned: false })).toBe(false);
    /** with pinned undefined update */
    activity.progress.pinned = undefined;
    expect(isDirty(activity, { pinned: false })).toBe(false);
    /** with date update */
    expect(isDirty(activity, { date: new Date() })).toBe(true);
    /** with equal date update */
    expect(isDirty(activity, { date: new Date('2019-02-15') })).toBe(false);
    /** with all updates */
    expect(
      isDirty(activity, {
        date: new Date('2019-02-15'),
        dateIsLocked: true,
        pinned: true,
      })
    ).toBe(true);
    /** with only one true updates */
    expect(
      isDirty(activity, {
        date: new Date('2019-02-15'),
        dateIsLocked: true,
        pinned: false,
      })
    ).toBe(true);
    /** with only one true updates */
    expect(
      isDirty(activity, {
        date: new Date('2019-02-15'),
        dateIsLocked: false,
        pinned: true,
      })
    ).toBe(true);
    /** with all false updates */
    expect(
      isDirty(activity, {
        date: new Date('2019-02-15'),
        dateIsLocked: false,
        pinned: false,
      })
    ).toBe(false);
  });
});
