import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  User,
  BookOpen,
  Heart,
  ShieldCheck,
  Languages,
  FileText,
  LogOut,
} from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import ProfileMenuItem from '../components/ProfileMenuItem';
import ProfileHeader from '../components/ProfileHeader';
import BottomTabBar from '../../home/components/BottomTabBar';

import {
  useProfile,
  useLogout,
  useUploadProfileImage,
} from '../hooks/useProfile';

import colors from '../../../theme/colors';

const MENU_ITEMS = [
  {
    key: 'PersonalInfo',
    label: 'Personal Information',
    icon: <User size={20} color={colors.primary} />,
    iconBg: colors.primaryLight,
  },
  {
    key: 'MyBookings',
    label: "My Booking's",
    icon: <BookOpen size={20} color="#F97316" />,
    iconBg: '#FFF7ED',
  },
  {
    key: 'Likes',
    label: 'Likes',
    icon: <Heart size={20} color="#EF4444" />,
    iconBg: '#FEF2F2',
  },
  {
    key: 'PrivacyPolicy',
    label: 'Privacy and Policy',
    icon: <ShieldCheck size={20} color="#22C55E" />,
    iconBg: '#F0FDF4',
  },
  {
    key: 'Language',
    label: 'Preferred language',
    icon: <Languages size={20} color="#F97316" />,
    iconBg: '#FFF7ED',
  },
  {
    key: 'Terms',
    label: 'Terms and Conditions',
    icon: <FileText size={20} color="#8B5CF6" />,
    iconBg: '#F5F3FF',
  },
];

const ProfileScreen = ({ navigation }) => {
  const { data: user, isLoading } = useProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { mutate: uploadImage, isPending: uploading } =
    useUploadProfileImage();

  const [bottomTab, setBottomTab] = useState('profile');

  useFocusEffect(
    useCallback(() => {
      setBottomTab('profile');
    }, [])
  );

  // ─── IMAGE PICKER ─────────────────────────────
  const handleAvatarPress = () => {
    Alert.alert('Change Profile Photo', 'Choose option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = async () => {
    const res = await launchCamera({ mediaType: 'photo', quality: 0.7 });
    handleImage(res);
  };

  const openGallery = async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    });
    handleImage(res);
  };

  const handleImage = (res) => {
    if (res.didCancel) return;

    if (res.errorCode) {
      Alert.alert('Error', res.errorMessage || 'Image picker error');
      return;
    }

    const file = res.assets?.[0];
    if (!file?.uri) return;

    uploadImage(file, {
      onSuccess: () => Alert.alert('Success', 'Photo updated'),
      onError: () => Alert.alert('Error', 'Upload failed'),
    });
  };

  // ─── LOGOUT ─────────────────────────────────
  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          logout(undefined, {
            onSuccess: () => navigation.replace('Login'),
            onError: () => navigation.replace('Login'),
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.screenTitle}>My Profile</Text>

          {/* Profile Header */}
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <ProfileHeader
              user={user}
              showEdit
              onAvatarPress={handleAvatarPress}
            />
          )}

          {/* Upload indicator */}
          {uploading && (
            <Text style={styles.uploadingText}>Uploading...</Text>
          )}

          {/* MENU ITEMS (UNCHANGED) */}
          <View style={styles.menuSection}>
            {MENU_ITEMS.map((item, index) => (
              <ProfileMenuItem
                key={item.key}
                label={item.label}
                icon={item.icon}
                iconBg={item.iconBg}
                isActive={index === 0}
                onPress={() => navigation.navigate(item.key)}
              />
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={[styles.logoutBtn, isLoggingOut && styles.disabled]}
            onPress={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <ActivityIndicator size="small" color={colors.error} />
            ) : (
              <>
                <Text style={styles.logoutText}>Log Out</Text>
                <LogOut size={18} color={colors.error} />
              </>
            )}
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        <BottomTabBar activeTab={bottomTab} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  root: { flex: 1 },

  content: { paddingBottom: 20 },

  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },

  uploadingText: {
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 8,
  },

  menuSection: {
    paddingHorizontal: 16,
    marginTop: 4,
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.error,
    backgroundColor: colors.white,
  },

  disabled: { opacity: 0.6 },

  logoutText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '600',
  },
});