import {IMovie} from "./movies.model";

export const filterMovies = (movies : IMovie[], category?: string) : IMovie[] =>
	movies.filter(m => category === undefined || m.category === category)