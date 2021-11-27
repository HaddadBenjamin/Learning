import axios, {AxiosResponse} from 'axios';
import qs from 'qs';
import {IPaginateResponse} from './pagination.model';
import {
  apiConfiguration,
  httpConfiguration,
} from '../../../shared.configuration';
import routes from '../../../../samples/pagination/ids.configuration';

export const baseUrl = `${apiConfiguration.baseUrl}${routes.api}`;

export const getIds = async (): Promise<AxiosResponse<number[]>> =>
  (await axios.get(baseUrl, httpConfiguration.default)).data;

export const getPaginateIds = async (
  page: number,
  pageSize: number
): Promise<IPaginateResponse<number>> => {
  const response = await axios.get(
    `${baseUrl}?${qs.stringify({page, limit: pageSize})}`,
    httpConfiguration.default
  );
  console.log(response.headers);
  const linkHeaders = response.headers.link;
  const linkNumbers = linkHeaders.match(/\d+/g)!;
  console.log(linkNumbers);
  const lastPage = Number(linkNumbers[linkNumbers.length - 2]);
  const itemsCount = Number(response.headers['x-total-count']);
  
  return {items: response.data, lastPage, itemsCount};
};
