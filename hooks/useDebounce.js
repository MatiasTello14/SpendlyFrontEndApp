import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  // 1. 'debouncedValue' es el valor "retrasado" que devolveremos
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 2. Inicia un temporizador
    const handler = setTimeout(() => {
      // 4. Cuando el timer termina, actualiza el valor
      setDebouncedValue(value);
    }, delay); // (delay = 500ms)

    // 3. Si 'value' cambia (el usuario sigue tipeando), esta función de "limpieza" se ejecuta ANTES que el timer termine.
    return () => {
      clearTimeout(handler); // Cancela el timer anterior
    };
  }, [value, delay]); // Se reinicia CADA VEZ que 'value' o 'delay' cambian

  // 5. El formulario  recibe este valor retrasado
  return debouncedValue;
};

/**
 * useDebounce es un temporizador que evita que la aplicación llame a la API de conversión con cada tecla que el usuario presiona.
 * cuando el usuario ingrese un monto en USD (ej: "150"), queremos mostrarle la previsualización de la conversión 
 * (ej: "Equivale a $212,250 ARS").
 * Para hacer eso, debemos llamar a la función getConversion de tu servicio.
 * 
 * Este hook toma un valor pero no me lo devuelvas hasta que el usuario haya dejado de escribir por 500 milisegundos.
 */