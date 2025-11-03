import { ScrollView } from 'react-native';
import Gasto from '../gasto';

export default function GastoScrollView({ gastos }) {
  return (
    <ScrollView>
      {gastos.map((gasto) => (
        <Gasto key={gasto.id} gasto={gasto} />
      ))}
    </ScrollView>
  );
}