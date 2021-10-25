export interface INavigationElement
{
	title : string
	href : string
	active? : boolean
}

export interface SetActiveElementActionPayload
{
	title : string
}