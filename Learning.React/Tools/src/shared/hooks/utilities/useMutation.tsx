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
  // Utile pour réaliser de l’optimistique UI : c'est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine
  onBeforeMutate?: ()  => void
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
  onBeforeMutate,
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
      onBeforeMutate?.();

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
          // on met url à la place de baseURL pour éviter un crash dans mon authenticatedClient
          url: mutateParameters?.url ?? mutateParameters?.config?.url ?? config?.url,
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
