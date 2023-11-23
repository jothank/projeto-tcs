import { FeedstockType } from "./Feedstock.type";

export interface ProductRegistrationType {
    id?: number;
    name: string;
    feedstockType: FeedstockType;
    quantity: number;
    unit: string;
  }
  