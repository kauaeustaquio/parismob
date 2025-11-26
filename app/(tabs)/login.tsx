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
  Alert,
  
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginGoogle() {
    
  }

  async function loginEmailSenha() {
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha email e senha.");
    }

    console.log("Acabei de fazer login com o email e senha!")
    setLoading(true);

    try {
      //fazer chamada da api aqui para fazer login
      const resp = await fetch("https://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resp.json();

      if (!resp.ok) {
        setLoading(false);
        return Alert.alert("Erro", dados.mensagem);
      }

      await AsyncStorage.setItem("@user", JSON.stringify(dados.usuario));
      setLoading(false);

      navigation.replace("questions");

    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Falha ao conectar ao servidor.");
    }
  }

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
