import { StyleSheet } from  'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',       
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',      
    marginTop: 20
  },
  descripcionContainer: {
    marginTop: 30,
    alignItems: 'center',       
    gap: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',   
    gap: 10,
    marginTop: 30
  }
});

export default styles