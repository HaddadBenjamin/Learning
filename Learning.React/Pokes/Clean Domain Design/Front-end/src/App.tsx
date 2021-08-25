import React from 'react';
import Todos from './domains/Todos/components/Todos/Todos';
import store from './domains/Root/root.store';
import { Provider } from 'react-redux';

const App = () => 
  <Provider store={store}>
    <Todos/>
  </Provider>

export default App;
