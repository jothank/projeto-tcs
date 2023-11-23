export interface ProductType {
  id?: number;
  feedstock: {
    id?: number;
    name: string;
    price: number;
    quantity: number;
    unit: string;
  };
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

export interface ProductTableProps {
  data: {
    results: {
      products: any;
      id: number;
      name: string;
      price: number;
      supplies: {
        id: number;
        feedstock: {
          id?: number;
          name: string;
          price: number;
          unit: string;
        };
        quantity: number;
        unit: string;
        price: number;
      }[];
    }[];
  };
}
