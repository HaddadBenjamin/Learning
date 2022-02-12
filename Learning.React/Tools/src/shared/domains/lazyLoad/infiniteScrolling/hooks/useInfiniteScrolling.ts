import { useEffect, useState } from 'react';
import axios from 'axios';
import doesElementIsVisible from '../../../../utilities/doesElementIsVisible';

// Pour pouvoir faire de l'infinite scrolling, il est nécéssaire que votre endpoint en GET gère la pagination.
export default (
  containerSelector: string,
  computeFetchUrl: (page: number, pageSize: number) => string,
  updateDelay: number = 500,
  pageSize: number = 1,
  lastPage: number = 100
) => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [mustFetch, setMustFetch] = useState(false);

  const fetchItems = (): Promise<any> => {
    if (!hasNextPage) return Promise.resolve();

    return axios.get(computeFetchUrl(page, pageSize)).then((response: any) => {
      const newPage: number = page + 1;

      setItems([...items, ...response.data]);
      setPage(newPage);

      if (newPage > lastPage) setHasNextPage(false);
    });
  };

  useEffect(() => {
    async function asyncEffect() {
      await fetchItems();
      setMustFetch(false);
    }

    if (mustFetch) asyncEffect();
  }, [mustFetch]);

  const doesLastContainerChildIsVisible = (): boolean => {
    const lastChild = document.querySelector(
      `${containerSelector} :last-child`
    );

    return doesElementIsVisible(lastChild);
  };

  const computeIsFetching = () => {
    if (doesLastContainerChildIsVisible()) setMustFetch(true);
  };

  useEffect(() => {
    fetchItems();
    const timer = window.setInterval(computeIsFetching, updateDelay);

    return () => clearInterval(timer);
  }, []);

  return { items, isFetching: !mustFetch } as const;
};
