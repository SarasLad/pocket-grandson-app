import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Send } from 'lucide-react-native';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Troubleshooting Grandson 👦💬 How can I help you today? I can assist with logging into apps, tech problems, or anything you’re stuck with!",
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate response based on input
    const lowered = input.toLowerCase();

    if (lowered.includes("facebook") && lowered.includes("log")) {
      const responses = [
        "Alright, let me check if I have your password saved...",
        "Oh I have it!",
        "Let me login for you...",
        "Logged in! Enjoy your scrolling 😊",
      ];

      responses.forEach((text, index) => {
        setTimeout(() => {
          const aiMessage: Message = {
            id: (Date.now() + index + 1).toString(),
            text,
            sender: 'ai',
          };
          setMessages((prev) => [...prev, aiMessage]);
        }, (index + 1) * 1000);
      });
    } else if (lowered.includes("instagram") && lowered.includes("log")) {
      const responses = [
        "Why watch reels when I have better jokes? 😄",
        "Well anyways, I'll help you login.",
        "Going through the list!",
        "Yep, got ya!",
        "You can now scroll reels freely! 📱",
      ];
    
      responses.forEach((text, index) => {
        setTimeout(() => {
          const aiMessage: Message = {
            id: (Date.now() + index + 100).toString(),
            text,
            sender: 'ai',
          };
          setMessages((prev) => [...prev, aiMessage]);
        }, (index + 1) * 1000);
      });
    } else {
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 100).toString(),
          text: "I understand you're having trouble. Let me guide you through this step by step. First, could you tell me which app or service you're trying to access?",
          sender: 'ai',
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./troubleshoot.jpg')}
        style={styles.headerImage}
      />

      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#8E8E93"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Send size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerImage: {
    width: '100%',
    height: 200,         // ↓ reduced height
    resizeMode: 'cover',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    minWidth: '50%',
    maxWidth: '80%',
    marginVertical: 8,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2C3E50',
    flexWrap: 'wrap',
    overflow: 'visible',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    padding: 12,
    paddingTop: 12,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
