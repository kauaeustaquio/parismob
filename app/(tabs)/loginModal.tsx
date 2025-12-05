import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible?: boolean;
  onClose?: () => void;
  onLogin?: (email: string, senha: string) => void;
};

export default function LoginModal({
  visible = false,
  onClose = () => {},
  onLogin = () => {},
}: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Login</Text>

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

          <TouchableOpacity
            style={styles.button}
            onPress={() => onLogin(email, senha)}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={26} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  popup: { width: "85%", backgroundColor: "#fff", borderRadius: 20, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 14, marginTop: 10 },
  inputBox: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 12, paddingHorizontal: 10, marginTop: 5, backgroundColor: "#f2f2f2" },
  input: { flex: 1, paddingVertical: 8 },
  button: { backgroundColor: "#05182bff", paddingVertical: 12, borderRadius: 12, marginTop: 20 },
  buttonText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
  closeBtn: { position: "absolute", top: 10, right: 10 },
});
