import { ApplicationState } from '../root/root.state';
import {IPaginateResponse} from "../../shared/Pagination/pagination.model";

export const selectPaginateResponse = (state: ApplicationState): IPaginateResponse<number> =>
	({...state.ids})