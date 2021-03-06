import {
    combineEpics,
    Epic
} from "redux-observable";
import {
    from,
    of
} from "rxjs";
import {isOfType} from "typesafe-actions";
import {
    catchError,
    filter,
    map,
    startWith,
    switchMap
} from "rxjs/operators";
import {IGlobalState} from "../reducers";
import {
    AuthentificationAction,
    AuthentificationActionTypes,
    facebookLogged,
    facebookLoggingFailed,
    googleLogged,
    googleLoggingFailed,
    logged,
    loggedOut,
    loggingFailed,
    loggingOutFailed,
    signed,
    signingFailed
} from "../actions/authentification.action";
import api from "../shared/helpers/api";
import {
    LoginResponse,
    SigninResponse
} from "../models/authentification.model";
import axios, {AxiosResponse} from 'axios'
import errors from "../shared/helpers/error";

type AuthentificationEpic = Epic<AuthentificationAction, AuthentificationAction, IGlobalState>;

const signinAuthentificationEpic: AuthentificationEpic = (action$, state$) => action$.pipe(
    filter(isOfType(AuthentificationActionTypes.SIGNIN)),
    switchMap(action =>
        from(api.post('authentification/signin', {
            Username: action.payload.username,
            Password: action.payload.password
        })).pipe(
            map((response: AxiosResponse<SigninResponse>) => signed(response.data.Token, response.data.Username)),
            catchError((error) => of(signingFailed(errors.getErrorMessage(error))))
        ))
);

const loginAuthentificationEpic: AuthentificationEpic = (action$, state$) => action$.pipe(
    filter(isOfType(AuthentificationActionTypes.LOGIN)),
    switchMap(action =>
        from(api.post('authentification/login', {
            Username: action.payload.username,
            Password: action.payload.password
        })).pipe(
            map((response: AxiosResponse<LoginResponse>) => logged(response.data.Token, response.data.Username)),
            catchError((error) => of(loggingFailed(errors.getErrorMessage(error))))
        ))
);

const googleLoginAuthentificationEpic: AuthentificationEpic = (action$, state$) => action$.pipe(
    filter(isOfType(AuthentificationActionTypes.GOOGLE_LOGIN)),
    switchMap(action =>
            from(api.post('authentification/loginwithgoogle', {
                TokenId: action.payload.tokenId,
            })).pipe(
            map((response: AxiosResponse<LoginResponse>) => googleLogged(response.data.Token, response.data.Username)),
            catchError((error) => of(googleLoggingFailed(errors.getErrorMessage(error))))
        ))
);

const facebookLoginAuthentificationEpic: AuthentificationEpic = (action$, state$) => action$.pipe(
    filter(isOfType(AuthentificationActionTypes.FACEBOOK_LOGIN)),
    switchMap(action =>
        from(api.post('authentification/loginwithfacebook', {
            Name: action.payload.name,
            Email: action.payload.email,
        })).pipe(
            map((response: AxiosResponse<LoginResponse>) => facebookLogged(response.data.Token, response.data.Username)),
            catchError((error) => of(facebookLoggingFailed(errors.getErrorMessage(error))))
        ))
);

const logoutAuthentificationEpic: AuthentificationEpic = (action$, state$) => action$.pipe(
    filter(isOfType(AuthentificationActionTypes.LOGOUT)),
    switchMap(action =>
        from(api.post('authentification/logout', {
        }, state$.value.authentification.token)).pipe(
            map(() => loggedOut()),
            catchError((error) => of(loggingOutFailed(errors.getErrorMessage(error))))
        ))
);

export default combineEpics(
    signinAuthentificationEpic,
    loginAuthentificationEpic,
    googleLoginAuthentificationEpic,
    facebookLoginAuthentificationEpic,
    logoutAuthentificationEpic);