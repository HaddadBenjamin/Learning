import { put, takeLatest } from 'redux-saga/effects';
import {
  FakeDomainAction,
  getMessageFailedAction,
  getMessageSuccessAction,
} from './fakeDomain.action';

export function* getMessageSaga() {
  try {
    yield put(
      getMessageSuccessAction(
        'Ce message a été chargé via un lazy réduceur et une lazy saga',
      ),
    );
  } catch (error: any) {
    yield put(getMessageFailedAction('Houston nous avons un problème !'));
  }
}

export default function* todoSaga(): Generator {
  yield takeLatest(FakeDomainAction.GET_MESSAGE_REQUEST, getMessageSaga);
}

export const fakeDomainSagaKey = 'fakeDomain';
