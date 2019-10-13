# DoDay API

## Installation

```
$ yarn
```

## Running the app

development

```
$ yarn start
```

watch mode

```
$ yarn start:dev
```

production mode

```
$ yarn start:prod
```

## Test

unit tests

```
$ yarn test
```

e2e tests

```
$ yarn test:e2e
```

test coverage

```
$ yarn test:cov
```

## Setup local environment

### Update Environment Variables

Create `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/doday-api
FIREBASE_DATABASE_URL=https://do-day.firebaseio.com
GOOGLE_APPLICATION_CREDENTIALS=
```

1. Generate `GOOGLE_APPLICATION_CREDENTIALS` file at https://console.firebase.google.com/project/do-day/settings/serviceaccounts/adminsdk and save it securely on your local machine.

2. To get MongoDB instance up an run you can simple use docker:

```
docker run -d -p 127.0.0.1:27017:27017 --name mongo mongo
```
