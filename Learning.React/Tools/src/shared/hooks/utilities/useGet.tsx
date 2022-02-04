import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface IUseGetParameters
{
  url: string,
  config?: AxiosRequestConfig,
  dependencies? : [],
  onSuccess? : (data : any) => void,
  onError? : (error : any) => void
}

interface IUseGetResponse
{
  data? : any,
  isLoading : boolean,
  error?: any,
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
    isLoading: true,
  });

  useEffect(() => {
    const asyncGet = async () => {
      setResponse({
        ...response,
        error: undefined,
        isLoading: true,
      });

      try {
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
          error,
        });
      }
    };

    asyncGet();
  }, [...dependencies]);

  return response;
};

export default useGet;
