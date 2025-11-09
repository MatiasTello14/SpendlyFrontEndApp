import { random } from '../utils/lib';

const MAX_GASTOS = 15;

const categorias = ['Comida', 'Transporte', 'Entretenimiento', 'Hogar', 'Educación', 'Salud'];

const VALOR_DOLAR_TARJETA = 1878.5;
const VALOR_DOLAR_BLUE = 1415.0;

// simula la respuesta de GET /dolar
const mockCotizaciones = [
    { casa: "oficial", nombre: "Oficial", venta: 1445.0 },
    { casa: "blue", nombre: "Blue", venta: VALOR_DOLAR_BLUE },
    { casa: "tarjeta", nombre: "Tarjeta", venta: VALOR_DOLAR_TARJETA },
];


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
  const monto = getRandomMonto(); // El monto aleatorio siempre es ARS
  return {
    id,
    categoria: categoria, // Usamos 'categoria' para alinear con el backend
    fecha: getRandomFecha(),
    imagen: imagenesCategorias[categoria],
    
    montoEnARS: monto,    // El monto en ARS
    monto: monto,         // El monto original que ingreso el usuario
    moneda: "ARS",        // moneda
    tipoConversion: null  // tipo conversion para usd
  }
};

let gastos = Array.from({ length: MAX_GASTOS }, (_, i) => generarGasto(i + 1));
let nextId = MAX_GASTOS + 1;

const getGastos = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(gastos), 800); // simulación de API
  });
};

const agregarGasto = (gasto) => {
return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const gastoProcesado = simularConversion(gasto); //conversion
        const nuevoGasto = { ...gastoProcesado, id: nextId++ };
        gastos.push(nuevoGasto);
        resolve(nuevoGasto);
      } catch (error) {
        reject(error);
      }
    }, 500);
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
      try {
        // simula logica de conversion al actualizar.
        const gastoProcesado = simularConversion(gasto);
        // reemplaza el gasto en el array
        const gastoActualizado = { ...gastoProcesado, id: id };
        gastos = gastos.map((g) => (g.id === id ? gastoActualizado : g));
        resolve(gastoActualizado);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
}


/**
 * Funcion simula la logica de conversion del backend.
 *
 */
const simularConversion = (data) => {
    let montoEnARS;
    const monto = parseFloat(data.monto);
    const moneda = data.moneda;
    const tipoConversion = data.tipoConversion;

    if (moneda === 'USD') {
        if (!tipoConversion) throw new Error("Se requiere un tipo de conversión para USD.");
        
        const tipoDolar = mockCotizaciones.find(c => c.casa === tipoConversion);
        if (!tipoDolar) throw new Error("Tipo de dólar no válido.");
        
        // Usamos parseFloat para evitar NaN
        montoEnARS = monto * parseFloat(tipoDolar.venta);
    } else {
        montoEnARS = monto;
    }

    return {
        categoria: data.categoria,
        fecha: data.fecha,
        imagen: data.imagen || 'https://cdn-icons-png.flaticon.com/512/2221/2221756.png', // Imagen default
        montoEnARS: Math.round(montoEnARS * 100) / 100,
        monto: monto,
        moneda: moneda,
        tipoConversion: moneda === 'USD' ? tipoConversion : null
    };
};


// --- NUEVAS Funciones de Dólar (Mockeadas) ---

/**
 * Simula la llamada a GET /dolar
 */
const getCotizaciones = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockCotizaciones), 300);
    });
};

/**
 * Simula la llamada a GET /dolar/convertir
 */
const getConversion = (monto, moneda, tipo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (moneda !== 'USD') {
                return resolve({ montoConvertido: parseFloat(monto) });
            }
            const tipoDolar = mockCotizaciones.find(c => c.casa === tipo);
            if (!tipoDolar) {
                return reject(new Error("Tipo de conversión no válido"));
            }
            const montoConvertido = parseFloat(monto) * parseFloat(tipoDolar.venta);
            resolve({ montoConvertido: Math.round(montoConvertido * 100) / 100 });
        }, 300);
    });
};


export { 
    getGastos, 
    agregarGasto, 
    getGastoById, 
    eliminarGasto, 
    actualizarGasto,
    getCotizaciones,
    getConversion
};
