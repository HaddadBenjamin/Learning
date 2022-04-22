import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

interface IUseGetParameters<TData, TOnFinishGetParameters = void>
{
  url?: string,
  config?: AxiosRequestConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies? : any[],
  onSuccess? : (data : TData, parameters?: TOnFinishGetParameters) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError? : (error : any, parameters?: TOnFinishGetParameters) => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès.
  onBeforeGet? : (parameters?: TOnFinishGetParameters) => void,
  httpClient? : AxiosInstance,
  enabled?: boolean
}

interface IUseGetResponse<TOnFinishGetParameters = void>
{
  // eslint-disable-next-line
  data? : any,
  isLoading : boolean,
  isFetched: boolean,
  // eslint-disable-next-line
  error?: any,
  refetch : (refetchParameters? : IRefetchParameters<TOnFinishGetParameters>) => void
}

interface IRefetchParameters<TOnFinishGetParameters = void> {
  refetchUrl? : string,
  refetchConfig? : AxiosRequestConfig
  parameters?: TOnFinishGetParameters // paramètres applicable à onSuccess, onError, onBeforeGet
}

const useGet = <TData, TOnFinishGetParameters = void>(
    {
      url,
      config,
      dependencies = [],
      onSuccess,
      onError,
      onBeforeGet,
      httpClient,
      enabled = true,
    } : IUseGetParameters<TData, TOnFinishGetParameters>,
) => {
  const [response, setResponse] = useState<IUseGetResponse<TOnFinishGetParameters>>({
    isLoading: false,
    isFetched: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    refetch: () => {},
  });

  const refetch = async (refetchParameters? : IRefetchParameters<TOnFinishGetParameters>) => {
    try {
      onBeforeGet?.(refetchParameters?.parameters);

      setResponse({
        ...response,
        error: undefined,
        isLoading: true,
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { data } = await (httpClient ?? axios).get((refetchParameters?.refetchUrl ?? url)!, refetchParameters?.refetchConfig ?? config);

      onSuccess?.(data, refetchParameters?.parameters);

      setResponse({
        ...response,
        isLoading: false,
        data,
        isFetched: true,
      });
    } catch (error) {
      onError?.(error, refetchParameters?.parameters);

      setResponse({
        ...response,
        isLoading: false,
        data: undefined,
        error,
      });
    }
  };

  useEffect(() => {
    if (enabled) refetch();
    // eslint-disable-next-line
  }, [enabled, ...dependencies]);

  return { ...response, refetch };
};

export default useGet;