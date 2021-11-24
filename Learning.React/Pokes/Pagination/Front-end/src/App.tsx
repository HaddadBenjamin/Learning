import store from "./domains/root/root.store";
import { Provider } from "react-redux";
import { MoviePage } from "./domains/movies/components/MoviePage/MoviePage";

const App = () =>
  <Provider store={store}>
    <MoviePage/>
  </Provider>

export default App;
