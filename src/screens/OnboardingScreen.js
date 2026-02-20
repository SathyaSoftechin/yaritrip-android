import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from '../styles/OnboardingStyles';
const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {/* IMAGE GRID */}
        <View style={styles.imageWrapper}>
          
          {/* Left Large */}
          <Image
          source={require('../assets/onb1.jpg')}
            style={styles.leftLarge}
          />

          {/* Middle Column */}
          <View style={styles.middleColumn}>
            <Image
              source={require('../assets/onb3.jpg')}
              style={styles.middleTop}
            />
            <Image
              source={require('../assets/onb34.jpg')}
              style={styles.middleBottom}
            />
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <Image
              source={require('../assets/onb5.jpg')}
              style={styles.rightTop}
            />
            <Image
              source={require('../assets/onb3.jpg')}
              style={styles.rightBottom}
            />
          </View>
        </View>

        {/* BOTTOM CONTENT */}
        <View style={styles.bottomCard}>
          <Text style={styles.title}>Curated Journeys</Text>

          <Text style={styles.subtitle}>
            Handpicked destinations crafted to match your travel taste.
            {'\n'}
            Every trip designed for comfort, style, and ease.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

          {/* Indicator */}
          <View style={styles.indicatorRow}>
            <View style={styles.activeDot} />
            <View style={styles.inactiveDot} />
          </View>

          {/* Logo */}
          <Image
            source={require('../assets/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
    </View>
  );
};

export default OnboardingScreen;
