import useToggle from '../../../../shared/hooks/useToggle'
import { useBreakpoints } from '../../../../shared/hooks/useBreakpoints'
import styles from './ResponsiveNavigationSample.module.scss';
import React, {FC, lazy, ReactNode, useRef} from 'react';
import { INavigationElement } from '../responsiveNavigation.model';
import NavigationElement from '../NavigationElement/NavigationElement';
import {useClickOutside} from "../../../../shared/hooks/useClickOutside";
import useLazyReducer from "../../../../shared/domains/redux/lazyRedux/hooks/useLazyReducer";
import {navigationReducerKey, routes} from "../responsiveNavigation.configuration";
import {useDispatch, useSelector} from "react-redux";
import {selectNavigationElements} from "../responsiveNavigation.selector";
import {setActiveElementAction} from "../responsiveNavigation.action";
import { BrowserRouter, Switch, Route } from "react-router-dom"

const LazyHome = lazy(() => import('../FakeRouterComponents/Home'))
const LazyAbout = lazy(() => import('../FakeRouterComponents/About'))
const LazySkills = lazy(() => import('../FakeRouterComponents/Skills'))
const LazyProjects = lazy(() => import('../FakeRouterComponents/Projects'))
const LazyCV = lazy(() => import('../FakeRouterComponents/CV'))

const ResponsiveNavigationSample : FC = () =>
{
	const [mobileNavigationIsVisible, toggleMobileNavigation, setMobileNavigationIsVisible] = useToggle(false)
	
	const { smOrBelow } = useBreakpoints()
	
	const componentReference = useRef(null);
	useClickOutside(componentReference, () => setMobileNavigationIsVisible(false));
	
	const navigationReducerIsInjected = useLazyReducer(navigationReducerKey, 'samples/ui/responsiveNavigation/responsiveNavigation.reducer')
	const navigationElements = useSelector(selectNavigationElements)
	const dispatch = useDispatch()
	
	const selectNavigationElement = (navigationElement : INavigationElement) =>
		dispatch(setActiveElementAction(navigationElement.title))
	
	const showNavigationElements = (elements : INavigationElement[]) : ReactNode =>
		elements.map(n => <NavigationElement key={n.title} {...n} selectNavigationElement={selectNavigationElement}/>)
	
	return <BrowserRouter>
		<header ref={componentReference}>
			{ navigationReducerIsInjected &&
				<nav className={styles.container}>
					{ /* Vue PC */ }
					{ !smOrBelow && showNavigationElements(navigationElements) }
					
					{ /* Vue Mobile */ }
					{ smOrBelow &&
						<>
							<button className={styles.navigationButton} onClick={toggleMobileNavigation}>
									Navigation button
							</button>
							
							{ !mobileNavigationIsVisible && showNavigationElements(navigationElements.filter(n => n.active)) }
							
							{ mobileNavigationIsVisible && showNavigationElements(navigationElements) }
						</>
					}
				</nav>
			}
		</header>
		
		<React.Suspense fallback={<span>Loading...</span>}>
			<Switch>
				<Route path={routes.home}  exact component={LazyHome} />
				<Route path={routes.about} exact component={LazyAbout} />
				<Route path={routes.skills} exact component={LazySkills} />
				<Route path={routes.projects} exact component={LazyProjects} />
				<Route path={routes.cv} exact component={LazyCV} />
			</Switch>
		</React.Suspense>
	</BrowserRouter>
}

export default ResponsiveNavigationSample