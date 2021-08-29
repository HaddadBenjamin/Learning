import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware} from "redux";

export const sagaMiddleware = createSagaMiddleware()
const middlewares = composeWithDevTools({})(applyMiddleware(sagaMiddleware))

export default middlewares