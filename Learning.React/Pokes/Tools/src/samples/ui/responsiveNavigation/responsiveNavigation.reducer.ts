import {NavigationState, initialNavigationState} from "./responsiveNavigation.state";
import {NavigationActions, NavigationAction} from "./responsiveNavigation.action";

const navigationReducer = (state: NavigationState = initialNavigationState, action: NavigationActions) : NavigationState =>
{
	switch (action.type)
	{
		case NavigationAction.SET_ACTIVE_ELEMENT : return {
			elements : state.elements.map(e => ({...e, active : e.title === action.payload.title }))
		}
		
		default : return state
	}
}
export default navigationReducer