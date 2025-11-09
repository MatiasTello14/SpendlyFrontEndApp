
let categorias = [
  { id: 1, nombre: 'Comida', imagen: 'https://images.unsplash.com/vector-1739806651163-75929fa8e121?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=3000' },
  { id: 2, nombre: 'Transporte', imagen: 'https://cdn-icons-png.flaticon.com/512/6607/6607427.png' },
  { id: 3, nombre: 'Entretenimiento', imagen: 'https://cdn-icons-png.flaticon.com/512/4319/4319047.png' },
  { id: 4, nombre: 'Hogar', imagen: 'https://cdn-icons-png.flaticon.com/512/6676/6676728.png' },
  { id: 5, nombre: 'Educación', imagen: 'https://cdn-icons-png.flaticon.com/512/11905/11905744.png' },
  { id: 6, nombre: 'Salud', imagen: 'https://cdn-icons-png.flaticon.com/512/2221/2221756.png' },
];


export const getCategorias = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categorias), 500);
  });
};


export const agregarCategoria = (categoria) => {
  return new Promise((resolve) => {
    const nuevaCategoria = { ...categoria, id: categorias.length + 1 };
    categorias.push(nuevaCategoria);
    resolve(nuevaCategoria);
  });
};