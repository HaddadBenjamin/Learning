import {useEffect, useState} from "react";
import {lazyStore} from "../../../../../domains/root/root.store";
import {Saga} from "redux-saga";

const useLazySaga = (key : string, getSaga : () => Promise<Saga>) =>
{
	const [sagaIsInjected, setSagaIsInjected] = useState(lazyStore.doesSagaHasBeenInjected(key))
	
	useEffect(() =>
	{
		const asyncInjectSaga = async () =>
		{
			if (!sagaIsInjected)
			{
				const saga = await getSaga()
				
				lazyStore.injectSaga(key, saga)
				
				setSagaIsInjected(true)
			}
		}
		
		asyncInjectSaga()
	}, [])
	
	return sagaIsInjected
}

export default useLazySaga