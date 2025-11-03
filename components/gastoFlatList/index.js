import { FlatList } from 'react-native';
import Gasto from '../gasto';

export default function GastoFlatList({ gastos }) {
  return (
    <FlatList
      data={gastos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Gasto gasto={item} />}
    />
  );
}