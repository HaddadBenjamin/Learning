import IAuthentificationState, { authentificationInitialState } from './authentification.state';
import { AuthentificationAction, AuthentificationActions } from './authentification.action';
import parseAccessToken from './utilities/parseAccessToken';
import { setAuthenticationFromLocalStorage } from './authentification.local-storage';

const authentificationReducer = (
  state : IAuthentificationState = authentificationInitialState,
  action : AuthentificationActions,
) : IAuthentificationState => {
  switch (action.type) {
    case AuthentificationAction.LOGIN_REQUEST: return {
      ...state,
    };

    case AuthentificationAction.LOGIN_SUCCESS: {
      console.log('login:success, user roles :', parseAccessToken(action.payload.access_token).extension_ROLE);

      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: true,
        jwtToken: action.payload,
        parsedAccessToken: parseAccessToken(action.payload.access_token),
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    case AuthentificationAction.LOGIN_FAILED: {
      console.log('login:failed', action.error);

      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: false,
        jwtToken: undefined,
        parsedAccessToken: undefined,
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    case AuthentificationAction.GET_REFRESH_TOKEN_SUCCESS: {
      console.log('get-refresh-token:success', action.payload);

      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: true,
        jwtToken: action.payload,
        parsedAccessToken: parseAccessToken(action.payload.access_token),
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    case AuthentificationAction.GET_REFRESH_TOKEN_FAILED: {
      console.log('get-refresh-token:failed', action.error);

      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: false,
        jwtToken: undefined,
        parsedAccessToken: undefined,
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    default: return state;
  }
};

export default authentificationReducer;
