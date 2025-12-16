import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Recebe props de usuário e status de login
interface PerfilProps {
  user?: {
    nome?: string;
    email?: string;
    senha?: string;
    telefone?: string;
  };
  isLogged: boolean;
}

// Tipagem correta da API da loja
interface Loja {
  company_name: string;
  aboutText: string;
  location: {
    street: string;
    city_state: string;
    zip: string;
  };
  contact: {
    phone1: string;
    phone2?: string;
    email: string;
  };
}

export default function Perfil({ user, isLogged }: PerfilProps) {
  // Estados do usuário
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [senha, setSenha] = useState(user?.senha || "");
  const [telefone, setTelefone] = useState(user?.telefone || "");

  // Estados de foco
  const [focusedNome, setFocusedNome] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedSenha, setFocusedSenha] = useState(false);
  const [focusedTelefone, setFocusedTelefone] = useState(false);

  // Estado da loja
  const [loja, setLoja] = useState<Loja | null>(null);

  // Atualiza dados do usuário
  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setEmail(user.email || "");
      setSenha(user.senha || "");
      setTelefone(user.telefone || "");
    } else {
      setNome("");
      setEmail("");
      setSenha("");
      setTelefone("");
    }
  }, [user]);

  // Buscar dados da loja
  useEffect(() => {
    const fetchLoja = async () => {
      try {
        const response = await fetch(
          "https://qt8rqmzq-3000.brs.devtunnels.ms/api/loja"
        );
        const data = await response.json();
        setLoja(data);
      } catch (error) {
        console.error("Erro ao buscar dados da loja:", error);
      }
    };

    fetchLoja();
  }, []);

  // Logout
  const handleLogout = () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja sair da conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive" },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.photoContainer}>
            <Ionicons name="person-circle-outline" size={90} color="#000" />
          </View>

          <Text style={styles.profileName}>
            {isLogged ? nome || "Usuário" : ""}
          </Text>

          {isLogged && (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={18} color="#fff" />
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Configurações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>

        {[
          { label: "Nome", value: nome, set: setNome },
          { label: "Email", value: email, set: setEmail },
          { label: "Senha", value: senha, set: setSenha, secure: true },
          { label: "Telefone", value: telefone, set: setTelefone },
        ].map((item, index) => (
          <View style={styles.inputGroup} key={index}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={item.value}
                onChangeText={item.set}
                secureTextEntry={item.secure}
                editable={isLogged}
              />
              <Ionicons name="create-outline" size={18} color="#888" />
            </View>
          </View>
        ))}
      </View>

      {/* Informações da Loja */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações da loja</Text>

        {loja && (
          <View style={{ marginTop: 10 }}>
            <Text style={[styles.infoText, { fontWeight: "bold" }]}>
              {loja.company_name}
            </Text>

            <Text style={styles.infoText}>
              <Ionicons name="location-outline" size={14} />{" "}
              {loja.location.street}
            </Text>

            <Text style={styles.infoText}>
              {loja.location.city_state}
            </Text>

            <Text style={styles.infoText}>
              CEP {loja.location.zip}
            </Text>

            <Text style={[styles.infoText, { marginTop: 10 }]}>
              <Ionicons name="call-outline" size={14} />{" "}
              {loja.contact.phone1}
            </Text>

            {loja.contact.phone2 && (
              <Text style={styles.infoText}>
                <Ionicons name="call-outline" size={14} />{" "}
                {loja.contact.phone2}
              </Text>
            )}

            <Text style={styles.infoText}>
              <Ionicons name="mail-outline" size={14} />{" "}
              {loja.contact.email}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
  header: { alignItems: "center", marginTop: 20 },
  profileContainer: { alignItems: "center" },
  photoContainer: {
    borderWidth: 2,
    borderColor: "#05182bff",
    borderRadius: 50,
    padding: 2,
    elevation: 3,
  },
  profileName: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#05182bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  logoutText: { color: "#fff", marginLeft: 5, fontWeight: "bold" },
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
  infoText: { fontSize: 13, color: "#444", marginVertical: 2 },
});
