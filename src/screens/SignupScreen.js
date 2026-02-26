// import React, { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   View,
//   Image,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from '../styles/SignupStyles';
// import { authAPI } from '../services/api';
// import { useAuth } from '../hooks/AuthContext';

// const SignupScreen = ({ navigation }) => {

//   const { login } = useAuth();

//   const [isSignup, setIsSignup] = useState(true);
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [name, setName] = useState('');
//   const [nameFocus, setNameFocus] = useState(false);

//   const [email, setEmail] = useState('');
//   const [emailFocus, setEmailFocus] = useState(false);

//   const [mobile, setMobile] = useState('');
//   const [mobileFocus, setMobileFocus] = useState(false);

//   const [password, setPassword] = useState('');
//   const [passwordFocus, setPasswordFocus] = useState(false);

//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

//   const handleSignup = async () => {

//     if (!name.trim()) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     if (!email.trim()) {
//       Alert.alert('Error', 'Please enter your email');
//       return;
//     }

//     if (!password.trim()) {
//       Alert.alert('Error', 'Please enter a password');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (!agree) {
//       Alert.alert('Error', 'Please agree to Terms and Conditions');
//       return;
//     }

//     setLoading(true);

//     try {

//       const { ok, data } = await authAPI.register({
//         name: name.trim(),
//         email: email.trim(),
//         password,
//       });

//       if (ok) {

//         await AsyncStorage.setItem('token', data.token);

//         if (data.user) {
//           await AsyncStorage.setItem('user', JSON.stringify(data.user));
//         }

//         await login(data.token, data.user || null);

//         navigation.replace('Home');

//       } else {

//         Alert.alert(
//           'Registration Failed',
//           data.message || 'Something went wrong'
//         );

//       }

//     } catch (error) {

//       console.log('Signup error:', error);
//       Alert.alert('Error', 'Unable to connect to server');

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//       >

//         <Image
//           source={require('../assets/logo.jpg')}
//           style={styles.logo}
//           resizeMode="contain"
//         />

//         <View style={styles.topSection}>
//           <Text style={styles.title}>
//             Signup now to access{'\n'}your personal account
//           </Text>
//         </View>

//         <View style={styles.card}>

//           <View style={styles.toggleContainer}>

//             <TouchableOpacity
//               style={[styles.toggleButton, isSignup && styles.activeToggle]}
//               onPress={() => setIsSignup(true)}
//             >
//               <Text style={[styles.toggleText, isSignup && styles.activeText]}>
//                 Sign Up
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.toggleButton, !isSignup && styles.activeToggle]}
//               onPress={() => navigation.navigate('Login')}
//             >
//               <Text style={[styles.toggleText, !isSignup && styles.activeText]}>
//                 Log In
//               </Text>
//             </TouchableOpacity>

//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.floatingLabel,
//                 (nameFocus || name) && styles.floatingLabelActive,
//               ]}
//             >
//               Name
//             </Text>

//             <TextInput
//               style={styles.input}
//               value={name}
//               onChangeText={setName}
//               onFocus={() => setNameFocus(true)}
//               onBlur={() => setNameFocus(false)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.floatingLabel,
//                 (emailFocus || email) && styles.floatingLabelActive,
//               ]}
//             >
//               E-mail ID
//             </Text>

//             <TextInput
//               style={styles.input}
//               value={email}
//               onChangeText={setEmail}
//               onFocus={() => setEmailFocus(true)}
//               onBlur={() => setEmailFocus(false)}
//               keyboardType="email-address"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.floatingLabel,
//                 (mobileFocus || mobile) && styles.floatingLabelActive,
//               ]}
//             >
//               Mobile number
//             </Text>

//             <TextInput
//               style={styles.input}
//               value={mobile}
//               onChangeText={setMobile}
//               onFocus={() => setMobileFocus(true)}
//               onBlur={() => setMobileFocus(false)}
//               keyboardType="phone-pad"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.floatingLabel,
//                 (passwordFocus || password) && styles.floatingLabelActive,
//               ]}
//             >
//               Password
//             </Text>

