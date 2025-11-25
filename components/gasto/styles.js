// components/gasto/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  nombre: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginBottom: 3,
  },

  categoria: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 3,
  },
  fecha: {
    color: '#777',
    fontSize: 12
  },

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
});

export default styles;