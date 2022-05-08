/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

interface IUseWebSocket<T>
{
  url : string,
  connectOnMount?: boolean,

  onOpen?: (event: Event) => any;
  onMessage?: (event : MessageEvent, message : IWebSocketMessage<T>) => void;
  onClose?: (event: CloseEvent) => any;
  onError?: (event: Event) => any;
}

interface IWebSocketMessage<T> {
  data : T
}

interface IUseWebSocketResponse<T> {
  websocket : WebSocket | undefined;
  isConnected : boolean;
  messages : T[];

  connect: () => void;
  sendMessage: (message : string | ArrayBufferLike | Blob | ArrayBufferView) => void;
  disconnect: (code?: number, reason?: string) => void;
}

const useWebSocket = <T, >({
  url,
  onOpen,
  onMessage,
  onClose,
  onError,
  connectOnMount = true,
} : IUseWebSocket<T>) : IUseWebSocketResponse<T> => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<T[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket | undefined>();

  useEffect(() => {
    if (connectOnMount) connect();
  }, [connectOnMount]);

  const connect = () => {
    const ws = new WebSocket(url);

    ws.onopen = (event) => { setIsConnected(true); onOpen?.(event); };
    ws.onmessage = (event) => { setMessages((previousMessages) => [...previousMessages, event.data]); onMessage?.(event, event.data); };
    ws.onclose = (event) => { setIsConnected(false); onClose?.(event); };
    ws.onerror = (event) => onError?.(event);

    setWebsocket(ws);
  };
  const sendMessage = (message: string | ArrayBufferLike | Blob | ArrayBufferView): void => websocket?.send(message);
  const disconnect = (code?: number, reason?: string): void => websocket?.close(code, reason);

  return {
    websocket,
    messages,
    isConnected,
    connect,
    sendMessage,
    disconnect,
  };
};

export default useWebSocket;
