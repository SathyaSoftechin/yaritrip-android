// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#202c5e',
//   },

//   keyboardContainer: {
//     flex: 1,
//   },

//   scrollContainer: {
//     flexGrow: 1,
//   },

//   header: {
//     paddingHorizontal: 25,
//     paddingTop: 50,
//     paddingBottom: 40,
//   },

//   headerText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//   },

//   card: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//     borderTopLeftRadius: 35,
//     borderTopRightRadius: 35,
//     padding: 25,
//   },

//   toggleContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#E0E0E0',
//     borderRadius: 30,
//     padding: 4,
//     marginBottom: 25,
//   },

//   activeTab: {
//     flex: 1,
//     backgroundColor: '#7D9AF2',
//     paddingVertical: 10,
//     borderRadius: 25,
//     alignItems: 'center',
//   },

//   inactiveTab: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },

//   activeText: {
//     color: '#000',
//     fontWeight: '600',
//   },

//   inactiveText: {
//     color: '#444',
//   },

//   label: {
//     marginBottom: 6,
//     marginTop: 10,
//     fontSize: 13,
//     color: '#333',
//   },

//   input: {
//     backgroundColor: '#E6E6E6',
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//   },

//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//   },

//   rememberRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   checkbox: {
//     width: 18,
//     height: 18,
//     borderRadius: 6,
//     backgroundColor: '#D9D9D9',
//     marginRight: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   checked: {
//     width: 10,
//     height: 10,
//     backgroundColor: '#324E9F',
//     borderRadius: 3,
//   },

//   rememberText: {
//     fontSize: 12,
//   },

//   forgotText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },

//   button: {
//     backgroundColor: '#4C6EDB',
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginTop: 10,
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 15,
//   },

//   orRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//   },

//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ccc',
//   },

//   orText: {
//     marginHorizontal: 10,
//     color: '#555',
//     fontSize: 13,
//   },

//   socialRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginBottom: 20,
//   },

//   socialBox: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#E0E0E0',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//   },

//   socialIcon: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },

//   bottomText: {
//     textAlign: 'center',
//     fontSize: 13,
//   },

//   register: {
//     fontWeight: '600',
//   },
// });
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202c5e',
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
  },

  header: {
    paddingHorizontal: 25,
    paddingTop: 100,
    paddingBottom: 40,
  },

  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  card: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    padding: 45,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    padding: 14,
    marginBottom: 25,
  },

  activeTab: {
    flex: 1,
    backgroundColor: '#7D9AF2',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },

  inactiveTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },

  activeText: {
    color: '#3e3c3c',
    fontWeight: '700',
  },

  inactiveText: {
    color: '#0d0909',
  },

  /* ===== Floating Input Styles ===== */

  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },

  floatingLabel: {
    position: 'absolute',
    left: 16,
    top: 18,
    fontSize: 15,
    color: '#0e0e0e',
    zIndex: 1,
  },

  floatingLabelActive: {
    top: -16,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0c0c0c',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 4,
  },

  input: {
    backgroundColor: '#cccccc',
    borderRadius: 9,
    paddingHorizontal: 34,
    paddingVertical: 22,
  },
  passwordRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

eyeIcon: {
  position: 'absolute',
  right: 15,
},

  /* ================================ */

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 1,
    backgroundColor: '#969696',
    marginRight: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    width: 10,
    height: 10,
    backgroundColor: '#0a0a0a',
    borderRadius: 3,
  },

  rememberText: {
    fontSize: 13,
    fontWeight: '700',
  },

  forgotText: {
    fontSize: 13,
    fontWeight: '700',
  },

  button: {
    backgroundColor: '#4C6EDB',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#a09a9a',
  },

  orText: {
    marginHorizontal: 10,
    color: '#040404',
    fontSize: 13,
    fontWeight: '700',
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },

  socialBox: {
    width: 60,
    height: 60,
    backgroundColor: '#b2acac',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  socialIcon: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  bottomText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
  },

  register: {
    fontWeight: '700',
    color:'#0b40f0',
  },
});