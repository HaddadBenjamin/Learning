import {AxiosRequestConfig} from "axios";

export const apiConfiguration =
{
    baseUrl : 'http://localhost:3001'
}

export const httpConfiguration =
{
    default :
    {
        baseURL : '',
        headers :
        {
            'Content-Type' : 'application/json',
        }
    } as AxiosRequestConfig
}