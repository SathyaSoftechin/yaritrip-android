// // ─── STYLES ───────────────────────────────────────────────────────────────────
// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
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
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F4F6FB",
padding:16
},
flexOne: {
    flex: 1,
  },
header:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

headerIcons:{
flexDirection:"row",
gap:15
},

title:{
fontSize:22,
fontWeight:"700",
marginBottom:10
},

tags:{
flexDirection:"row",
gap:10,
marginBottom:15
},

tag:{
backgroundColor:"#EFEFEF",
paddingHorizontal:12,
paddingVertical:6,
borderRadius:6
},

image:{
width:width-32,
height:180,
borderRadius:10,
marginRight:10
},

dots:{
flexDirection:"row",
justifyContent:"center",
marginVertical:10
},

dot:{
width:6,
height:6,
borderRadius:5,
backgroundColor:"#ccc",
marginHorizontal:4
},

activeDot:{
backgroundColor:"#000"
},

priceCard:{
backgroundColor:"#EEF1FF",
padding:15,
borderRadius:10,
marginBottom:12
},

priceTitle:{
fontWeight:"600",
marginBottom:5
},

price:{
fontSize:18,
fontWeight:"700"
},

oldPrice:{
textDecorationLine:"line-through",
color:"#777",
fontSize:14
},

perPerson:{
fontSize:12,
color:"#777"
},

description:{
fontSize:13,
color:"#555",
marginBottom:15
},

dayRow:{
marginBottom:10
},

dayBadge:{
backgroundColor:"#FF9F2A",
alignSelf:"flex-start",
paddingHorizontal:8,
paddingVertical:3,
borderRadius:4
},

dayText:{
color:"#fff",
fontSize:12
},

dayTitle:{
fontWeight:"600",
marginTop:4
},

included:{
fontSize:12,
color:"#555"
},

flightCard:{
backgroundColor:"#fff",
padding:12,
borderRadius:10,
marginBottom:15
},

airline:{
fontWeight:"600"
},

flightRow:{
flexDirection:"row",
justifyContent:"space-between",
marginVertical:6
},

flightSub:{
fontSize:12,
color:"#777"
},

section:{
marginBottom:20
},

sectionTitle:{
fontWeight:"600",
marginBottom:10
},

transportCard:{
flexDirection:"row",
backgroundColor:"#fff",
padding:10,
borderRadius:10
},

transportImg:{
width:70,
height:50,
borderRadius:6,
marginRight:10
},

transportTitle:{
fontWeight:"600"
},

transportSub:{
fontSize:12,
color:"#777"
},

hotelCard:{
flexDirection:"row",
backgroundColor:"#fff",
padding:10,
borderRadius:10
},

hotelImg:{
width:70,
height:70,
borderRadius:6,
marginRight:10
},

hotelName:{
fontWeight:"600"
},

hotelSub:{
fontSize:12,
color:"#777"
},

rating:{
color:"#FFD700"
},
});