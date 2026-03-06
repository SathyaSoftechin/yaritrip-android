import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const OrDivider = ({ label = 'OR' }) => (
  <View style={styles.orRow}>
    <View style={styles.line} />
    <Text style={styles.orText}>{label}</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    marginHorizontal: 12,
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default OrDivider;
