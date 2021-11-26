import { ApplicationState } from '../root/root.state';
import {IMovie} from "./movies.model";
import {IPaginateResponse} from "../../shared/Pagination/pagination.model";

export const selectPaginateResponse = (state: ApplicationState): IPaginateResponse<IMovie> =>
	({...state.movies})