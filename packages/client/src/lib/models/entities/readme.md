## Entity

To create new Entity you need follow these steps:

1. Create all types and functions to create new `Entity` object.
   It looks like this:

```
export const ActivityEntity: Entity = {
  type: DodayType.Activity,
  name: 'activity',
  serialize: serializeActivity,
  deserialize: deserializeActivity,
  serializeProgress: serializeActivityProgress,
  deserializeProgress: deserializeActivityProgress,
  isEntity: (doday: DodayLike) => boolean,
};
```

Also, you need to extends `Base` interfaces, like this:

```
interface Activity extends DodayBase {}
```

2. Second, you need to add new `Entity` to common union types (`./common.ts`) to make development process easier:

- `DodayType`
- `DodayLike`
- `SerializedDodayLike`
- `ProgressLike`
- `SerializedProgressLike`
- `APIResponseDodayLike` (if you have this type)
- `APIResponseProgressLike` (if you have this type)
