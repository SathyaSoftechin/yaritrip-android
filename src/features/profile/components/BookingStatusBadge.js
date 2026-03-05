import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STATUS_COLORS = {
  Confirmed: { bg: '#D1FAE5', text: '#065F46' },
  Upcoming:  { bg: '#DBEAFE', text: '#1E40AF' },
  Completed: { bg: '#F1F5F9', text: '#475569' },
  Cancelled: { bg: '#FEE2E2', text: '#991B1B' },
};

const BookingStatusBadge = ({ status }) => {
  const config = STATUS_COLORS[status] || STATUS_COLORS.Confirmed;
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default BookingStatusBadge;
