import {useBreakpoints} from "../../shared/hooks/useBreakpoints";

const BreakpointsSample = () =>
{
	const breakpoints = useBreakpoints()
	
	return <>
		<h2>useBreakpoints permet d'avoir des informations sur la taille de l'écran</h2>
		<div>Redimensionner la fenêtre et voyez les valeurs se mettre à jour</div>
		<div>{JSON.stringify(breakpoints)}</div>
	</>
}

export default BreakpointsSample