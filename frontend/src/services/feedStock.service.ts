import axios, { Axios, AxiosResponse } from 'axios';

export interface IFeedStock {
    id: number;
    name: string;
    quantity: string;
    units: string;
    value: number;
}

export const listAllFeedStock = async(): Promise<AxiosResponse<IFeedStock[]>>  => {
    return await axios.get('http://localhost:3000/feedStock');
}