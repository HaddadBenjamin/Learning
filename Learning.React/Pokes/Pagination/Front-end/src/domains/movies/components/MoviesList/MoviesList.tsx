import {IMovie} from "../../movies.model";
import {FC} from "react";
import {Movie} from "../Movie/Movie";
import styles from './MoviesList.module.scss';
import {useDispatch} from "react-redux";
import {deleteMovieRequestAction, dislikeMovieRequestAction, likeMovieRequestAction} from "../../movies.action";

interface Props
{
	movies : IMovie[]
}

export const MoviesList : FC<Props> = ({ movies }) =>
{
	const dispatch = useDispatch()

	const likeMovie = (id : string) => dispatch(likeMovieRequestAction(id))
	const dislikeMovie = (id : string) => dispatch(dislikeMovieRequestAction(id))
	const deleteMovie = (id : string) => dispatch(deleteMovieRequestAction(id))
	
	return <div className={styles.container}>
		{movies.map(m =>
			<Movie
				key={m.id}
				{...m}
				deleteMovie={deleteMovie}
				likeMovie={likeMovie}
				dislikeMovie={dislikeMovie} />)}
	</div>
}