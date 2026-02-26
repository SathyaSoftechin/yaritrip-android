import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles/PackagesStyles';

const packages = [1,2,3,4,5,6];

const PackagesScreen = ({ navigation }) => {

const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CardDetails")}
    >

      <Image
        source={require('../assets/maldives.jpg')}
        style={styles.cardImage}
      />

      <View style={styles.exclusiveBadge}>
        <Text style={styles.exclusiveText}>+ Exclusive</Text>
      </View>

      <View style={styles.heartIcon}>
        <Ionicons name="heart" size={16} color="red" />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.packageTitle}>Maldives Paradise</Text>

        <Text style={styles.location}>Maldives • 5N/6D</Text>

        <Text style={styles.rating}>4.9 (1284 reviews)</Text>

        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="airplane" size={16} />
          <MaterialCommunityIcons name="bed" size={16} />
          <MaterialCommunityIcons name="silverware-fork-knife" size={16} />
          <MaterialCommunityIcons name="wifi" size={16} />
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹89,999</Text>
          <Text style={styles.oldPrice}>₹1,49,999</Text>
        </View>

        <Text style={styles.perPerson}>per person</Text>
      </View>

    </TouchableOpacity>
  );

  return (

<View style={styles.screen}>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.scrollPadding}
      >

        {/* HEADER */}
        <View style={styles.packageHeader}>
          <Text style={styles.packageTitleTop}>All Package’s</Text>
        </View>


        {/* SEARCH BAR */}
        <View style={styles.searchRow}>

          <TextInput
            placeholder="Search"
            style={styles.searchInput}
          />

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#000" />
          </TouchableOpacity>

        </View>


        {/* PACKAGE GRID */}
        <FlatList
          data={packages}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />

      </ScrollView>


      {/* FIXED BOTTOM NAVIGATION */}
      <View style={styles.bottomNavWrapper}>

        <View style={styles.bottomNav}>

          {/* HOME */}
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate("Home")}
    >
      <View style={styles.iconCircle}>
        <Ionicons name="home" size={22} color="#777" />
      </View>
    </TouchableOpacity>

               {/* PACKAGES (ACTIVE) */}
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate("Packages")}
    >
      <View style={styles.iconCircleActive}>
        <Ionicons name="briefcase" size={22} color="#fff" />
      </View>
    </TouchableOpacity>
 {/* PROFILE */}
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate("Profile")}
    >
      <View style={styles.iconCircle}>
        <Ionicons name="person-circle-outline" size={22} color="#777" />
      </View>
    </TouchableOpacity>

        </View>

      </View>

    </View>
  );
};

export default PackagesScreen;