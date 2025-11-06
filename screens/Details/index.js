import { View, Text, Button, Image, ScrollView } from "react-native"

import { useCallback, useEffect, useState } from 'react';

import { Card } from '@rneui/themed';

import { getGastoById } from '../../services/gastos'

import { eliminarGasto } from "../../services/gastos";

import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import styles from './styles';



export default function Details() {

    const { id } = useRoute().params

    const [gasto, setGasto] = useState(null)

    const navigation = useNavigation()



    useFocusEffect(useCallback(() => {

        if (id) {

            getGastoById(id).then((gasto) => {

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

            {gasto && (

                <ScrollView contentContainerStyle={styles.scrollViewContent}>





                    <Card containerStyle={styles.fullDetailCard}>



                        <View style={styles.imageWrapper}>

                            <Image

                                source={{ uri: gasto.imagen }}

                                style={styles.detailImage}

                                resizeMode="contain"

                            />

                        </View>











                        <View style={styles.descripcionContainer}>

                            <Text style={styles.nombreDetalle}>{gasto.nombre}</Text>

                            <Text style={styles.montoDetalle}>

                                Monto: <Text style={styles.montoValor}>${gasto.monto}</Text>

                            </Text>

                            <Text style={styles.fechaDetalle}>Fecha: {gasto.fecha}</Text>

                            <Text style={styles.categoriaDetalle}>Categoría: {gasto.categoria || 'N/A'}</Text>

                        </View>

                    </Card>





                    <View style={styles.buttonContainer}>

                        <Button

                            title="✏️ Editar"

                            onPress={() => navigation.navigate('Form', { gastoData: gasto })}

                            color="#FFA500"

                        />

                        <Button

                            title="🗑️ Eliminar"

                            onPress={handleEliminar}

                            color="#FF4500"

                        />

                    </View>



                </ScrollView>

            )}

        </View>

    )

} 