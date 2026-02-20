// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#202c5e',
//   },

//   scrollContainer: {
//     flexGrow: 1,
//   },

//   topSection: {
//     paddingHorizontal: 25,
//     paddingTop: 50,
//     paddingBottom: 40,
//   },
//   inputContainer: {
//     marginBottom: 18,
//     position: 'relative',
//   },

//   floatingLabel: {
//     position: 'absolute',
//     left: 14,
//     top: 16,
//     fontSize: 14,
//     color: '#666',
//   },

//   floatingLabelActive: {
//     top: -8,
//     fontSize: 11,
//     color: '#4C6EDB',
//     backgroundColor: '#F2F2F2',
//     paddingHorizontal: 4,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//   },

//   card: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     padding: 25,
//   },

//   toggleContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//     borderRadius: 30,
//     padding: 4,
//     marginBottom: 25,
//   },

//   toggleButton: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 25,
//     alignItems: 'center',
//   },

//   activeToggle: {
//     backgroundColor: '#7793ed',
//   },

//   toggleText: {
//     color: '#212121',
//     fontWeight: '500',
//   },

//   activeText: {
//     color: '#343434',
//   },

//   label: {
//     marginBottom: 6,
//     marginTop: 8,
//     color: '#333333',
//     fontSize: 13,
//   },

//   input: {
//     backgroundColor: '#d3d0d0',
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//   },

//   termsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },

//   checkbox: {
//     width: 16,
//     height: 16,
//     borderWidth: 1,
//     borderColor: '#171718',
//     marginRight: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   checked: {
//     width: 9,
//     height: 9,
//     backgroundColor: '#535f88',
//   },

//   termsText: {
//     fontSize: 12,
//     color: '#6F8EF6',
//   },

//   button: {
//     marginTop: 25,
//     backgroundColor: '#4C6EDB',
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   logo: {
//     backgroundColor:'#202c5e',
//     width: 40,
//     height: 40,
//   },
// });

// export default styles;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202c5e',
  },

  scrollContainer: {
    flexGrow: 1,
  },

  topSection: {
    paddingHorizontal: 5,
    paddingTop: 20,
    paddingBottom: 40,
  },

  title: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
  },

  card: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
  },

  /* ================= Floating Input Styles ================= */

  inputContainer: {
    marginBottom: 35,
    position: 'relative',
  },

  floatingLabel: {
    position: 'absolute',
    left: 16,
    top: 18,
    fontSize: 15,
    color: '#0e0c0c',
    zIndex: 1,
  },

  floatingLabelActive: {
    top: -16,
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight:'bold',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 4,
  },

  input: {
    backgroundColor: '#d3d0d0',
    borderRadius: 19,
    paddingHorizontal: 26,
    paddingVertical: 20,
  },

  /* ========================================================== */

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    borderRadius: 30,
    padding: 4,
    marginBottom: 25,
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },

  activeToggle: {
    backgroundColor: '#7793ed',
  },

  toggleText: {
    color: '#212121',
    fontWeight: '500',
  },

  activeText: {
    color: '#343434',
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#171718',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    width: 9,
    height: 9,
    backgroundColor: '#535f88',
  },

  termsText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6F8EF6',
  },

  button: {
    marginTop: 25,
    backgroundColor: '#4C6EDB',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  logo: {
    backgroundColor: '#202c5e',
    width: 40,
    height: 40,
  },
});

export default styles;