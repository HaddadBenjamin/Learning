/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { doesElementIsVisible } from "../../../../utils/doesElementIsVisible";
import axios from "axios"

// Pour pouvoir faire de l'infinite scrolling, il est nécéssaire que votre endpoint en GET gère la pagination.
export const useInfiniteScrolling = (
  containerSelector : string,
  computeFetchUrl : (page : number, pageSize : number) => string,
  updateDelay : number = 500,
  pageSize : number = 1,
  lastPage : number = 100) =>
{
  const [items, setItems] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [mustFetch, setMustFetch] = useState(false)

  useEffect(() =>
  {
    async function asyncEffect()
    {
      await fetchItems()
      setMustFetch(false)
    }

    if (mustFetch)
      asyncEffect()
  }, [mustFetch])

  useEffect(() =>
  {
    fetchItems()
    const timer = window.setInterval(computeIsFetching, updateDelay)

    return () => clearInterval(timer)
  }, [])

  const doesLastContainerChildIsVisible = () : boolean =>
  {
    const lastChild = document.querySelector(`${containerSelector} :last-child`)

    return doesElementIsVisible(lastChild)
  }

  const computeIsFetching = () =>
  {
    if (doesLastContainerChildIsVisible())
      setMustFetch(true)
  }

  const fetchItems = () : Promise<any> =>
  {
    if (!hasNextPage) return Promise.resolve()

    return axios
      .get(computeFetchUrl(page, pageSize))
      .then((response: any) =>
      {
        const newPage : number = page + 1

        setItems([...items, ...response.data])
        setPage(newPage)

        if (newPage > lastPage)
          setHasNextPage(false)
      })
  }

  return { items, isFetching : !mustFetch } as const
};
