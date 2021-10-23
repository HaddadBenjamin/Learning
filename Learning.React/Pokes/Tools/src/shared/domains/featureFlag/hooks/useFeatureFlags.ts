import {useDispatch, useSelector} from "react-redux";
import {selectFeatureFlagsState} from "../featureFlag.selector";
import {featureFlagReducerKey, featureFlagSagaKey} from "../featureFlag.configuration";
import useLazyReducer from "../../redux/lazyRedux/hooks/useLazyReducer";
import useLazySaga from "../../redux/lazyRedux/hooks/useLazySaga";
import {useEffect, useState} from "react";
import {getFeatureFlagsAction} from "../featureFlag.action";
import {FeatureFlag} from "../featureFlag.model";

export const useFeatureFlags = (...featureFlagsIds : number[]) =>
{
	const featureFlagsState = useSelector(selectFeatureFlagsState)
	const dispatch = useDispatch()
	
	const reducerIsInjected = useLazyReducer(featureFlagReducerKey, 'shared/domains/featureFlag/featureFlag.reducer')
	const sagaIsInjected = useLazySaga(featureFlagSagaKey, 'shared/domains/featureFlag/featureFlag.saga')
	
	const [isInitialized, setIsInitialized] = useState(false)
	
	useEffect(() =>
	{
		if (reducerIsInjected && sagaIsInjected && !featureFlagsState.initialized && !isInitialized)
		{
			dispatch(getFeatureFlagsAction())
			setIsInitialized(true)
		}
	}, [reducerIsInjected, sagaIsInjected, featureFlagsState.initialized, isInitialized, dispatch])
	
	const getFeatureFlagById = (ffId : number) : FeatureFlag | undefined =>
		featureFlagsState.featureFlags.find(ff => ff.id === ffId)
	
	return featureFlagsIds
		.filter(getFeatureFlagById)
		.map(ffId => getFeatureFlagById(ffId)?.enable as boolean)
}