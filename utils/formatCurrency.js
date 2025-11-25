export const formatMontoArs = (valor) => {
  const numero = typeof valor === "number" ? valor : Number(valor);
  if (Number.isNaN(numero)) {
    return "0.00";
  }

  return numero.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
