import {Reducer, ReducersMapObject, Store} from "redux";
import { Saga } from "redux-saga";
import {Task} from "@redux-saga/types";

export interface LazyStore extends Store
{
	injectedReducers : ReducersMapObject
	injectedSagas : Map<string, Task>
	
	injectReducer : (key : string, reducer : Reducer) => void
	injectSaga : (key : string, saga : Saga) => void
}