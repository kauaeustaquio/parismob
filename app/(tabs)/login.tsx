import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Logo */}
      <Image
        source={require("../../assets/images/icon-cadastro.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Login</Text>

      {/* Campo Email */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Campo Senha */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Esqueci a senha */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>

      {/* Criar conta */}
      <View style={styles.createAccountRow}>
        <Text style={{ color: "#555" }}>Ainda não tem conta? </Text>
        <TouchableOpacity>
          <Text style={styles.createAccountText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },

  logo: {
    width: 250,
    height: 120,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4e4e4eff",
    marginTop: 30,
  },

  inputWrapper: {
    width: "85%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  input: {
    padding: 10,
    fontSize: 16,
  },

  loginButton: {
    width: "85%",
    backgroundColor: "#1e90ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  forgotPassword: {
    color: "#1e90ff",
    marginTop: 15,
    fontSize: 14,
  },

  createAccountRow: {
    flexDirection: "row",
    marginTop: 25,
  },

  createAccountText: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
});
