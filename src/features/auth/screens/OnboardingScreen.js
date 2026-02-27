import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* IMAGE GRID */}
      <View style={styles.imageWrapper}>
        <Image source={require('../../../assets/onb1.jpg')} style={styles.leftLarge} />

        <View style={styles.middleColumn}>
          <Image source={require('../../../assets/onb3.jpg')} style={styles.middleTop} />
          <Image source={require('../../../assets/onb34.jpg')} style={styles.middleBottom} />
        </View>

        <View style={styles.rightColumn}>
          <Image source={require('../../../assets/onb5.jpg')} style={styles.rightTop} />
          <Image source={require('../../../assets/onb3.jpg')} style={styles.rightBottom} />
        </View>
      </View>

      {/* BOTTOM CONTENT */}
      <View style={styles.bottomCard}>
        <Text style={styles.title}>Curated Journeys</Text>

        <Text style={styles.subtitle}>
          Handpicked destinations crafted to match your travel taste.{'\n'}
          Every trip designed for comfort, style, and ease.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <View style={styles.indicatorRow}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
        </View>

        <Image
          source={require('../../../assets/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  },
  leftLarge: {
    width: width * 0.34,
    height: height * 0.47,
    borderRadius: 1,
  },
  middleColumn: {
    justifyContent: 'space-between',
  },
  middleTop: {
    width: width * 0.27,
    height: height * 0.18,
    borderRadius: 2,
  },
  middleBottom: {
    width: width * 0.27,
    height: height * 0.28,
    borderRadius: 2,
  },
  rightColumn: {
    justifyContent: 'space-between',
  },
  rightTop: {
    width: width * 0.37,
    height: height * 0.28,
    borderRadius: 2,
  },
  rightBottom: {
    width: width * 0.37,
    height: height * 0.18,
    borderRadius: 2,
  },
  bottomCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1f2937',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#223E86',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#223E86',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  activeDot: {
    width: 78,
    height: 9,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    marginRight: 6,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  logo: {
    width: 130,
    height: 60,
  },
});

export default OnboardingScreen;