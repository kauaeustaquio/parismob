import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PurchaseSuccess() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Ícone de check */}
            <Image
                source={require('../../assets/images/check.png')} // coloque a imagem do check que você quer
                style={styles.checkIcon}
            />

            {/* Mensagem */}
            <Text style={styles.title}>Compra Finalizada!</Text>
            <Text style={styles.subtitle}>
                Seu pedido ficará pronto em breve!
            </Text>

            {/* Botão para voltar */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/')} // volta para a home
            >
                <Text style={styles.buttonText}>Voltar ao Início</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    checkIcon: {
        width: 120,
        height: 120,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#05182bFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
