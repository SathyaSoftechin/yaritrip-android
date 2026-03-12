import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BOT_AVATAR = require('../../../assets/maya_avatar.png');

const FloatingChatButton = ({ onPress }) => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2F80ED', '#FF7A00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="What’s your Plan today"
              placeholderTextColor="#7A7A7A"
              editable={false}
              style={styles.input}
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image source={BOT_AVATAR} style={styles.avatar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',

    right: 16,
    bottom: 100,

    zIndex: 100,
    elevation: 20,
  },

  gradientBorder: {
    borderRadius: 30,
    padding: 2,
  },

  inputContainer: {
    backgroundColor: '#E9E9E9',
    borderRadius: 30,

    paddingVertical: 2,
    paddingHorizontal: 25,

    width: 230,
  },

  input: {
    fontSize: 12,
    color: '#333',
  },

  avatarWrapper: {
    position: 'absolute',

    right: 8,
    top: -46,

    padding: 0,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 1,

  },
});

export default FloatingChatButton;