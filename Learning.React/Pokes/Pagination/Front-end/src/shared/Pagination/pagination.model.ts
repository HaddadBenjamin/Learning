export class Pagination<T>
{
	public currentPage : T[] = [];
	public lastPage : number = 1
	public hasPreviousPage : boolean
	public hasNextPage : boolean
	public pageSizeInThisPage: number;
	
	constructor(
		public elements : T[],
		public page : number = 1,
		public pageSize : number = 10)
	{
		const { currentPage, page : clampedPage, hasPreviousPage, hasNextPage, lastPage, pageSizeInThisPage } = this.computePagination()
		
		this.currentPage = currentPage;
		this.page = clampedPage;
		this.hasPreviousPage = hasPreviousPage;
		this.hasNextPage = hasNextPage;
		this.lastPage = lastPage;
		this.pageSizeInThisPage = pageSizeInThisPage
	}
	
  computePagination = () : Pagination<T> =>
  {
  	const lastPage = Math.floor(this.elements.length / this.pageSize) + 1;
	  const page = this.page > lastPage ? lastPage : this.page;
	 
	  return ({
		  ...this,
		  currentPage: this.elements.slice(this.pageSize * (page - 1)).slice(0, this.pageSize),
		  page : page,
		  hasPreviousPage: page - 1 > 0,
		  hasNextPage: (this.pageSize * page) < this.elements.length,
		  lastPage: lastPage,
		  pageSizeInThisPage : page === this.lastPage ? this.elements.length % this.pageSize : this.pageSize
	  })
  }
	setPageSize = (pageSize : number) : Pagination<T> => { this.pageSize = pageSize; return this.computePagination(); }
	setPage = (page : number) : Pagination<T> => { this.page = page; return this.computePagination(); }

	getPreviousPage = () : Pagination<T> => { --this.page; return this.computePagination(); }
	getNextPage = () : Pagination<T> => { ++this.page; return this.computePagination(); }
}