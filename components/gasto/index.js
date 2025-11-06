
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Gasto({ gasto }) {
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { id: gasto.id })}>
        <Card containerStyle={styles.card}>
          <View style={styles.row}>
            <Image style={styles.imagen} source={{ uri: gasto.imagen }} />

            <View style={styles.infoContainer}>
              <Text style={styles.nombre}>{gasto.nombre}</Text>
              <Text style={styles.fecha}>{gasto.fecha}</Text>
            </View>
            <Text style={styles.monto}>${gasto.monto}</Text>
          </View>

          <Card.Divider />
          <View style={styles.buttons}>
            <Button
              title="✏️ Editar"
              color="#FFA500" />
            <Button
              title="🗑️ Eliminar"
              color="#FF4500" />
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

