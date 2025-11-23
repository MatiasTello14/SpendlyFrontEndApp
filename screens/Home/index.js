import { View, Text, TouchableOpacity} from 'react-native'
import { Divider , Input} from '@rneui/themed'
import { Icon } from '@rneui/base'
import GastoFlatList from '../../components/gastoFlatList'
import { StatusBar } from 'expo-status-bar';
import { FAB } from '@rneui/base'
import { getGastos } from '../../services/gastos'
import {useState, useEffect, useCallback, useContext} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import styles  from './styles';
import { Picker } from '@react-native-picker/picker'
import { AuthContext } from '../../hooks/useAuth'



export default function Home() {

    const [gastos, setGastos] = useState([])
    const [gastosFiltrados, setGastosFiltrados] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [mostrarBuscador, setMostrarBuscador] = useState(false)
    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

    const navigation = useNavigation()
    
    const { signOut } = useContext(AuthContext)

    useFocusEffect(useCallback(() => {
        getGastos().then((gastos) => {
            console.log(gastos)
            setGastos(gastos)
            setGastosFiltrados(gastos)
        })
      }, []));


    const handleBuscar = (texto) => {
      setBusqueda(texto);
      const filtro = texto.toLowerCase();
      const filtrados = gastos.filter(g =>
        g.nombre?.toLowerCase().includes(filtro) ||
        g.categoria?.toLowerCase().includes(filtro)
      );
      setGastosFiltrados(filtrados);
    }
    const handleFiltrar = (categoria) => {
        setCategoriaSeleccionada(categoria);
        if (categoria === '' || categoria === 'Todas') {
          setGastosFiltrados(gastos);
          setMostrarFiltro(false)
        } else {
          const filtrados = gastos.filter(g => g.categoria === categoria)
          setGastosFiltrados(filtrados);
        }
     }


    return (
        <>
         <View style={styles.header}>
              <Text style={styles.titulo}>💸 Spendly</Text>
              <View style={styles.iconos}>
                <Icon
                  name="search"
                  type="font-awesome"
                  color="black"
                  onPress={() => setMostrarBuscador(!mostrarBuscador)} 
                />
                <Icon
                  name="filter"
                  type="font-awesome"
                  color="black"
                  onPress={() => setMostrarFiltro(!mostrarFiltro)}
                />
                <Icon
                  name="logout"
                  type="material-community" // O 'antdesign' si prefieres otro estilo
                  color="black"
                  onPress={signOut} // Llama a la función del contexto
                />
              </View>
            </View>

            {mostrarBuscador && (
              <View style={{ padding: 10 }}>
                <Input
                  placeholder="Buscar gasto o categoría..."
                  value={busqueda}
                  onChangeText={handleBuscar}
                  leftIcon={{ name: 'search', color: 'grey' }}
                  containerStyle={{ paddingHorizontal: 10 }}
                />
              </View>
            )}

            
            <TouchableOpacity
                style={styles.btnCategorias}
                onPress={() => navigation.navigate("CategoriasList")}
             >
              <Icon name="list" type="font-awesome" color="white" size={18} style={{ marginRight: 8 }} />
              <Text style={styles.btnCategoriasTexto}>Administrar Categorías</Text>
            </TouchableOpacity>

            {mostrarFiltro && (
              <View style={{ paddingHorizontal: 15 }}>
                <Picker
                  selectedValue={categoriaSeleccionada}
                  onValueChange={(itemValue) => handleFiltrar(itemValue)}
                >
                  <Picker.Item label="Todas las categorías" value="Todas" />
                  <Picker.Item label="Comida" value="Comida" />
                  <Picker.Item label="Transporte" value="Transporte" />
                  <Picker.Item label="Entretenimiento" value="Entretenimiento" />
                  <Picker.Item label="Hogar" value="Hogar" />
                  <Picker.Item label="Educación" value="Educación" />
                  <Picker.Item label="Salud" value="Salud" />
                </Picker>
              </View>
            )}

            <Divider />
            <GastoFlatList gastos={gastosFiltrados} />
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


