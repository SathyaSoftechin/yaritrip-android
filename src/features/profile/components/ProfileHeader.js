import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Pencil } from 'lucide-react-native';
import colors from '../../../theme/colors';

const ProfileHeader = ({ user, onAvatarPress, showEdit = false }) => {
  const initial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <View style={styles.container}>
      {/* Decorative wave / blob shape top-right */}
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomRight} />

      <View style={styles.row}>
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          {user?.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          )}
          {showEdit && (
            <TouchableOpacity style={styles.editBadge} onPress={onAvatarPress} activeOpacity={0.8}>
              <Pencil size={11} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>

        {/* Name + email */}
        <View style={styles.info}>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.email}>{user?.email || ''}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  // Decorative blobs matching the screenshot's subtle grey shapes
  blobTopRight: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.background,
    top: -40,
    right: -30,
  },
  blobBottomRight: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.background,
    bottom: -20,
    right: 60,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2.5,
    borderColor: colors.primary,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: colors.primaryLight,
  },
  avatarInitial: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '700',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});

export default ProfileHeader;
