import axios, { AxiosResponse } from "axios";

export interface IFixedExpense{
    id?: number
    name: string,
    value: number,
    description: string,
    date: string
}


export const listAllFixedExpense = async(): Promise<AxiosResponse<IFixedExpense[]>>  => {
    return await axios.get('http://localhost:5000/fixedExpense');
};

export const addFixedExpense = async (FixedExpenseProduct: IFixedExpense): Promise<AxiosResponse<IFixedExpense[]>> => {
    return await axios.post("http://localhost:5000/fixedExpense", FixedExpenseProduct);

};

export const updateFixedExpense = async (FeedStockProduct: IFixedExpense): Promise<AxiosResponse<IFixedExpense[]>> => {
    return await axios.put("http://localhost:5000/fixedExpense", FeedStockProduct);
}

export const deleteFixedExpense = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:5000/fixedExpense/${id}/`);
  };