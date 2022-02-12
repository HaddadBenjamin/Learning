import IAuthentificationState, { authentificationInitialState } from './authentification.state';
import getFromLocalStorage from '../../utilities/localStorage/getFromLocalStorage';
import setFromLocalStorage from '../../utilities/localStorage/setFromLocalStorage';
import deleteFromLocalStorage from "../../utilities/localStorage/deleteFromLocalStorage";

const AUTHENTIFICATION_LOCAL_STORAGE_KEY = 'authentification';

export const getAuthentificationFromLocalStorage = () : IAuthentificationState => getFromLocalStorage(AUTHENTIFICATION_LOCAL_STORAGE_KEY, authentificationInitialState);

export const setAuthenticationFromLocalStorage = (authentificationState : IAuthentificationState) : void => setFromLocalStorage(AUTHENTIFICATION_LOCAL_STORAGE_KEY, authentificationState);

export const EMAIL_LOCAL_STORAGE_KEY = 'email';

export const getEmailFromLocalStorage = (initialEmail? : string) : string | undefined => getFromLocalStorage(EMAIL_LOCAL_STORAGE_KEY, initialEmail);

export const setEmailFromLocalStorage = (email? : string) : void => setFromLocalStorage(EMAIL_LOCAL_STORAGE_KEY, email);

export const removeEmailFromLocalStorage = () : void => deleteFromLocalStorage(EMAIL_LOCAL_STORAGE_KEY);

export default AUTHENTIFICATION_LOCAL_STORAGE_KEY;
