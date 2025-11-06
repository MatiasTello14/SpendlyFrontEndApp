//import 'react-native-gesture-handler';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home'
import GastoForm from './screens/Form';
import Details from './screens/Details';


console.log(Constants.statusBarHeigth)

export default function App() {

  const [showForm, setShowForm] = useState(false)
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Listado de Gastos' }} />
            <Stack.Screen name="Form" component={GastoForm} options={{ title: 'Agregar un gasto nuevo' }} />
            <Stack.Screen name="Details" component={Details} options={{ title: 'Detalle del gasto' }} />
          </Stack.Navigator>
        </NavigationContainer>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
})
