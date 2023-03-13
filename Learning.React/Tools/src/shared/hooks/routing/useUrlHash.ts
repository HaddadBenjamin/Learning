import { useCallback, useState } from 'react';
import useWindowEvent from '../events/useWindowEvent';

const useUrlHash = () => {
  const [urlHash, setUrlHash] = useState(window.location.hash);

  const onUrlHashChange = useCallback(() => setUrlHash(window.location.hash), []);

  useWindowEvent('hashChange', onUrlHashChange);

  const updateUrlHash = useCallback(
    (newHash) => {
      if (newHash !== urlHash) window.location.hash = newHash;
    },
    [urlHash],
  );

  return [urlHash, updateUrlHash];
};

export default useUrlHash;
