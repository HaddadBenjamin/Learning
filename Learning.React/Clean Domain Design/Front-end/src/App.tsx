import React from 'react';
import Todos from './domains/todo/components/Todos/Todos';
import { Provider } from 'react-redux';
import store from "./domains/root/root.store";

const App = () => 
  <Provider store={store}>
    <Todos/>
  </Provider>

export default App;
