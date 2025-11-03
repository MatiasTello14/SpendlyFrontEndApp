import { View, Text, StyleSheet, Button } from 'react-native';
import { Card } from '@rneui/themed';

export default function Gasto({ gasto }) {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.nombre}>{gasto.nombre}</Text>
          <Text style={styles.fecha}>{gasto.fecha}</Text>
        </View>
        <Text style={styles.monto}>${gasto.monto}</Text>
      </View>

      <Card.Divider />
      <View style={styles.buttons}>
        <Button title="Editar" />
        <Button title="Eliminar" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  categoria: { color: 'gray', fontSize: 14 },
  fecha: { color: '#777', fontSize: 12 },
  monto: { fontSize: 18, fontWeight: 'bold', color: '#2e8b57' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});