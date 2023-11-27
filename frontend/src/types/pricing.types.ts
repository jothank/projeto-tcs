import { ChangeEvent } from "react";

export interface PricingType {
    id?: number;
    tax: number;
    card_tax: number;
    other?: number;
    profit: number;
    suggested_price: number;
    delivery_price?: number;
    condominium: number;
    product?: number;
    combo?: number;
};

export interface PricingInputProps {
    name: string;
    label: string;
    type: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  export interface ProductPricingType {
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
    combo: {
      id: number,
      name: string,
      price: number
    };
    tax: number;
    card_tax: number;
    other: number;
    profit: number;
    suggested_price: number;
    delivery_price: number;
    condominium: number;
  }
  