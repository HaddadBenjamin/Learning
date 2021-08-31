import {AxiosRequestConfig} from "axios";

export const routes =
{
    api : 'http://localhost:3001/todos'
}

export const httpConfiguration =
{
    default :
    {
        baseURL : '',
        headers :
        {
            'Content-Type' : 'application/json',
            'X-Requested-With' : 'XMLHttpRequest'
        }
    } as AxiosRequestConfig
}