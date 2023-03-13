import { useEffect } from 'react';

const useOnMount = (callback: () => void) : void => {
  useEffect(callback, []);
};

export default useOnMount;
