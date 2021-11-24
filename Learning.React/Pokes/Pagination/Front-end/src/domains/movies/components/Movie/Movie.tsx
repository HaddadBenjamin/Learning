import {FC} from "react";
import {IMovie} from "../../movies.model";
import styles from './Movie.module.scss';

interface Props extends IMovie
{
	deleteMovie : (id : string) => void
	likeMovie : (id : string) => void
	dislikeMovie : (id : string) => void
}

export const Movie : FC<Props> = (
	{
		id,
		title,
		category,
		likes,
		dislikes,
		
		deleteMovie,
		likeMovie,
		dislikeMovie
	}) => <div className={styles.container}>
	<div className={styles.title}>{title}</div>
	<div className={styles.category}>{category}</div>

	<div>
		<button onClick={() => likeMovie(id)}>Likes : {likes}</button>
		<button onClick={() => dislikeMovie(id)}>Dislikes : {dislikes}</button>
	</div>
	
	<div className={styles.close} onClick={() => deleteMovie(id)}>X</div>
</div>