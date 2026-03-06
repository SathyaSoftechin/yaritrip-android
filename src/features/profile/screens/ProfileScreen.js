import React, { useCallback, useState } from 'react';
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
import ProfileMenuItem from '../components/ProfileMenuItem';
import ProfileHeader from '../components/ProfileHeader';
import BottomTabBar from '../../home/components/BottomTabBar';
import { useProfile, useLogout } from '../hooks/useProfile';
import colors from '../../../theme/colors';

const FAKE_USER = {
  name: 'Ravi Kumar',
  email: 'ravikumar@gmail.com',
  avatarUrl: null,
};

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
  const [bottomTab, setBottomTab] = useState('profile');
  const displayUser = user || FAKE_USER;

  useFocusEffect(
    useCallback(() => {
      setBottomTab('profile');
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
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
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Screen title */}
          <Text style={styles.screenTitle}>My Profile</Text>

          {/* Profile header card */}
          {isLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : (
            <ProfileHeader user={displayUser} />
          )}

          {/* Menu items */}
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

          {/* Logout button */}
          <TouchableOpacity
            style={[styles.logoutBtn, isLoggingOut && styles.logoutBtnDisabled]}
            onPress={handleLogout}
            activeOpacity={0.8}
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

          <View style={styles.bottomPadding} />
        </ScrollView>

        <BottomTabBar activeTab={bottomTab} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  loader: {
    marginVertical: 40,
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
  logoutBtnDisabled: {
    opacity: 0.6,
  },
  logoutText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});

export default ProfileScreen;
