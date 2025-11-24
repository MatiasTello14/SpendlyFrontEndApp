import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 18,
    backgroundColor: "#2e8b57",
    color: "white",
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  imagen: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: "#eee",
  },

  info: {
    flex: 1,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
