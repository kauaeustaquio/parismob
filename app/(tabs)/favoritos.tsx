import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imageUrl: string;
  isFavorito?: boolean; // controle local do coração
}

export default function Favoritos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  const clienteId = 1;
  const API_BASE = "https://x19x6q9t-3000.brs.devtunnels.ms/api/favoritos";

  // Buscar favoritos da API
  const fetchFavoritos = async () => {
    try {
      const response = await fetch(`${API_BASE}?cliente_id=${clienteId}`);
      const data = await response.json();
      // Marcar todos como favoritos inicialmente
      const produtosComFlag = data.map((p: Produto) => ({ ...p, isFavorito: true }));
      setProdutos(produtosComFlag);
    } catch (error) {
      console.log("Erro ao carregar favoritos:", error);
      Alert.alert("Erro", "Não foi possível carregar os favoritos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  // Alternar favorito
  const toggleFavorito = async (produto: Produto) => {
    const isFavorito = produto.isFavorito;

    try {
      if (isFavorito) {
        // Remover favorito
        const response = await fetch(
          `${API_BASE}?cliente_id=${clienteId}&produto_id=${produto.id}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Erro ao remover favorito");
      } else {
        // Adicionar favorito
        const response = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cliente_id: clienteId, produto_id: produto.id }),
        });
        if (!response.ok) throw new Error("Erro ao adicionar favorito");
      }

      // Atualizar estado local
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === produto.id ? { ...p, isFavorito: !isFavorito } : p
        )
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o favorito.");
    }
  };

  const renderProduto = ({ item }: { item: Produto }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco}</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => toggleFavorito(item)}
      >
        <Ionicons
          name="heart"
          size={24}
          color={item.isFavorito ? "#FF6347" : "#ccc"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.searchRow}>
        <View style={styles.searchWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="#333"
            style={{ marginRight: 6 }}
          />
          <TextInput placeholder="Pesquisar..." style={styles.searchInput} />
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : produtos.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          Nenhum favorito encontrado.
        </Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduto}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  searchRow: { flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginVertical: 10 },
  searchWrapper: { flex: 1, flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, backgroundColor: "#f5f5f5", paddingVertical: 4 },
  searchInput: { flex: 1, padding: 6 },
  cartButton: { marginLeft: 10, padding: 8, backgroundColor: "#e0e0e0", borderRadius: 20 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 15, elevation: 2, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, position: "relative" },
  image: { width: 100, height: 100, resizeMode: "contain", borderRadius: 8 },
  info: { flex: 1, marginLeft: 12 },
  favoriteIcon: { position: "absolute", top: -6, right: -6 },
  nome: { fontSize: 15, fontWeight: "bold", color: "#333", marginBottom: 6 },
  preco: { fontSize: 13, color: "#555" },
});
