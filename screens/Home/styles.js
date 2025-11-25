import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  titulo: { fontSize: 20, fontWeight: 'bold' },
  iconos: { flexDirection: 'row', gap: 10 },
  fabContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' },
  btnCategorias: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2e8b57",   // verde elegante
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  marginHorizontal: 20,
  marginTop: 15,
  elevation: 4,     // sombra Android
  shadowColor: "#000",  // sombra iOS
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},

btnCategoriasTexto: {
  color: "white",
  fontSize: 17,
  fontWeight: "600",
},
});



export default styles
