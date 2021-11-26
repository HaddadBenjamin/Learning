import {combineReducers } from "redux";
import idReducer from "../ids/ids.reducer";

export const rootReducer = combineReducers(
	{
		ids : idReducer
	});
