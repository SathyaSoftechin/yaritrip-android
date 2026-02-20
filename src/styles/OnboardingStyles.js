import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',  
  },

  /* IMAGE GRID */
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    paddingTop: -2,
  },

  leftLarge: {
    width: width * 0.34,
    height: height * 0.47,   // 🔥 Dynamic height
    borderRadius: 1,
  },

  middleColumn: {
    justifyContent: 'space-between',
  },

  middleTop: {
    width: width * 0.27,
    height: height * 0.18,
    borderRadius: 2,
  },

  middleBottom: {
    width: width * 0.27,
    height: height * 0.28,
    borderRadius: 2,
  },

  rightColumn: {
    justifyContent: 'space-between',
  },

  rightTop: {
    width: width * 0.37,
    height: height * 0.28,
    borderRadius: 2,
  },

  rightBottom: {
    width: width * 0.37,
    height: height * 0.18,
    borderRadius: 2,
  },

  /* BOTTOM CARD */
  bottomCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 10,
  },

  subtitle: {
    textAlign: 'center',
    color: '#110000',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#4C6EDB',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },

  buttonText: {
    color: '#fbf9f9',
    fontSize: 16,
    fontWeight: '600',
  },

  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  activeDot: {
    width: 78,
    height: 9,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    marginRight: 6,
  },

  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },

  logo: {
    width: 230,
    height: 260,
    backgroundColor:'#ffffff',
  },
});
