import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,                
    justifyContent: 'center', 
    alignItems: 'center',    
    padding: 20,             
    backgroundColor: '#fff', 
  },
  header: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },

  categoryLabelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  seleccionadaLabel: {
    fontSize: 16,
    color: '#555',
  },
 
  categoryList: {
    marginTop: 10,
    marginBottom: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30, 
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
  },
  
  crearCategoriaButton: {
    marginTop: 10,
    marginBottom: 20,
  }
});



export default styles;