import {useEffect, useState} from 'react'

export type FETCHING_STATUS = 'FETCHING' | 'FETCHED' | 'ERROR'
interface State<TData>
{
    data : TData | undefined
    error : string,
    fetchingStatus : FETCHING_STATUS
}
const useFetch = function<T>(url : string)
{
    const [state, setState] = useState<State<T>>(
    {
        data : undefined,
        error : '',
        fetchingStatus : 'FETCHING'
    })

    useEffect(() =>
    {
        const asyncUseEffect = async () => await fetch(url)
            .then(async (response) =>
            {
                if (!response.ok)
                    setState({...state, fetchingStatus: 'FETCHED', error : `${response.status} : ${response.statusText}`})
                else
                    setState({...state, fetchingStatus: 'ERROR', data : await response.json()})
            })

        asyncUseEffect()
    }, [])

    const { data, fetchingStatus, error } = state
    return [data, fetchingStatus, error] as const
}

export default useFetch