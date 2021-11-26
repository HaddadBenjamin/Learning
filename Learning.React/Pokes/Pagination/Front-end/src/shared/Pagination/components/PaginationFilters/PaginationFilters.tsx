import { ChangeEventHandler, FC} from "react";

interface Props
{
	pageSize : number
	handlePageSizeChange : ChangeEventHandler<HTMLSelectElement>
}
export const PaginationFilters: FC<Props> = (
	{
		pageSize,
		handlePageSizeChange
	}) =>
	<>
		<label>select page size : </label>
		<select value={pageSize} onChange={handlePageSizeChange}>
			{[5, 10, 15].map(newPageSize =>
				<option key={`option-${newPageSize}`} value={newPageSize}>{newPageSize}</option>)
			}
		</select>
	</>
