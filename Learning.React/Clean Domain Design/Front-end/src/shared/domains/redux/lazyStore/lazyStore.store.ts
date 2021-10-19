import {
	combineReducers,
	Reducer,
	ReducersMapObject,
	createStore,
	StoreEnhancer,
	PreloadedState, Store
} from 'redux';
import {ILazyStore} from "./lazyStore.model";
import {Task} from "@redux-saga/types";
import {Saga} from "redux-saga";
import {SagaMiddleware} from "@redux-saga/core";

class LazyStore<TApplicationState> implements ILazyStore
{
	store : Store
	defaultReducers: Reducer
	sagaMiddleware : SagaMiddleware
	injectedSagas : Map<string, Task>
	injectedReducers : ReducersMapObject
	
	constructor(
		defaultReducers: Reducer,
		preloadedState: PreloadedState<TApplicationState>,
		enhancer: StoreEnhancer,
		sagaMiddleware : SagaMiddleware,
		rootSagas? : Saga)
	{
		this.defaultReducers = defaultReducers
		this.sagaMiddleware = sagaMiddleware
		this.injectedReducers = { }
		
		this.store = createStore(this.createRootReducer(), preloadedState, enhancer)
		
		this.injectedSagas = new Map<string, Task>(rootSagas ? [
			['root', sagaMiddleware.run(rootSagas)]
		] : [])
	}
	
	injectReducer = (key : string, reducer : Reducer) : void =>
	{
		if (Object.hasOwnProperty.call(this.injectedReducers, key))
			return;
		
		this.injectedReducers[key] = reducer;
		this.store.replaceReducer(this.createRootReducer(this.injectedReducers));
	};
	
	injectSaga = (key : string, saga : Saga) : void =>
	{
		if (this.injectedSagas.has(key))
			return;
		
		const task = this.sagaMiddleware.run(saga);
		
		this.injectedSagas.set(key, task);
	}
	
	createRootReducer = (lazyLoadedReducers? : ReducersMapObject) : Reducer =>
		combineReducers(
			{ ...this.defaultReducers, ...lazyLoadedReducers }
		);
}

export default LazyStore