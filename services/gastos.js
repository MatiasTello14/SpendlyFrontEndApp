import { api } from "./api";


// GET /gastos
const getGastos = async (token) => {
  try {
    const res = await api.get("/gastos", {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener gastos");
  }
};

// GET /gastos/:id
const getGastoById = async (id, token) => {
  try {
    const res = await api.get(`/gastos/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener gasto");
  }
};

/**
 * POST /gastos
 * Si viene archivo, se manda multipart/form-data.
 * Si no viene archivo, igual podemos mandar JSON simple.
 */
const agregarGasto = async (gasto, archivo, token) => {
  try {
    // Si hay archivo -> multipart
    if (archivo) {
      const formData = new FormData();

      formData.append("nombre", gasto.nombre);
      formData.append("categoria", gasto.categoria);
      formData.append("monto", gasto.monto);
      formData.append("fecha", gasto.fecha);
      formData.append("moneda", gasto.moneda);
      formData.append("tipoConversion", gasto.tipoConversion ?? "");

      // el backend espera "archivo"
      formData.append("archivo", {
        uri: archivo.uri,
        name: archivo.name || "archivo.jpg",
        type: archivo.type || "image/jpeg"
      });

      const res = await api.post("/gastos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      return res.data;
    }

    // Si NO hay archivo -> json normal
    const res = await api.post("/gastos", gasto, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al agregar gasto");
  }
};

/**
 * PUT /gastos/:id
 * - Si hay archivo -> multipart y reemplaza.
 * - Si se manda archivo=null literal, backend lo borra.
 */
const actualizarGasto = async (id, gasto, archivo, token) => {
  try {
    if (archivo) {
      const formData = new FormData();

      Object.entries(gasto).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      formData.append("archivo", {
        uri: archivo.uri,
        name: archivo.name || "archivo.jpg",
        type: archivo.type || "image/jpeg"
      });

      const res = await api.put(`/gastos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      return res.data;
    }

    // update sin archivo
    const res = await api.put(`/gastos/${id}`, gasto, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al actualizar gasto");
  }
};

// DELETE /gastos/:id
const eliminarGasto = async (id, token) => {
  try {
    await api.delete(`/gastos/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al eliminar gasto");
  }
};




// GET /dolar
const getCotizaciones = async () => {
  try {
    const res = await api.get("/dolar");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al obtener cotizaciones");
  }
};

const getConversion = async (monto, moneda, tipoConversion) => {
  try {
    const res = await api.get(
      `/dolar/convertir?monto=${monto}&moneda=${moneda}&tipoConversion=${tipoConversion}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error en conversión");
  }
};

export {
  getGastos,
  getGastoById,
  agregarGasto,
  actualizarGasto,
  eliminarGasto,
  getCotizaciones,
  getConversion
};