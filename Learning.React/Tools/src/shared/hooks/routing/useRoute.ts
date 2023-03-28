import { useEffect, useState } from 'react';
import useUrlHash from './useUrlHash';
import useQueriesParameters from './useQueriesParameters';

type QueryParameters = { [queryParameter: string]: string }

interface IUseRouteResponse {
    route : string,
    host : string,
    hash?: string
    queryParameters? : QueryParameters
}

// Ex : http://localhost:3000/a/b/c?queryParam1=1&queryParam2=b#test
// const { route, host, hash, queryParameters } = useRoute()
// - route : /a/b/c
// - host : localhost:3000
// - hash : test
// - queryParameters : { queryParam1: '1', queryParam2: 'b' }
const useRoute = () : IUseRouteResponse => {
  const [route, setRoute] = useState('');
  const [host, setHost] = useState('');
  const [hash] = useUrlHash();
  const queryParameters = useQueriesParameters();

  useEffect(() => {
    const { pathname, host } = window.location;

    setHost(host);
    setRoute(pathname);
  }, []);

  return ({
    route,
    host,
    hash,
    queryParameters,
  });
};

export default useRoute;
