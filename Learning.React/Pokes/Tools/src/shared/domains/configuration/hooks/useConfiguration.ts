import { deepMerge } from "../../../utils/deepMerge";
import { Configuration } from "../configuration.model";

let configuration: Configuration | undefined;
export default (): Configuration => {
  if (!configuration)
    configuration = deepMerge(
      JSON.parse(process.env.REACT_APP_CONFIGURATION_BASE as string),
      JSON.parse(process.env.REACT_APP_CONFIGURATION_CURRENT as string)
    ) as Configuration;

  return configuration;
};
