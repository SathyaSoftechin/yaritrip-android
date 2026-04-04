import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Mountain, Palmtree, Sunrise, Sunset } from 'lucide-react-native';
import { useStays } from '../hooks/useStays';
import StayCard from './StayCard';
import SectionHeader from './SectionHeader';
import colors from '../../../theme/colors';

const REGION_LABELS = {
  NORTH: { label: 'North'},
  SOUTH: { label: 'South'},
  EAST:  { label: 'East'},
  WEST:  { label: 'West'},
};

const REGIONS = ['NORTH', 'SOUTH', 'EAST', 'WEST'];

const StaysSection = ({ onStayPress }) => {
  const [activeRegion, setActiveRegion] = useState('NORTH');
  const { stays, staysLoading, staysError } = useStays(activeRegion);

  return (
    <View>
      <SectionHeader title="Stays" />

      {/* Region Tabs */}
      <View style={styles.tabsRow}>
        {REGIONS.map((region) => {
          const isActive = region === activeRegion;
          const { label } = REGION_LABELS[region];
          return (
            <TouchableOpacity
              key={region}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveRegion(region)}
              activeOpacity={0.75}
            >

              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      {staysLoading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      )}
      {staysError && (
        <Text style={styles.errorText}>
          Failed to load stays. Please try again.
        </Text>
      )}
      {!staysLoading && !staysError && (
        <FlatList
          horizontal
          data={stays}
          keyExtractor={(item, index) =>
            item?.id ? `stay-${item.id}` : `stay-fallback-${index}`
          }
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <StayCard item={item} onPress={onStayPress} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No stays found for{' '}
              {activeRegion.charAt(0) + activeRegion.slice(1).toLowerCase()} India.
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 10,
    marginTop: 2,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#EEF4FF',
    borderWidth: 1,
    borderColor: '#D0DFFF',
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.white,
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 14,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default StaysSection;