import {IIdState, idsInitialState} from "../ids/ids.state";

export interface ApplicationState
{
	ids : IIdState
}

export const initialApplicationState : ApplicationState =
{
	ids : idsInitialState
}