import {createStore, Reducer } from 'redux';
import { createLazyRootReducer } from './root.reducer';
import {initialApplicationState} from './root.state'
import middlewares from "./root.middleware";
import rootSagas, {sagaMiddleware} from "./root.saga";
import {LazyStore} from "./root.model";
import {Task} from "@redux-saga/types";

const store = createStore(createLazyRootReducer(), initialApplicationState, middlewares) as LazyStore

store.injectedReducers = { }
store.injectedSagas = new Map<string, Task>([
	['root', sagaMiddleware.run(rootSagas)]
])

store.injectReducer = (key : string, reducer : Reducer) =>
{
	if (Object.hasOwnProperty.call(store.injectedReducers, key))
		return;
	
	store.injectedReducers[key] = reducer;
	store.replaceReducer(createLazyRootReducer(store.injectedReducers));
};

store.injectSaga = (key, saga) =>
{
	if (store.injectedSagas.has(key))
		return;
	
	const task = sagaMiddleware.run(saga);
	
	store.injectedSagas.set(key, task);
}

export default store