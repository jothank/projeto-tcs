import { FeedstockType } from "types/Feedstock.type";

const Units = {
  GRAM: "g",
  MILLILITER: "ml",
  KILOGRAM: "kg",
  LITER: "l",
  UNIT: "un",
};

const UnitAdjustments = {
  [Units.GRAM]: { convertTo: Units.KILOGRAM, adjustmentFactor: 1000 },
  [Units.MILLILITER]: { convertTo: Units.LITER, adjustmentFactor: 1000 },
  [Units.KILOGRAM]: { convertTo: Units.KILOGRAM, adjustmentFactor: 1 },
  [Units.LITER]: { convertTo: Units.LITER, adjustmentFactor: 1 },
  [Units.UNIT]: { convertTo: Units.UNIT, adjustmentFactor: 1 },
};

export const calculatePricePerKiloOrLiter = (
  price: number,
  quantity: number,
  unit: string
): number => {
  const smallUnits = [Units.GRAM, Units.MILLILITER];
  const bigUnits = [Units.KILOGRAM, Units.LITER, Units.UNIT];
  const result = smallUnits.includes(unit)
    ? price * (quantity / 1000)
    : bigUnits.includes(unit)
    ? price * quantity
    : undefined;
  if (result === undefined) {
    throw new Error("Unidade desconhecida ou inválida: " + unit);
  }
  return parseFloat(result.toFixed(2));
};

export const calculateAdjustedPriceAndQuantity = (feedstock: FeedstockType) => {
  const { unit, price, quantity } = feedstock;
  const adjustment = UnitAdjustments[unit];
  if (!adjustment) {
    throw new Error("Unidade desconhecida ou inválida: " + unit);
  }
  feedstock.price = (price / quantity) * adjustment.adjustmentFactor;
  feedstock.unit = adjustment.convertTo;
  feedstock.quantity = 1;

  return feedstock;
};

export const formatToBRL = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
