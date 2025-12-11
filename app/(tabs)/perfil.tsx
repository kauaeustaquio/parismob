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

export default function Perfil({ user, isLogged }: PerfilProps) {
  // Estados do usuário
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [senha, setSenha] = useState(user?.senha || "");
  const [telefone, setTelefone] = useState(user?.telefone || "");

  // Estados de foco para placeholders
  const [focusedNome, setFocusedNome] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedSenha, setFocusedSenha] = useState(false);
  const [focusedTelefone, setFocusedTelefone] = useState(false);

  // Atualiza os estados quando o usuário loga
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

  // Função para confirmar logout
  const handleLogout = () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja sair da conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => console.log("Usuário deslogado") },
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
              onFocus={() => setFocusedNome(true)}
              onBlur={() => setFocusedNome(false)}
              placeholder={isLogged ? "" : "Digite seu nome"}
              editable={isLogged}
            />
            <TouchableOpacity onPress={() => setFocusedNome(true)}>
              <Ionicons name="create-outline" size={18} color="#888" />
            </TouchableOpacity>
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
              onFocus={() => setFocusedEmail(true)}
              onBlur={() => setFocusedEmail(false)}
              placeholder={isLogged ? "" : "Digite seu email"}
              editable={isLogged}
            />
            <TouchableOpacity onPress={() => setFocusedEmail(true)}>
              <Ionicons name="create-outline" size={18} color="#888" />
            </TouchableOpacity>
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
              onFocus={() => setFocusedSenha(true)}
              onBlur={() => setFocusedSenha(false)}
              placeholder={isLogged ? "" : "Digite sua senha"}
              editable={isLogged}
            />
            <TouchableOpacity onPress={() => setFocusedSenha(true)}>
              <Ionicons name="create-outline" size={18} color="#888" />
            </TouchableOpacity>
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
              onFocus={() => setFocusedTelefone(true)}
              onBlur={() => setFocusedTelefone(false)}
              placeholder={isLogged ? "" : "Digite seu telefone"}
              editable={isLogged}
            />
            <TouchableOpacity onPress={() => setFocusedTelefone(true)}>
              <Ionicons name="create-outline" size={18} color="#888" />
            </TouchableOpacity>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
  header: { alignItems: "center", marginTop: 20 },
  profileContainer: { alignItems: "center", position: "relative" },
  photoContainer: {
    borderWidth: 2,
    borderColor: "#05182bff",
    borderRadius: 50,
    padding: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
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

  storeLogo: {
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 10,
  },
  infoText: { fontSize: 13, color: "#444", marginVertical: 2 },
});
