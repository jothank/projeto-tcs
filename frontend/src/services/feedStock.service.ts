import axios, { Axios, AxiosResponse } from 'axios';

export interface IFeedStock {
    id?: number;
    name: string;
    quantity: number;
    units: string;
    value: number;
}

export const listAllFeedStock = async(): Promise<AxiosResponse<IFeedStock[]>>  => {
    return await axios.get('http://localhost:3000/feedStock');
}

export const addUFeedStock = async (FeedStockProduct: IFeedStock): Promise<AxiosResponse<IFeedStock[]>> => {
    return await axios.post("http://localhost:3000/feedStock", FeedStockProduct);
}
export const updateFeedStock = async (FeedStockProduct: IFeedStock): Promise<AxiosResponse<IFeedStock[]>> => {
    return await axios.put("http://localhost:3000/feedStock", FeedStockProduct);
}

export const deleteFeedStock = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:3000/feedStock/${id}`);
  };