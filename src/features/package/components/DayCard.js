import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../../../theme/colors';

const StarRating = ({ rating, max = 5 }) => (
  <View style={styles.stars}>
    {Array.from({ length: max }).map((_, i) => (
      <Text key={i} style={i < rating ? styles.starFilled : styles.starEmpty}>
        ★
      </Text>
    ))}
  </View>
);

const FlightRow = ({ flight }) => {
  if (!flight) return null;
  return (
    <View style={styles.flightCard}>
      <View style={styles.flightLeft}>
        <View style={styles.airlineBox}>
          <Text style={styles.airlineText}>{flight.airline}</Text>
          <Text style={styles.flightNo}>{flight.flightNo}</Text>
        </View>
        <Text style={styles.flightTime}>{flight.departTime}</Text>
        <Text style={styles.flightCode}>{flight.from}</Text>
      </View>
      <View style={styles.flightCenter}>
        <Text style={styles.flightDuration}>{flight.duration}</Text>
        <View style={styles.flightLine} />
      </View>
      <View style={styles.flightRight}>
        <Text style={styles.flightTime}>{flight.arriveTime}</Text>
        <Text style={styles.flightCode}>{flight.to}</Text>
      </View>
      <View style={styles.flightBaggage}>
        <Text style={styles.baggageText}>Cabin:{flight.cabin}</Text>
        <Text style={styles.baggageText}>Check-in:{flight.checkIn}</Text>
      </View>
    </View>
  );
};

const DayCard = ({ day, onChangeHotel, onRemoveHotel, onChangeTransport, onRemoveTransport, onAddActivity }) => {
  return (
    <View style={styles.daySection}>
      {/* Day header */}
      <View style={styles.dayHeader}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>Day {day.dayNumber}</Text>
        </View>
        <Text style={styles.dayTitle}>{day.label}</Text>
        <Text style={styles.dayIncluded}>
          {'  '}INCLUDED:{' '}
          <Text style={styles.dayIncludedValue}>{day.included}</Text>
        </Text>
      </View>

      {/* Flight */}
      <FlightRow flight={day.flight} />

      {/* Transport */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionLabel}>
          Transport {'  '}
          <Text style={styles.sectionSub}>• Airport to hotel in Maldives</Text>
        </Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => onChangeTransport(day.dayNumber)}>
            <Text style={styles.outlineBtnText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => onRemoveTransport(day.dayNumber)}>
            <Text style={styles.outlineBtnText}>Remove</Text>
          </TouchableOpacity>
        </View>
        {day.transport && (
          <View style={styles.transportCard}>
            <Image
              source={day.transport.imageUrl ? { uri: day.transport.imageUrl } : require('../../../assets/car_placeholder.png')}
              style={styles.transportImage}
              defaultSource={require('../../../assets/car_placeholder.png')}
            />
            <View style={styles.transportInfo}>
              <Text style={styles.transportName}>{day.transport.name}</Text>
              <Text style={styles.transportDesc}>{day.transport.description}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Hotel */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionLabel}>
          Hotel {'  '}
          <Text style={styles.sectionSub}>• {day.hotel?.nights}Nights In Abu Dhabi</Text>
        </Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => onChangeHotel(day.dayNumber)}>
            <Text style={styles.outlineBtnText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => onRemoveHotel(day.dayNumber)}>
            <Text style={styles.outlineBtnText}>Remove</Text>
          </TouchableOpacity>
        </View>
        {day.hotel && (
          <View style={styles.hotelCard}>
            <Image
              source={day.hotel.imageUrl ? { uri: day.hotel.imageUrl } : require('../../../assets/hotel_placeholder.png')}
              style={styles.hotelImage}
              defaultSource={require('../../../assets/hotel_placeholder.png')}
            />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName}>{day.hotel.name}</Text>
              <Text style={styles.hotelLocation}>{day.hotel.location}</Text>
              <Text style={styles.hotelMeta}>
                Includes{'  '}
                <Text style={styles.hotelMetaValue}>{day.hotel.includes}</Text>
              </Text>
              <Text style={styles.hotelMeta}>
                Room Type{'  '}
                <Text style={styles.hotelMetaValue}>{day.hotel.roomType}</Text>
              </Text>
              <StarRating rating={day.hotel.rating} />
            </View>
          </View>
        )}
      </View>

      {/* Add Activities CTA */}
      <TouchableOpacity style={styles.addActivityCard} onPress={() => onAddActivity(day.dayNumber)}>
        <View style={styles.addActivityLeft}>
          <Text style={styles.addActivityIcon}>💡</Text>
          <View>
            <Text style={styles.addActivityTitle}>Add Activities to your day</Text>
            <Text style={styles.addActivitySub}>
              Spend the day at hotel or add an activity, transport or meal to your day
            </Text>
          </View>
        </View>
        <Text style={styles.addActivityAction}>ADD TO DAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  daySection: {
    marginBottom: 4,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dayBadge: {
    backgroundColor: colors.badge,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  dayBadgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  dayTitle: {
    fontWeight: '600',
    fontSize: 13,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  dayIncluded: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  dayIncludedValue: {
    color: colors.textSecondary,
    fontWeight: '400',
  },
  flightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  flightLeft: {
    alignItems: 'flex-start',
    flex: 1,
  },
  flightCenter: {
    flex: 1.5,
    alignItems: 'center',
  },
  flightRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
  airlineBox: {
    marginBottom: 4,
  },
  airlineText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  flightNo: {
    fontSize: 11,
    color: colors.textMuted,
  },
  flightTime: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  flightCode: {
    fontSize: 11,
    color: colors.textMuted,
  },
  flightDuration: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  flightLine: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
  },
  flightBaggage: {
    flex: 1,
    alignItems: 'flex-end',
  },
  baggageText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  sectionBlock: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  sectionLabel: {
    fontWeight: '700',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  sectionSub: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  outlineBtnText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  transportCard: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    overflow: 'hidden',
    marginBottom: 8,
  },
  transportImage: {
    width: 80,
    height: 70,
    resizeMode: 'cover',
  },
  transportInfo: {
    flex: 1,
    padding: 10,
  },
  transportName: {
    fontWeight: '700',
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  transportDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  hotelCard: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    overflow: 'hidden',
    marginBottom: 8,
  },
  hotelImage: {
    width: 90,
    height: 110,
    resizeMode: 'cover',
  },
  hotelInfo: {
    flex: 1,
    padding: 10,
    gap: 2,
  },
  hotelName: {
    fontWeight: '700',
    fontSize: 13,
    color: colors.textPrimary,
  },
  hotelLocation: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  hotelMeta: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  hotelMetaValue: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  starFilled: {
    color: '#FACC15',
    fontSize: 13,
  },
  starEmpty: {
    color: colors.border,
    fontSize: 13,
  },
  addActivityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 14,
  },
  addActivityLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 10,
  },
  addActivityIcon: {
    fontSize: 20,
  },
  addActivityTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  addActivitySub: {
    fontSize: 11,
    color: colors.textSecondary,
    maxWidth: 200,
  },
  addActivityAction: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
});

export default DayCard;
