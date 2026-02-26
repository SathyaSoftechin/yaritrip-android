// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import { authAPI } from '../services/api';
// import { useAuth } from '../hooks/AuthContext';

// import styles from '../styles/LoginStyles';

// const LoginScreen = ({ navigation }) => {

//   const { login } = useAuth();

//   const [remember, setRemember] = useState(false);
//   const [emailOrMobile, setEmailOrMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [emailFocus, setEmailFocus] = useState(false);
//   const [passwordFocus, setPasswordFocus] = useState(false);

//   const handleLogin = async () => {

//     if (!emailOrMobile.trim()) {
//       Alert.alert('Error', 'Please enter email or mobile');
//       return;
//     }

//     if (!password.trim()) {
//       Alert.alert('Error', 'Please enter password');
//       return;
//     }

//     setLoading(true);

//     try {

//       const payload = {
//         email: emailOrMobile.trim(),
//         password,
//       };

//       const { ok, data } = await authAPI.login(payload);

//       if (ok && data.token) {
//         await login(data.token, data.user || null);
//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid credentials');
//       }

//     } catch (error) {
//       Alert.alert(
//         'Server Error',
//         'Unable to connect to backend server'
//       );
//     }

//     setLoading(false);
//   };

//   return (

//     <SafeAreaView style={styles.container}>

//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//       >

//         {/* Header */}

//         <View style={styles.header}>
//           <Text style={styles.headerText}>
//             Go ahead and complete{'\n'}your account and setup
//           </Text>
//         </View>


//         {/* Card */}

//         <View style={styles.card}>

//           {/* Toggle */}

//           <View style={styles.toggleContainer}>

//             <TouchableOpacity
//               style={styles.inactiveTab}
//               onPress={() => navigation.navigate('Signup')}
//             >
//               <Text style={styles.inactiveText}>Sign Up</Text>
//             </TouchableOpacity>

//             <View style={styles.activeTab}>
//               <Text style={styles.activeText}>Log In</Text>
//             </View>

//           </View>


//           {/* Email / Mobile */}

//           <View style={styles.inputContainer}>

//             <Text
//               style={[
//                 styles.floatingLabel,
//                 (emailFocus || emailOrMobile) && styles.floatingLabelActive
//               ]}
//             >
//               Email / Mobile Number
//             </Text>

//             <TextInput
//               style={styles.input}
//               value={emailOrMobile}
//               onChangeText={setEmailOrMobile}
//               onFocus={() => setEmailFocus(true)}
//               onBlur={() => setEmailFocus(false)}
//               keyboardType="email-address"
//             />

//           </View>


//           {/* Password */}

//           <View style={styles.inputContainer}>

//             <Text
//               style={[
//                 styles.floatingLabel,
//                 (passwordFocus || password) && styles.floatingLabelActive
//               ]}
//             >
//               Password
//             </Text>

//             <TextInput
//               style={styles.input}
//               secureTextEntry
//               value={password}
//               onChangeText={setPassword}
//               onFocus={() => setPasswordFocus(true)}
//               onBlur={() => setPasswordFocus(false)}
//             />

//           </View>


//           {/* Remember + Forgot */}

//           <View style={styles.rowBetween}>

//             <View style={styles.rememberRow}>

//               <TouchableOpacity
//                 style={styles.checkbox}
//                 onPress={() => setRemember(!remember)}
//               >
//                 {remember && <View style={styles.checked} />}
//               </TouchableOpacity>

//               <Text style={styles.rememberText}>
//                 Remember me
//               </Text>

//             </View>

//             <Text style={styles.forgotText}>
//               Forgot Password?
//             </Text>

//           </View>


//           {/* Login Button */}

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleLogin}
//             disabled={loading}
//           >

//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Log In</Text>
//             )}

//           </TouchableOpacity>


//           {/* Divider */}

//           <View style={styles.orRow}>

//             <View style={styles.line} />

//             <Text style={styles.orText}>OR</Text>

//             <View style={styles.line} />

//           </View>


//           {/* Social Login */}

//           <View style={styles.socialRow}>

//             <TouchableOpacity style={styles.socialBox}>
//               <AntDesign name="google" size={22} color="#DB4437" />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.socialBox}>
//               <FontAwesome name="facebook" size={22} color="#1877F2" />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.socialBox}>
//               <FontAwesome name="apple" size={22} color="#000" />
//             </TouchableOpacity>

//           </View>


//           {/* Register */}

//           <Text style={styles.bottomText}>
//             Don't have account?{' '}
//             <Text
//               style={styles.register}
//               onPress={() => navigation.navigate('Signup')}
//             >
//               Register Now
//             </Text>
//           </Text>

//         </View>

//       </ScrollView>

//     </SafeAreaView>

//   );
// };

// export default LoginScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../styles/LoginStyles';

const LoginScreen = ({ navigation }) => {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Floating label focus states
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter email');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter password');
      return;
    }

    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Go ahead and complete{'\n'}your account and setup
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={styles.inactiveTab}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.inactiveText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.activeTab}>
              <Text style={styles.activeText}>Log In</Text>
            </View>
          </View>

          {/* ===== Floating Email ===== */}
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.floatingLabel,
                (emailFocus || email) && styles.floatingLabelActive,
              ]}
            >
              E-mail ID / Mobile number
            </Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </View>

          {/* ===== Floating Password ===== */}
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
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
          </View>

          {/* Remember + Forgot */}
          <View style={styles.rowBetween}>
            <View style={styles.rememberRow}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setRemember(!remember)}
              >
                {remember && <View style={styles.checked} />}
              </TouchableOpacity>
              <Text style={styles.rememberText}>Remember me</Text>
            </View>

            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* Social Icons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBox}>
              <AntDesign name="google" size={22} color="#DB4437" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBox}>
              <FontAwesome name="facebook" size={22} color="#1877F2" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBox}>
              <FontAwesome name="apple" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Bottom Text */}
          <Text style={styles.bottomText}>
            Don't have account?{' '}
            <Text
              style={styles.register}
              onPress={() => navigation.navigate('Signup')}
            >
              Register Now
            </Text>
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;