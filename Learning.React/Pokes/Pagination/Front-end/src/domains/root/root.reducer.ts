import {combineReducers } from "redux";
import movieReducer from "../movies/movies.reducer";

export const rootReducer = combineReducers(
	{
		movies : movieReducer
	});
