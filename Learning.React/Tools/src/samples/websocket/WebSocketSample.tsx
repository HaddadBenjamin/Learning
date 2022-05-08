import React, { useState } from 'react';
import useWebSocket from '../../shared/hooks/utilities/useWebSocket';
import styles from './WebSocketSample.module.scss';

const WebSocketSample = () => {
  const {
    messages, isConnected, sendMessage, closeConnexion,
  } = useWebSocket<string>({
    url: 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
    onOpen: (event) => console.log('Websocket : onopen', event),
    onMessage: (event, message) => console.log('Websocket : onmessage', message),
    onClose: (event) => console.log('Websocket : onclose', event),
    onError: (event) => console.log('Websocket : error', event),
  });
  // eslint-disable-next-line no-undef
  const [newMessage, setNewMessage] = useState('');

  return (
    <>
      <h2>Websocket : useWebSocket</h2>
      <div>{`Is Connected : ${isConnected}`}</div>
      <div className={styles.messagesContainer}>
        {messages.map((message) => <div className={styles.message}>{message}</div>)}
      </div>
      <input value={newMessage} placeholder='new message' onChange={(event) => setNewMessage(event.target.value)} />
      <button type='button' onClick={() => sendMessage(newMessage)}>Send message</button>
      <button type='button' onClick={() => closeConnexion()}>Close websocket connexion</button>
    </>
  );
};

export default WebSocketSample;
