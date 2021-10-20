import {useEffect, useState} from "react";
import {lazyStore} from "../../../../../domains/root/root.store";

const useLazyReducer = (key : string, path : string) =>
{
	const [reducerIsInjected, setReducerIsInjected] = useState(lazyStore.doesReducerHasBeenInjected(key))

	useEffect(() =>
	{
		const asyncInjectReducer = async () =>
		{
			if (!reducerIsInjected)
			{
				const { default : reducer } = await import('../../../../../' + path)
				
				lazyStore.injectReducer(key, reducer)

				setReducerIsInjected(true)
			}
		}

		asyncInjectReducer()
	}, // eslint-disable-next-line
	[])
	
	return reducerIsInjected
}

export default useLazyReducer