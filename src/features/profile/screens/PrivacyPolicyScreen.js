import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import colors from '../../../theme/colors';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you create an account or make a booking.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to process bookings, send confirmations and updates, improve our services, and communicate with you about promotions and offers.',
  },
  {
    title: '3. Data Security',
    body: 'We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.',
  },
  {
    title: '4. Sharing of Information',
    body: 'We do not sell your personal information. We may share your information with third-party travel providers strictly to fulfil your bookings.',
  },
  {
    title: '5. Your Rights',
    body: 'You have the right to access, correct, or delete your personal information at any time through your profile settings or by contacting our support team.',
  },
];

const PrivacyPolicyScreen = ({ navigation }) => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <ChevronLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.topTitle}>Privacy and Policy</Text>
      <View style={{ width: 40 }} />
    </View>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.lastUpdated}>Last updated: March 2025</Text>
      {SECTIONS.map((section, i) => (
        <View key={i} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionBody}>{section.body}</Text>
        </View>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  topTitle: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  content: { padding: 20, paddingBottom: 60 },
  lastUpdated: { fontSize: 12, color: colors.textMuted, marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 6 },
  sectionBody: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
});

export default PrivacyPolicyScreen;
