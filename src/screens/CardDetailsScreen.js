// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
//   FlatList,
//   Animated,
//   Platform,
// } from 'react-native';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // ─── MOCK DATA ────────────────────────────────────────────────────────────────

// const HERO_IMAGES = [
//   { id: '1', uri: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800' },
//   { id: '2', uri: 'https://images.unsplash.com/photo-1540202404-a2f29cf7a6e4?w=800' },
//   { id: '3', uri: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800' },
// ];

// const ITINERARY_DAYS = [
//   {
//     id: 'day1',
//     dayLabel: 'Day 1',
//     destination: 'Maldives Paradise',
//     included: 'Flight, Hotel and Transport',
//     flight: {
//       airline: 'IndiGo',
//       flightNo: '6E-1485',
//       departure: '02:00',
//       arrival: '02:00',
//       duration: '2h 15m · Direct',
//       origin: 'DEL T3',
//       destination: 'HYB T3',
//       cabin: '7kgs',
//       checkIn: '7kgs',
//     },
//     transport: {
//       type: 'Airport to hotel in Maldives',
//       description: 'Private Transport',
//       detail: 'Enjoy comfortable transport from Abu Dhabi International Airport to hotels Abu Dhahyian island',
//     },
//     hotel: {
//       nights: '3Nights In Abu Dhabi',
//       name: 'Sharanam Greens Resort',
//       location: 'In Maldives beach Hotel',
//       includes: 'Breakfast',
//       roomType: 'Deluxe Room With Balcony',
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
//     },
//     hasActivities: true,
//   },
//   {
//     id: 'day2',
//     dayLabel: 'Day 2',
//     destination: 'Maldives Paradise',
//     included: 'Flight, Hotel and Transport',
//     transport: {
//       type: 'Airport to hotel in Maldives',
//       description: 'Private Transport',
//       detail: 'Enjoy comfortable transport from Abu Dhabi International Airport to hotels Abu Dhahyian island',
//     },
//     hotel: {
//       nights: '3Nights In Abu Dhabi',
//       name: 'Sharanam Greens Resort',
//       location: 'In Maldives beach Hotel',
//       includes: 'Breakfast',
//       roomType: 'Deluxe Room With Balcony',
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
//     },
//     hasActivities: true,
//   },
//   {
//     id: 'day3',
//     dayLabel: 'Day 3',
//     destination: 'Maldives Paradise',
//     included: 'Flight, Hotel and Transport',
//     hotel: {
//       nights: '3Nights In Abu Dhabi',
//       name: 'Sharanam Greens Resort',
//       location: 'In Maldives beach Hotel',
//       includes: 'Breakfast',
//       roomType: 'Deluxe Room With Balcony',
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
//     },
//     transport: {
//       type: 'Airport to hotel in Maldives',
//       description: 'Private Transport',
//       detail: 'Enjoy comfortable transport from Abu Dhabi International Airport to hotels Abu Dhahyian island',
//     },
//     flight: {
//       airline: 'IndiGo',
//       flightNo: '6E-1490',
//       departure: '02:00',
//       arrival: '02:00',
//       duration: '2h 15m · Direct',
//       origin: 'DEL T3',
//       destination: 'HYB T3',
//       cabin: '7kgs',
//       checkIn: '7kgs',
//     },
//     hasActivities: true,
//   },
// ];

// // ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// const StarRating = ({ rating = 4, max = 5 }) => (
//   <View style={styles.starsRow}>
//     {Array.from({ length: max }).map((_, i) => (
//       <Text key={i} style={[styles.star, i < rating ? styles.starFilled : styles.starEmpty]}>
//         ★
//       </Text>
//     ))}
//   </View>
// );

// const TagBadge = ({ label, variant = 'outline' }) => (
//   <View style={[styles.tag, variant === 'solid' ? styles.tagSolid : styles.tagOutline]}>
//     <Text style={[styles.tagText, variant === 'solid' ? styles.tagTextSolid : styles.tagTextOutline]}>
//       {label}
//     </Text>
//   </View>
// );

