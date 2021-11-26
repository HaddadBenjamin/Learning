export interface IPaginateResponse<T> {
	items: T[]
	lastPage: number
	itemsCount: number
}