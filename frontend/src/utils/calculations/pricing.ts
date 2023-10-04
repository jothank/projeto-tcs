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
  feedstockPrice: number,
  feedstockQuantity: number,
  feedstockUnit: string,
  quantity: number,
  unit: string
): number => {
  const smallUnits = ["GRAM", "MILLILITER", "g", "ml"]; // Include "g" and "ml" as valid units
  const bigUnits = ["KILOGRAM", "LITER", "UNIT"];

  if (!smallUnits.includes(feedstockUnit) && !bigUnits.includes(feedstockUnit)) {
    throw new Error("Unknown or invalid feedstock unit: " + feedstockUnit);
  }

  if (!smallUnits.includes(unit) && !bigUnits.includes(unit)) {
    throw new Error("Unknown or invalid product unit: " + unit);
  }

  const feedstockWeightInKiloOrLiter =
    smallUnits.includes(feedstockUnit)
      ? feedstockQuantity / 1000 // Convert small units to kilograms (or liters)
      : bigUnits.includes(feedstockUnit)
      ? feedstockQuantity
      : undefined;

  if (feedstockWeightInKiloOrLiter === undefined) {
    throw new Error("Unknown or invalid feedstock unit: " + feedstockUnit);
  }

  const feedstockCostPerKiloOrLiter = feedstockPrice / feedstockWeightInKiloOrLiter;

  if (smallUnits.includes(unit)) {
    return parseFloat((feedstockCostPerKiloOrLiter * (quantity / 1000)).toFixed(2));
  } else if (bigUnits.includes(unit)) {
    return parseFloat((feedstockCostPerKiloOrLiter * quantity).toFixed(2));
  } else {
    throw new Error("Unknown or invalid product unit: " + unit);
  }
};


export const formatToBRL = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
