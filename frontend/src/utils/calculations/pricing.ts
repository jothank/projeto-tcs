import { FeedstockType } from "types/Feedstock.type";

const Unit = {
  GRAM: "g",
  MILLILITER: "ml",
  KILOGRAM: "kg",
  LITER: "l",
};

export const calculatePricePerKiloOrLiter = (
  price: number,
  quantity: number,
  unit: string
): number => {
  let result: number;
  if ([Unit.GRAM, Unit.MILLILITER].includes(unit)) {
    result = price * (quantity / 1000);
  } else if ([Unit.KILOGRAM, Unit.LITER].includes(unit)) {
    result = price * quantity;
  } else {
    throw new Error("Unidade desconhecida ou inválida: " + unit);
  }

  return parseFloat(result.toFixed(2));
};

export const calculateAdjustedPriceAndQuantity = (feedstock: FeedstockType) => {
  if ([Unit.GRAM, Unit.MILLILITER].includes(feedstock.unit)) {
    feedstock.price = parseFloat(
      ((feedstock.price / feedstock.quantity) * 1000).toFixed(2)
    );
  } else if ([Unit.KILOGRAM, Unit.LITER].includes(feedstock.unit)) {
    feedstock.price = parseFloat(
      (feedstock.price / feedstock.quantity).toFixed(2)
    );
  } else {
    throw new Error("Unidade desconhecida ou inválida: " + feedstock.unit);
  }
  feedstock.quantity = 1;
  return feedstock;
};

export const formatToBRL = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