//             <TextInput
//               style={styles.input}
//               value={password}
//               onChangeText={setPassword}
//               onFocus={() => setPasswordFocus(true)}
//               onBlur={() => setPasswordFocus(false)}
//               secureTextEntry
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.floatingLabel,
//                 (confirmPasswordFocus || confirmPassword) &&
//                   styles.floatingLabelActive,
//               ]}
//             >
//               Confirm Password
//             </Text>

//             <TextInput
//               style={styles.input}
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               onFocus={() => setConfirmPasswordFocus(true)}
//               onBlur={() => setConfirmPasswordFocus(false)}
//               secureTextEntry
//             />
//           </View>

//           <View style={styles.termsRow}>
//             <TouchableOpacity
//               style={styles.checkbox}
//               onPress={() => setAgree(!agree)}
//             >
//               {agree && <View style={styles.checked} />}
//             </TouchableOpacity>

//             <Text style={styles.termsText}>
//               Agree Terms And Conditions.
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, loading]}
//             onPress={handleSignup}
//             disabled={loading}
//           >
//             {loading
//               ? <ActivityIndicator color="#fff" />
//               : <Text style={styles.buttonText}>Sign Up</Text>
//             }
//           </TouchableOpacity>

//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default SignupScreen;

import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/SignupStyles';

const BASE_URL = 'http://10.0.2.2:8081';

const SignupScreen = ({ navigation }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  // Floating label states
  const [name, setName] = useState('');
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);

  const [mobile, setMobile] = useState('');
  const [mobileFocus, setMobileFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  // ── Register ───────────────────────────────────────────────────────────────
  const handleSignup = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!agree) {
      Alert.alert('Error', 'Please agree to Terms and Conditions');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        if (data.user) {
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
        }
        navigation.replace('Home');
      } else {
        Alert.alert('Registration Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('Signup error:', error);
      Alert.alert('Error', 'Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Top Section */}
        <View style={styles.topSection}>
          <Text style={styles.title}>
            Signup now to access{'\n'}your personal account
          </Text>
        </View>

        {/* White Card */}
        <View style={styles.card}>

          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isSignup && styles.activeToggle]}
              onPress={() => setIsSignup(true)}
            >
              <Text style={[styles.toggleText, isSignup && styles.activeText]}>
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleButton, !isSignup && styles.activeToggle]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.toggleText, !isSignup && styles.activeText]}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Name */}
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.floatingLabel,
                (nameFocus || name) && styles.floatingLabelActive,
              ]}
            >
              Name
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.floatingLabel,
                (emailFocus || email) && styles.floatingLabelActive,
              ]}
            >
              E-mail ID
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              keyboardType="email-address"
            />
          </View>

          {/* Mobile */}
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.floatingLabel,
                (mobileFocus || mobile) && styles.floatingLabelActive,
              ]}
            >
              Mobile number
            </Text>
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={setMobile}
              onFocus={() => setMobileFocus(true)}
              onBlur={() => setMobileFocus(false)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.floatingLabel,
                (passwordFocus || password) && styles.floatingLabelActive,
              ]}
            >
              Password
            </Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              secureTextEntry
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.floatingLabel,
                (confirmPasswordFocus || confirmPassword) &&
                  styles.floatingLabelActive,
              ]}
            >
              Confirm Password
            </Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setConfirmPasswordFocus(true)}
              onBlur={() => setConfirmPasswordFocus(false)}
              secureTextEntry
            />
          </View>

          {/* Terms */}
          <View style={styles.termsRow}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAgree(!agree)}
            >
              {agree && <View style={styles.checked} />}
            </TouchableOpacity>
            <Text style={styles.termsText}>Agree Terms And Conditions.</Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, loading ]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;