import useToggle from '../../../../shared/hooks/useToggle'
import { useBreakpoints } from '../../../../shared/hooks/useBreakpoints'
import styles from './ResponsiveNavigationSample.module.scss';
import {FC, ReactNode, useRef, useState} from 'react';
import { INavigationElement } from '../responsiveNavigation.model';
import NavigationElement from '../NavigationElement/NavigationElement';
import { initialNavigationElements } from '../responsiveNavigation.mock';
import {useClickOutside} from "../../../../shared/hooks/useClickOutside";

const ResponsiveNavigationSample : FC = () =>
{
	const [navigationElements, setNavigationElements] = useState<INavigationElement[]>(initialNavigationElements)
	const [mobileNavigationIsVisible, toggleMobileNavigation, setMobileNavigationIsVisible] = useToggle(false)
	
	const { smOrBelow } = useBreakpoints()
	
	const componentReference = useRef(null);
	useClickOutside(componentReference, () => setMobileNavigationIsVisible(false));
	
	const selectNavigationElement = (navigationElement : INavigationElement) : void =>
		setNavigationElements(navigationElements.map(n => ({ ...n, active : n.title === navigationElement.title })))
	
	const showNavigationElements = (elements : INavigationElement[]) : ReactNode =>
		elements.map(n => <NavigationElement key={n.title} {...n} selectNavigationElement={selectNavigationElement}/>)
	
	return <header ref={componentReference}>
		<nav className={styles.container}>
			{ /* Vue PC */ }
			{ !smOrBelow && showNavigationElements(navigationElements) }
			
			{ /* Vue Mobile */ }
			{ smOrBelow &&
				<>
					<button className={styles.navigationButton} onClick={toggleMobileNavigation}>
							Navigation button
					</button>
					
					{ !mobileNavigationIsVisible &&showNavigationElements(navigationElements.filter(n => n.active)) }
					
					{ mobileNavigationIsVisible && showNavigationElements(navigationElements) }
				</>
			}
		</nav>
	</header>
}

export default ResponsiveNavigationSample
