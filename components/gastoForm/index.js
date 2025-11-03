import { View, Button } from 'react-native';
import { Input } from '@rneui/themed';

export default function GastoForm() {
  return (
    <View>
      <Input placeholder="Nombre del gasto" />
      <Input placeholder="Monto ($)" keyboardType="numeric" />
      <Input placeholder="Categoría" />
      <Input placeholder="Fecha (YYYY-MM-DD)" />
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
        <Button title="Guardar" onPress={() => console.log('Guardar gasto')} />
        <Button title="Cancelar" onPress={() => console.log('Cancelar')} />
      </View>
    </View>
  );
}