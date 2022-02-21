import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface IUseGetParameters<T>
{
  url: string,
  config?: AxiosRequestConfig,
  dependencies? : [],
  // eslint-disable-next-line
  onSuccess? : (data : T) => void,
  // eslint-disable-next-line
  onError? : (error : any) => void
}

interface IUseGetResponse<T>
{
  data? : T | undefined,
  isLoading : boolean,
  isFetched: boolean,
  // eslint-disable-next-line
  error?: any,
  refetch : () => void
}

const useGet = <T, >(
  {
    url,
    config,
    dependencies = [],
    onSuccess,
    onError,
  } : IUseGetParameters<T>,
) => {
  const [response, setResponse] = useState<IUseGetResponse<T>>({
    isLoading: false,
    isFetched: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    refetch: () => {},
  });

  const asyncGet = async () => {
    try {
      setResponse({
        ...response,
        error: undefined,
        isLoading: true,
      });

      const { data } = await axios.get(url, config);

      onSuccess?.(data);

      setResponse({
        ...response,
        isLoading: false,
        data,
        isFetched: true,
      });
    } catch (error) {
      onError?.(error);

      setResponse({
        ...response,
        isLoading: false,
        data: undefined,
        error,
      });
    }
  };

  useEffect(() => {
    asyncGet();
    // eslint-disable-next-line
  }, [...dependencies]);

  return { ...response, refetch: asyncGet };
};

export default useGet;
