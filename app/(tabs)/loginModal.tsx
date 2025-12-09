import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal, 
} from "react-native";

// 💡 1. DEFINA AS PROPS CORRETAS (Incluindo goToCadastro)
interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: (email: string, senha: string) => void;
  goToCadastro: () => void; // 👈 Nova prop para navegação
}

// 💡 2. USE AS PROPS
export default function LoginModal({ visible, onClose, onLogin, goToCadastro }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPass, setShowPass] = useState(false);
  
  const handleLogin = () => {
    onLogin(email, senha); 
  };

  const closeLogin = () => {
    onClose(); 
  };

  return (
    // 💡 3. ENVOLVA O CONTEÚDO NO COMPONENTE <Modal>
    <Modal visible={visible} animationType="slide" transparent> 
      <View style={styles.overlay}>
        <View style={styles.popup}>
            <Text style={styles.title}>Login</Text>

            {/* --- CAMPO EMAIL --- */}
            <Text style={styles.label}>Email *</Text>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="maria.silva@gmail.com"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <Ionicons name="mail-outline" size={20} color="#555" />
            </View>

            {/* --- CAMPO SENHA --- */}
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

            {/* --- BOTÃO ENTRAR --- */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin} 
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* --- LINK CADASTRE-SE (ADICIONADO) --- */}
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Não tem uma conta?</Text>
                {/* 💡 Chama a prop goToCadastro passada pelo index.tsx */}
                <TouchableOpacity onPress={goToCadastro}>
                    <Text style={styles.registerLink}> Cadastre-se</Text>
                </TouchableOpacity>
            </View>
            {/* ------------------------------------------- */}

            {/* --- BOTÃO FECHAR --- */}
            <TouchableOpacity style={styles.closeBtn} onPress={closeLogin}>
              <Ionicons name="close" size={26} color="#333" />
            </TouchableOpacity>
          </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // 💡 Ajuste styles.overlay e styles.popup para a funcionalidade Modal
  overlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  popup: { 
    width: "85%", 
    backgroundColor: "#fff", 
    borderRadius: 20, 
    padding: 20,
    elevation: 10, 
  },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 14, marginTop: 10 },
  inputBox: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: '#ccc', borderRadius: 12, paddingHorizontal: 10, marginTop: 5, backgroundColor: "#f2f2f2" },
  input: { flex: 1, paddingVertical: 8 },
  button: { backgroundColor: "#05182bff", paddingVertical: 12, borderRadius: 12, marginTop: 20 },
  buttonText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
  closeBtn: { position: "absolute", top: 10, right: 10 },
  
  // --- ESTILOS PARA CADASTRO ---
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15, 
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    color: '#05182bff', 
    fontWeight: 'bold',
  }
});