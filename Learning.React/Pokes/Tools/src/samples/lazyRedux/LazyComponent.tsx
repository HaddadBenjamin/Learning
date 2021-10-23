import {useEffect} from "react";
import useLazySaga from "../../shared/hooks/useLazySaga";
import useLazyReducer from "../../shared/hooks/useLazyReducer";
import {useDispatch, useSelector} from "react-redux";
import {fakeDomainReducerKey} from "./fakeDomain.reducer";
import {getMessageRequestAction} from "./fakeDomain.action";
import {selectMessage} from "./fakeDomain.selector";
import {fakeDomainSagaKey} from "./fakeDomain.saga";
import {useFeatureFlags} from "../../shared/domains/featureFlag/hooks/useFeatureFlags";
import {FeatureFlagIds} from "./fakeDomain.configuration";

const LazyComponent = () =>
{
	const dispatch = useDispatch()
	const message = useSelector(selectMessage)
	
	const reducerIsInjected = useLazyReducer(fakeDomainReducerKey, 'samples/lazyRedux/fakeDomain.reducer')
	const sagaIsInjected = useLazySaga(fakeDomainSagaKey, 'samples/lazyRedux/fakeDomain.saga')
	const [featureFlagIsEnabled] = useFeatureFlags(FeatureFlagIds.fakeDomain)
	
	useEffect(() =>
	{
		if (sagaIsInjected && reducerIsInjected && featureFlagIsEnabled)
			dispatch(getMessageRequestAction())
	}, [sagaIsInjected, reducerIsInjected, featureFlagIsEnabled, dispatch])
	
	return <div>
		<div>Does reducer has been injected : {reducerIsInjected.toString()}</div>
		<div>Does saga has been injected : {sagaIsInjected.toString()}</div>
		<div>Does feature flag is enabled : {featureFlagIsEnabled.toString()}</div>
		<div>Message from the store lazy loaded : {message}</div>
	</div>
}

export default LazyComponent