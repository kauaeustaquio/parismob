import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void; // 🔥 avisa que o login deu certo
  goToCadastro: () => void;
}

export default function LoginModal({
  visible,
  onClose,
  onLogin,
  goToCadastro,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // ⚠️ ajuste se mudar de ambiente
  const API_BASE = "https://lrqzgzqc-3000.brs.devtunnels.ms";

  

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/clientes/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.msg || "E-mail ou senha inválidos");
        return;
      }

      // 💾 salva usuário logado
      await AsyncStorage.setItem("user", JSON.stringify(data));

      Alert.alert("Sucesso", "Login realizado com sucesso!");

      // 🔥 ESSENCIAL
      onLogin();

      // fecha modal
      onClose();

      // limpa campos
      setEmail("");
      setSenha("");
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Login</Text>

          {/* EMAIL */}
          <Text style={styles.label}>Email *</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="email@gmail.com"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Ionicons name="mail-outline" size={20} color="#555" />
          </View>

          {/* SENHA */}
          <Text style={styles.label}>Senha *</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="********"
              secureTextEntry={!showPass}
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons
                name={showPass ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* BOTÃO LOGIN */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* CADASTRO */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={goToCadastro}>
              <Text style={styles.registerLink}> Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          {/* FECHAR */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={26} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: "#f2f2f2",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#05182bff",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    fontSize: 14,
    color: "#05182bff",
    fontWeight: "bold",
  },
});
