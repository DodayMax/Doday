import { firebase, auth, APIService } from '@doday/lib';
import { createAPIUrl } from '../urls';

export const signInWithGoogleFirebaseRequest = () => {
  return auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch((error: firebase.auth.Error) => {
      return {
        error,
      };
    });
};

export const logoutFirebaseRequest = () => {
  return auth.signOut().catch((error: firebase.auth.Error) => {
    return {
      error,
    };
  });
};

export const signinAPIRequest = (token: string) => {
  return APIService.request()
    .json()
    .post(createAPIUrl().auth.signin, { token });
};

export const meAPIRequest = () => {
  return APIService.request()
    .json()
    .get(createAPIUrl().auth.me);
};
