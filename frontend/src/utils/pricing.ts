export const formatToBRL = (value: number) => {
  if (value === undefined) {
    return undefined;
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
