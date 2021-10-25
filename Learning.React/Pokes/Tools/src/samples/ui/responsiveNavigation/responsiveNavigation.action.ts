import {SetActiveElementActionPayload} from "./responsiveNavigation.model";

export enum NavigationAction
{
	SET_ACTIVE_ELEMENT = "navigation/SET_ACTIVE_ELEMENT",
}

export interface SetActiveElementAction
{
	type: NavigationAction.SET_ACTIVE_ELEMENT,
	payload : SetActiveElementActionPayload
}

export const setActiveElementAction = (title : string) : SetActiveElementAction => ({
	type: NavigationAction.SET_ACTIVE_ELEMENT,
	payload : { title }
})

export type NavigationActions =
	SetActiveElementAction