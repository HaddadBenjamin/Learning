export default interface IPagination<T> {
  items: T[];
  currentPage: T[];
  page: number;
  pageSize: number;
  pageSizeInThisPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  lastPage: number;
  itemsCount: number;
}

export interface IPaginateResponse<T> {
  items: T[];
  lastPage: number;
  itemsCount: number;
}
