# [:Core] Navigation module

Every `route` in the app have to be properly registered.

### Shape of the `RegisteredRoute` object:

```
{
  /**
  * String describes shape of the route
  * For example - '/activity/:id'
  */
  route: string;
  /**
  * RegExp to test a string to compliance with this route
  */
  test: RegExp;
  /**
  * Helper func to create `DodayRoute` object for this
  * route
  */
  create: (...params?, {
    query?: { [key: string]: string; };
    payload?: any;
  }) => DodayRoute;
  /**
  * Helper function to parse url to `DodayRoute` object
  */
  parse: (url: string) => DodayRoute;
}
```

After the new route is registered, you can use it in the app. In the app we operate the `DodayRoute` object.

### Shape of the `DodayRoute` object:

```
{
  /**
  * String describes shape of the route (same as in RegisteredRoute)
  * For example - '/activity/:id'
  */
  route: string;
  /**
  * Parsed `params` from url or created using
  * `RegisteredRoute.create()` helper function
  * For example { id: string; }
  */
  params: { [key: string]: string; };
  /**
  * Query params from url string or created using
  * `RegisteredRoute.create()` helper function
  * For example url like -
  * '/store?node=Activity&duration=60M'
  * Will be parsed to { node: Activity, duration: 60M }
  */
  query: { [key: string]: string; };
  /**
  * Initial full url string
  * For example, '/store?node=Activity&duration=60M'
  */
  url: string;
  /**
  * Payload passed through `create` helper function
  */
  payload?: any;
}
```

### Basic shapes for routes

Three main directions where routes can lead - Modules, Entities and builder route.

In the first case shape of the `route` looks like this:
`/${ModuleSysname}/{param}?{query}`

In the second case:
`/${NodeLabel}/:id`
`/${NodeLabel}/progress/:id`

Third case is the builder route used to create new `Instance` of the `Entity`:
`/builder/${NodeLabel}`

All routes are `lowercase`.

### How it works

In case when the route is pushed into navigation stack from the application interface:

<div style="width: 640px; height: 480px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://www.lucidchart.com/documents/embeddedchart/2fa7d1e1-6d6a-4b46-b690-4925d6822bac" id="TU15NLzyBI7C"></iframe></div>

In case when the route is initially put in the browser location:

<div style="width: 640px; height: 480px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://www.lucidchart.com/documents/embeddedchart/2fa7d1e1-6d6a-4b46-b690-4925d6822bac" id="ck25cz01_Jb4"></iframe></div>
