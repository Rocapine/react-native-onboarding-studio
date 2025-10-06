import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

const examples = [
  { name: 'Carousel', route: '/example/carousel' },
  { name: 'Commitment', route: '/example/commitment' },
  { name: 'Loader', route: '/example/loader' },
  { name: 'Media Content', route: '/example/media-content' },
  { name: 'Picker', route: '/example/picker' },
  { name: 'Ratings', route: '/example/ratings' },
];

export default function ExampleIndex() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Onboarding Examples</Text>
      <Text style={styles.subtitle}>Explore different page types</Text>

      <View style={styles.grid}>
        {examples.map((example) => (
          <Pressable
            key={example.route}
            style={styles.card}
            onPress={() => router.push(example.route)}
          >
            <Text style={styles.cardText}>{example.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 60,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
  },
});
