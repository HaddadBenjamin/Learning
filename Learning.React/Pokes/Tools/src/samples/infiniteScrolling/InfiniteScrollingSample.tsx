import { useState } from "react"
import axios from "axios"
import { useInfiniteScrolling } from '../../shared/domains/lazyLoad/infiniteScrolling/hooks/useInfiniteScrolling'

// Pour pouvoir faire de l'infinite scrolling, il faut que votre endpoint en GET gère la pagination.
export const InfiniteScrollingSample = () =>
{
  const computeFetchUrl = (page : number, pageSize : number) : string =>
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${pageSize}`

  const { items, isFetching } = useInfiniteScrolling('#infiniteScrollContainerId', computeFetchUrl)

  return <>
    <h2>Infinite scrolling</h2>

    <div id='infiniteScrollContainerId'>
      {items.map(item => <img key={item.id} src={item.url} height="100px" width="200px" />)}
      {isFetching && <span>Loading...</span> }
    </div>
  </>
}