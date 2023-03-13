import { useCallback, useState } from 'react';
import useWindowEvent from '../events/useWindowEvent';

const useQueryParameter = (queryParameterName: string) => {
  const getValue = useCallback(
    () => new URLSearchParams(window.location.search).get(queryParameterName),
    [queryParameterName],
  );

  const [queryParameterValue, setQueryParameterValue] = useState(getValue);

  const onQueryParameterChange = () => setQueryParameterValue(getValue());

  useWindowEvent('popstate', onQueryParameterChange);
  useWindowEvent('pushstate', onQueryParameterChange);
  useWindowEvent('replacestate', onQueryParameterChange);

  return queryParameterValue;
};

export default useQueryParameter;
