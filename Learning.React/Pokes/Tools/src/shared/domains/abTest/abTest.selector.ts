import {ApplicationState} from "../../../samples/lazyRedux/root.state";
import {AbTestState, initialAbTestsState} from "./abTest.state";

export const selectAbTestsState = (state : ApplicationState) : AbTestState =>
	state?.abTests ?? initialAbTestsState