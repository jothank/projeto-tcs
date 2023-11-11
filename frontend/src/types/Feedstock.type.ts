export interface FeedstockType {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  type: string;
}

export interface FeedstockInputProps {
  name: string;
  label: string;
  type: string;
}

export interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}