// const ActionButtons = ({ onChangePress, onRemovePress, showRemoveOnly = false }) => (
//   <View style={styles.actionRow}>
//     {!showRemoveOnly && (
//       <TouchableOpacity style={styles.btnChange} onPress={onChangePress} activeOpacity={0.75}>
//         <Text style={styles.btnChangeText}>Change</Text>
//       </TouchableOpacity>
//     )}
//     <TouchableOpacity style={styles.btnRemove} onPress={onRemovePress} activeOpacity={0.75}>
//       <Text style={styles.btnRemoveText}>Remove</Text>
//     </TouchableOpacity>
//   </View>
// );

// const SectionLabel = ({ label, color = '#E05A32' }) => (
//   <View style={[styles.sectionLabel, { backgroundColor: color }]}>
//     <Text style={styles.sectionLabelText}>{label}</Text>
//   </View>
// );

// const DividerLine = () => <View style={styles.divider} />;

// const FlightCard = ({ flight }) => (
//   <View style={styles.flightCard}>
//     <View style={styles.flightRow}>
//       <View style={styles.flightAirlineBox}>
//         <View style={styles.flightLogoPlaceholder}>
//           <Text style={styles.flightLogoText}>6E</Text>
//         </View>
//         <View>
//           <Text style={styles.flightAirlineName}>{flight.airline}</Text>
//           <Text style={styles.flightNo}>{flight.flightNo}</Text>
//         </View>
//       </View>

//       <View style={styles.flightTimeline}>
//         <Text style={styles.flightTime}>{flight.departure}</Text>
//         <View style={styles.flightLineContainer}>
//           <Text style={styles.flightOrigin}>{flight.origin}</Text>
//           <View style={styles.flightLine}>
//             <View style={styles.flightLineDot} />
//             <View style={styles.flightLineStem} />
//             <Text style={styles.flightDuration}>{flight.duration}</Text>
//             <View style={styles.flightLineStem} />
//             <View style={[styles.flightLineDot, styles.flightLineDotRight]} />
//           </View>
//           <Text style={styles.flightDest}>{flight.destination}</Text>
//         </View>
//         <Text style={styles.flightTime}>{flight.arrival}</Text>
//       </View>

//       <View style={styles.flightBaggageCol}>
//         <Text style={styles.baggageLabel}>Cabin:{flight.cabin}</Text>
//         <Text style={styles.baggageLabel}>Check-in:{flight.checkIn}</Text>
//       </View>
//     </View>
//   </View>
// );

// const TransportCard = ({ transport, onChange, onRemove }) => (
//   <View style={styles.sectionBlock}>
//     <View style={styles.sectionHeaderRow}>
//       <Text style={styles.sectionTitle}>Transport</Text>
//       <Text style={styles.sectionSubtitle}> · {transport.type}</Text>
//     </View>
//     <ActionButtons onChangePress={onChange} onRemovePress={onRemove} />
//     <View style={styles.card}>
//       <Image
//         source={{ uri: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300' }}
//         style={styles.transportImage}
//         resizeMode="cover"
//       />
//       <View style={styles.cardContent}>
//         <Text style={styles.cardTitle}>{transport.description}</Text>
//         <Text style={styles.cardDetail} numberOfLines={3}>
//           {transport.detail}
//         </Text>
//       </View>
//     </View>
//   </View>
// );

// const HotelCard = ({ hotel, onChange, onRemove }) => (
//   <View style={styles.sectionBlock}>
//     <View style={styles.sectionHeaderRow}>
//       <Text style={styles.sectionTitle}>Hotel</Text>
//       <Text style={styles.sectionSubtitle}> · {hotel.nights}</Text>
//     </View>
//     <ActionButtons onChangePress={onChange} onRemovePress={onRemove} />
//     <View style={styles.card}>
//       <Image source={{ uri: hotel.image }} style={styles.hotelImage} resizeMode="cover" />
//       <View style={styles.cardContent}>
//         <Text style={styles.cardTitle}>{hotel.name}</Text>
//         <Text style={styles.cardDetail}>{hotel.location}</Text>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Includes</Text>
//           <Text style={styles.infoValue}>{hotel.includes}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Room Type</Text>
//           <Text style={styles.infoValue}>{hotel.roomType}</Text>
//         </View>
//         <StarRating rating={hotel.rating} />
//       </View>
//     </View>
//   </View>
// );

