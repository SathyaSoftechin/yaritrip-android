import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/LoginStyles';

// ── Social Brand Logos (CDN) ──────────────────────────────────────────────────
const GOOGLE_LOGO  = 'https://www.google.com/favicon.ico';
const FACEBOOK_LOGO = 'https://www.facebook.com/images/fb_icon_325x325.png';
// ─────────────────────────────────────────────────────────────────────────────

const LoginScreen = ({ navigation }) => {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email or mobile number.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Please enter your password.');
      return;
    }
    navigation.replace('Home');
  };

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
            source={require('../assets/logo.png')}
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
          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Log In</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
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
<Image
  source={require('../assets/apple_logo.png')}
  style={styles.socialLogo}
/>            </TouchableOpacity>
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

export default LoginScreen;