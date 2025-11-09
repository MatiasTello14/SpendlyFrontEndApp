// components/gasto/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  fecha: {
    color: '#777',
    fontSize: 12
  },
  // NUEVO ESTILO
  monedaOriginal: {
    color: '#777',
    fontSize: 12,
    fontStyle: 'italic'
  },
  monto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 15,
  },
  // Vaciamos los estilos de botones
  buttons: {},
});

export default styles;