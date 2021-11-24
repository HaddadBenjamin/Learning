import { ChangeEventHandler, FC} from "react";

interface Props
{
	categories : string[]
	selectedCategory : string | undefined
	handleCategoryChange :  ChangeEventHandler<HTMLSelectElement>
	
	pageSize : number
	handlePageSizeChange : ChangeEventHandler<HTMLSelectElement>
}
export const MovieFilters : FC<Props> = (
	{
		categories,
		selectedCategory,
		handleCategoryChange,
		
		pageSize,
		handlePageSizeChange
	}) =>
	<>
		<select value={selectedCategory} onChange={handleCategoryChange}>
			<option value=''>All</option>
			{ categories.map(c => <option key={c} value={[c]}>{c}</option> )}
		</select>
		
		<select value={pageSize} onChange={handlePageSizeChange}>
			<option value={4}>4</option>
			<option value={8}>8</option>
			<option value={12}>12</option>
		</select>
	</>