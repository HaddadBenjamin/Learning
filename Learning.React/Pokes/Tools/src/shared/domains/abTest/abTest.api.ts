import { backOfficeApiConfiguration, httpConfiguration} from "../../shared.configuration";
import axios, {AxiosResponse} from "axios";
import {AbTest} from "./abTest.model";
import {routes} from "./abTest.configuration";

export const baseUrl = `${backOfficeApiConfiguration.baseUrl}${routes.api}`

export const getAbTests = async () : Promise<AxiosResponse<AbTest[]>> =>
	(await axios.get(baseUrl, httpConfiguration.platform)).data