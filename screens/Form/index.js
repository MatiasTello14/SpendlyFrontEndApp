// --- IMPORTACIONES FUSIONADAS ---
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Switch, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { actualizarGasto, agregarGasto, getCotizaciones, getConversion } from '../../services/gastos';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDebounce } from '../../hooks/useDebounce';
import { getCategorias } from '../../services/categorias';

export default function GastoForm() {
  const { gastoData } = useRoute().params || {}
  const navigation = useNavigation()

  // --- ESTADOS FUSIONADOS Y CORREGIDOS ---
  // Re-introducimos 'nombre' para el título
  const [nombre, setNombre] = useState(gastoData?.nombre || ''); // <<< TU CAMPO DE NOMBRE
  const [categoria, setCategoria] = useState(gastoData?.categoria || '');
  const [fecha, setFecha] = useState(gastoData?.fecha || '');
  const [imagen, setImagen] = useState(gastoData?.imagen || '');
  const [monto, setMonto] = useState(gastoData?.monto?.toString() || '');
  const [moneda, setMoneda] = useState(gastoData?.moneda || 'ARS');
  const [tipoConversion, setTipoConversion] = useState(gastoData?.tipoConversion || 'tarjeta');
  
  const [cotizaciones, setCotizaciones] = useState([]);
  const [montoConvertido, setMontoConvertido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [errors, setErrors] = useState({});
  const [categorias, setCategorias] = useState([]); // Tu estado de categorías

  const debouncedMonto = useDebounce(monto, 500);

  // --- EFECTOS (Tus compañeros + tuyos) ---
  useEffect(() => {
    // Carga cotizaciones
    getCotizaciones()
      .then(data => {
        setCotizaciones(data);
        if (!gastoData && data.length > 0) {
          setTipoConversion(data[0].casa);
        }
      })
      .catch(err => setErrors(prev => ({ ...prev, api: err.message })));
    
    // Carga categorías
    getCategorias().then(data => setCategorias(data));
  }, []); // Un solo useEffect para cargar todo al inicio

  // Efecto de 'main' para la conversión
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

  // --- HANDLERS ---
  const handleCategorySelect = (categoriaSeleccionada) => {
    setCategoria(categoriaSeleccionada.nombre);
    setImagen(categoriaSeleccionada.imagen);
  }

  // HandleSubmit fusionado
  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    
    // Validación fusionada (ahora incluye 'nombre')
    if (!nombre || !categoria || !monto || !fecha) {
      setErrors({
        nombre: !nombre,
        categoria: !categoria,
        monto: !monto,
        fecha: !fecha,
      });
      setLoading(false);
      return;
    }

    const gastoParaGuardar = {
      nombre, // <<< TU CAMPO DE NOMBRE
      categoria,
      fecha,
      imagen: imagen || null,
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
    // ScrollView con 'style' corregido, no 'contentContainerStyle'
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{gastoData?.id ? 'Editar' : 'Agregar'} Gasto</Text>
      </View>
      
      <View style={styles.formContainer} >
        
        {/* === CAMPO DE NOMBRE (RE-AGREGADO) === */}
        <Input 
          placeholder="Nombre del Gasto (Ej: Netflix, Supermercado)" 
          value={nombre} 
          onChangeText={setNombre}
          errorMessage={errors?.nombre ? 'Requerido' : ''}
        />

        {/* === TU FEATURE DE CATEGORÍAS (INTACTA) === */}
        <View style={styles.categoryLabelContainer}>
          <Text style={styles.titulo}>Categoría</Text>
          <Text style={styles.seleccionadaLabel}>
            {categoria ? categoria : 'Ninguna'}
          </Text>
        </View>
        <FlatList
          data={categorias} 
          horizontal
          style={styles.categoryList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.categoryItem} 
              onPress={() => handleCategorySelect(item)}
            >
              <Image source={{ uri: item.imagen }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.crearCategoriaButton}>
          <Button
            title="Crear Nueva Categoría"
            onPress={() => navigation.navigate('CategoryForm')}
          />
        </View>
        {/* === FIN DE TU FEATURE === */}

        {/* Campo de Fecha */}
        <Input 
          placeholder="Fecha (YYYY-MM-DD)" 
          value={fecha} 
          onChangeText={setFecha}
          errorMessage={errors?.fecha ? 'Requerido' : ''}
        />

        {/* === FEATURE DE MONEDA (INTACTA) === */}
        {/* Ahora SÍ debería ser visible gracias al ScrollView corregido */}
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
        {/* === FIN FEATURE MONEDA === */}

        {loadingConversion && <ActivityIndicator size="small" />}
        {montoConvertido !== null && !loadingConversion && (
          <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>
            Equivale a: <Text style={{ fontWeight: 'bold' }}>${montoConvertido} ARS</Text>
          </Text>
        )}
        {errors?.api && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>Error: {errors.api}</Text>}
        {errors?.conversion && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>Error: {errors.conversion}</Text>}

        {/* Botones */}
        <View style={styles.buttons}>
          <Button title="Guardar" onPress={handleSubmit} disabled={loading} />
          <Button title="Cancelar" onPress={() => navigation.goBack()} color="grey" />
        </View>
      </View> 
    </ScrollView>
  );
}