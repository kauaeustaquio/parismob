// app/checkout.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';
import { Ionicons } from "@expo/vector-icons"; 

// ====================================================================
// ⚠️ PLACEHOLDER: useAuth (Hook de Autenticação)
// ====================================================================
const useAuth = () => {
    // Simula que o usuário está carregando por 500ms e depois está logado.
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<{ id: string } | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Simula um usuário logado.
            setUser({ id: 'user123' }); 
        }, 500);
        return () => clearTimeout(timer);
    }, []);
    return { user, isLoading };
};
// ====================================================================


export default function CheckoutScreen() {
    const { user, isLoading } = useAuth(); 
    const router = useRouter();
    
    const { 
        produtoId, 
        nomeProduto, 
        precoProduto 
    } = useLocalSearchParams();

    // 1. Redireciona para o login se não estiver logado
    if (!user && !isLoading) {
        return <Redirect href="/loginModal" />; 
    }

    // 2. Tela de Carregamento
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Verificando Login...</Text>
            </View>
        );
    }

    // 3. Processamento e validação dos dados do produto
    const preco = parseFloat(precoProduto?.toString() || '0');
    
    if (!produtoId || isNaN(preco) || preco <= 0) {
        Alert.alert("Erro", "Detalhes do produto inválidos ou ausentes.");
        return <Redirect href="/" />;
    }

    // Lógica de Finalização da Compra
    const handleFinalizePurchase = () => {
        // Lógica de API aqui
        Alert.alert(
            "Sucesso! 🎉", 
            `Compra de ${nomeProduto} finalizada. Total: R$ ${preco.toFixed(2).replace('.', ',')}`,
            [
                { text: "OK", onPress: () => router.push('/') }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Resumo da Compra</Text>
            
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Cartão do Produto */}
                <View style={styles.productCard}>
                    <Text style={styles.productName}>{nomeProduto}</Text>
                    <Text style={styles.productPrice}>R$ {preco.toFixed(2).replace('.', ',')}</Text>
                </View>

                {/* Valor Total */}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Valor total:</Text>
                    <Text style={styles.totalValue}>R$ {preco.toFixed(2).replace('.', ',')}</Text>
                </View>

                {/* Formas de Pagamento */}
                <Text style={styles.paymentHeader}>Selecione a forma de pagamento</Text>
                
                {/* Opção PIX */}
                <TouchableOpacity style={styles.paymentOption}>
                    <Ionicons name="wallet-outline" size={24} color="#05182bff" />
                    <Text style={styles.paymentText}>PIX</Text>
                    <Ionicons name="chevron-forward" size={20} color="#888" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                {/* Opção Dinheiro */}
                <TouchableOpacity style={styles.paymentOption}>
                    <Ionicons name="cash-outline" size={24} color="#28a745" />
                    <Text style={styles.paymentText}>Dinheiro Físico</Text>
                    <Ionicons name="chevron-forward" size={20} color="#888" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

            </ScrollView>
            
            {/* Botão Finalizar Compra - Fixo na parte inferior */}
            <TouchableOpacity 
                style={styles.finalizeButton}
                onPress={handleFinalizePurchase}
            >
                <Text style={styles.finalizeButtonText}>FINALIZAR COMPRA</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#05182bff' },
    scrollContent: { paddingBottom: 20 },
    
    productCard: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: { fontSize: 16, fontWeight: '600' },
    productPrice: { fontSize: 16, fontWeight: 'bold', color: '#05182bff' },

    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginBottom: 20,
    },
    totalLabel: { fontSize: 18, fontWeight: '500' },
    totalValue: { fontSize: 18, fontWeight: 'bold', color: '#05182bff' },

    paymentHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    paymentText: { marginLeft: 10, fontSize: 16, flex: 1 },

    finalizeButton: {
        backgroundColor: '#05182bff',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    finalizeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});