import {FakeDomainState} from "./fakeDomain.state";
import {FeatureFlagState} from "../../shared/domains/featureFlag/featureFlag.state";
import {AbTestState} from "../../shared/domains/abTest/abTest.state";
import {NavigationState} from "../ui/responsiveNavigation/responsiveNavigation.state";

export interface ApplicationState
{
	fakeDomain? : FakeDomainState
	featureFlags? : FeatureFlagState
	abTests? : AbTestState
	navigation? : NavigationState
}

export const initialApplicationState : ApplicationState =
{
}