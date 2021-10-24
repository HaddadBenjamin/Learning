import { useConfiguration } from "../../shared/domains/configuration/hooks/useConfiguration"

const ConfigurationSample = () =>
{
	const configuration = useConfiguration()
	
	return <>
		<h2>Configuration par variables d'environnements</h2>
		<div>{JSON.stringify(configuration)}</div>
	</>
}

export default ConfigurationSample