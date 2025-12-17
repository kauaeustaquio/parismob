import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginModal from "./loginModal";

type PaymentMethod = "pix" | "dinheiro" | null;

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    produtoId?: string;
    nomeProduto?: string;
    precoProduto?: string;
  }>();

  const { produtoId, nomeProduto, precoProduto } = params;

  const preco = precoProduto ? Number(precoProduto.replace(",", ".")) : 0;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Verifica login do usuário
  useEffect(() => {
  const checkLoginAndProduct = async () => {
    const user = await AsyncStorage.getItem("user");
    setIsLogged(!!user);

    const savedProduct = await AsyncStorage.getItem("selectedProduct");
    if (savedProduct) {
      const product = JSON.parse(savedProduct);
      router.replace({
        pathname: "/checkout",
        params: {
          produtoId: product.produtoId,
          nomeProduto: product.nomeProduto,
          precoProduto: product.precoProduto,
        },
      });
      await AsyncStorage.removeItem("selectedProduct");
    }
  };

  checkLoginAndProduct();
}, []);


  // Callback após login bem-sucedido
  const handleLoginSuccess = () => {
    setIsLogged(true);
    setShowLoginModal(false);
    // ⚠️ NÃO vai para checkout automaticamente
    // Fica na tela index, usuário clica em comprar de novo
  };

  const handleFinalizePurchase = async () => {
  if (!isLogged) {
    // Salva produto selecionado para recuperar após login
    await AsyncStorage.setItem(
      "selectedProduct",
      JSON.stringify({ produtoId, nomeProduto, precoProduto })
    );
    setShowLoginModal(true); // abre modal
    return;
  }

  router.push({
    pathname: "/pagamento",
    params: {
      produtoId,
      nomeProduto,
      precoProduto: preco.toFixed(2),
      formaPagamento: paymentMethod,
    },
  });
};


  // Loader enquanto verifica login
  if (isLogged === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Verificando login...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resumo da Compra</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.productCard}>
          <Text style={styles.productName}>{nomeProduto}</Text>
          <Text style={styles.productPrice}>
            R$ {preco.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Valor total:</Text>
          <Text style={styles.totalValue}>
            R$ {preco.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        <Text style={styles.paymentHeader}>Selecione a forma de pagamento</Text>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "pix" && styles.paymentSelected,
          ]}
          onPress={() => setPaymentMethod("pix")}
        >
          <Ionicons name="wallet-outline" size={24} color="#05182bFF" />
          <Text style={styles.paymentText}>PIX</Text>
          {paymentMethod === "pix" && (
            <Ionicons name="checkmark-circle" size={22} color="#28a745" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "dinheiro" && styles.paymentSelected,
          ]}
          onPress={() => setPaymentMethod("dinheiro")}
        >
          <Ionicons name="cash-outline" size={24} color="#28a745" />
          <Text style={styles.paymentText}>Dinheiro físico</Text>
          {paymentMethod === "dinheiro" && (
            <Ionicons name="checkmark-circle" size={22} color="#28a745" />
          )}
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={[styles.finalizeButton, !paymentMethod && { opacity: 0.6 }]}
        onPress={handleFinalizePurchase}
      >
        <Text style={styles.finalizeButtonText}>FINALIZAR COMPRA</Text>
      </TouchableOpacity>

      <LoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
        goToCadastro={() => router.push("/cadastro")}
      />
    </View>
  );
}

// Copie seus estilos atuais


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#05182bFF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#05182bFF",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#05182bFF",
  },
  paymentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentSelected: {
    borderWidth: 2,
    borderColor: "#05182bFF",
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  finalizeButton: {
    backgroundColor: "#05182bFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  finalizeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
