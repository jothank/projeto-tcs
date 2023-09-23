import { FeedstockType } from "types/Feedstock.type";

export interface ProductType {
  id?: number;
  feedstockType: FeedstockType;
  quantity: number;
  unit: string;
  price: number;
}

export interface ProductInputProps {
  name: string;
  label: string;
  type: string;
}

export interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}