import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { X, Search, MapPin } from 'lucide-react-native';
import colors from '../../../theme/colors';
import { CITY_IMAGES } from '../services/cityService';

const CityPickerModal = ({ visible, cities, onSelect, onClose, title }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return cities;
    return cities.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, cities]);

  const handleSelect = (city) => {
    setQuery('');
    onSelect(city);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={() => {
        setQuery('');
        onClose();
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                setQuery('');
                onClose();
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchRow}>
            <Search size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search city..."
              placeholderTextColor={colors.textMuted}
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
          </View>

          {/* City List */}
          <FlatList
            data={filtered}
            keyExtractor={item => item.id?.toString()}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const imageUrl = CITY_IMAGES[item.name];
              return (
                <TouchableOpacity
                  style={styles.cityRow}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.cityImage} />
                  ) : (
                    <View style={styles.cityImageFallback}>
                      <MapPin size={16} color={colors.primary} />
                    </View>
                  )}
                  <View style={styles.cityInfo}>
                    <Text style={styles.cityName}>{item.name}</Text>
                    {item.code && (
                      <Text style={styles.cityCode}>{item.code}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No cities found.</Text>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '80%',
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    padding: 0,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cityImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  cityImageFallback: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  cityCode: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: 24,
    fontSize: 14,
  },
});

export default CityPickerModal;
