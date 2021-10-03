import React from 'react';
import Todos from './domains/todo/components/Todos/Todos';
import store from './domains/root/root.store';
import { Provider } from 'react-redux';

const App = () => 
  <Provider store={store}>
    <Todos/>
  </Provider>

export default App;