// const AddActivitiesBanner = () => (
//   <View style={styles.activitiesBanner}>
//     <View style={styles.activitiesIconBox}>
//       <Text style={styles.activitiesIcon}>⚡</Text>
//     </View>
//     <View style={styles.activitiesTextBox}>
//       <Text style={styles.activitiesTitle}>Add Activities to your day</Text>
//       <Text style={styles.activitiesSubtitle}>
//         Spend the day at hotel or add an activity, transport or meal to your day
//       </Text>
//     </View>
//     <TouchableOpacity style={styles.addDayBtn} activeOpacity={0.85}>
//       <Text style={styles.addDayBtnText}>ADD TO DAY</Text>
//     </TouchableOpacity>
//   </View>
// );

// const DaySection = ({ day }) => (
//   <View style={styles.daySection}>
//     {/* Day header */}
//     <View style={styles.dayHeaderRow}>
//       <SectionLabel label={day.dayLabel} />
//       <Text style={styles.dayDestination}> {day.destination}</Text>
//       <View style={styles.includedPill}>
//         <Text style={styles.includedText}>INCLUDED: {day.included}</Text>
//       </View>
//     </View>

//     {/* Flight (if any) */}
//     {day.flight && <FlightCard flight={day.flight} />}

//     {/* Transport */}
//     {day.transport && (
//       <TransportCard
//         transport={day.transport}
//         onChange={() => {}}
//         onRemove={() => {}}
//       />
//     )}

//     {/* Hotel */}
//     {day.hotel && (
//       <HotelCard
//         hotel={day.hotel}
//         onChange={() => {}}
//         onRemove={() => {}}
//       />
//     )}

//     {/* Activities */}
//     {day.hasActivities && <AddActivitiesBanner />}

//     <DividerLine />
//   </View>
// );

// // ─── HERO CAROUSEL ────────────────────────────────────────────────────────────

// const HeroCarousel = ({ images }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const flatListRef = useRef(null);

//   const onScroll = (e) => {
//     const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
//     setActiveIndex(idx);
//   };

//   return (
//     <View style={styles.heroContainer}>
//       <FlatList
//         ref={flatListRef}
//         data={images}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={onScroll}
//         scrollEventThrottle={16}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item.uri }} style={styles.heroImage} resizeMode="cover" />
//         )}
//       />
//       {/* Dot indicators */}
//       <View style={styles.dotRow}>
//         {images.map((_, i) => (
//           <View key={i} style={[styles.dot, i === activeIndex ? styles.dotActive : styles.dotInactive]} />
//         ))}
//       </View>
//     </View>
//   );
// };

// // ─── MAIN SCREEN ─────────────────────────────────────────────────────────────

// const TripDetailsScreen = ({ navigation }) => {
//   const [guestCount, setGuestCount] = useState(2);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* ── Top Nav ── */}
//       <View style={styles.navBar}>
//         <TouchableOpacity style={styles.navBack} onPress={() => navigation?.goBack()} activeOpacity={0.7}>
//           <Text style={styles.navBackIcon}>←</Text>
//         </TouchableOpacity>
//         <View style={styles.navActions}>
//           <TouchableOpacity style={styles.navIconBtn}>
//             <Text style={styles.navIcon}>♡</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.navIconBtn}>
//             <Text style={styles.navIcon}>↗</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//         bounces={false}
//       >
//         {/* ── Package Title & Tags ── */}
//         <View style={styles.packageHeader}>
//           <Text style={styles.packageTitle}>Maldives Paradise</Text>
//           <View style={styles.tagsRow}>
//             <TagBadge label="Customizable" />
//             <TagBadge label="3N/4D" />
//             <TagBadge label="3N Abu Dhabi" variant="solid" />
//           </View>
//         </View>

//         {/* ── Hero Carousel ── */}
//         <HeroCarousel images={HERO_IMAGES} />

