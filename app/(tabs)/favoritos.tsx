import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Favoritos() {
  const favoritos = [
    {},
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Barra de pesquisa + carrinho */}
      <View style={styles.searchRow}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color="#333" style={{ marginRight: 6 }} />
          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart" size={26} color="#333" />
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  // Barra de pesquisa
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    padding: 6,
  },
  cartButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
  },

  // Card de favorito
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  favoriteIcon: {
    position: "absolute",
    top: -6,
    right: -6,
  },
  nome: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  preco: {
    fontSize: 13,
    color: "#555",
  },
});
