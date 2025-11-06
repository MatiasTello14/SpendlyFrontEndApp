import { View,Text , Button, Image, ScrollView} from "react-native"
import { useCallback, useEffect, useState } from 'react';
import {getGastoById } from '../../services/gastos'
import { eliminarGasto } from "../../services/gastos";  
import { useNavigation , useRoute, useFocusEffect} from '@react-navigation/native';
import styles from './styles';

export default function Details() {
    const {id} = useRoute().params
    const [gasto, setGasto] = useState(null)
    const navigation = useNavigation()



    useFocusEffect(useCallback(() => {
      if(id){
            getGastoById (id).then((gasto) => {
                console.log('Gasto obtenido', gasto)
                setGasto(gasto)
            }).catch((error) => {
                console.log('Error al obtener el gasto', error)
            })
        }
    }, [id]))



    const handleEliminar = () => {
        eliminarGasto(id).then((data) => {
            console.log('Gasto eliminado', data)
            navigation.goBack()
        }).catch((error) => {
            console.log('Error al eliminar un gasto', error)
        })
    }

    return (
        <View style={styles.container}>
            {gasto &&(
                <ScrollView> 
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri : gasto.imagen}}
                            style= {{width: 200, height: 200}}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.descripcionContainer}>
                        <Text>Nombre: {gasto.nombre}</Text>
                        <Text>Monto: ${gasto.monto}</Text>
                        <Text>Fecha: {gasto.fecha}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Editar" onPress={() => navigation.navigate('Form', {gastoData: gasto})}/>
                        <Button title="Eliminar" onPress={handleEliminar}/>
                    </View>

                </ScrollView>
            )}
        </View> 

    )
}
