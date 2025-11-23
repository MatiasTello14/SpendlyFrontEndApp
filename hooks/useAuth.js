import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Para mostrar un spinner mientras carga

    // 1. LOGICA DE SESIÓN (useEffect)
    // Se ejecuta UNA vez al abrir la app para ver si ya hay sesión guardada
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const user = await AsyncStorage.getItem('userInfo');
                
                if (token) {
                    setUserToken(token);
                    setUserInfo(JSON.parse(user));
                }
            } catch (e) {
                console.log('Error al recuperar sesión:', e);
            } finally {
                setIsLoading(false); // Dejamos de cargar
            }
        };

        checkLoginStatus();
    }, []);

    // 2. Función para Iniciar Sesión (Login)
    const signIn = async (email, password) => {
        setIsLoading(true);
        try {
            // A. Pedimos el token al backend
            const data = await loginService(email, password); 
            
            // B. Guardamos en el dispositivo (Persistencia)
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(data.usuario));

            // C. Actualizamos el estado de la app (React se entera)
            setUserToken(data.token);
            setUserInfo(data.usuario);
        } catch (error) {
            throw error; // Le pasamos el error a la pantalla de Login para que muestre un alerta
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Función para Cerrar Sesión (Logout)
    const signOut = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userInfo');
            setUserToken(null);
            setUserInfo(null);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ signIn, signOut, userToken, userInfo, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};