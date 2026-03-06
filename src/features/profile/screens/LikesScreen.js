import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ChevronLeft, HeartOff } from 'lucide-react-native';
import AttractionCard from '../../home/components/AttractionCard';
import { useLikedAttractions } from '../hooks/useProfile';
import colors from '../../../theme/colors';

const LikesScreen = ({ navigation }) => {
  const { data: likes = [], isLoading, isError, refetch } = useLikedAttractions();

  const renderItem = ({ item, index }) => (
    <View style={[
      styles.cardWrapper,
      index % 2 === 0 ? styles.cardLeft : styles.cardRight,
    ]}>
      <AttractionCard item={item} onPress={() => {}} />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <HeartOff size={52} color={colors.textMuted} strokeWidth={1.5} />
      <Text style={styles.emptyTitle}>No liked trips yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the heart on any package to save it here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Likes</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : isError ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Something went wrong.</Text>
          <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {likes.length > 0 && (
            <Text style={styles.countText}>
              {likes.length} saved trip{likes.length !== 1 ? 's' : ''}
            </Text>
          )}
          <FlatList
            data={likes}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={[
              styles.listContent,
              likes.length === 0 && styles.listContentEmpty,
            ]}
            columnWrapperStyle={likes.length > 0 ? styles.row : null}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  loader: { marginTop: 60 },
  countText: {
    fontSize: 13,
    color: colors.textMuted,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  listContent: {
    padding: 12,
    paddingBottom: 100,
  },
  listContentEmpty: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '48%',
  },
  cardLeft: { marginRight: 7 },
  cardRight: { marginLeft: 7 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: { color: colors.error, fontSize: 14, marginBottom: 12 },
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: { color: colors.white, fontWeight: '600' },
});

export default LikesScreen;
