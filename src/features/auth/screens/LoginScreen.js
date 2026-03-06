import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAuth from '../hooks/useAuth';

const GOOGLE_LOGO = 'https://www.google.com/favicon.ico';
const FACEBOOK_LOGO = 'https://www.facebook.com/images/fb_icon_325x325.png';

const LoginScreen = ({ navigation }) => {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const { loading, handleLogin } = useAuth(navigation);

  const isEmailActive = emailFocus || email.length > 0;
  const isPasswordActive = passwordFocus || password.length > 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#223E86" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerText}>Welcome back!{'\n'}Sign in to continue</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={styles.inactiveTab}
              onPress={() => navigation.navigate('Signup')}
              activeOpacity={0.7}
            >
              <Text style={styles.inactiveText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.activeTab}>
              <Text style={styles.activeText}>Log In</Text>
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.floatingLabel, isEmailActive && styles.floatingLabelActive]}>
              E-mail / Mobile number
            </Text>
            <View style={[styles.inputBox, emailFocus && styles.inputBoxFocused]}>
              <Ionicons
                name="mail-outline"
                size={18}
                color={emailFocus ? '#223E86' : '#9ca3af'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.floatingLabel, isPasswordActive && styles.floatingLabelActive]}>
              Password
            </Text>
            <View style={[styles.inputBox, passwordFocus && styles.inputBoxFocused]}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={passwordFocus ? '#223E86' : '#9ca3af'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember + Forgot */}
          <View style={styles.rowBetween}>
            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setRemember(!remember)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
                {remember && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={() => handleLogin(email, password)}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Log In</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" style={styles.buttonIcon} />
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or continue with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
              <Image source={{ uri: GOOGLE_LOGO }} style={styles.socialLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
              <Image source={{ uri: FACEBOOK_LOGO }} style={styles.socialLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
              <Image source={require('../../../assets/apple_logo.png')} style={styles.socialLogo} />
            </TouchableOpacity>
          </View>

          {/* Bottom Text */}
          <Text style={styles.bottomText}>
            Don't have an account?{' '}
            <Text style={styles.register} onPress={() => navigation.navigate('Signup')}>
              Register Now
            </Text>
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223E86',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 36,
    alignItems: 'flex-start',
  },
  logo: {
    width: 180,
    height: 64,
    marginBottom: 0,
    marginLeft: -40,
  },
  headerText: {
    color: '#d0d8f5',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
  },
  card: {
    flex: 1,
    backgroundColor: '#F4F5FA',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 48,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E4EE',
    borderRadius: 30,
    padding: 5,
    marginBottom: 28,
  },
  activeTab: {
    flex: 1,
    backgroundColor: '#223E86',
    paddingVertical: 11,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#223E86',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  inactiveTab: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
  },
  activeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  inactiveText: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 14,
  },
  inputWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  floatingLabel: {
    position: 'absolute',
    left: 48,
    top: 17,
    fontSize: 14,
    color: '#9ca3af',
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  floatingLabelActive: {
    top: -9,
    left: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#223E86',
    backgroundColor: '#F4F5FA',
    paddingHorizontal: 4,
    zIndex: 2,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    height: 54,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  inputBoxFocused: {
    borderColor: '#223E86',
    shadowColor: '#223E86',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1f2937',
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    marginBottom: 24,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#223E86',
    borderColor: '#223E86',
  },
  rememberText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 13,
    color: '#223E86',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#223E86',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#223E86',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  orText: {
    marginHorizontal: 12,
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 18,
  },
  socialBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  socialLogo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '400',
  },
  register: {
    fontWeight: '700',
    color: '#223E86',
  },
});

export default LoginScreen;