//         {/* ── Price Banner ── */}
//         <View style={styles.priceBanner}>
//           <View>
//             <Text style={styles.priceBannerTitle}>Maldives Paradise :</Text>
//             <Text style={styles.priceFrom}>Starting from</Text>
//             <View style={styles.priceRow}>
//               <Text style={styles.priceMain}>₹89,999</Text>
//               <Text style={styles.priceStrike}>₹1,99,999</Text>
//               <Text style={styles.perPerson}>per Person</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Description ── */}
//         <View style={styles.descBox}>
//           <Text style={styles.descText}>
//             Maldives Paradise is a haven of turquoise waters, soft white sands, and peaceful lagoons.
//             It's a place where nature, luxury, and serenity come{' '}
//             <Text style={styles.descHighlight}>together in perfect harmony.</Text>
//           </Text>
//         </View>

//         <DividerLine />

//         {/* ── Itinerary Days ── */}
//         {ITINERARY_DAYS.map((day) => (
//           <DaySection key={day.id} day={day} />
//         ))}
//       </ScrollView>

//       {/* ── Bottom Book Bar ── */}
//       <View style={styles.bookBar}>
//         <TouchableOpacity style={styles.bookBtn} activeOpacity={0.88}>
//           <Text style={styles.bookBtnText}>Book Now</Text>
//         </TouchableOpacity>
//         <View style={styles.guestSelector}>
//           <TouchableOpacity
//             onPress={() => setGuestCount((c) => Math.max(1, c - 1))}
//             style={styles.guestBtn}
//           >
//             <Text style={styles.guestBtnText}>−</Text>
//           </TouchableOpacity>
//           <Text style={styles.guestCount}>{guestCount}</Text>
//           <TouchableOpacity onPress={() => setGuestCount((c) => c + 1)} style={styles.guestBtn}>
//             <Text style={styles.guestBtnText}>+</Text>
//           </TouchableOpacity>
//           <Text style={styles.guestIcon}> 👤 ▾</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// // ─── STYLES ───────────────────────────────────────────────────────────────────

// const COLORS = {
//   primary: '#0057FF',
//   accent: '#E05A32',
//   accentLight: '#FFF3EF',
//   success: '#12B76A',
//   text: '#1A1A2E',
//   textMuted: '#6B7280',
//   textLight: '#9CA3AF',
//   border: '#E5E7EB',
//   bg: '#F8F9FC',
//   white: '#FFFFFF',
//   remove: '#EF4444',
//   change: '#374151',
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },

//   // Nav
//   navBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: COLORS.white,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   navBack: { padding: 4 },
//   navBackIcon: { fontSize: 22, color: COLORS.text },
//   navActions: { flexDirection: 'row', gap: 8 },
//   navIconBtn: { padding: 4 },
//   navIcon: { fontSize: 20, color: COLORS.text },

//   // Scroll
//   scrollContent: { paddingBottom: 100 },

//   // Package header
//   packageHeader: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10 },
//   packageTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: COLORS.text,
//     marginBottom: 8,
//     letterSpacing: -0.3,
//   },
//   tagsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
//   tag: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
//   tagOutline: { borderWidth: 1.5, borderColor: COLORS.border },
//   tagSolid: { backgroundColor: COLORS.text },
//   tagText: { fontSize: 12, fontWeight: '600' },
//   tagTextOutline: { color: COLORS.text },
//   tagTextSolid: { color: COLORS.white },

//   // Hero
//   heroContainer: { width: SCREEN_WIDTH, position: 'relative' },
//   heroImage: { width: SCREEN_WIDTH, height: 200 },
//   dotRow: {
//     position: 'absolute',
//     bottom: 8,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 5,
//   },
//   dot: { width: 7, height: 7, borderRadius: 4 },
//   dotActive: { backgroundColor: COLORS.white },
//   dotInactive: { backgroundColor: 'rgba(255,255,255,0.45)' },

//   // Price banner
//   priceBanner: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: COLORS.white,
//   },
//   priceBannerTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
//   priceFrom: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
//   priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 },
//   priceMain: { fontSize: 22, fontWeight: '800', color: COLORS.text },
//   priceStrike: {
//     fontSize: 13,
//     color: COLORS.textLight,
//     textDecorationLine: 'line-through',
//   },
//   perPerson: { fontSize: 11, color: COLORS.textMuted },

//   // Description
//   descBox: { paddingHorizontal: 16, paddingBottom: 12 },
//   descText: { fontSize: 13, color: COLORS.textMuted, lineHeight: 20 },
//   descHighlight: { color: COLORS.primary, fontWeight: '600' },

