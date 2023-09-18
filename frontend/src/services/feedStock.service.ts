import axios, { Axios, AxiosResponse } from 'axios';

export interface IFeedStock {
    id?: number;
    name: string;
    quantity: number;
    units: string;
    value: number;
}

export const listAllFeedStock = async(): Promise<AxiosResponse<IFeedStock[]>>  => {
    return await axios.get('http://localhost:8000/api/v1/feedstock/');
}

export const addUFeedStock = async (FeedStockProduct: IFeedStock): Promise<AxiosResponse<IFeedStock[]>> => {
    return await axios.post("http://localhost:8000/api/v1/feedstock/", FeedStockProduct);
}
export const updateFeedStock = async (FeedStockProduct: IFeedStock): Promise<AxiosResponse<IFeedStock[]>> => {
    return await axios.put("http://localhost:8000/api/v1/feedstock/", FeedStockProduct);
}

export const deleteFeedStock = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:8000/api/v1/feedstock/${id}/`);
  };