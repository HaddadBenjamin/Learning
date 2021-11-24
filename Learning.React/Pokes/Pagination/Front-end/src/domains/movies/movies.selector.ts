import { ApplicationState } from '../root/root.state';
import {IMovie} from "./movies.model";

export const selectMovies = (state : ApplicationState) : IMovie[]  => state.movies.movies