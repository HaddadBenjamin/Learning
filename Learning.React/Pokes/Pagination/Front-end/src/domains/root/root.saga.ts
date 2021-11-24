import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import moviesSaga from "../movies/movies.saga";

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSagas() : Generator<any, any, any> {
  yield all([
    moviesSaga(),
  ]);
}