
export interface PricingType {
    tax: number;
    card_tax: number;
    other?: number;
    profit: number;
    suggested_price: number;
    delivery_price: number;
    condominium: number;
    product?: number;
    combo?: number;
};

export interface PricingInputProps {
    name: string;
    label: string;
    type: string;
  }