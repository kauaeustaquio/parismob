import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "https://qt8rqmzq-3000.brs.devtunnels.ms/api/clientes";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha_hash, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [showSenha, setShowSenha] = useState(false);

    // Função de cadastro conectando ao banco via API
    const handleCadastro = async () => {
        if (!nome || !email || !senha_hash || !telefone) {
            Alert.alert("Atenção", "Preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha_hash,
                    telefone,
                }),
            });

            if (response.ok) {
                Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
                setNome("");
                setEmail("");
                setSenha("");
                setTelefone("");
            } else {
                // Não tenta ler JSON, apenas mostra status
                Alert.alert(
                    "Erro",
                    `Erro ao cadastrar. Status: ${response.status}`
                );
            }
        } catch (error) {
            Alert.alert("Erro", "Falha na conexão com o servidor.");
            console.error(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Image
                source={require("../../assets/images/icon-cadastro.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Cadastre-se</Text>

            <View style={styles.card}>
                {/* Nome */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Maria da Silva..."
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email *</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.inputInside}
                            placeholder="maria.silva@gmail..."
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <Ionicons name="mail-outline" size={20} color="#888" />
                    </View>
                </View>

                {/* Senha */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Senha *</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.inputInside}
                            placeholder="********"
                            value={senha_hash}
                            onChangeText={setSenha}
                            secureTextEntry={!showSenha}
                        />
                        <TouchableOpacity onPress={() => setShowSenha(!showSenha)}>
                            <Ionicons
                                name={showSenha ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Telefone */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="(83) 9****-****"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Botão */}
                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                {/* Link para login */}
                <Text style={styles.loginText}>
                    Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    logo: { width: 240, height: 200 },
    title: { fontSize: 30, fontWeight: "500", marginBottom: 10 },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    inputGroup: { marginBottom: 15 },
    label: { fontSize: 14, color: "#555", marginBottom: 5 },

    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingHorizontal: 12,
    },
    inputInside: {
        flex: 1,
        paddingVertical: 10,
    },

    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

    loginText: { textAlign: "center", marginTop: 10, fontSize: 12, color: "#555" },
    loginLink: { color: "#007bff", fontWeight: "bold" },
});
