import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, User, Phone, ShieldCheck } from 'lucide-react-native';
import useAuth from '../hooks/useAuth';
import FloatingInput from '../components/FloatingInput';
import TabToggle from '../components/TabToggle';
import PrimaryButton from '../../../components/PrimaryButton';
import OrDivider from '../components/OrDivider';
import SocialButtons from '../components/SocialButtons';
import colors from '../../../theme/colors';

const { width } = Dimensions.get('window');

const AuthScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('signup');
  const slideAnim = useRef(new Animated.Value(0)).current;

  // ── Login state ──────────────────────────────────────────────────────────
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // ── Signup state ─────────────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [signupEmailFocus, setSignupEmailFocus] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);
  const [signupPasswordFocus, setSignupPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const { loading, handleLogin, handleRegister } = useAuth(navigation);

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    Animated.spring(slideAnim, {
      toValue: tab === 'login' ? 1 : 0,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start();
    setActiveTab(tab);
  };

  const panelTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  const loginHeaderOpacity = slideAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const signupHeaderOpacity = slideAnim.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerTextContainer}>
          <Animated.Text style={[styles.headerText, { opacity: loginHeaderOpacity }]}>
            Go ahead and complete{'\n'}your account and setup
          </Animated.Text>
          <Animated.Text
            style={[styles.headerText, styles.headerTextOverlay, { opacity: signupHeaderOpacity }]}
          >
            Signup now to access{'\n'}your personal account
          </Animated.Text>
        </View>
      </View>

      {/* ── CARD ───────────────────────────────────────────────────────── */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <TabToggle activeTab={activeTab} onTabChange={switchTab} />

          <Animated.View
            style={[styles.slidingRow, { transform: [{ translateX: panelTranslateX }] }]}
          >


            {/* ── SIGNUP PANEL ── */}
            <ScrollView
              style={styles.panel}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            >
              <FloatingInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
                isFocused={nameFocus}
                IconComponent={User}
              />
              <FloatingInput
                label="E-mail ID"
                value={signupEmail}
                onChangeText={setSignupEmail}
                onFocus={() => setSignupEmailFocus(true)}
                onBlur={() => setSignupEmailFocus(false)}
                isFocused={signupEmailFocus}
                keyboardType="email-address"
                IconComponent={Mail}
              />
              <FloatingInput
                label="Mobile Number"
                value={mobile}
                onChangeText={setMobile}
                onFocus={() => setMobileFocus(true)}
                onBlur={() => setMobileFocus(false)}
                isFocused={mobileFocus}
                keyboardType="phone-pad"
                IconComponent={Phone}
              />
              <FloatingInput
                label="Password"
                value={signupPassword}
                onChangeText={setSignupPassword}
                onFocus={() => setSignupPasswordFocus(true)}
                onBlur={() => setSignupPasswordFocus(false)}
                isFocused={signupPasswordFocus}
                secureTextEntry={!showSignupPassword}
                IconComponent={Lock}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowSignupPassword(!showSignupPassword)}
                    style={styles.eyeBtn}
                  >
                    {showSignupPassword
                      ? <Eye size={20} color={colors.textMuted} />
                      : <EyeOff size={20} color={colors.textMuted} />}
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
                IconComponent={ShieldCheck}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeBtn}
                  >
                    {showConfirmPassword
                      ? <Eye size={20} color={colors.textMuted} />
                      : <EyeOff size={20} color={colors.textMuted} />}
                  </TouchableOpacity>
                }
              />

              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAgree(!agree)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
                  {agree && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  Agree <Text style={styles.termsLink}>Terms And Conditions.</Text>
                </Text>
              </TouchableOpacity>

              <PrimaryButton
                label="Signup"
                onPress={() =>
                  handleRegister({
                    name,
                    email: signupEmail,
                    password: signupPassword,
                    confirmPassword,
                    agree,
                  })
                }
                loading={loading}
              />
              <OrDivider />
              <SocialButtons />
              <Text style={styles.bottomText}>
                Already have an account?{' '}
                <Text style={styles.linkText} onPress={() => switchTab('login')}>Log In</Text>
              </Text>
              <View style={styles.panelBottom} />
            </ScrollView>

                                    {/* ── LOGIN PANEL ── */}
            <ScrollView
                style={styles.panel}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
            >
              <FloatingInput
                label="E-mail ID / Mobile number"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                isFocused={emailFocus}
                keyboardType="email-address"
                IconComponent={Mail}
              />
              <FloatingInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                isFocused={passwordFocus}
                secureTextEntry={!showPassword}
                IconComponent={Lock}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                  >
                    {showPassword
                      ? <Eye size={20} color={colors.textMuted} />
                      : <EyeOff size={20} color={colors.textMuted} />}
                  </TouchableOpacity>
                }
              />

              <View style={styles.rowBetween}>
                <TouchableOpacity
                  style={styles.rememberRow}
                  onPress={() => setRemember(!remember)}
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

              <PrimaryButton
                label="Log In"
                onPress={() => handleLogin(email, password)}
                loading={loading}
              />
              <OrDivider />
              <SocialButtons />
              <Text style={styles.bottomText}>
                Don't have an account?{' '}
                <Text style={styles.linkText} onPress={() => switchTab('signup')}>Register Now</Text>
              </Text>
              <View style={styles.panelBottom} />
            </ScrollView>





          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.primary },
  header: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 28,
  },
  logo: {
    width: 180,
    height: 56,
    marginLeft: -40,
    marginBottom: 6,
  },
  headerTextContainer: { height: 68 },
  headerText: {
    color: colors.primaryLight,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 34,
  },
  headerTextOverlay: {
    position: 'absolute',
    top: 0,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 28,
    overflow: 'hidden',
  },
  slidingRow: {
    flexDirection: 'row',
    width: width * 2,
    flex: 1,
  },
  panel: {
    width: width,
    paddingHorizontal: 28,
    paddingTop: 18
  },
  panelBottom: { height: 48 },
  eyeBtn: { padding: 4 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: { color: colors.white, fontSize: 11, fontWeight: '700' },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 4,
  },
  termsText: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  termsLink: { color: colors.primary, fontWeight: '600' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  rememberText: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  forgotText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  bottomText: { textAlign: 'center', fontSize: 14, color: colors.textSecondary },
  linkText: { fontWeight: '700', color: colors.primary },
});

export default AuthScreen;
