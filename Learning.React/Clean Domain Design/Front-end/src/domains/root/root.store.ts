import { createStore } from 'redux';
import rootReducer from './root.reducer';
import {initialApplicationState} from './root.state'
import middlewares, {sagaMiddleware} from "./root.middleware";
import watchTodosSagas from "domains/todo/todo.saga";

const store = createStore(rootReducer, initialApplicationState, middlewares)

sagaMiddleware.run(watchTodosSagas)

export default store;