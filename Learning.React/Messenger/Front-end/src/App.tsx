import React from 'react';
import './App.css';
import Messenger from './components/Messenger/Messenger';
import io from "socket.io-client";

const socket = io('http://localhost:8000/')

const App = () => <Messenger socket={socket}/>

export default App;
