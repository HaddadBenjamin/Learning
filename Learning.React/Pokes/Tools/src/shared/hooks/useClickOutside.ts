import { useEffect, RefObject } from "react";

export const useClickOutside = (ref : RefObject<HTMLElement>, callback : () => void) : void =>
{
	useEffect(() => {
		
		const onClickAway = (event : any) =>
		{
			if (ref.current && !ref.current.contains(event.target))
				callback()
		}
		
		window.addEventListener("mousedown", onClickAway);
		
		return () => window.removeEventListener("mousedown", onClickAway);
	}, [ref]);
}