
export interface FixedExpenseType {
    date?: string;
    name?: string;
    value: number;
    description?: string;
    total_value?: number;
}

export interface FixedExpenseInputProps {
    name: string;
    label: string;
    type: string;
  }