import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { TriangleAlert as AlertTriangle, PhoneOff } from 'lucide-react-native';

const simulationSteps = [
  '⚠️ Unknown number is calling…',
  '📢 “This call may be recorded for customer security. Kindly stay on the line.”',
  '🏃‍♂️ Scammer detected fleeing!',
  '📊 Analysing call against threat databases…',
  '🚨 Potential Scam Detected. Please hang up immediately.',
];

export default function SafetyScreen() {
  const [isScamAlertEnabled, setIsScamAlertEnabled] = useState(true);
  const [showSimulation, setShowSimulation] = useState(false);
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [callerInfo, setCallerInfo] = useState('+91 89547 12345');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (showSimulation) {
      setCurrentStepIndex(0);
      const interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < simulationSteps.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 2000); // 2 seconds delay per message
      return () => clearInterval(interval);
    }
  }, [showSimulation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AlertTriangle size={32} color="#E74C3C" />
        <Text style={styles.headerText}>Scam Protection</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Scam Call Alerts</Text>
            <Text style={styles.settingDescription}>
              Get warnings about potential scam calls from unknown numbers
            </Text>
          </View>
          <Switch
            value={isScamAlertEnabled}
            onValueChange={setIsScamAlertEnabled}
            trackColor={{ false: '#767577', true: '#81B0FF' }}
            thumbColor={isScamAlertEnabled ? '#4A90E2' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Simulate Call Button */}
      <TouchableOpacity
        style={styles.fakeCallButton}
        onPress={() => setShowFakeCall(true)}
      >
        <Text style={styles.fakeCallText}>Simulate Incoming Call</Text>
      </TouchableOpacity>

      <View style={styles.recentAlerts}>
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        <View style={styles.alertCard}>
          <PhoneOff size={24} color="#E74C3C" />
          <View style={styles.alertInfo}>
            <Text style={styles.alertNumber}>+91 78093 5555</Text>
            <Text style={styles.alertTime}>Today, 2:30 PM</Text>
            <Text style={styles.alertDescription}>
              This number has been reported for potential scam activity
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Safety Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            • Never share your personal information or banking details over the phone
          </Text>
          <Text style={styles.tipText}>
            • Government agencies will never ask for payments through gift cards
          </Text>
          <Text style={styles.tipText}>
            • If unsure, hang up and call the organization directly using their official number
          </Text>
        </View>
      </View>

      {/* Scam Simulation Modal */}
      <Modal visible={showSimulation} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.simulationBox}>
            {simulationSteps.slice(0, currentStepIndex + 1).map((step, index) => (
              <Text key={index} style={styles.simulationStep}>
                {step}
              </Text>
            ))}
            {currentStepIndex === simulationSteps.length - 1 && (
              <TouchableOpacity
                onPress={() => setShowSimulation(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Full-Screen Fake Call Modal */}
      <Modal visible={showFakeCall} transparent animationType="slide">
        <View style={styles.fullScreenCall}>
          <Text style={styles.callingText}>📞 Incoming Call</Text>
          <Text style={styles.callerNumber}>{callerInfo}</Text>

          <View style={styles.callButtonRow}>
            <TouchableOpacity
              style={[styles.callButton, { backgroundColor: '#2ECC71' }]}
              onPress={() => {
                setShowFakeCall(false);
                setShowSimulation(true);
              }}
            >
              <Text style={styles.callButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.callButton, { backgroundColor: '#E74C3C' }]}
              onPress={() => setShowFakeCall(false)}
            >
              <Text style={styles.callButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 12,
    color: '#2C3E50',
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  settingDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 22,
  },
  fakeCallButton: {
    backgroundColor: '#4A90E2',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  fakeCallText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  recentAlerts: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertInfo: {
    marginLeft: 16,
    flex: 1,
  },
  alertNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 16,
    color: '#E74C3C',
    lineHeight: 22,
  },
  tipsContainer: {
    margin: 16,
    marginBottom: 32,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 12,
    lineHeight: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  simulationBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    width: '100%',
  },
  simulationStep: {
    fontSize: 16,
    marginBottom: 14,
    color: '#34495E',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  fullScreenCall: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callingText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 10,
  },
  callerNumber: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
    color: '#34495E',
  },
  callButtonRow: {
    flexDirection: 'row',
    gap: 20,
  },
  callButton: {
    flex: 1,
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
