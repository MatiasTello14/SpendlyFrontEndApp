import { api } from "./api";

export const login = async (email, password) => {
    try {

        const response = await api.post("/auth/login", { 
            email, 
            password 
        });

        return response.data; 

    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Error al iniciar sesión');
        }
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Error al registrarse');
        }
        throw error;
    }
};