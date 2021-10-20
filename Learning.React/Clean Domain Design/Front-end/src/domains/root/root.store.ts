import LazyStore from "../../shared/domains/redux/lazyRedux/lazyRedux.store";
import rootSagas, {sagaMiddleware} from "./root.saga";
import {initialApplicationState} from "./root.state";
import middlewares from "./root.middleware";
import defaultReducers from "./root.reducer";

export const lazyStore = new LazyStore(
	defaultReducers,
	initialApplicationState,
	middlewares,
	sagaMiddleware,
	rootSagas)

const store = lazyStore.store

export default store