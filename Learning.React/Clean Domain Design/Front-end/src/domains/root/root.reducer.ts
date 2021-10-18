import {combineReducers, ReducersMapObject } from "redux";

const defaultReducers = combineReducers(
	{
		// todos : todoReducer,
	});

export const createLazyRootReducer = (lazyLoadedReducers? : ReducersMapObject) =>
	combineReducers(
		{ ...defaultReducers, ...lazyLoadedReducers}
	);