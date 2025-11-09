import { useState, useEffect } from 'react'; 
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native'; 
import { Input } from '@rneui/themed';
import styles from './styles';
import { actualizarGasto, agregarGasto } from '../../services/gastos';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getCategorias } from '../../services/categorias'; 

export default function GastoForm() {
  const { gastoData } = useRoute().params || {}
  const navigation = useNavigation()

  
  const [gasto, setGasto] = useState({
    nombre: gastoData?.nombre || '',
    monto: gastoData?.monto || '',
    categoria: gastoData?.categoria || '',
    fecha: gastoData?.fecha || '',
    imagen: gastoData?.imagen || ''
  });
  
  const [errors, setErrors] = useState(null);
  
  
  const [categorias, setCategorias] = useState([]);

  
  useEffect(() => {
    getCategorias().then(data => setCategorias(data));
  }, []);

  
  const handleChange = (name, value) => {
    setGasto({ ...gasto, [name]: value });
    setErrors({ ...errors, [name]: null });
  }

  
  const handleCategorySelect = (categoria) => {
    setGasto({
      ...gasto,
      categoria: categoria.nombre,
      imagen: categoria.imagen
    });
  }

  const handleSubmit = () => {
    
    console.log(gasto);
    if (gasto.nombre === '' || gasto.monto === '' || gasto.categoria === '' || gasto.fecha === '' || gasto.imagen === '') {
      setErrors({
        ...errors,
        nombre: gasto.nombre === '',
        monto: gasto.monto === '',
        categoria: gasto.categoria === '',
        fecha: gasto.fecha === '',
        imagen: gasto.imagen === ''
      });
      return;
    }

    const shouldUpdate = gastoData?.id ? true : false

    if (shouldUpdate) {
      actualizarGasto(gastoData.id, gasto).then((data) => {
        console.log('Gasto actualizado', data)
        navigation.goBack()
      })
    } else {
      agregarGasto(gasto).then((data) => {
        console.log('Gasto agregado:', data);
        navigation.goBack()
      })
    }
  } 

 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Agregar Nuevo Gasto</Text>
      </View>
      <View style={styles.formContainer} >
        <Input placeholder="Nombre del gasto" value={gasto.nombre} onChangeText={(text) => handleChange('nombre', text)} keyboardType='default' errorMessage={errors?.nombre ? 'El nombre es requerido' : ''} />
        <Input placeholder="Monto ($)" value={gasto.monto.toString()} onChangeText={(text) => handleChange('monto', text)} errorMessage={errors?.monto ? 'El monto es requerido' : ''} />
        <Input placeholder="Fecha (YYYY-MM-DD)" value={gasto.fecha.toString()} onChangeText={(text) => handleChange('fecha', text)} errorMessage={errors?.fecha ? 'La fecha es requerida' : ''} />
        
        
       <View style={styles.categoryLabelContainer}>
          <Text style={styles.titulo}>Categoría</Text>
          <Text style={styles.seleccionadaLabel}>
            {gasto.categoria ? gasto.categoria : 'Ninguna'}
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
        
        <View style={styles.buttons}>
          <Button title="Guardar" onPress={handleSubmit} />
          <Button title="Cancelar" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}