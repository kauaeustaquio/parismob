import React, { useEffect, useState } from 'react';
import { 
    View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons"; 

// Simulação de autenticação
const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<{ id: string } | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setUser({ id: 'user123' });
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { user, isLoading };
};

export default function CheckoutScreen() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    // Parâmetros da rota
    type Params = {
        produtoId?: string;
        nomeProduto?: string;
        precoProduto?: string;
    };
    const params = useLocalSearchParams() as Params;
    const { produtoId, nomeProduto, precoProduto } = params;

    // Converte o preço
    const preco = Number(precoProduto);

    // Validação de parâmetros
    useEffect(() => {
        if (!user && !isLoading) {
            router.push("/loginModal");
        }

        if (!produtoId || !nomeProduto || isNaN(preco) || preco <= 0) {
            Alert.alert("Erro", "Detalhes do produto inválidos ou ausentes.", [
                { text: "OK", onPress: () => router.push("/") }
            ]);
        }
    }, [user, isLoading]);

    // Tela de carregamento
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Verificando Login...</Text>
            </View>
        );
    }

    // Finalizar compra
    const handleFinalizePurchase = () => {
        Alert.alert(
            "Sucesso! 🎉",
            `Compra de ${nomeProduto} finalizada.\nTotal: R$ ${preco.toFixed(2).replace('.', ',')}`,
            [{ text: "OK", onPress: () => router.push("/") }]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Resumo da Compra</Text>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Produto */}
                <View style={styles.productCard}>
                    <Text style={styles.productName}>{nomeProduto}</Text>
                    <Text style={styles.productPrice}>
                        R$ {preco.toFixed(2).replace('.', ',')}
                    </Text>
                </View>

                {/* Total */}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Valor total:</Text>
                    <Text style={styles.totalValue}>
                        R$ {preco.toFixed(2).replace('.', ',')}
                    </Text>
                </View>

                {/* Pagamentos */}
                <Text style={styles.paymentHeader}>Selecione a forma de pagamento</Text>

                <TouchableOpacity style={styles.paymentOption}>
                    <Ionicons name="wallet-outline" size={24} color="#05182bFF" />
                    <Text style={styles.paymentText}>PIX</Text>
                    <Ionicons name="chevron-forward" size={20} color="#888" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.paymentOption}>
                    <Ionicons name="cash-outline" size={24} color="#28a745" />
                    <Text style={styles.paymentText}>Dinheiro Físico</Text>
                    <Ionicons name="chevron-forward" size={20} color="#888" />
                </TouchableOpacity>

            </ScrollView>

            {/* Botão Finalizar */}
            <TouchableOpacity style={styles.finalizeButton} onPress={handleFinalizePurchase}>
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
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#05182bFF' },
    scrollContent: { paddingBottom: 20 },

    productCard: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productName: { fontSize: 16, fontWeight: '600' },
    productPrice: { fontSize: 16, fontWeight: 'bold', color: '#05182bFF' },

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
    totalValue: { fontSize: 18, fontWeight: 'bold', color: '#05182bFF' },

    paymentHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },

    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    paymentText: { marginLeft: 10, fontSize: 16, flex: 1 },

    finalizeButton: {
        backgroundColor: '#05182bFF',
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

