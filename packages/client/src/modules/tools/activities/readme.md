## Tools

**Tools** - are autonomous modules to provide new `Entities` to the app and `Actions`, `API` and `UI` (menu item, builder, details page, etc.) for communicate with this `Entities`.

We have abstract basic `CRUD` (such as `create`, `read`, `update`, and `delete` and in our case two additional operations - `take` and `untake`) operations for all types of `Entities`.

But implementation of these operations provided by `Tool` which particular `Entity` belongs to.

For example when a complete action dispatches for some doday with `Activity` entity type -> `Tool` which has this type of `Entity` will be found and specific implementation of the complete action will be dispatched.
