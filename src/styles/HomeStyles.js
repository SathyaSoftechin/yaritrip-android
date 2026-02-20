import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   container: { flex: 1, backgroundColor: '#f4f6fb' },
  header: {
    height: 280,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    width: '70%',
    lineHeight: 30,
  },

  highlight: {
    color: '#FFB800',
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ffffff33',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  profile: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },

  /* SEARCH CARD */
  searchCard: {
    backgroundColor: '#F5F6FA',
    marginTop: 25,
    padding: 18,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#C7D2FE',
    elevation: 8,
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: '42%',
  },

  swapIcon: {
    backgroundColor: '#E8EDFF',
    padding: 8,
    borderRadius: 10,
  },

  inputWithIcon: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  inputFlex: {
    flex: 1,
  },

  searchButton: {
    backgroundColor: '#4C6EDB',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 15,
  },

  searchText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  tabsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 145,
  marginBottom: 30,
},
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#e6e6e6',
  },

  activeTab: { backgroundColor: '#dbe5ff' },

  tabText: { fontSize: 15 , fontWeight: 700 },

  activeTabText: { color: '#2b50f5', fontWeight: '600' },

  destinationItem: { alignItems: 'center', marginRight: 17 },

  destinationImage: {
    width: 70,
    height: 70,
    borderRadius: 55,

  },

  destinationText: { marginTop: 3, fontSize: 12, fontWeight:600 },
horizontalPadding: {
  padding: 15,
},
  card: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
  },

  cardImage: { width: '100%', height: 120 },

  exclusiveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ffb703',
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  exclusiveText: { fontSize: 10, fontWeight: '600' },

  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 4,
  },

  cardContent: { padding: 10 },

  packageTitle: { fontWeight: '600' },

  location: { fontSize: 11, color: '#666' },

  rating: { fontSize: 11 },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  priceRow: { flexDirection: 'row', alignItems: 'center' },

  price: { fontWeight: '700' },

  oldPrice: {
    marginLeft: 5,
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 11,
  },

  perPerson: { fontSize: 10, color: '#666' },

  planButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ff6b00',
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },

  planText: { fontSize: 11, color: '#ff6b00' },

  banner: { margin: 15, borderRadius: 20, overflow: 'hidden' },

  bannerImage: { width: '100%', height: 140 },

  bannerOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },

  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  bannerSub: { color: '#fff', fontSize: 12 },
});