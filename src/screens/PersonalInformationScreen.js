import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/PersonalInformationStyles";

const PersonalInformationScreen = ({ navigation }) => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <View style={styles.screen}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <View style={{ width: 24 }} />

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        <View style={styles.card}>

          <Text style={styles.title}>Personal Information</Text>


          {/* PROFILE IMAGE */}
          <View style={styles.profileSection}>

            <Image
              source={require("../assets/profile.jpg")}
              style={styles.profileImage}
            />

            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={14} color="#fff" />
            </TouchableOpacity>

          </View>


          {/* NAME */}
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} />


          {/* EMAIL */}
          <Text style={styles.label}>E-mail ID</Text>
          <TextInput style={styles.input} />


          {/* MOBILE */}
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />


          {/* PASSWORD */}
          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordBox}>

            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!passwordVisible}
            />

            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>

          </View>


          {/* CONFIRM PASSWORD */}
          <Text style={styles.label}>Confirm Password</Text>

          <View style={styles.passwordBox}>

            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!confirmVisible}
            />

            <TouchableOpacity
              onPress={() => setConfirmVisible(!confirmVisible)}
            >
              <Ionicons
                name={confirmVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>

          </View>


          {/* SAVE BUTTON */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
};

export default PersonalInformationScreen;