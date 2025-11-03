import { random } from '../utils/lib';

const MAX_GASTOS = 15;

const categorias = ['Comida', 'Transporte', 'Entretenimiento', 'Hogar', 'Educación', 'Salud'];

const getRandomCategoria = () => categorias[random(0, categorias.length - 1)];
const getRandomMonto = () => random(500, 5000);
const getRandomFecha = () => {
  const dia = random(1, 30).toString().padStart(2, '0');
  const mes = random(1, 12).toString().padStart(2, '0');
  return `2025-${mes}-${dia}`;
};

const generarGasto = (id) => ({
  id,
  nombre: categorias[random(0, categorias.length - 1)],
  monto: getRandomMonto(),
  categoria: getRandomCategoria(),
  fecha: getRandomFecha(),
});

const gastos = Array.from({ length: MAX_GASTOS }, (_, i) => generarGasto(i + 1));

const getGastos = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(gastos), 800); // simulación de API
  });
};

export { getGastos };