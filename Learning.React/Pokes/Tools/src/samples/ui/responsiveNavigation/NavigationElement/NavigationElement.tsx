import { INavigationElement } from "../responsiveNavigation.model"
import cn from 'classnames'
import styles from './NavigationElement.module.scss';
import {FC} from "react";

interface Props extends INavigationElement
{
	selectNavigationElement : (navigationElement : INavigationElement) => void
}

const NavigationElement : FC<Props> = (navigationElement) =>
{
	const { active, href, title, selectNavigationElement } = navigationElement
	
	return <a
		/* href={href} */
		className={cn(styles.element, active && styles.active)}
		onClick={() => selectNavigationElement(navigationElement)}>
		{title}
	</a>
}

export default NavigationElement