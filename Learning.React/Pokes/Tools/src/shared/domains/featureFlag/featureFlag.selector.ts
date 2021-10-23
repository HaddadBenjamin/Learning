import {ApplicationState} from "../../../samples/lazyRedux/root.state";
import {FeatureFlagState, initialFeatureFlagsState} from "./featureFlag.state";

export const selectFeatureFlagsState = (state : ApplicationState) : FeatureFlagState =>
	state?.featureFlags ?? initialFeatureFlagsState