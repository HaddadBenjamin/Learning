import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getIdsFailedAction,
  getIdsSuccessAction,
  getPaginateIdsFailedAction,
  GetPaginateIdsRequestAction,
  getPaginateIdsSuccessAction,
  IdAction,
} from './ids.action';
import {
	getIds,
	getPaginateIds,
} from '../../shared/domains/lazyLoad/lazyPagination/pagination.api';
import {IPaginateResponse} from '../../shared/domains/lazyLoad/lazyPagination/pagination.model';

export function* getIdsSaga() {
  try {
    const movies: number[] = yield call(getIds);
	
	  yield put(getIdsSuccessAction(movies));
  } catch (error: any) {
    yield put(getIdsFailedAction(error.message));
  }
}

export function* getPaginateIdsSaga(action: GetPaginateIdsRequestAction) {
  try {
    const { page, pageSize } = action.payload;
    const paginateResponse: IPaginateResponse<number> = yield call(
      getPaginateIds,
      page,
      pageSize
    );
    yield put(getPaginateIdsSuccessAction(paginateResponse));
  } catch (error: any) {
    yield put(getPaginateIdsFailedAction(error.message));
  }
}

export default function* idsSaga(): Generator {
  yield takeLatest(IdAction.GET_IDS_REQUEST, getIdsSaga);
  yield takeLatest(IdAction.GET_PAGINATE_IDS_REQUEST, getPaginateIdsSaga);
}
