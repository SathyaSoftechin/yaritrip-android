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

// ── Reusable floating-label input ────────────────────────────────────────────
const FloatingInput = ({
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  isFocused,
  keyboardType = 'default',
  secureTextEntry = false,
  icon,
  rightElement,
}) => {
  const isActive = isFocused || value.length > 0;

  return (
    <View style={styles.inputWrapper}>
      <Text style={[styles.floatingLabel, isActive && styles.floatingLabelActive]}>
        {label}
      </Text>
      <View style={[styles.inputBox, isFocused && styles.inputBoxFocused]}>
        <Ionicons
          name={icon}
          size={18}
          color={isFocused ? '#223E86' : '#9ca3af'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {rightElement}
      </View>
    </View>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const SignupScreen = ({ navigation }) => {
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const { loading, handleRegister } = useAuth(navigation);

  const onSubmit = () =>
    handleRegister({ name, email, password, confirmPassword, agree });

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
          <Text style={styles.headerText}>Create your account{'\n'}and get started</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <View style={styles.activeTab}>
              <Text style={styles.activeText}>Sign Up</Text>
            </View>
            <TouchableOpacity
              style={styles.inactiveTab}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
            >
              <Text style={styles.inactiveText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <FloatingInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            isFocused={nameFocus}
            icon="person-outline"
          />

          <FloatingInput
            label="E-mail ID"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            isFocused={emailFocus}
            keyboardType="email-address"
            icon="mail-outline"
          />

          <FloatingInput
            label="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            onFocus={() => setMobileFocus(true)}
            onBlur={() => setMobileFocus(false)}
            isFocused={mobileFocus}
            keyboardType="phone-pad"
            icon="call-outline"
          />

          <FloatingInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            isFocused={passwordFocus}
            secureTextEntry={!showPassword}
            icon="lock-closed-outline"
            rightElement={
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            }
          />

          <FloatingInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={() => setConfirmPasswordFocus(false)}
            isFocused={confirmPasswordFocus}
            secureTextEntry={!showConfirmPassword}
            icon="shield-checkmark-outline"
            rightElement={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            }
          />

          {/* Terms */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgree(!agree)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
              {agree && <Ionicons name="checkmark" size={12} color="#fff" />}
            </View>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms & Conditions</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={onSubmit}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Create Account</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" style={styles.buttonIcon} />
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or sign up with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
              <Image source={require('../../../assets/google_logo.png')} style={styles.socialLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
              <Image source={require('../../../assets/facebook_logo.png')} style={styles.socialLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
              <Image source={require('../../../assets/apple_logo.png')} style={styles.socialLogo} />
            </TouchableOpacity>
          </View>

          {/* Bottom Text */}
          <Text style={styles.bottomText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              Log In
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    marginRight: 10,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#223E86',
    borderColor: '#223E86',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
  },
  termsLink: {
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
    marginTop: 22,
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
    marginVertical: 20,
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
  },
  loginLink: {
    fontWeight: '700',
    color: '#223E86',
  },
});

export default SignupScreen;