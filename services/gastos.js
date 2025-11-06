import { random } from '../utils/lib';

const MAX_GASTOS = 15;

const categorias = ['Comida', 'Transporte', 'Entretenimiento', 'Hogar', 'Educación', 'Salud'];

const imagenesCategorias = {
  Comida: 'https://images.unsplash.com/vector-1739806651163-75929fa8e121?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=3000',
  Transporte: 'https://cdn-icons-png.flaticon.com/512/6607/6607427.png',
  Entretenimiento: 'https://cdn-icons-png.flaticon.com/512/4319/4319047.png',
  Hogar: 'https://cdn-icons-png.flaticon.com/512/6676/6676728.png',
  Educación: 'https://cdn-icons-png.flaticon.com/512/11905/11905744.png',
  Salud: 'https://cdn-icons-png.flaticon.com/512/2221/2221756.png',
};

const getRandomCategoria = () => categorias[random(0, categorias.length - 1)];
const getRandomMonto = () => random(500, 5000);
const getRandomFecha = () => {
  const dia = random(1, 30).toString().padStart(2, '0');
  const mes = random(1, 12).toString().padStart(2, '0');
  return `2025-${mes}-${dia}`;
};

const generarGasto = (id) => {
  const categoria = getRandomCategoria();
  return {
    id,
    nombre: categoria,
    monto: getRandomMonto(),
    categoria,
    fecha: getRandomFecha(),
    imagen: imagenesCategorias[categoria]
  }
};

let gastos = Array.from({ length: MAX_GASTOS }, (_, i) => generarGasto(i + 1));

const getGastos = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(gastos), 800); // simulación de API
  });
};

const agregarGasto = (gasto) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const nuevoGasto = { ...gasto, id: gastos.length + 1 };
      gastos.push(nuevoGasto);
      resolve(nuevoGasto);
    }, 1000);
  });
}

const getGastoById = (id) => {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(gastos.find((gasto) => gasto.id === id))
    }, 1000)
  })
}

const eliminarGasto = (id) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        gastos = gastos.filter((gasto) => gasto.id !== id)
        resolve(true)
      }, 1000)
    })
  }

  

const actualizarGasto = (id, gasto) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const gastoActualizado = { ...gasto, id: id }
      gastos = gastos.map((g) => g.id === id ? { ...g, ...gastoActualizado } : g)
      resolve(true)
    }, 1000)
  })
}




export { getGastos, agregarGasto, getGastoById, eliminarGasto, actualizarGasto };