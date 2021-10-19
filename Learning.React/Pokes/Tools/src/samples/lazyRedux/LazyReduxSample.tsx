import React, {Suspense, useState} from "react";

const LazyComponent = React.lazy(() => import('./LazyComponent'));
const LazyReduxSample = () =>
{
	const [componentIsVisible, setComponentIsVisible] = useState(false)
	const showComponent = () => setComponentIsVisible(true)
	
	return <div>
		<h2>Lazy component with lazy reducer & saga</h2>
		{ !componentIsVisible ?
			<button onClick={showComponent}>Click to display id</button> :
			<Suspense fallback={<div>Chargement...</div>}>
				<LazyComponent/>
			</Suspense>
		}
	</div>
}

export default LazyReduxSample