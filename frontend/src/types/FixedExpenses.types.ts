export type ExpenseType = {
  id?: number; 
  name: string;
  price: number;
  description: string;
};

export type FixedExpenseType = {
  id?: number; 
  expenseId: number;
  name: string; 
  total_price: number;
};


export interface FixedInputProps {
  name: string;
  label: string;
  type: string;
}