import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';
import colors from '../../../theme/colors';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

const LanguageScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('en');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Preferred Language</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={LANGUAGES}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = selected === item.code;
          return (
            <TouchableOpacity
              style={[styles.langItem, isSelected && styles.langItemActive]}
              onPress={() => setSelected(item.code)}
              activeOpacity={0.7}
            >
              <View>
                <Text style={[styles.langLabel, isSelected && styles.langLabelActive]}>
                  {item.label}
                </Text>
                <Text style={styles.langNative}>{item.native}</Text>
              </View>
              {isSelected && <Check size={20} color={colors.primary} />}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

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
  list: { padding: 16, gap: 10 },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langItemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  langLabel: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  langLabelActive: { color: colors.primary },
  langNative: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
});

export default LanguageScreen;
