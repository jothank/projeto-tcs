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

export interface AddedFeedstockType {
  id?: number;
  quantityOfUse: number;
  costUnit: number;
  unitFabrication: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface ProductTableProps {
  feedstocks: FeedstockType[];
}