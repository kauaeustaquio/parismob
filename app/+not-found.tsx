import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Página não encontrada!</ThemedText>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Voltar para Home</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
