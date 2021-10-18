import {combineReducers, Reducer, ReducersMapObject, Store} from "redux";

const alwaysInjectedReducers = combineReducers(
	{
		// todos : todoReducer,
	});

export const createLazyRootReducer = (lazyLoadedReducers? : ReducersMapObject) =>
	combineReducers(
		{ /* ...alwaysInjectedReducers,*/ ...lazyLoadedReducers}
	);

export const injectReducer = (store : any, key : string, reducer : Reducer) =>
{
	if (Object.hasOwnProperty.call(store.lazyLoadedReducers, key))
		return;
	
	store.lazyLoadedReducers[key] = reducer;
	store.replaceReducer(createLazyRootReducer(store.lazyLoadedReducers));
};