//   // Divider
//   divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 4 },

//   // Day section
//   daySection: { paddingHorizontal: 16, paddingTop: 14 },
//   dayHeaderRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
//   dayDestination: { fontSize: 13, fontWeight: '700', color: COLORS.text },
//   includedPill: {
//     backgroundColor: '#EEF2FF',
//     borderRadius: 20,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//   },
//   includedText: { fontSize: 10, color: COLORS.primary, fontWeight: '600' },

//   // Section label badge
//   sectionLabel: {
//     borderRadius: 6,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   sectionLabelText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },

//   // Section block
//   sectionBlock: { marginBottom: 12 },
//   sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
//   sectionTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text },
//   sectionSubtitle: { fontSize: 12, color: COLORS.textMuted },

//   // Action buttons
//   actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginBottom: 8 },
//   btnChange: {
//     borderWidth: 1.5,
//     borderColor: COLORS.change,
//     borderRadius: 20,
//     paddingHorizontal: 14,
//     paddingVertical: 5,
//   },
//   btnChangeText: { fontSize: 12, fontWeight: '600', color: COLORS.change },
//   btnRemove: {
//     borderWidth: 1.5,
//     borderColor: COLORS.remove,
//     borderRadius: 20,
//     paddingHorizontal: 14,
//     paddingVertical: 5,
//   },
//   btnRemoveText: { fontSize: 12, fontWeight: '600', color: COLORS.remove },

//   // Card
//   card: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     ...Platform.select({
//       ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
//       android: { elevation: 2 },
//     }),
//   },
//   transportImage: { width: 90, height: 90 },
//   hotelImage: { width: 100, height: 110 },
//   cardContent: { flex: 1, padding: 10 },
//   cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
//   cardDetail: { fontSize: 11, color: COLORS.textMuted, lineHeight: 16 },
//   infoRow: { flexDirection: 'row', gap: 4, marginTop: 3 },
//   infoLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600' },
//   infoValue: { fontSize: 10, color: COLORS.text },

//   // Stars
//   starsRow: { flexDirection: 'row', marginTop: 4 },
//   star: { fontSize: 13 },
//   starFilled: { color: '#F59E0B' },
//   starEmpty: { color: COLORS.border },

