import {Reducer, ReducersMapObject, Store} from "redux";
import { Saga } from "redux-saga";
import {Task} from "@redux-saga/types";
import {SagaMiddleware} from "@redux-saga/core";

export interface ILazyStore
{
	store : Store
	defaultReducers : Reducer
	sagaMiddleware : SagaMiddleware
	injectedReducers : ReducersMapObject
	injectedSagas : Map<string, Task>
	
	createRootReducer : (lazyReducers? : ReducersMapObject) => Reducer
	injectReducer : (key : string, reducer : Reducer) => void
	injectSaga : (key : string, saga : Saga) => void
}