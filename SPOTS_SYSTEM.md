# Spots system

Layout of the Doday app uses Spots system.

Initially app has one `AppSpot.Default` occupying entire screen.

Any module has the ability to provide new **spots** for other module's views.

For example, `Layout` core module provides six new **spots**, where you can place views of your module:

- **LayoutSpot.Drawer** - collapsible spot for drawer menu
- **LayoutSpot.Topbar** - top bar spot
- **LayoutSpot.Sidebar (desktop only)** - collapsible sidebar spot for sidebar apps.
- **LayoutSpot.Page** - page spot for main content of the app
- **LayoutSpot.SpeedDial** - spot for speed dial button
- **LayoutSpot.BottomNavigation (mobile only)** - spot for mobile bottom navigation

If you want to put a view of your module in particular space, you have to provide (in the ModuleObject) `spots` prop with an array of the spot's types, that your module supports and provide an implementation of a `getView` function that will return the necessary views according to the passed props.

If you want to provide new **spots** in your module you have to create new `Spot` types for your module in the `@doday/lib` and also add your new types to the union type - `AnySpot`.

Naming convention for layout spots - `${moduleName}Spot.${NameOfTheSpot}`. For example **TopbarSpot.Right**.

After that you just have to add a `<Spot layoutType={LayoutType.Desktop} spot={TopbarSpot.Right} />` to the layout of your module to the place where you want to provide a new spot for other modules.
