import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    FlatList,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LoginModal from "../../app/(tabs)/loginModal";

// Interface dos dados vindos da sua API de Categorias
interface WebCategory {
    id: string; // O ID real da categoria (do banco)
    nome: string;
    imagem_url: string | null;
}

// Interface que será usada na FlatList (combinação de estático e dinâmico)
interface DisplayCategory {
    id: string; // Usamos o ID para o filtro
    name: string;
    img: string | number; // URL (string) ou require (number)
    isPromo?: boolean;
    isAllProducts?: boolean;
}

interface Product {
    id?: number;
    nome: string;
    valor: number | string;
    imagem?: string;
    categoriaId?: string; // Garante que temos o ID para filtrar
    em_promocao?: boolean;
    isFavorite?: boolean;
    inCart?: boolean;
}

export default function HomeScreen() {
    const router = useRouter();

    const [cartVisible, setCartVisible] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    // 💡 NOVO ESTADO PARA CATEGORIAS DINÂMICAS
    const [categories, setCategories] = useState<WebCategory[]>([]); 
    const [search, setSearch] = useState<string>("");
    
    // 💡 selectedCategory agora guarda o ID da categoria (string) ou null/ID especial
    const [selectedCategory, setSelectedCategory] = useState<string | null>('produtos'); 
    const [showPromo, setShowPromo] = useState<boolean>(false);

    const screenWidth = Dimensions.get("window").width;
    const slideAnim = useRef(new Animated.Value(screenWidth)).current;

    const [loginVisible, setLoginVisible] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const goToCadastro = () => {
        setLoginVisible(false);
        router.push('/cadastro');
    };

    useEffect(() => {
        if (cartVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 350,
                useNativeDriver: true,
            }).start();
        } else {
            slideAnim.setValue(screenWidth);
        }
    }, [cartVisible]);

    async function fetchCategories(query: string = "") {
        const categoriesUrl = `https://qt8rqmzq-3000.brs.devtunnels.ms/api/categorias?search=${query}`;
        try {
            const response = await fetch(categoriesUrl);
            if (!response.ok) throw new Error("Erro ao buscar categorias");
            // Os dados retornados são WebCategory[]
            const data: WebCategory[] = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            setCategories([]);
        }
    }
    
    async function fetchProducts(query: string = "") {
        try {
            const response = await fetch(
                `https://qt8rqmzq-3000.brs.devtunnels.ms/api/produtos?search=${query}`
            );
            if (!response.ok) throw new Error("Erro ao buscar produtos");
            const data: Product[] = await response.json();
            const initialized = data.map((p) => ({
                ...p,
                isFavorite: false,
                inCart: false,
            }));
            setProducts(initialized);
        } catch (error) {
            console.error(error);
        }
    }

    // Chamadas iniciais
    useEffect(() => {
        fetchProducts(search);
    }, [search]);

    useEffect(() => {
        // 💡 Carrega as categorias na montagem do componente
        fetchCategories(); 
    }, []);

    const webCategoriesToDisplay: DisplayCategory[] = categories.map(cat => ({
        id: cat.id,
        name: cat.nome,
        // Usamos a URL da imagem vinda do blob
        img: cat.imagem_url || "https://via.placeholder.com/90", 
    }));
    
    // Lista final de categorias que será usada na FlatList
    const displayedCategories: DisplayCategory[] = [
        { 
            id: 'promocoes',
            name: "Promoções", 
            img: require("../../assets/images/promo.png"),
            isPromo: true 
        },
        { 
            id: 'produtos', // ID especial para "Todos os Produtos"
            name: "Produtos", 
            img: require("../../assets/images/todos.png"), 
            isAllProducts: true
        },
        ...webCategoriesToDisplay // Categorias da API
    ];

    const displayedProducts = products.filter((p) => {
        let matchCategory = true;
        
        // Se há uma categoria selecionada E ela não é a categoria "Produtos" (Todos)
        if (selectedCategory && selectedCategory !== 'produtos') {
            // Filtra pelo ID da categoria do produto (p.categoriaId)
            matchCategory = p.categoriaId === selectedCategory; 
        }
        
        // Filtro de Promoção (Mantido)
        const matchPromo = showPromo ? p.em_promocao === true : true;
        
        return matchCategory && matchPromo;
    });

    // --- Funções de Carrinho/Favoritos e Cálculo (Inalteradas) ---
    const toggleFavorite = (index: number) => {
        const updated = [...displayedProducts];
        updated[index].isFavorite = !updated[index].isFavorite;
        const allProducts = products.map((p) =>
            p.id === updated[index].id ? updated[index] : p
        );
        setProducts(allProducts);
    };

    const toggleCartItem = (index: number) => {
        const updated = [...displayedProducts];
        updated[index].inCart = !updated[index].inCart;
        const allProducts = products.map((p) =>
            p.id === updated[index].id ? updated[index] : p
        );
        setProducts(allProducts);
    };

    const removeFromCart = (product: Product) => {
        const updated = products.map((p) =>
            p.id === product.id ? { ...p, inCart: false } : p
        );
        setProducts(updated);
    };

    const confirmRemove = (product: Product) => {
        Alert.alert(
            "Remover produto",
            "Deseja mesmo excluir este produto do carrinho de compras?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Remover", style: "destructive", onPress: () => removeFromCart(product) },
            ]
        );
    };

    const cartItems = products.filter((p) => p.inCart);

    const total = cartItems
        .reduce(
            (sum, p) =>
                sum + parseFloat((p.valor || 0).toString().replace(",", ".")),
            0
        )
        .toFixed(2)
        .replace(".", ",")
        
    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <LoginModal
                visible={loginVisible}
                onClose={() => setLoginVisible(false)}
                onLogin={(email, senha) => {
                    console.log("LOGANDO...", email, senha);
                    setIsLogged(true);
                    setLoginVisible(false);
                }}
                goToCadastro={goToCadastro} 
            >
            </LoginModal>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require("../../assets/images/logo.produtosd'paris(1)(1).png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.searchRow}>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            placeholder="Pesquisar..."
                            style={styles.searchInput}
                            value={search}
                            onChangeText={setSearch}
                        />
                        <Ionicons name="search" size={22} color="#333" style={{ marginLeft: 8 }} />
                    </View>

                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => setCartVisible(true)}
                    >
                        <Ionicons name="cart" size={28} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Lista de Categorias: Agora usa a lista dinâmica 'displayedCategories' */}
                <FlatList
                    data={displayedCategories}
                    keyExtractor={(item) => item.id} // 💡 USANDO O ID como chave
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.categoryItem}
                            onPress={() => {
                                // 💡 Lógica de filtro atualizada para usar IDs
                                if (item.isPromo) {
                                    setShowPromo(prev => !prev);
                                    setSelectedCategory('produtos'); // Volta para "Todos" se desmarcar a promo
                                } else if (item.isAllProducts) {
                                    setShowPromo(false);
                                    setSelectedCategory('produtos'); 
                                } else {
                                    setShowPromo(false);
                                    // 💡 Seleciona o ID da categoria da API
                                    setSelectedCategory(item.id); 
                                }
                            }}
                        >
                            <View style={[
                                styles.categoryCircle, 
                                (item.id === selectedCategory && !showPromo) || (item.isPromo && showPromo)
                                    ? styles.categorySelected : {} // 💡 Aplica estilo de seleção
                            ]}>
                                <Image 
                                    // 💡 Se for número (require), usa source={item.img}. Se for string (URL), usa source={{ uri: item.img }}
                                    source={typeof item.img === 'number' ? item.img : { uri: item.img }} 
                                    style={styles.categoryImage} 
                                />
                            </View>
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />

                <Text style={styles.launchTitle}>
                    {showPromo ? "Promoções" : "Produtos"}
                </Text>

                <View style={styles.productsContainer}>
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((produto, index) => (
                            <View key={produto.id || index} style={styles.productCard}>
                                <Image
                                    source={{
                                        uri: produto.imagem || "https://via.placeholder.com/80",
                                    }}
                                    style={styles.productImage}
                                />
                                <Text style={styles.productName}>{produto.nome}</Text>
                                <Text style={styles.productPrice}>
                                    R${" "}
                                    {parseFloat(produto.valor.toString())
                                        .toFixed(2)
                                        .replace(".", ",")}
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        marginTop: 6,
                                        alignItems: 'center', // Adicionado para centralizar verticalmente
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => toggleFavorite(index)}
                                        style={{ padding: 6 }}
                                    >
                                        <Ionicons
                                            name={produto.isFavorite ? "heart" : "heart-outline"}
                                            size={22}
                                            color={produto.isFavorite ? "red" : "#333"}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => toggleCartItem(index)}
                                        style={{ padding: 6 }}
                                    >
                                        <Ionicons
                                            name={produto.inCart ? "cart" : "cart-outline"}
                                            size={22}
                                            color={produto.inCart ? "#05182bff" : "#333"}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.buyButton}
                                        onPress={() => {
                                            if (isLogged) {
                                                router.push({
                                                    pathname: "/checkout",
                                                    params: {
                                                        produtoId: produto.id,
                                                        nomeProduto: produto.nome,
                                                        precoProduto: produto.valor,
                                                    }
                                                });
                                            } else {
                                                setLoginVisible(true);
                                            }
                                        }}
                                    >
                                        <Text style={styles.buyButtonText}>COMPRAR</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={{ textAlign: "center", marginTop: 20 }}>
                            Nenhum produto encontrado.
                        </Text>
                    )}
                </View>
            </ScrollView>

            {/* MODAL DO CARRINHO (Mantido) */}
            <Modal visible={cartVisible} transparent onRequestClose={() => setCartVisible(false)}>
                <View style={styles.modalOverlay}>
                    <Animated.View
                        style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Meu carrinho</Text>
                            <TouchableOpacity onPress={() => setCartVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={{ marginVertical: 10 }}>
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <View key={item.id || index} style={styles.cartItem}>
                                        <Image
                                            source={{
                                                uri: item.imagem || "https://via.placeholder.com/60",
                                            }}
                                            style={styles.cartImage}
                                        />
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text numberOfLines={1} style={{ fontWeight: '600' }}>{item.nome}</Text>
                                            <Text style={{ color: 'green' }}>
                                                R${" "}
                                                {parseFloat((item.valor || 0).toString())
                                                    .toFixed(2)
                                                    .replace(".", ",")}
                                            </Text>
                                        </View>

                                        <TouchableOpacity onPress={() => confirmRemove(item)}>
                                            <Ionicons name="close" size={22} color="#ff4d4d" />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                <Text style={{ textAlign: "center", marginTop: 20 }}>
                                    Carrinho vazio.
                                </Text>
                            )}
                        </ScrollView>

                        <View style={styles.cartFooter}>
                            <Text style={{ fontWeight: "bold" }}>
                                Total estimado: R$ {total}
                            </Text>
                            <TouchableOpacity
                                style={styles.finalizeButton}
                                onPress={() => {
                                    if (isLogged) {
                                        Alert.alert("Ação Necessária", "Implemente a navegação para o Checkout de Múltiplos Itens!");
                                    } else {
                                        setCartVisible(false);
                                        setLoginVisible(true);
                                    }
                                }}
                                disabled={cartItems.length === 0}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Finalizar Compra
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

