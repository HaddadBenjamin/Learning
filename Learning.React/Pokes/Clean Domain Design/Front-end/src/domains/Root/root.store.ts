import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './root.reducer';
import {initialApplicationState} from './root.state'
import createSagaMiddleware from 'redux-saga'
import watchTodosSagas from '../Todos/todos.saga';

const sagaMiddleware = createSagaMiddleware()
const middlewares = composeWithDevTools({})(applyMiddleware(sagaMiddleware))
const store = createStore(rootReducer, initialApplicationState, middlewares)

sagaMiddleware.run(watchTodosSagas)

export default store;