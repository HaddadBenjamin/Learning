import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface IUseGetParameters
{
  url: string,
  config?: AxiosRequestConfig,
  dependencies? : [],
  // eslint-disable-next-line
  onSuccess? : (data : any) => void,
  // eslint-disable-next-line
  onError? : (error : any) => void
}

interface IUseGetResponse
{
  // eslint-disable-next-line
  data? : any,
  isLoading : boolean,
  // eslint-disable-next-line
  error?: any,
  refetch : () => void
}

const useGet = (
  {
    url,
    config,
    dependencies = [],
    onSuccess,
    onError,
  } : IUseGetParameters,
) => {
  const [response, setResponse] = useState<IUseGetResponse>({
    isLoading: false,
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
