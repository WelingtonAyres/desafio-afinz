export const formatCurrency = (inputValue: string) => {
  const numericValue = inputValue.replace(/\D/g, "");

  if (!numericValue) {
    return "0,00";
  }

  const formattedValue = (parseInt(numericValue, 10) / 100).toLocaleString(
    "pt-BR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return formattedValue;
};

export const formatAccount = (inputValue: string) => {
  let valor = inputValue.replace(/\D/g, "");
  if (valor.length > 3) {
    valor = valor.slice(0, -1) + "-" + valor.slice(-1); //
  }
  return valor;
};
