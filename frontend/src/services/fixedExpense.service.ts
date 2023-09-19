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



export const updateFixedExpense = async (FixedExpenseProduct: IFixedExpense): Promise<IFixedExpense[]> => {
  try {
    const response: AxiosResponse<IFixedExpense[]> = await axios.put("http://localhost:5000/fixedExpense", FixedExpenseProduct);
    return response.data;
  } catch (error) {
    // Trate erros aqui, por exemplo:
    if (axios.isAxiosError(error)) {
      // Erro de rede ou erro HTTP
      console.error("Erro de rede:", error.message);
    } else {
      // Erro não relacionado à rede (por exemplo, erro no servidor)
      console.error("Erro no servidor:");
    }
    throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro.
  }
};

export const deleteFixedExpense = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:5000/fixedExpense/${id}/`);
  };