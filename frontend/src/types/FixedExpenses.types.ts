import { FormikRegistration } from "formik";

export interface ExpenseType {
  id?: number;
  nameExpense?: string; 
  price?: number;
  description?: string;
}

export interface FixedExpenseType {
  id: number;
  date: string;
  name: string;
  description: string;
  expenses: number[]; 
}


export interface FixedInputProps {
  name: string;
  label: string;
  type: string;
}