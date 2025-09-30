import React, { useState } from "react";
import { 
  SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, 
  Image, TouchableOpacity, StatusBar, Platform, FlatList, Modal 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [cartVisible, setCartVisible] = useState(false); // controla modal do carrinho

  // Categorias com imagens
  const categories = [
    { name: "Promoções", img: require("../../assets/images/promo.png") },
    { name: "Perfumaria", img: require("../../assets/images/perfumaria.png") },
    { name: "Piscina", img: require("../../assets/images/piscina.png") },
    { name: "Carros", img: require("../../assets/images/carros.png") },
    { name: "Casa", img: require("../../assets/images/image.png") },
  ];

  // Produtos
  const products = [
    { nome: "Cloro HTH", preco: "48,59", img: "https://via.placeholder.com/80" },
    { nome: "Esponja", preco: "28,99", img: "https://via.placeholder.com/80" },
  ];

  const total = products.reduce((sum, p) => sum + parseFloat(p.preco.replace(",", ".")), 0).toFixed(2);

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
            <TextInput placeholder="Pesquisar..." style={styles.searchInput} />
            <Ionicons name="search" size={22} color="#333" style={{ marginLeft: 8 }} />
          </View>

          <TouchableOpacity style={styles.cartButton} onPress={() => setCartVisible(true)}>
            <Ionicons name="cart" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Categorias */}
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
        <Text style={styles.launchTitle}>Lançamentos</Text>
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

      {/* Modal do carrinho lateral */}
      <Modal
        visible={cartVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCartVisible(false)}
      >
        <View style={[styles.modalOverlay, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
          <View style={[styles.modalContent, { width: '70%', maxHeight: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Meu carrinho</Text>
              <TouchableOpacity onPress={() => setCartVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ marginVertical: 10 }}>
              {products.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Image source={{ uri: item.img }} style={styles.cartImage} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text numberOfLines={1}>{item.nome}</Text>
                    <Text>R$ {item.preco}</Text>
                  </View>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity style={styles.qtyButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.qtyButton}><Text>+</Text></TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.cartFooter}>
              <Text style={{ fontWeight: "bold" }}>Total estimado: R$ {total}</Text>
              <TouchableOpacity style={styles.finalizeButton}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Finalizar Compra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  cartButton: { marginLeft: 10, padding: 8, backgroundColor: "#e0e0e0", borderRadius: 20 },
  categoryContainer: { marginVertical: 12 },
  categoryItem: { alignItems: "center", marginRight: 15 },
  categoryCircle: { width: 90, height: 90, borderRadius: 40, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", elevation: 2, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 },
  categoryImage: { width: 60, height: 60, resizeMode: "contain" },
  categoryText: { marginTop: 6, fontSize: 12, color: "#333", textAlign: "center" },
  launchTitle: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15, marginBottom: 10, marginTop: 5, color: "#333" },
  productsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
  productCard: { width: "45%", backgroundColor: "#fff", borderRadius: 10, padding: 10, marginBottom: 15, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  productImage: { width: 80, height: 80, marginBottom: 8 },
  productName: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  productPrice: { fontSize: 14, color: "green", marginVertical: 4 },
  buyButton: { backgroundColor: "#05182bff", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  buyButtonText: { color: "#fff", fontWeight: "bold" },
  
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 15, maxHeight: "80%" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  cartItem: { flexDirection: "row", alignItems: "center", marginBottom: 10, backgroundColor: "#f5f5f5", padding: 10, borderRadius: 8 },
  cartImage: { width: 60, height: 60 },
  quantityControl: { flexDirection: "row", alignItems: "center" },
  qtyButton: { paddingHorizontal: 6, paddingVertical: 2, backgroundColor: "#ccc", borderRadius: 4, marginHorizontal: 4 },
  cartFooter: { marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  finalizeButton: { backgroundColor: "#05182bff", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 }
});
