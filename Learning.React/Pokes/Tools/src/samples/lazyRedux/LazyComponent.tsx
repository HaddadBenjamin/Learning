import {useEffect} from "react";
import useLazySaga from "../../shared/hooks/useLazySaga";
import useInjectReducer from "../../shared/hooks/useInjectReducer";
import {useDispatch, useSelector} from "react-redux";
import {fakeDomainReducerKey} from "./fakeDomain.reducer";
import {getMessageRequestAction} from "./fakeDomain.action";
import {selectMessage} from "./fakeDomain.selector";
import {fakeDomainSagaKey} from "./fakeDomain.saga";

const LazyComponent = () =>
{
	const dispatch = useDispatch()
	const message = useSelector(selectMessage)
	
	const reducerIsInjected = useInjectReducer(fakeDomainReducerKey, 'samples/lazyRedux/fakeDomain.reducer')
	const sagaIsInjected = useLazySaga(fakeDomainSagaKey, 'samples/lazyRedux/fakeDomain.saga')
	
	useEffect(() =>
	{
		if (sagaIsInjected && reducerIsInjected)
			dispatch(getMessageRequestAction())
	}, [sagaIsInjected, reducerIsInjected, dispatch])
	
	return <div>
		<div>Lazy component has been loaded with its reducer and saga</div>
		<div>Does reducer has been injected : {reducerIsInjected ? 'yes' : 'no'}</div>
		<div>Does saga has been injected : {sagaIsInjected ? 'yes' : 'no'}</div>
		<div>Message from the store lazy loaded : {message}</div>
	</div>
}

export default LazyComponent