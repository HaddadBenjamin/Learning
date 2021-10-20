import {FakeDomainState} from "./fakeDomain.state";

export interface ApplicationState
{
	fakeDomain? : FakeDomainState
}

export const initialApplicationState : ApplicationState = {}