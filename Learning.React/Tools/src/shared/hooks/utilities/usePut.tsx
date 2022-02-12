import { useState } from 'react';
import axios from 'axios';

interface IUsePutRequest
{
  url: string,
  body: object,
  // eslint-disable-next-line
  onSuccess? : (data : any) => void,
  // eslint-disable-next-line
  onError? : (error : any) => void
}

interface IUsePutResponse
{
  mutate : () => void
  // eslint-disable-next-line
  data? : any,
  isLoading : boolean,
  // eslint-disable-next-line
  error?: any,
}

const usePut = ({
  url,
  body,
  onSuccess,
  onError,
} : IUsePutRequest) => {
  const [response, setResponse] = useState<IUsePutResponse>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mutate: async () => { },
    isLoading: false,
  });

  const mutate = async () => {
    setResponse({
      ...response,
      error: undefined,
      isLoading: true,
    });

    try {
      const data = await axios.put(url, body);

      onSuccess?.(data);

      setResponse({
        ...response,
        data,
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

export default usePut;
