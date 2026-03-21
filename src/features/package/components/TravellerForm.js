import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const TravellerForm = ({ traveller, index, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Traveler {index + 1}</Text>
      <Text style={styles.subheading}>
        {traveller.type === 'ADULT' ? 'ADULT - ABOVE 12 YEARS' : 'CHILD'}
      </Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputFlex]}
          placeholder="Full Name (as per ID)"
          placeholderTextColor={colors.textMuted}
          value={traveller.name}
          onChangeText={(val) => onChange(index, 'name', val)}
        />
        <TextInput
          style={[styles.input, styles.inputAge]}
          placeholder="Age"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={traveller.age}
          onChangeText={(val) => onChange(index, 'age', val)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    backgroundColor: colors.white,
  },
  heading: {
    fontWeight: '700',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subheading: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  inputFlex: {
    flex: 1,
  },
  inputAge: {
    width: 70,
  },
});

export default TravellerForm;
