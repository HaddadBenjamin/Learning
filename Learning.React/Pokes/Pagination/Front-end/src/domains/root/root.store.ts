import {initialApplicationState} from "./root.state";
import middlewares from "./root.middleware";
import {rootReducer} from "./root.reducer";
import {createStore} from "redux";
import rootSagas, {sagaMiddleware} from "./root.saga";

const store = createStore(rootReducer, initialApplicationState, middlewares)

sagaMiddleware.run(rootSagas)

export default store