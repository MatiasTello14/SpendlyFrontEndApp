import { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Input } from '@rneui/themed';
import { agregarCategoria } from '../../services/categorias';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'; 

export default function CategoryForm() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = () => {
    agregarCategoria({ nombre, imagen }).then(() => {
      navigation.goBack(); 
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nueva Categoría</Text>
      <Input placeholder="Nombre de la categoría" onChangeText={setNombre} />
      <Input placeholder="URL de la imagen" onChangeText={setImagen} />
      <View style={styles.buttons}>
        <Button title="Guardar Categoría" onPress={handleSubmit} />
      </View>
    </View>
  );
}