import { Button } from "@design-system";
import { capitalize } from "@shared/utils/text";
import { useToggle } from "@shared/hooks";

export const App = () => {
  const { value, toggle } = useToggle();

  return (
    <div>
      <h1>{capitalize("monorepo react")}</h1>
      <Button label={value ? "ON" : "OFF"} onClick={toggle} />
    </div>
  );
};
