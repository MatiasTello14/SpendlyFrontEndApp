import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    padding: 15,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  detailImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd'
  },

  infoCard: {
    width: '95%',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  descripcionContainer: {
    alignItems: 'center',
    gap: 8,
  },

  // Estilos de Tipografía
  nombreDetalle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  montoDetalle: {
    fontSize: 18,
    color: '#555',
  },
  montoValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  fechaDetalle: {
    fontSize: 16,
    color: '#777',
  },
  categoriaDetalle: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
  },

  // Contenedor de Botones
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 30,
    width: '90%',
  }
});

export default styles;