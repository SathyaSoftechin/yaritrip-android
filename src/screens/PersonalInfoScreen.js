import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

import ProfileHeader from '../components/ProfileHeader';
import { useProfile } from '../hooks/useProfile';
import colors from '../theme/colors';

const PersonalInfoScreen = ({ navigation }) => {
  const { data: user, isLoading } = useProfile();

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
      });
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Information</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header (NO EDIT HERE) */}
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ProfileHeader user={user} showEdit={false} />
        )}

        {/* Read-only fields */}
        <View style={styles.form}>
          <Field label="Name" value={form.name} />
          <Field label="Email" value={form.email} />
          <Field label="Mobile" value={form.mobile} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;

const Field = ({ label, value }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      editable={false} // 🔥 READ ONLY
    />
  </View>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  content: {
    paddingBottom: 40,
  },

  form: {
    padding: 20,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
});