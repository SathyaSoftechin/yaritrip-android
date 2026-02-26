import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "../styles/ProfileStyles";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* HEADER */}
        <Text style={styles.headerTitle}>My Profile</Text>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Image
            source={require("../assets/profile.jpg")}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Ravi Kumar</Text>
            <Text style={styles.profileEmail}>ravikumar@gmail.com</Text>
          </View>
        </View>
         {/* OPTIONS CARD */}
        <View style={styles.menuContainer}>

          {/* PERSONAL INFO */}
          <TouchableOpacity style={styles.menuItemActive}>
            <View style={styles.menuLeft}>
              <View style={styles.iconCircleBlue}>
                <Ionicons name="person" size={18} color="#2F6BFF" />
              </View>
              <Text style={styles.menuTextActive}>Personal Information</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#2F6BFF" />
          </TouchableOpacity>

          {/* BOOKINGS */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconCircleOrange}>
                <Ionicons name="calendar" size={18} color="#FF6B00" />
              </View>
              <Text style={styles.menuText}>My Booking’s</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>


          {/* LIKES */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconCirclePink}>
                <Ionicons name="heart" size={18} color="#FF2D55" />
              </View>
              <Text style={styles.menuText}>Likes</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>
          {/* PRIVACY */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconCircleGreen}>
                <Ionicons name="shield-checkmark" size={18} color="#34C759" />
              </View>
              <Text style={styles.menuText}>Privacy and Policy</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>
{/* LANGUAGE */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconCircleOrange}>
                <MaterialIcons name="language" size={18} color="#FF7A00" />
              </View>
              <Text style={styles.menuText}>Preferred language</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>


          {/* TERMS */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconCirclePurple}>
                <FontAwesome5 name="file-contract" size={16} color="#8E44AD" />
              </View>
              <Text style={styles.menuText}>Terms and Conditions</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>

        </View>

        {/* LOGOUT */}
        <TouchableOpacity
  style={styles.logoutButton}
  onPress={() => navigation.replace("Login")}
>
  <Text style={styles.logoutText}>Log Out</Text>
  <Ionicons name="log-out-outline" size={20} color="red" />
</TouchableOpacity>

      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View style={styles.navCircle}>
              <Ionicons name="home" size={22} color="#777" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Packages")}>
            <View style={styles.navCircle}>
              <Ionicons name="briefcase" size={22} color="#777" />
            </View>
          </TouchableOpacity>

          {/* ACTIVE PROFILE */}
          <TouchableOpacity>
            <View style={styles.navCircleActive}>
              <Ionicons name="person-circle" size={22} color="#2F6BFF" />
            </View>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
};

export default ProfileScreen;