// =======================================================
// ESTILOS (Adicionado o estilo de seleção de categoria)
// =======================================================
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    scrollContent: {
        paddingBottom: 20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    logo: { width: 500, height: 90, alignSelf: "center", marginTop: 10 },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    searchWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#ddd', // Adicionado cor para visualização
        borderRadius: 20,
        paddingHorizontal: 12,
        backgroundColor: "#f5f5f5",
        paddingVertical: 4,
    },
    searchInput: { flex: 1, padding: 8 },
    cartButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: "#e0e0e0",
        borderRadius: 20,
    },
    categoryItem: { alignItems: "center", marginRight: 15 },
    categoryCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 2, // Adicionado para o efeito de seleção
        borderColor: 'transparent', // Cor padrão
    },
    // 💡 NOVO ESTILO: Borda para categoria selecionada
    categorySelected: {
        borderColor: '#05182bff', 
    },
    categoryImage: { width: 60, height: 60, resizeMode: "contain" },
    categoryText: { marginTop: 6, fontSize: 12, color: "#333", textAlign: "center" },
    launchTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 15,
        marginBottom: 10,
        marginTop: 5,
        color: "#333",
    },
    productsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    productCard: {
        width: "45%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    productImage: { width: 80, height: 80, marginBottom: 8 },
    productName: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
    productPrice: { fontSize: 14, color: "green", marginVertical: 4 },
    buyButton: {
        backgroundColor: "#05182bff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buyButtonText: { color: "#fff", fontWeight: "bold" },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        width: "70%",
        height: "100%",
        padding: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalTitle: { fontSize: 18, fontWeight: "bold" },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 8,
    },
    cartImage: { width: 60, height: 60 },
    cartFooter: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10, // Adicionado para dar espaço
        borderTopWidth: 1, // Adicionado separador
        borderColor: '#eee', // Adicionado cor para separador
    },
    finalizeButton: {
        backgroundColor: "#05182bff",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});