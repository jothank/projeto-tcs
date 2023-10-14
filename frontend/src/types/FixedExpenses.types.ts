export type FixedExpenseType = {
  id?: number; 
  name: string;
  description: string;
  price: number;
  date: string;
  total_price: number;
  expenses: { 
    id?: number; 
    name: string;
    price: number;
    description: string;
  }[];
};