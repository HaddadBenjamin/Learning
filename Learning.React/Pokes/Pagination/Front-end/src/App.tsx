import store from "./domains/root/root.store";
import { Provider } from "react-redux";
import { IdPage } from "./domains/ids/components/IdPage/IdPage";

const App = () =>
  <Provider store={store}>
    <IdPage/>
  </Provider>

export default App;
