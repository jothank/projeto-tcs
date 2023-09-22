

export interface FeedStockType{
    id?: number;
    name: string;
    price: number;
    quantity: number;
    unity: string

}

export interface FeedStockInputProps {
    name: string;
    label: string;
    type: string;
  }


  export interface SelectFieldProps {
    name: string;
    label: string;
    options: {value: string, label: string}[]; // Agora options é uma matriz de strings
  }