import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Heart, Brain } from 'lucide-react-native';



const tips = [
  {
    type: 'health',
    content: 'Take a 10-minute walk after lunch to aid digestion and boost energy.',
    icon: Heart,
  },
  {
    type: 'health',
    content: 'Stay hydrated! Drink a glass of water every 2 hours.',
    icon: Heart,
  },
  {
    type: 'brain',
    content: "Why don't ants get sick? Because they have tiny ant-ibodies!",
    icon: Brain,
  },
];

export default function DailyScreen() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{currentDate}</Text>
        <Text style={styles.subtitle}>Your Daily Wellness Update</Text>
      </View>

      <View style={styles.tipsContainer}>
        {tips.map((tip, index) => (
          <TouchableOpacity key={index} style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <tip.icon size={24} color="#4A90E2" />
              <Text style={styles.tipType}>
                {tip.type === 'health' ? 'Health Tip' : 'Daily Smile'}
              </Text>
            </View>
            <Text style={styles.tipContent}>{tip.content}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.reminderContainer}>
        <Text style={styles.reminderTitle}>Today's Reminders</Text>
        <View style={styles.reminderCard}>
          <Text style={styles.reminderText}>
            • Take your morning medications!{'\n'}
            • Check blood pressure!{'\n'}
            • Call your grandson Arman!
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
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  date: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
  },
  tipsContainer: {
    padding: 16,
  },
  tipCard: {
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
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 12,
  },
  tipContent: {
    fontSize: 18,
    color: '#2C3E50',
    lineHeight: 26,
  },
  reminderContainer: {
    padding: 16,
    marginBottom: 32,
  },
  reminderTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderText: {
    fontSize: 18,
    color: '#2C3E50',
    lineHeight: 32,
  },
});