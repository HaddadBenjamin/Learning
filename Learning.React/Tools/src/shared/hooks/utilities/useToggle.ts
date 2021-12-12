import { useState } from 'react';

const useToggle = (initialValue: boolean = true) => {
  const [value, setValue] = useState(initialValue);
  const toggle = (): void => setValue(!value);

  return [value, toggle, setValue] as const;
};

export default useToggle;
