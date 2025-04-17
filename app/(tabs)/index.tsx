import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Mic, Send, Settings } from 'lucide-react-native';
import { Link } from 'expo-router';


export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [loadingDone, setLoadingDone] = useState(false);
  const fontSize = 18;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDone(true);
    }, 6000); // simulate 7 seconds loading

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (query.trim()) {
      setShowAIResponse(true);
      setQuery('');
    }
  };

  return (
    <>
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Morning Device Check</Text>
            {!loadingDone ? (
              <>
                <Text style={styles.modalDesc}>
                  Good morning grandparent! Now I am running a device check to get your phone ready for the day.
                </Text>
                <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 30 }} />
              </>
            ) : (
              <>
                <Text style={styles.modalResult}>✅ Functions checked!</Text>
                <Text style={styles.modalResult}>✅ Settings checked!</Text>
                <Text style={styles.modalResult}>🔉 Oho! Low Volume? – Increasing the volume!</Text>
                <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
                  <Text style={styles.modalCloseText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        {/* Header image with overlay title */}
        <View style={styles.headerWrapper}>
          <Image source={require('./pocket_grandson.jpg')} style={styles.headerImage} />
          <Text style={styles.headerOverlay}>Pocket Grandson</Text>
        </View>

        {/* AI Chat link */}
        <Link href="/tsgrandson" asChild>
          <TouchableOpacity style={styles.aiContainer}>
            <View style={styles.aiCircle}>
              <Text style={styles.aiText}>AI</Text>
            </View>
            <Text style={styles.welcomeText}>
              Hello! I'm your digital companion.{'\n'}Tap here for tech support!
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Search / help bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchTitle}>Grandson Help Bar</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { fontSize }]}
              value={query}
              onChangeText={setQuery}
              placeholder="Type your question here..."
              placeholderTextColor="#8E8E93"
            />
            <View style={styles.buttonContainer}>
              {Platform.OS !== 'web' && (
                <TouchableOpacity style={styles.iconButton}>
                  <Mic size={24} color="#4A90E2" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.iconButton} onPress={handleSubmit}>
                <Send size={24} color="#4A90E2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Fake AI response */}
        {showAIResponse && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>
              I understand you might be having trouble. Let me help you with that. First, let's check if your device's volume is turned up using the buttons on the side. You can also try tapping the speaker icon at the top of your screen to make sure it's not muted.
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  /* Header with overlay */
  headerWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  /* Assistance Level */
  preferencesContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  preferencesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  preferencesButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preferenceButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  preferenceButtonActive: {
    backgroundColor: '#4A90E2',
  },
  preferenceButtonText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  preferenceButtonTextActive: {
    color: '#FFFFFF',
  },

  /* AI link card */
  aiContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F4FD',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aiCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 20,
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 28,
  },

  /* Search container */
  searchContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
  },
  input: {
    backgroundColor: '#F5F7FA',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 10,
    marginLeft: 10,
  },

  /* AI response */
  responseContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  responseText: {
    fontSize: 18,
    color: '#2C3E50',
    lineHeight: 26,
  },

  /* Modal */
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 20,
    width: '85%',
    alignItems: 'flex-start',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  modalResult: {
    fontSize: 18,
    color: '#2C3E50',
    marginTop: 10,
    width: '100%',
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  modalCloseText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
