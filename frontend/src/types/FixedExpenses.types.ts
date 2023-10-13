export type FixedExpensestype = {
  name: string;
  description: string;
  price: number;
  date: string;
  total_price: number;
  expenses: { 
    name: string;
    price: number;
    description: string;
  }[];
};