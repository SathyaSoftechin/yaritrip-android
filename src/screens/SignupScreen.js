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
import styles from '../styles/SignupStyles';

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

  const handleSignup = () => {
    if (!name.trim()) return Alert.alert('Validation Error', 'Please enter your name.');
    if (!email.trim()) return Alert.alert('Validation Error', 'Please enter your email.');
    if (!mobile.trim()) return Alert.alert('Validation Error', 'Please enter your mobile number.');
    if (!password.trim()) return Alert.alert('Validation Error', 'Please enter a password.');
    if (password !== confirmPassword) return Alert.alert('Validation Error', 'Passwords do not match.');
    if (!agree) return Alert.alert('Validation Error', 'Please agree to Terms and Conditions.');
    navigation.replace('Home');
  };

  const FloatingInput = ({
    label, value, onChangeText, onFocus, onBlur, isFocused,
    keyboardType = 'default', secureTextEntry = false, icon,
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

          {/* Name */}
          <FloatingInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            isFocused={nameFocus}
            icon="person-outline"
          />

          {/* Email */}
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

          {/* Mobile */}
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

          {/* Password */}
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
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#9ca3af" />
              </TouchableOpacity>
            }
          />

          {/* Confirm Password */}
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
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeBtn}>
                <Ionicons name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#9ca3af" />
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
          <TouchableOpacity style={styles.button} onPress={handleSignup} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Create Account</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
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
    <Image
      source={require('../assets/google_logo.png')}
      style={styles.socialLogo}
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
    <Image
      source={require('../assets/facebook_logo.png')}
      style={styles.socialLogo}
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
    <Image
      source={require('../assets/apple_logo.png')}
      style={styles.socialLogo}
    />
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

export default SignupScreen;