import {createStore, Reducer, Store} from 'redux';
import { createLazyRootReducer } from './root.reducer';
import {initialApplicationState} from './root.state'
import middlewares from "./root.middleware";
import rootSagas, {sagaMiddleware} from "./root.saga";

export interface LazyStore extends Store
{
	lazyLoadedReducers : Map<string, Reducer>
}

const createLazyStore = () : LazyStore =>
{
	const store = createStore(createLazyRootReducer(), initialApplicationState, middlewares)

	// @ts-ignore
	store.lazyLoadedReducers = { }

	sagaMiddleware.run(rootSagas)

	return store as LazyStore;
}

const store = createLazyStore()

export default store