//   // Flight card
//   flightCard: {
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     ...Platform.select({
//       ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
//       android: { elevation: 2 },
//     }),
//   },
//   flightRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   flightAirlineBox: { flexDirection: 'row', alignItems: 'center', gap: 8, width: 90 },
//   flightLogoPlaceholder: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: '#E0EDFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   flightLogoText: { fontSize: 11, fontWeight: '800', color: COLORS.primary },
//   flightAirlineName: { fontSize: 11, fontWeight: '700', color: COLORS.text },
//   flightNo: { fontSize: 10, color: COLORS.textMuted },

//   flightTimeline: { flex: 1, alignItems: 'center' },
//   flightLineContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
//   flightTime: { fontSize: 14, fontWeight: '700', color: COLORS.text },
//   flightOrigin: { fontSize: 9, color: COLORS.textMuted },
//   flightDest: { fontSize: 9, color: COLORS.textMuted },
//   flightLine: { flex: 1, flexDirection: 'row', alignItems: 'center', position: 'relative' },
//   flightLineDot: {
//     width: 5,
//     height: 5,
//     borderRadius: 3,
//     backgroundColor: COLORS.primary,
//   },
//   flightLineDotRight: {},
//   flightLineStem: { flex: 1, height: 1.5, backgroundColor: COLORS.border },
//   flightDuration: { fontSize: 9, color: COLORS.textMuted, position: 'absolute', top: -10, left: '50%' },

//   flightBaggageCol: { alignItems: 'flex-end' },
//   baggageLabel: { fontSize: 9, color: COLORS.textMuted, marginBottom: 2 },

//   // Activities
//   activitiesBanner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0F5FF',
//     borderRadius: 12,
//     padding: 12,
//     gap: 10,
//     marginTop: 4,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#D1E0FF',
//     borderStyle: 'dashed',
//   },
//   activitiesIconBox: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: COLORS.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   activitiesIcon: { fontSize: 16 },
//   activitiesTextBox: { flex: 1 },
//   activitiesTitle: { fontSize: 12, fontWeight: '700', color: COLORS.text },
//   activitiesSubtitle: { fontSize: 10, color: COLORS.textMuted, marginTop: 1, lineHeight: 14 },
//   addDayBtn: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 7,
//   },
//   addDayBtnText: { fontSize: 11, fontWeight: '800', color: COLORS.white, letterSpacing: 0.3 },

//   // Book bar
//   bookBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: COLORS.white,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//     gap: 12,
//     ...Platform.select({
//       ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.07, shadowRadius: 8 },
//       android: { elevation: 8 },
//     }),
//   },
//   bookBtn: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//     borderRadius: 30,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   bookBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700', letterSpacing: 0.2 },
//   guestSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     borderWidth: 1.5,
//     borderColor: COLORS.border,
//     borderRadius: 30,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   guestBtn: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     backgroundColor: COLORS.bg,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   guestBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.text, lineHeight: 20 },
//   guestCount: { fontSize: 14, fontWeight: '700', color: COLORS.text, minWidth: 14, textAlign: 'center' },
//   guestIcon: { fontSize: 13, color: COLORS.textMuted },
// });

// export default TripDetailsScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/CardDetailsStyles";

const { width } = Dimensions.get("window");

const images = [
  require("../assets/maldives.jpg"),
  require("../assets/maldives.jpg"),
  require("../assets/maldives.jpg"),
];

const MaldivesDetailsScreen = ({ navigation }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <Ionicons name="heart-outline" size={22} />
          <Ionicons name="share-social-outline" size={22} />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Maldives Paradise</Text>

      {/* Tags */}
      <View style={styles.tags}>
        <View style={styles.tag}>
          <Text>Customizable</Text>
        </View>

        <View style={styles.tag}>
          <Text>3N/4D</Text>
        </View>

        <View style={styles.tag}>
          <Text>3N Abu Dhabi</Text>
        </View>
      </View>

      {/* Image Slider */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setActiveImage(index);
        }}
      >
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.image} />
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              activeImage === i && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Price Card */}
      <View style={styles.priceCard}>
        <Text style={styles.priceTitle}>Maldives Paradise :</Text>

        <Text style={styles.price}>
          ₹89,999
          <Text style={styles.oldPrice}> ₹1,49,999</Text>
          <Text style={styles.perPerson}> /per Person</Text>
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Maldives Paradise is a haven of turquoise waters, soft white sands,
        and peaceful lagoons. It's a place where nature, luxury,
        and serenity come together in perfect harmony.
      </Text>

      {/* Day Plan */}
      <View style={styles.dayRow}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>Day 1</Text>
        </View>

        <Text style={styles.dayTitle}>Maldives Paradise</Text>

        <Text style={styles.included}>
          INCLUDED: Flight, Hotel and Transport
        </Text>
      </View>

      {/* Flight Card */}
      <View style={styles.flightCard}>
        <Text style={styles.airline}>IndiGo</Text>

        <View style={styles.flightRow}>
          <Text>02:00</Text>
          <Text>→</Text>
          <Text>02:00</Text>
        </View>

        <Text style={styles.flightSub}>
          DEL → HYD | 2h 15m Direct
        </Text>
      </View>

      {/* Transport */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transport</Text>

        <View style={styles.transportCard}>
          <Image
            source={require("../assets/car.jpg")}
            style={styles.transportImg}
          />

          <View style={styles.flexOne}>
            <Text style={styles.transportTitle}>Private Transport</Text>
            <Text style={styles.transportSub}>
              Airport to hotel in Maldives
            </Text>
          </View>
        </View>
        </View>

      {/* Hotel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hotel</Text>

        <View style={styles.hotelCard}>
          <Image
            source={require("../assets/hotel.jpg")}
            style={styles.hotelImg}
          />

           <View style={styles.flexOne}>
            <Text style={styles.hotelName}>
              Sharanam Greens Resort
            </Text>

            <Text style={styles.hotelSub}>
              3 Nights in Abu Dhabi
            </Text>

            <Text style={styles.rating}>★★★★★</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

export default MaldivesDetailsScreen;