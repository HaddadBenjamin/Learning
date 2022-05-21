import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../../shared/components/Pagination/Pagination';

const PAGE_SIZE = 5;
const BackEndPaginationSample : FC = () => {
  const computeUrl = (page : number, pageSize : number) : string => `https://jsonplaceholder.typicode.com/todos?_start=${(page - 1) * pageSize}&_limit=${pageSize}`;

  const [paginatedItems, setPaginatedItems] = useState([]);
  const [endpoint, setEndpoint] = useState(computeUrl(1, PAGE_SIZE));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(async () => {
    const { data: items } = await axios.get(endpoint);

    setPaginatedItems(items);
  }, [endpoint]);

  return (
    <>
      <h2>New pagination back end</h2>
      <Pagination
        pageSize={5}
        paginationType='back side'
        count={100} /* le nombre total d'éléments, soit count, doit être renvoyé par l'API */
        onPageChange={(page) => setEndpoint(computeUrl(page, PAGE_SIZE))}
      />
      { JSON.stringify(paginatedItems?.map((e : any) => e.id)) }
    </>
  );
};

export default BackEndPaginationSample;
