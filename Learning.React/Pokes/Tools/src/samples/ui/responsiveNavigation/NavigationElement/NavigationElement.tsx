import { INavigationElement } from "../responsiveNavigation.model"
import cn from 'classnames'
import styles from './NavigationElement.module.scss';
import {FC} from "react";
import { Link } from "react-router-dom"

interface Props extends INavigationElement
{
	selectNavigationElement : (navigationElement : INavigationElement) => void
}

const NavigationElement : FC<Props> = (navigationElement) =>
{
	const { active, href, title, selectNavigationElement } = navigationElement
	
	return <Link
		to={href}
		className={cn(styles.element, active && styles.active)}
		onClick={() => selectNavigationElement(navigationElement)}>
		{title}
	</Link>
}

export default NavigationElement