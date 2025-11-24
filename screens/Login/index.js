import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../hooks/useAuth'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useContext(AuthContext);

  const handleLogin = async () => {
    if(!email || !password) {
        Alert.alert("Error", "Por favor completa todos los campos");
        return;
    }
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Falló el inicio de sesión", error.message);
    }
  };

  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar Sesión</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
      />

      <Button title="Ingresar" onPress={handleLogin} />
        <Button 
          title="Registrarse" 
          onPress={() => navigation.navigate('Register')}
          color="gray" 
        />
    </View>
  );
}