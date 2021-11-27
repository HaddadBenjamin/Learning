import React, { ChangeEventHandler, FC } from 'react';

interface Props {
  pageSize: number;
  handlePageSizeChange: ChangeEventHandler<HTMLSelectElement>;
}

const PaginationFilters: FC<Props> = ({ pageSize, handlePageSizeChange }) => (
  <>
    <span>select page size : </span>
    <select value={pageSize} onChange={handlePageSizeChange}>
      {[10, 25, 50].map(newPageSize => (
        <option key={`option-${newPageSize}`} value={newPageSize}>
          {newPageSize}
        </option>
      ))}
    </select>
  </>
);

export default PaginationFilters;
