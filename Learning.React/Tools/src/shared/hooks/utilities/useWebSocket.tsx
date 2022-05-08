/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

interface IUseWebSocket<T>
{
  url : string,

  onOpen?: (event: Event) => any;
  onMessage?: (event : MessageEvent, message : IWebSocketMessage<T>) => void;
  onClose?: (event: CloseEvent) => any;
  onError?: (event: Event) => any;
}

interface IWebSocketMessage<T> {
  data : T
}

interface IUseWebSocketResponse<T> {
  isConnected : boolean;
  messages : T[]
  websocket : WebSocket | undefined;
  sendMessage: (message : string | ArrayBufferLike | Blob | ArrayBufferView) => void;
  closeConnexion: (code?: number, reason?: string) => void;
}

const useWebSocket = <T, >({
  url,
  onOpen,
  onMessage,
  onClose,
  onError,
} : IUseWebSocket<T>) : IUseWebSocketResponse<T> => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<T[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket | undefined>();

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = (event) => { setIsConnected(true); onOpen?.(event); };
    ws.onmessage = (event) => { setMessages((previousMessages) => [...previousMessages, event.data]); onMessage?.(event, event.data); };
    ws.onclose = (event) => { setIsConnected(false); onClose?.(event); };
    ws.onerror = (event) => onError?.(event);

    setWebsocket(ws);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message: string | ArrayBufferLike | Blob | ArrayBufferView): void => websocket?.send(message);
  const closeConnexion = (code?: number, reason?: string): void => websocket?.close(code, reason);

  return {
    websocket,
    messages,
    isConnected,
    sendMessage,
    closeConnexion,
  };
};

export default useWebSocket;
