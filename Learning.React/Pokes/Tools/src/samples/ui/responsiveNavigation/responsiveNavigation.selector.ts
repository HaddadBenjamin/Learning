import {INavigationElement} from "./responsiveNavigation.model";
import {initialNavigationState} from "./responsiveNavigation.state";
import {ApplicationState} from "../../lazyRedux/root.state";

export const selectNavigationElements = (state : ApplicationState) : INavigationElement[] =>
	state?.navigation?.elements ?? initialNavigationState.elements