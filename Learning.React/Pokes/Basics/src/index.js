import React from 'react';
import ReactDOM from 'react-dom';
import UseCallbackAndReactMemo from "./useCallbackAndReactMemo/useCallbackAndReactMemo";
import UseMemo from "./useMemo/useMemo";

ReactDOM.render(
  <React.StrictMode>
    <UseCallbackAndReactMemo/>
    <UseMemo/>
  </React.StrictMode>,
  document.getElementById('root')
);