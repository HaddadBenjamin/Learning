import React, {ChangeEvent, useState, FC} from "react";
import i18next from "i18next";
import {useTranslation} from "react-i18next";

const LocalizationSample: FC = () => {
	const [currentLanguage, setCurrentLanguage] = useState(i18next.languages[0])
	const {t, i18n} = useTranslation()
	
	const onCurrentLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newLanguage = event.target.value
		
		i18n.changeLanguage(newLanguage)
		setCurrentLanguage(newLanguage)
	}
	
	return <>
		<h2>Localization</h2>
		<div>Current language is : {currentLanguage}</div>
		<div>Translate text : {t('Welcome to React')}</div>
		
		<select value={currentLanguage} onChange={onCurrentLanguageChange}>
			<option value="fr">Français</option>
			<option value="en">English</option>
		</select>
	</>
}

export default LocalizationSample