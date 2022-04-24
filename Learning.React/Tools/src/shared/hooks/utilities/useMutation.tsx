import { useState } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface IUseMutationRequest<TData, TOnFinishGetParameters = void>
{
  httpClient? : AxiosInstance,
  config?: AxiosRequestConfig,
  onSuccess? : (data?: TData, parameters?: TOnFinishGetParameters) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError? : (error : any, parameters?: TOnFinishGetParameters) => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  onBeforeMutate? : (parameters?: TOnFinishGetParameters) => void,
}

interface IUseMutationResponse<TData, TOnFinishGetParameters>
{
  mutate : (mutateParameters?: IMutateParameters<TOnFinishGetParameters>) => TData | void
  data? : TData,
  isCalled: boolean,
  isLoading : boolean,
  // eslint-disable-next-line
  error?: any,
}

export interface IMutateParameters<TOnFinishGetParameters = void> {
  config?: AxiosRequestConfig,
  url? : string,
  callbacksParameters?: TOnFinishGetParameters // paramètres applicable à onSuccess, onError, onBeforeMutate
}

const UseMutation = <TData, TOnFinishGetParameters = void>({
                                                             config,
                                                             onSuccess,
                                                             onError,
                                                             onBeforeMutate,
                                                             httpClient,
                                                           } : IUseMutationRequest<TData, TOnFinishGetParameters>) => {
  const [response, setResponse] = useState<IUseMutationResponse<TData, TOnFinishGetParameters>>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mutate: () => {},
    isCalled: false,
    isLoading: false,
  });

  const mutate = async (mutateParameters? : IMutateParameters<TOnFinishGetParameters>) => {
    try {
      onBeforeMutate?.(mutateParameters?.callbacksParameters);

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
          url: mutateParameters?.url ?? mutateParameters?.config?.url ?? config?.url,
        },
      );

      onSuccess?.(data?.data, mutateParameters?.callbacksParameters);

      setResponse({
        ...response,
        data: data?.data,
        isCalled: true,
        isLoading: false,
        error: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError?.(error, mutateParameters?.callbacksParameters);

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
