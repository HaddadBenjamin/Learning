import {useEffect, useState} from "react";
import {lazyStore} from "../../../../../samples/lazyRedux/root.store";

const useLazySaga = (key : string, path : string) =>
{
	const [sagaIsInjected, setSagaIsInjected] = useState(lazyStore.doesSagaHasBeenInjected(key))
	
	useEffect(() =>
	{
		const asyncInjectSaga = async () =>
		{
			if (!sagaIsInjected)
			{
				const { default : saga } = await import('../../../../../' + path)
				
				lazyStore.injectSaga(key, saga)
				
				setSagaIsInjected(true)
			}
		}
		
		asyncInjectSaga()
	}, // eslint-disable-next-line
	[])
	
	return sagaIsInjected
}

export default useLazySaga