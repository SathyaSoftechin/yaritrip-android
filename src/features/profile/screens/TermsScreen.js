import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import colors from '../../../theme/colors';

const TERMS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing and using YariTrip, you accept and agree to be bound by the terms and provision of this agreement.',
  },
  {
    title: '2. Booking Policy',
    body: 'All bookings are subject to availability. YariTrip acts as an intermediary between you and the travel service providers. We are not responsible for changes made by providers.',
  },
  {
    title: '3. Cancellation & Refunds',
    body: 'Cancellation policies vary by trip. Please review the cancellation terms specific to your booking before confirming. Refunds are processed within 7–14 business days.',
  },
  {
    title: '4. Payment Terms',
    body: 'All payments are processed securely. Prices displayed are inclusive of applicable taxes unless stated otherwise. YariTrip reserves the right to correct pricing errors.',
  },
  {
    title: '5. User Conduct',
    body: 'You agree to use YariTrip only for lawful purposes. Any misuse or abuse of the platform may result in suspension or termination of your account.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'YariTrip shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform or travel services booked through it.',
  },
];

const TermsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <ChevronLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.topTitle}>Terms and Conditions</Text>
      <View style={{ width: 40 }} />
    </View>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.lastUpdated}>Effective: March 2025</Text>
      {TERMS.map((item, i) => (
        <View key={i} style={styles.section}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.sectionBody}>{item.body}</Text>
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

export default TermsScreen;
