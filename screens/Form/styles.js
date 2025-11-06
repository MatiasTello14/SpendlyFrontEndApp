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
});

export default styles;