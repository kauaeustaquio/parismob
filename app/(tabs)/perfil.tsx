import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Perfil() {
  const [nome, setNome] = useState("Maria da Silva Pereira");
  const [email, setEmail] = useState("maria.dasilva@gmail.com");
  const [senha, setSenha] = useState("********");
  const [telefone, setTelefone] = useState("(83) 99654-6757");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Ionicons name="person-circle-outline" size={90} color="#000" />
          <Text style={styles.profileName}>{nome}</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção de Configurações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>

        {/* Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              editable={true} // Agora sempre editável
            />
            <Ionicons name="create-outline" size={18} color="#888" />
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              editable={true}
            />
            <Ionicons name="create-outline" size={18} color="#888" />
          </View>
        </View>

        {/* Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={senha}
              secureTextEntry
              onChangeText={setSenha}
              editable={true}
            />
            <Ionicons name="create-outline" size={18} color="#888" />
          </View>
        </View>

        {/* Telefone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
              editable={true}
            />
            <Ionicons name="create-outline" size={18} color="#888" />
          </View>
        </View>
      </View>

      {/* Informações da Loja */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações da loja</Text>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.storeLogo}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={styles.infoText}>
            <Ionicons name="location-outline" size={14} /> Rua Silvino Olavo, Nº
            71 - Centro
          </Text>
          <Text style={styles.infoText}>Esperança, Paraíba</Text>
          <Text style={styles.infoText}>CEP 58135-000</Text>

          <Text style={[styles.infoText, { marginTop: 10 }]}>
            <Ionicons name="call-outline" size={14} /> (83) 99954-0812
          </Text>
          <Text style={styles.infoText}>
            <Ionicons name="call-outline" size={14} /> (83) 98873-5262
          </Text>
          <Text style={styles.infoText}>
            <Ionicons name="mail-outline" size={14} />{" "}
            produtosdeparis1981@gmail.com
          </Text>
        </View>
      </View>

      {/* Pedidos */}
      <View style={[styles.section, { marginBottom: 30 }]}>
        <Text style={styles.sectionTitle}>Pedidos</Text>
        <View style={styles.orderCard}>
          <View style={styles.orderLeft}>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }}
              style={styles.orderImage}
            />
            <View>
              <Text style={styles.orderTitle}>Cloro para piscina</Text>
              <Text style={styles.orderLabel}>Limpeza de piscina</Text>
            </View>
          </View>
          <View style={styles.orderRight}>
            <Text style={styles.orderPrice}>R$ 48,59</Text>
            <Text style={styles.orderStatus}>Entregue</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
  header: { alignItems: "center", marginTop: 20 },
  profileContainer: { alignItems: "center", position: "relative" },
  profileName: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  logoutButton: { position: "absolute", right: -10, top: 10 },

  section: { marginTop: 25 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },

  inputGroup: { marginBottom: 10 },
  label: { color: "#777", fontSize: 13, marginBottom: 4 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: { flex: 1, paddingVertical: 8 },

  storeLogo: {
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 10,
  },
  infoText: { fontSize: 13, color: "#444", marginVertical: 2 },

  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  orderLeft: { flexDirection: "row", alignItems: "center" },
  orderImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  orderTitle: { fontSize: 14, fontWeight: "bold" },
  orderLabel: { fontSize: 12, color: "#777" },
  orderRight: { alignItems: "flex-end" },
  orderPrice: { fontSize: 14, fontWeight: "bold" },
  orderStatus: { fontSize: 12, color: "orange" },
});
