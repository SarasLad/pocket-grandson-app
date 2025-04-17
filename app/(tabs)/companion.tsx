import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BookOpen, Coffee } from 'lucide-react-native';

const poems = [
  {
    title: "Life's Journey",
    content: "Each day's a gift, wrapped in dawn's light,\nA chance to make our moments bright.\nThough paths may twist, and turn about,\nKeep faith and hope, don't give in to doubt.",
  },
  {
    title: "Simple Joys",
    content: "A garden bloom, a gentle breeze,\nThe rustle of the autumn leaves.\nSmall moments make the heart grow strong,\nLike nature's sweet, eternal song.",
  },
];

const quotes = [
  "The best way to predict the future is to create it. - Peter Drucker",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
];

export default function CompanionScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <BookOpen size={24} color="#4A90E2" />
          <Text style={styles.sectionTitle}>Today's Poems</Text>
        </View>
        {poems.map((poem, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.poemTitle}>{poem.title}</Text>
            <Text style={styles.poemContent}>{poem.content}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Coffee size={24} color="#4A90E2" />
          <Text style={styles.sectionTitle}>Inspirational Quotes</Text>
        </View>
        {quotes.map((quote, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.quoteText}>{quote}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.thoughtTitle}>Thought of the Day</Text>
        <View style={styles.thoughtCard}>
          <Text style={styles.thoughtText}>
            "Every sunrise brings a new page in your story. Make it a good one today!"
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  poemContent: {
    fontSize: 18,
    color: '#2C3E50',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  quoteText: {
    fontSize: 18,
    color: '#2C3E50',
    lineHeight: 26,
  },
  thoughtTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  thoughtCard: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thoughtText: {
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 28,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});