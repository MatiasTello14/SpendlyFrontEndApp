import { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView, Switch, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { actualizarGasto, agregarGasto, getCotizaciones, getConversion } from '../../services/gastos';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useDebounce } from '../../hooks/useDebounce';
import { getCategorias } from '../../services/categorias';
import * as DocumentPicker from "expo-document-picker";
import { formatFecha } from '../../utils/formatFecha';

export default function GastoForm() {
  const { gastoData } = useRoute().params || {};
  const navigation = useNavigation();
  const gastoId = gastoData?._id || gastoData?.id;

  
  const [nombre, setNombre] = useState(gastoData?.nombre || '');
  const [categoria, setCategoria] = useState(gastoData?.categoria || '');
  const [fecha, setFecha] = useState(() => formatFecha(gastoData?.fecha));
  const [imagen, setImagen] = useState(gastoData?.imagen || '');
  const [monto, setMonto] = useState(gastoData?.monto?.toString() || '');
  const [moneda, setMoneda] = useState(gastoData?.moneda || 'ARS');
  const [tipoConversion, setTipoConversion] = useState(gastoData?.tipoConversion || 'tarjeta');
  
  const [cotizaciones, setCotizaciones] = useState([]);
  const [montoConvertido, setMontoConvertido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [errors, setErrors] = useState({});
  const [categorias, setCategorias] = useState([]); 

  const [archivo, setArchivo] = useState(null);
  const [mostrarSelectorCategoria, setMostrarSelectorCategoria] = useState(false);

  const debouncedMonto = useDebounce(monto, 500);



  
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
        
    useFocusEffect(
      useCallback(() => {
        getCategorias()
          .then(data => {
            setCategorias(data);
            if (!gastoData && data.length > 0) {
              const randomIndex = Math.floor(Math.random() * data.length);
              const randomCategoria = data[randomIndex];
              setCategoria(randomCategoria.titulo || randomCategoria.nombre);
              setImagen(randomCategoria.imagen);
            }
          })
          .catch(err => console.log(err));
      }, [gastoData])
    );

  
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

  
    const handleCategorySelect = (categoriaTitulo) => {
      const cat = categorias.find(c => (c.titulo || c.nombre) === categoriaTitulo);
      if (cat) {
        const tituloFinal = cat.titulo || cat.nombre;
        setCategoria(tituloFinal);
        setImagen(cat.imagen);
      }
      setMostrarSelectorCategoria(false);
    };

  const handlePickFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"], 
      copyToCacheDirectory: true,
      multiple: false
    });

    if (result.canceled) return;

    const file = result.assets[0];
    setArchivo(file); 
  } catch (error) {
    console.log("Error picking file:", error);
  }
};
  
  const handleSubmit = async () => {
  setLoading(true);
  setErrors({});

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

  // armamos FormData
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("categoria", categoria);
  formData.append("fecha", fecha);
  formData.append("imagen", imagen || "");
  formData.append("monto", monto);
  formData.append("moneda", moneda);

  if (moneda === "USD") {
    formData.append("tipoConversion", tipoConversion);
  }

 
  if (archivo) {
    formData.append("archivo", {
      uri: archivo.uri,
      name: archivo.name,
      type: archivo.mimeType || "application/octet-stream"
    });
  }

  try {
    if (gastoId) {
      await actualizarGasto(gastoId, formData);   
    } else {
      await agregarGasto(formData);                   
    }
    navigation.goBack();
  } catch (error) {
    setErrors({ api: error.message });
    setLoading(false);
  }
};
    
  return (
    
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{gastoId ? 'Editar' : 'Agregar'} Gasto</Text>
      </View>
      
      <View style={styles.formContainer} >
        
        
        <Input placeholder="Descripcion del Gasto (Ej: Netflix, Supermercado)" 
          value={nombre} 
          onChangeText={setNombre}
          errorMessage={errors?.nombre ? 'Requerido' : ''}
        />

        <Text style={{ fontSize: 16, marginLeft: 10, color: 'grey', marginBottom: 6 }}>Categoría:</Text>
        <TouchableOpacity
          style={styles.categoryPreview}
          onPress={() => setMostrarSelectorCategoria(true)}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: imagen || 'https://cdn-icons-png.flaticon.com/512/3917/3917188.png' }}
            style={styles.categoryPreviewImage}
          />
          <View style={styles.categoryPreviewInfo}>
            <Text style={styles.categoryPreviewTitle}>
              {categoria || 'Elegí una categoría'}
            </Text>
            <Text style={styles.categoryPreviewHint}>Tocá para cambiarla</Text>
          </View>
          <Text style={styles.categoryPreviewChevron}>▾</Text>
        </TouchableOpacity>

        {mostrarSelectorCategoria && (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={categoria}
              onValueChange={(itemValue) => handleCategorySelect(itemValue)}
            >
              {Array.isArray(categorias) && categorias.map(c => {
                const titulo = c.titulo || c.nombre;
                return (
                  <Picker.Item
                    key={(c._id || c.id).toString()}
                    label={titulo}
                    value={titulo}
                  />
                );
              })}
            </Picker>
            <View style={styles.pickerActions}>
              <Button
                title="Crear nueva categoría"
                onPress={() => navigation.navigate('CategoryForm')}
              />
              <Button title="Listo" onPress={() => setMostrarSelectorCategoria(false)} />
            </View>
          </View>
        )}
        
        <Input 
          placeholder="Fecha (YYYY-MM-DD)" 
          value={fecha} 
          onChangeText={setFecha}
          errorMessage={errors?.fecha ? 'Requerido' : ''}
        />

        
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

        <View style={{ marginVertical: 10, gap: 6 }}>
          <Button title="📎 Adjuntar comprobante" onPress={handlePickFile} />
          
          {archivo && (
            <Text style={{ textAlign: "center", color: "grey" }}>
              Archivo seleccionado: {archivo.name}
            </Text>
          )}
        </View>

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
