import { api } from "./api";

export const getCategorias = async () => {
  const res = await api.get("/categorias");
  console.log("STATUS /categorias:", res.status);
  console.log("DATA /categorias:", res.data);
  return res.data;
};

export const agregarCategoria = async (categoria) => {

  const body = { titulo: categoria.nombre, imagen: categoria.imagen };
  const { data } = await api.post("/categorias", body);
  return data;
};

export const actualizarCategoria = async (id, categoria) => {
  const body = { titulo: categoria.nombre, imagen: categoria.imagen };
  const { data } = await api.put(`/categorias/${id}`, body);
  return data;
};

export const eliminarCategoria = async (id) => {
  const res = await api.delete(`/categorias/${id}`);
  return res.data;
};
