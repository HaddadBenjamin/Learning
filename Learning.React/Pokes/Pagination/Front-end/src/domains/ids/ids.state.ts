export interface IIdState
{
	items: number[]
	lastPage: number
	itemsCount: number
	error?: string
}

export const idsInitialState: IIdState =
	{
		items: [],
		lastPage: 1,
		itemsCount: 0
	}