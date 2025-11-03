import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Divider } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { getGastos } from './services/gastos';
import GastoFlatList from './components/gastoFlatList';
import GastoForm from './components/gastoForm';

export default function App() {
  const [gastos, setGastos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getGastos().then((data) => setGastos(data));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showForm ? (
        <GastoForm />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.titulo}>💸 Mis Gastitos</Text>
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
              onPress={() => setShowForm(true)}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7f8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  titulo: { fontSize: 20, fontWeight: 'bold' },
  iconos: { flexDirection: 'row', gap: 10 },
  fabContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' },
});
