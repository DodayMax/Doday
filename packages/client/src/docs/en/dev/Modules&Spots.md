# Modules & Spots System

`Module` and `Spot` are two basic concepts from which the entire application is built.

`Module` - an independent program module that provides certain functionality (view, logic, state) for one particular `spot`.

`Spot` - a specific place in the application's layout where a view of a specific `module` can be placed.

Initially there is only one `spot` in the app that takes up the entire screen of the application.

But `modules` can provide new `spots` in their views, so that as new `modules` are installed, more `spots` for views registered in the application.

![](../../../assets/docs2019-11-20-23-56-38.png)

Every registered `spot` has a configuration object to describe `spot` and connect suited `module` to it.

### Spot's configuration object:

```typescript
{
  /**
   * Layout spot sysname
   */
  sysname: AnySpot;
  /**
   * Desktop or Mobile
   */
  layoutType?: LayoutType;
  /**
   * NodeLabel for which view is needed
   */
  node?: NodeLabel;
  /**
   * Render all suitable modules which has views
   */
  multiple?: boolean;
}
```

To place new `spot` in the layout of the `module` you have to describe new `spot` by providing configuration object and use `<Spot />` component in one of your `module`'s view:

```typescript
<Spot {...spotConfigurationObject} />
```

When the app starts and your `module` will be installed, `Spot` component will find a suitable `module` for this `spot` if there are any available for a `Hero`.

Since one `module` can occupy only one `spot`, it is quite difficult to provide a serious feature within the framework of one `module`, to provide this opportunity there are [Tools]() - which combine `modules` into collections.
