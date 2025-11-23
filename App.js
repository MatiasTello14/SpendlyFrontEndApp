import { useState, useContext} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants'
import {AuthContext, AuthProvider} from './hooks/useAuth'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home'
import GastoForm from './screens/Form';
import Details from './screens/Details';

import CategoryForm from './screens/CategoryForm';
import CategoriasList from './screens/CategoryList';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';


console.log(Constants.statusBarHeight)

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Form" component={GastoForm} options={{ title: 'Agregar un gasto nuevo' }} />
            <Stack.Screen name="Details" component={Details} options={{ title: 'Detalle del gasto' }} />
            <Stack.Screen name="CategoryForm" component={CategoryForm} options={{ title: 'Crear Nueva Categoría' }} />
            <Stack.Screen name="CategoriasList" component={CategoriasList} options={{ title: "Categorías" }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
