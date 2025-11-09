import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Switch, ActivityIndicator} from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { actualizarGasto, agregarGasto, getCotizaciones, getConversion } from '../../services/gastos';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDebounce } from '../../hooks/useDebounce'; //hook control de conversion

export default function GastoForm() {
  const {gastoData} = useRoute().params || {}

  const navigation = useNavigation()

  const [categoria, setCategoria] = useState(gastoData?.categoria || '');
  const [fecha, setFecha] = useState(gastoData?.fecha || '');
  const [imagen, setImagen] = useState(gastoData?.imagen || '');
  const [monto, setMonto] = useState(gastoData?.monto?.toString() || '');
  const [moneda, setMoneda] = useState(gastoData?.moneda || 'ARS');
  const [tipoConversion, setTipoConversion] = useState(gastoData?.tipoConversion || 'tarjeta');

  // --- Estados de UI ---
  const [cotizaciones, setCotizaciones] = useState([]);
  const [montoConvertido, setMontoConvertido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingConversion, setLoadingConversion] = useState(false);

  const [errors, setErrors] = useState({});

  const debouncedMonto = useDebounce(monto, 500);

  // 1. Cargar cotizaciones (mockeadas) al abrir el form
 useEffect(() => {
    getCotizaciones()
      .then(data => {
        setCotizaciones(data);
        if (!gastoData && data.length > 0) {
          setTipoConversion(data[0].casa);
        }
      })
      .catch(err => setErrors(prev => ({ ...prev, api: err.message })));
  }, []);

  // 2. Obtener previsualización de conversión (mockeada)
 useEffect(() => {
    setMontoConvertido(null);
    setErrors(prev => ({ ...prev, conversion: null }));

    if (moneda === 'USD' && debouncedMonto > 0 && tipoConversion) {
      setLoadingConversion(true);
      getConversion(debouncedMonto, moneda, tipoConversion)
        .then(data => setMontoConvertido(data.montoConvertido))
        .catch(err => setErrors(prev => ({ ...prev, conversion: err.message })))
        .finally(() => setLoadingConversion(false));
    }
  }, [debouncedMonto, moneda, tipoConversion]);

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});


    // Validación - imagen ya no es obligatoria
    if (!categoria || !monto || !fecha) {
      setErrors({
        categoria: !categoria,
        monto: !monto,
        fecha: !fecha,
      });
      setLoading(false);
      return;
    }

    // Objeto a enviar (alineado con la API del backend)
    const gastoParaGuardar = {
      categoria,
      fecha,
      imagen: imagen || null, // imagen opcional
      monto: parseFloat(monto),
      moneda,
      tipoConversion: moneda === 'USD' ? tipoConversion : null
    };
    try {
      if (gastoData?.id) {
        await actualizarGasto(gastoData.id, gastoParaGuardar);
      } else {
        await agregarGasto(gastoParaGuardar);
      }
      navigation.goBack();
    } catch (error) {
      setErrors({ api: error.message });
      setLoading(false);
    }
  };
    

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* Arreglamos el título de "Editar" */}
        <Text style={styles.titulo}>{gastoData?.id ? 'Editar' : 'Agregar'} Gasto</Text>
      </View>
      <View style={styles.formContainer} >

        {/* Unificamos 'nombre' y 'categoria' en un solo campo 'categoria' */}
        <Input 
          placeholder="Título (Ej: Netflix, Supermercado)" 
          value={categoria} 
          onChangeText={setCategoria}
          errorMessage={errors?.categoria ? 'Requerido' : ''}
        />
        <Input 
          placeholder="Fecha (YYYY-MM-DD)" 
          value={fecha} 
          onChangeText={setFecha}
          errorMessage={errors?.fecha ? 'Requerido' : ''}
        />
         <Input 
          placeholder="URL de la imagen (Opcional)" 
          value={imagen} 
          onChangeText={setImagen}
          errorMessage={errors?.imagen ? 'Requerido' : ''}
        />

        {/* --- NUEVA SECCIÓN DE MONEDA --- */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <Text style={{ fontSize: 18, color: moneda === 'ARS' ? 'black' : 'grey' }}>ARS</Text>
          <Switch
            value={moneda === 'USD'}
            onValueChange={(isUSD) => setMoneda(isUSD ? 'USD' : 'ARS')}
          />
          <Text style={{ fontSize: 18, color: moneda === 'USD' ? 'black' : 'grey' }}>USD</Text>
        </View>

        <Input 
          placeholder={`Monto en ${moneda}`} 
          value={monto} 
          onChangeText={setMonto}
          keyboardType="numeric"
          errorMessage={errors?.monto ? 'Requerido' : ''}
        />

        {moneda === 'USD' && (
          <>
            <Text style={{ fontSize: 16, marginLeft: 10, color: 'grey' }}>Tipo de Conversión:</Text>
            <Picker
              selectedValue={tipoConversion}
              onValueChange={(itemValue) => setTipoConversion(itemValue)}
            >
              {cotizaciones.map(c => (
                <Picker.Item key={c.casa} label={c.nombre} value={c.casa} />
              ))}
            </Picker>
          </>
        )}
        {/* --- FIN NUEVA SECCIÓN --- */}

        {loadingConversion && <ActivityIndicator size="small" />}
        {montoConvertido !== null && !loadingConversion && (
          <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>
            Equivale a: <Text style={{ fontWeight: 'bold' }}>${montoConvertido} ARS</Text>
          </Text>
        )}

        {errors?.api && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>Error: {errors.api}</Text>}
        {errors?.conversion && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>Error: {errors.conversion}</Text>}

        <View style={styles.buttons}>
          <Button title="Guardar" onPress={handleSubmit} disabled={loading} />
          <Button title="Cancelar" onPress={() => navigation.goBack()} color="grey" />
        </View>
      </View> 
    </ScrollView>
  );
}