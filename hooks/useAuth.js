import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // ejecutamos una vez al abrir la app para ver si ya hay sesión guardada
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
                setIsLoading(false)
            }
        };

        checkLoginStatus();
    }, []);

    
    const signIn = async (email, password) => {
        setIsLoading(true);
        try {
            // token al backend
            const data = await loginService(email, password); 
            
            // persistimos la sesion
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(data.usuario));

            // guardamos la info
            setUserToken(data.token);
            setUserInfo(data.usuario);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    
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