import {useEffect} from "react";

const LazyComponent = () =>
{
	// const { sagaIsInjected } = useLazySaga('key', path)
	// const { reducerIsInjected } = useLazyReducer('key', path)
	// useEffect(() => { if (sagaIsInjected && reducerIsInjected) dispatch(action), [sagaIsInjected, reducerIsInjected])
	// const message = useSelector(selectMessage)
	
	return <div>
		<div>Lazy component has been loaded with its reducer and saga</div>
		<div>Does reducer has been injected : { /* reducerIsInjected */}</div>
		<div>Does saga has been injected : { /* sagaIsInjected */}</div>
		<div>Message from the store lazy loaded : { /* message */}</div>
	</div>
}

export default LazyComponent