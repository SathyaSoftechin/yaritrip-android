import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Pencil } from 'lucide-react-native';
import colors from '../theme/colors';
import { BASE_URL } from '../services/apiClient';

const ProfileHeader = ({ user, onAvatarPress, showEdit = false }) => {
  const initial = user?.name ? user.name[0].toUpperCase() : 'U';

const avatarUri = user?.profileImage
  ? user.profileImage.replace('http://localhost:8082', BASE_URL)
  : user?.avatarUrl || null;

  return (
    <View style={styles.container}>
      {/* Decorative blobs */}
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomRight} />

      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={showEdit ? onAvatarPress : undefined}
          style={styles.avatarWrapper}
        >
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatar}
              onError={() => {
                console.log('Image failed to load');
              }}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          )}

          {showEdit && (
            <View style={styles.editBadge}>
              <Pencil size={11} color={colors.white} />
            </View>
          )}
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.email}>{user?.email || ''}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

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

  // Decorative blobs
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