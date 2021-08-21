// @ts-ignore

import {combineReducers, createStore} from 'redux';
import {initialRootState, RootState} from "./root.state";
import { composeWithDevTools } from 'redux-devtools-extension';

const staticReducers = {
    ...initialRootState
};

// @ts-ignore
const createReducer = (asyncReducers? : any) => combineReducers({
    ...staticReducers,
    ...asyncReducers,
});

// @ts-ignore
export const store = createStore<RootState>(createReducer(), initialRootState, composeWithDevTools());
// @ts-ignore
store.asyncReducers = {} as { [key: string]: any }

// @ts-ignore
store.injectReducer = (key, asyncReducer) => {
    // @ts-ignore
    store.asyncReducers[key] = asyncReducer;
    // @ts-ignore
    console.log(createReducer(store.asyncReducers))
    // @ts-ignore
    store.replaceReducer(createReducer(store.asyncReducers));
};