import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Icon, FAB } from "@rneui/themed";
import { getCategorias, eliminarCategoria } from "../../services/categorias";
import styles from "./styles";

export default function CategoriasList() {
  const [categorias, setCategorias] = useState([]);
  const navigation = useNavigation();

  const cargarCategorias = () => {
    getCategorias()
      .then(setCategorias)
      .catch((err) => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      cargarCategorias();
    }, [])
  );

  const handleEliminar = (cat) => {
    Alert.alert(
      "Eliminar categoría",
      `¿Eliminar "${cat.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await eliminarCategoria(cat._id || cat.id);
              cargarCategorias();
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]
    );
  };

  const renderCategoria = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />

        <View style={styles.info}>
          <Text style={styles.titulo}>{item.titulo}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => navigation.navigate("CategoryForm", { categoria: item })}>
            <Icon name="edit" type="font-awesome" color="#2e8b57" size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEliminar(item)}>
            <Icon name="trash" type="font-awesome" color="#ff4d4d" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Administrar Categorías</Text>

      <FlatList
        data={categorias}
        keyExtractor={(item) => (item._id || item.id).toString()}
        renderItem={renderCategoria}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* FAB PARA AGREGAR NUEVA CATEGORÍA */}
      <FAB
        placement="right"
        color="#2e8b57"
        icon={{ name: "add", color: "#fff" }}
        onPress={() => navigation.navigate("CategoryForm")}
      />
    </View>
  );
}
