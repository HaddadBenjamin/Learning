import login from './authentification.api';
import {
  loginFailedAction,
  loginRequestAction,
  loginSuccessAction,
} from './authentification.action';
import LoginActionPayload from './authentification.model';
import ThunkDispatchType from '../global-state/global-state.model';

const loginThunk = (payload : LoginActionPayload) => async (dispatch : ThunkDispatchType) => {
  try {
    dispatch(loginRequestAction());

    const jwtToken = await login(payload);
    dispatch(loginSuccessAction(jwtToken));

  } catch (error: any) {
    dispatch(loginFailedAction(error.message));
  }
};

export default loginThunk;
