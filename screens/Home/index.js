import { View, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import { Icon } from '@rneui/base';
import GastoFlatList from '../../components/gastoFlatList';
import { StatusBar } from 'expo-status-bar';
import { FAB } from '@rneui/base';
import { getGastos } from '../../services/gastos';
import {useState, useEffect, useCallback} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles  from './styles';



export default function Home() {

    const [gastos, setGastos] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const navigation = useNavigation()
    

    useFocusEffect(useCallback(() => {
        getGastos().then((gastos) => {
            console.log(gastos)
            setGastos(gastos)
        })
      }, []));
    

    return (
        <>
         <View style={styles.header}>
              <Text style={styles.titulo}>💸 Spendly</Text>
              <View style={styles.iconos}>
                <Icon name="search" type="font-awesome" color="black" />
                <Icon name="filter" type="font-awesome" color="black" />
              </View>
            </View>

            <Divider />
            <GastoFlatList gastos={gastos} />
            <StatusBar style="auto" />

            <View style={styles.fabContainer}>
              <FAB
                icon={{ name: 'add', color: 'white' }}
                placement="bottomRight"
                color="#2e8b57"
                onPress={()=> navigation.navigate('Form')}
              />
            </View>
        </>
    );

    
}   


