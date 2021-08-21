import React from 'react';
import Navigation from "./domains/root/components/Navigation";
import {Provider} from "react-redux";
import {store} from "./domains/root/root.store";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Navigation/>
        </Provider>
    </div>
  );
}

export default App;
