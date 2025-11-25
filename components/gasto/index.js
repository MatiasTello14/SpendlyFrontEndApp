import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { formatFecha } from "../../utils/formatFecha";
import { formatMontoArs } from "../../utils/formatCurrency";

export default function Gasto({ gasto }) {
  const navigation = useNavigation();
  const idReal = gasto._id || gasto.id;

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { id: idReal })}>
        <Card containerStyle={styles.card}>
          <View style={styles.row}>
            <Image style={styles.imagen} source={{ uri: gasto.imagen }} />

            <View style={styles.infoContainer}>
              <Text style={styles.nombre}>{gasto.nombre}</Text>
              <Text style={styles.fecha}>{formatFecha(gasto.fecha)}</Text>
              <Text style={styles.categoria}>{gasto.categoria}</Text>
              {gasto.moneda === 'USD' && (
                <Text style={styles.monedaOriginal}>
                  (${gasto.monto} USD)
                </Text>
              )}
            </View>

            <Text style={styles.monto}>${formatMontoArs(gasto.montoEnARS)}</Text>
          </View>

        </Card>
      </TouchableOpacity>
    </View>
  );
}
