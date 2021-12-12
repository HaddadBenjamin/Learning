import {useEffect, useRef} from "react";

// S'execute lors du componentDidUpdate.
// Ne s'éxécute pas lors du componentDidMount.
const useEffectOnUpdate = (callback : () => void, ...dependencies : any[]) =>
{
	const hasBeenMounted = useRef(true)

	useEffect(() =>
	{
		if (!hasBeenMounted.current) callback()
		
		hasBeenMounted.current = false
	}, dependencies)
};

export default useEffectOnUpdate;
