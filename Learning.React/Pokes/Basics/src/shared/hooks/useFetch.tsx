import {useEffect, useState} from 'react'

// Utiliser à la place la librairie use-http qui permet de faire des get, post, update, delete
interface State<T>
{
    isLoading : boolean
    items : T[]
    error : string
}
const useFetch = function<T>(url : string)
{
    const [state, setState] = useState<State<T>>(
    {
        isLoading : true,
        items : [],
        error : ''
    })

    useEffect(() =>
    {
        async function asyncUseEffect()
        {
            await fetch(url)
                .then(async (response) =>
                {
                    if (!response.ok)
                        setState({...state, isLoading: false, error : `${response.status} : ${response.statusText}`})
                    else
                        setState({...state, isLoading: false, items : await response.json()})
                })
        }
        asyncUseEffect()
    }, [])

    const { items, isLoading, error } = state
    return [items, isLoading, error]
}

export default useFetch