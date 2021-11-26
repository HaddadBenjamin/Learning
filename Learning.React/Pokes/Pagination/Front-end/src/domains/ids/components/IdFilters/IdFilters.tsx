import { ChangeEventHandler, FC} from "react";

interface Props
{
	pageSize : number
	handlePageSizeChange : ChangeEventHandler<HTMLSelectElement>
}
export const IdFilters : FC<Props> = (
	{
		pageSize,
		handlePageSizeChange
	}) =>
	<select value={pageSize} onChange={handlePageSizeChange}>
		{ [5, 10, 15].map(newPageSize =>
			<option key={`option-${newPageSize}`} value={newPageSize}>{newPageSize}</option>)
		}
	</select>