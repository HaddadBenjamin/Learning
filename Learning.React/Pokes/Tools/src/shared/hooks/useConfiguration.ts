import { Configuration } from "../domains/configuration/configuration.model";
import { deepMerge } from "../utils/deepMerge";

let configuration: Configuration | undefined;
export default (): Configuration => {
  if (!configuration)
    configuration = deepMerge(
      JSON.parse(process.env.REACT_APP_CONFIGURATION_BASE as string),
      JSON.parse(process.env.REACT_APP_CONFIGURATION_CURRENT as string)
    ) as Configuration;

  return configuration;
};
