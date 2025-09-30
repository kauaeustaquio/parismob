import React from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  Platform, 
  FlatList 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  // Categorias com imagens
  const categories = [
    { name: "Promoções", img: require("../../assets/images/promo.png") },
    { name: "Perfumaria", img: require("../../assets/images/perfumaria.png") },
    { name: "Piscina", img: require("../../assets/images/piscina.png") },
    { name: "Carros", img: require("../../assets/images/carros.png") },
    { name: "Casa", img: require("../../assets/images/image.png") },
  ];

  const products = [
    { nome: "Cloro HTH", preco: "48,59", img: "https://via.placeholder.com/80" },
    { nome: "Esponja", preco: "28,99", img: "https://via.placeholder.com/80" },
    { nome: "Shampoo", preco: "55,40", img: "https://via.placeholder.com/80" },
    { nome: "Veja Limpeza", preco: "4,50", img: "https://via.placeholder.com/80" },
    { nome: "Detergente Ypê", preco: "6,90", img: "https://via.placeholder.com/80" },
    { nome: "Sabão em barra", preco: "5,25", img: "https://via.placeholder.com/80" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/logo.produtosd'paris(1)(1).png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Linha de pesquisa + carrinho */}
        <View style={styles.searchRow}>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Pesquisar..."
              style={styles.searchInput}
            />
            <Ionicons name="search" size={22} color="#333" style={{ marginLeft: 8 }} />
          </View>

          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Carrossel de categorias */}
        <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryItem}>
                <View style={styles.categoryCircle}>
                  <Image source={item.img} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Produtos */}
        <View style={styles.productsContainer}>
          {products.map((produto, index) => (
            <View key={index} style={styles.productCard}>
              <Image source={{ uri: produto.img }} style={styles.productImage} />
              <Text style={styles.productName}>{produto.nome}</Text>
              <Text style={styles.productPrice}>R$ {produto.preco}</Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>COMPRAR</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 20, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },

  logo: { width: 500, height: 90, alignSelf: "center", marginTop: 10 },

  searchRow: { flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginVertical: 10 },
  searchWrapper: { flex: 1, flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, backgroundColor: "#f5f5f5", paddingVertical: 4 },
  searchInput: { flex: 1, padding: 8 },
  cartButton: { marginLeft: 10, padding: 6, backgroundColor: "#e0e0e0", borderRadius: 8 },

  // Categorias
  categoryContainer: { marginVertical: 12 },
  categoryItem: { alignItems: "center", marginRight: 15 },
  categoryCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", elevation: 2, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 },
  categoryImage: { width: 40, height: 40, resizeMode: "contain" },
  categoryText: { marginTop: 6, fontSize: 12, color: "#333", textAlign: "center" },

  // Produtos
  productsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
  productCard: { width: "45%", backgroundColor: "#fff", borderRadius: 10, padding: 10, marginBottom: 15, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  productImage: { width: 80, height: 80, marginBottom: 8 },
  productName: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  productPrice: { fontSize: 14, color: "green", marginVertical: 4 },
  buyButton: { backgroundColor: "#1e90ff", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  buyButtonText: { color: "#fff", fontWeight: "bold" },
});
