import { backOfficeApiConfiguration, httpConfiguration} from "../../shared.configuration";
import axios, {AxiosResponse} from "axios";
import {FeatureFlag} from "./featureFlag.model";
import {routes} from "./featureFlag.configuration";

export const baseUrl = `${backOfficeApiConfiguration.baseUrl}${routes.api}`

export const getFeatureFlags = async () : Promise<AxiosResponse<FeatureFlag[]>> =>
	(await axios.get(baseUrl, httpConfiguration.default)).data