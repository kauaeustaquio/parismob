import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Assumindo que esses imports estão corretos
import { HapticTab } from '@/components/HapticTab'; 
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#222', 
        tabBarInactiveTintColor: '#888',
        tabBarButton: HapticTab, 
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      {/* TELAS QUE DEVEM APARECER NAS ABAS */}

      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="checkout"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ), 
        }}
      />
      
      {/* TELAS QUE DEVEM SER OCULTADAS DA BARRA DE ABAS */}
      
      <Tabs.Screen
        name="cadastro"
        options={{
          // ESSENCIAL: Oculta a aba da barra inferior
          href: null, 
        }}
      />

      <Tabs.Screen
        name="loginModal"
        options={{
          // ESSENCIAL: Oculta a aba da barra inferior
          href: null,
        }}
      />
      
      {/* Oculta a rota de erro, se existir */}
      <Tabs.Screen
        name="+not-found"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}