export const formatFecha = (fechaISO) => {
  if (!fechaISO) return "";
  return new Date(fechaISO).toISOString().split("T")[0];
};