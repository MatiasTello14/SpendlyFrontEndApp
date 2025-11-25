import { View, Text, Button, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useCallback, useState } from 'react';
import { Card } from '@rneui/themed';
import { getGastoById, eliminarGasto } from '../../services/gastos';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import { formatFecha } from "../../utils/formatFecha";
import { formatMontoArs } from "../../utils/formatCurrency";

export default function Details() {
    const { id } = useRoute().params;
    const [gasto, setGasto] = useState(null);
    const navigation = useNavigation();

    useFocusEffect(useCallback(() => {
        setGasto(null); 
        if (id) {
            getGastoById(id).then((gastoData) => {
                setGasto(gastoData);
            }).catch((error) => {
                console.log('Error al obtener el gasto', error);
            });
        }
    }, [id]));

    const handleEliminar = () => {
      Alert.alert(
        "Eliminar Gasto",
        `¿Estás seguro de que querés eliminar "${gasto.nombre}"?`,
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Eliminar", 
            style: "destructive", 
            onPress: () => {
              eliminarGasto(id).then(() => {
                  navigation.goBack();
              }).catch((error) => {
                  console.log('Error al eliminar un gasto', error);
              });
            }
          }
        ]
      );
    };

    if (!gasto) {
        return <ActivityIndicator style={{ flex: 1 }} size="large" />
    }

    
    return (
        <View style={styles.container}>
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
                            Monto: <Text style={styles.montoValor}>${formatMontoArs(gasto.montoEnARS)}</Text>
                        </Text>

                        {gasto.moneda === 'USD' && (
                            <Text style={styles.categoriaDetalle}>
                            (Pagado como ${gasto.monto} USD vía {gasto.tipoConversion})
                            </Text>
                        )}

                        {/* Fecha */}
                        <Text style={styles.fechaDetalle}>{formatFecha(gasto.fecha)}</Text>
                        
                        <Text style={styles.categoriaDetalle}>Categoría: {gasto.categoria}</Text>

                        {gasto.archivo && (
                        <Text style={styles.categoriaDetalle}>
                            Archivo adjunto: {gasto.archivo}
                        </Text>
)}
                    </View>
                </Card>

                <View style={styles.buttonContainer}>
                    <View style={styles.actionButton}>
                        <Button
                            title="✏️ Editar"
                            onPress={() => navigation.navigate('Form', { gastoData: gasto })}
                            color="#FFA500"
                        />
                    </View>
                    <View style={styles.actionButton}>
                        <Button
                            title="🗑️ Eliminar"
                            onPress={handleEliminar}
                            color="#FF4500"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
