import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  fullDetailCard: {
    width: '100%',
    margin: 0,
    borderRadius: 18,
    padding: 0,
    overflow: 'hidden',
    alignSelf: 'center',
    maxWidth: 520,
  },
  imageWrapper: {
    width: '100%',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  detailImage: {
    width: '100%',
    height: '100%',
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
    padding: 24,
  },


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
    marginBottom: 4,
  },
  montoValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  fechaDetalle: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
  categoriaDetalle: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 6,
  },

  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default styles;
