import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

interface IUseGetParameters<T>
{
  url: string,
  config?: AxiosRequestConfig,
  dependencies? : [],
  // eslint-disable-next-line
  onSuccess? : (data : T) => void,
  // eslint-disable-next-line
  onError? : (error : any) => void,
  httpClient? : AxiosInstance,
  enabled?: boolean
}

interface IUseGetResponse<T>
{
  data? : T | undefined,
  isLoading : boolean,
  isFetched: boolean,
  // eslint-disable-next-line
  error?: any,
  // eslint-disable-next-line
  refetch : (url? : string, config? : AxiosRequestConfig) => void
}

const useGet = <T, >(
  {
    url,
    config,
    dependencies = [],
    onSuccess,
    onError,
    httpClient,
    enabled = true,
  } : IUseGetParameters<T>,
) => {
  const [response, setResponse] = useState<IUseGetResponse<T>>({
    isLoading: false,
    isFetched: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    refetch: () => {},
  });

  const refetch = async (refetchUrl?: string, refetchConfig?: AxiosRequestConfig) => {
    if (enabled) {
      try {
        setResponse({
          ...response,
          error: undefined,
          isLoading: true,
        });

        const { data } = await (httpClient ?? axios).get(refetchUrl ?? url, refetchConfig ?? config);

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
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, [enabled, ...dependencies]);

  return { ...response, refetch };
};

export default useGet;
