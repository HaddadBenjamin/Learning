import { createStore } from 'redux';
import rootReducer from './root.reducer';
import {initialApplicationState} from './root.state'
import middlewares from "./root.middleware";
import rootSagas, {sagaMiddleware} from "./root.saga";

const store = createStore(rootReducer, initialApplicationState, middlewares)

sagaMiddleware.run(rootSagas)

export default store;