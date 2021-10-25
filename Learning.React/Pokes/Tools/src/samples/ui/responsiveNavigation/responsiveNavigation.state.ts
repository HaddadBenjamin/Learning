import {INavigationElement} from "./responsiveNavigation.model";

export interface NavigationState
{
	elements : INavigationElement[]
}

export const initialNavigationState : NavigationState =
{
	elements: [
		{title: 'Home', active: true, href: '/'},
		{title: 'About', href: 'about'},
		{title: 'Skills', href: 'skills'},
		{title: 'Projects', href: 'projects'},
		{title: 'CV', href: 'cv'}
	]
}