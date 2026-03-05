import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
} from 'lucide-react-native';
import AuthInput from '../components/AuthInput';
import AuthToggle from '../components/AuthToggle';
import SocialButtons from '../components/SocialButtons';
import useAuth from '../hooks/useAuth';

const { height } = Dimensions.get('window');

// ─── Login Form ───────────────────────────────────────────────────────────────
const LoginForm = ({ navigation, loading, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <>
      <AuthInput
        label="Email or Mobile Number"
        value={email}
        onChangeText={setEmail}
        icon={Mail}
        keyboardType="email-address"
      />

      <AuthInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        icon={Lock}
        secureTextEntry={!showPassword}
        rightIcon={showPassword ? Eye : EyeOff}
        onRightIconPress={() => setShowPassword(p => !p)}
      />

      <View style={styles.rowBetween}>
        <TouchableOpacity
          style={styles.rememberRow}
          onPress={() => setRemember(r => !r)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
            {remember && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, loading && styles.btnDisabled]}
        onPress={() => handleLogin(email, password)}
        activeOpacity={0.85}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#0F172A" />
        ) : (
          <>
            <Text style={styles.primaryBtnText}>Log In</Text>
            <ArrowRight size={18} color="#0F172A" strokeWidth={2.5} />
          </>
        )}
      </TouchableOpacity>

      <SocialButtons label="or continue with" />
    </>
  );
};

// ─── Signup Form ──────────────────────────────────────────────────────────────
const SignupForm = ({ navigation, loading, handleRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <>
      <AuthInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        icon={User}
        autoCapitalize="words"
      />

      <AuthInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        icon={Mail}
        keyboardType="email-address"
      />

      <AuthInput
        label="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        icon={Phone}
        keyboardType="phone-pad"
      />

      <AuthInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        icon={Lock}
        secureTextEntry={!showPassword}
        rightIcon={showPassword ? Eye : EyeOff}
        onRightIconPress={() => setShowPassword(p => !p)}
      />

      <AuthInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        icon={ShieldCheck}
        secureTextEntry={!showConfirm}
        rightIcon={showConfirm ? Eye : EyeOff}
        onRightIconPress={() => setShowConfirm(p => !p)}
      />

      <TouchableOpacity
        style={styles.termsRow}
        onPress={() => setAgree(a => !a)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
          {agree && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.termsText}>
          I agree to the{' '}
          <Text style={styles.termsLink}>Terms & Conditions</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.primaryBtn, loading && styles.btnDisabled]}
        onPress={() => handleRegister({ name, email, mobile, password, confirmPassword, agree })}
        activeOpacity={0.85}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#0F172A" />
        ) : (
          <>
            <Text style={styles.primaryBtnText}>Create Account</Text>
            <ArrowRight size={18} color="#0F172A" strokeWidth={2.5} />
          </>
        )}
      </TouchableOpacity>

      <SocialButtons label="or sign up with" />
    </>
  );
};

// ─── Main AuthScreen ──────────────────────────────────────────────────────────
const AuthScreen = ({ navigation }) => {
  const [mode, setMode] = useState('login');
  const { loading, handleLogin, handleRegister } = useAuth(navigation);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: newMode === 'login' ? 0 : -20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMode(newMode);
      slideAnim.setValue(newMode === 'login' ? 20 : -20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          speed: 16,
          bounciness: 4,
        }),
      ]).start();
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#080E1E" />

      {/* Background decoration */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <MapPin size={22} color="#C9A84C" fill="#C9A84C" strokeWidth={1} />
              <Text style={styles.logoText}>YariTrip</Text>
            </View>

            <View style={styles.taglineRow}>
              <Sparkles size={14} color="#C9A84C" />
              <Text style={styles.tagline}>Your next adventure awaits</Text>
            </View>

            <Text style={styles.headline}>
              {mode === 'login' ? 'Welcome\nback.' : 'Let\'s get\nyou started.'}
            </Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <AuthToggle activeMode={mode} onToggle={switchMode} />

            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {mode === 'login' ? (
                <LoginForm
                  navigation={navigation}
                  loading={loading}
                  handleLogin={handleLogin}
                />
              ) : (
                <SignupForm
                  navigation={navigation}
                  loading={loading}
                  handleRegister={handleRegister}
                />
              )}
            </Animated.View>

            <Text style={styles.switchText}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <Text
                style={styles.switchLink}
                onPress={() => switchMode(mode === 'login' ? 'signup' : 'login')}
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#080E1E',
  },

  // Background decoration
  bgCircle1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(201,168,76,0.06)',
    top: -80,
    right: -80,
  },
  bgCircle2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(37,99,235,0.08)',
    bottom: height * 0.35,
    left: -60,
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  // Header
  header: {
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: 0.5,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 12,
    color: '#C9A84C',
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: 44,
    fontWeight: '800',
    color: '#F1F5F9',
    lineHeight: 50,
    letterSpacing: -1,
  },

  // Card
  card: {
    flex: 1,
    backgroundColor: '#111827',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 20,
  },

  // Primary Button
  primaryBtn: {
    backgroundColor: '#C9A84C',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  btnDisabled: {
    opacity: 0.65,
  },
  primaryBtnText: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  // Row between
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#C9A84C',
    borderColor: '#C9A84C',
  },
  checkmark: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
  },
  rememberText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 13,
    color: '#C9A84C',
    fontWeight: '600',
  },

  // Terms
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
    marginTop: 4,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
  },
  termsLink: {
    color: '#C9A84C',
    fontWeight: '600',
  },

  // Switch
  switchText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4A5568',
    marginTop: 20,
    fontWeight: '400',
  },
  switchLink: {
    fontWeight: '700',
    color: '#C9A84C',
  },
});

export default AuthScreen;
