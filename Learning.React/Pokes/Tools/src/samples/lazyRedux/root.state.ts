import {FakeDomainState} from "./fakeDomain.state";
import {FeatureFlagState} from "../../shared/domains/featureFlag/featureFlag.state";

export interface ApplicationState
{
	fakeDomain? : FakeDomainState
	featureFlags? : FeatureFlagState
}

export const initialApplicationState : ApplicationState =
{
}