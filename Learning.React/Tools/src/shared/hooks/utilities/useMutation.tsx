import { useState } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface IUseMutationRequest
{
  httpClient? : AxiosInstance,
  config?: AxiosRequestConfig,
  // eslint-disable-next-line
  onSuccess? : (data : any) => void,
  // eslint-disable-next-line
  onError? : (error : any) => void
}

interface IUseMutationResponse<T>
{
  // eslint-disable-next-line
  mutate : (mutateParameters?: IMutateParameters) => T | void
  // eslint-disable-next-line
  data? : any,
  isCalled: boolean,
  isLoading : boolean,
  // eslint-disable-next-line
  error?: any,
}

interface IMutateParameters {
  config?: AxiosRequestConfig,
  url? : string,
}

const UseMutation = <T, >({
                            config,
                            onSuccess,
                            onError,
                            httpClient,
                          } : IUseMutationRequest) => {
  const [response, setResponse] = useState<IUseMutationResponse<T>>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mutate: () => {},
    isCalled: false,
    isLoading: false,
  });

  const mutate = async (mutateParameters? : IMutateParameters) => {
    try {
      setResponse({
        ...response,
        error: undefined,
        isLoading: true,
        isCalled: false,
      });
      const data = await (httpClient ?? axios).request(
        {
          ...config,
          ...mutateParameters?.config,
          baseURL: mutateParameters?.url ?? mutateParameters?.config?.baseURL ?? config?.baseURL,
        },
      );

      onSuccess?.(data);

      setResponse({
        ...response,
        data,
        isCalled: true,
        isLoading: false,
        error: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError?.(error);

      setResponse({
        ...response,
        data: undefined,
        isLoading: false,
        error,
      });
    }
  };

  return {
    ...response,
    mutate,
  };
};

export default UseMutation;
