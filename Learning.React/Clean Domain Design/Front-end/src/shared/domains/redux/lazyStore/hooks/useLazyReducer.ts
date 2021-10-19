import {useEffect, useState} from "react";
import {lazyStore} from "../../../../../domains/root/root.store";
import {Reducer} from "redux";

const useLazyReducer = (key : string, getReducer : () => Promise<Reducer>) =>
{
	const [reducerIsInjected, setReducerIsInjected] = useState(lazyStore.doesReducerHasBeenInjected(key))

	useEffect(() =>
	{
		const asyncInjectReducer = async () =>
		{
			if (!reducerIsInjected)
			{
				const reducer = await getReducer()
				
				lazyStore.injectReducer(key, reducer)

				setReducerIsInjected(true)
			}
		}

		asyncInjectReducer()
	}, [])
	
	return reducerIsInjected
}

export default useLazyReducer