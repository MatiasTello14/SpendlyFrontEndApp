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

  monto: {

    fontSize: 18,

    fontWeight: 'bold',

    color: '#2e8b57'

  },



  imagen: {

    width: 60,

    height: 60,

    borderRadius: 15,

    marginRight: 15,

  },



  buttons: {

    flexDirection: 'row',

    justifyContent: 'flex-end',

    gap: 10,

  },

});



export default styles; 