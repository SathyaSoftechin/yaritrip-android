import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223E86',
  },

  scrollContainer: {
    flexGrow: 1,
  },

  header: {
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 36,
    alignItems: 'flex-start',
  },

  logo: {
    width: 180,   // increased from 140
    height: 64,   // increased from 50
    marginBottom: 0,
    marginLeft: -40,
  },

  headerText: {
    color: '#d0d8f5',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
  },

  card: {
    flex: 1,
    backgroundColor: '#F4F5FA',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 48,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E4EE',
    borderRadius: 30,
    padding: 5,
    marginBottom: 28,
  },

  activeTab: {
    flex: 1,
    backgroundColor: '#223E86',
    paddingVertical: 11,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#223E86',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },

  inactiveTab: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
  },

  activeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  inactiveText: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 14,
  },

  // Floating label input
  inputWrapper: {
    marginBottom: 20,
    position: 'relative',
  },

  floatingLabel: {
    position: 'absolute',
    left: 48,
    top: 17,
    fontSize: 14,
    color: '#9ca3af',
    zIndex: 1,
    backgroundColor: 'transparent',
  },

  floatingLabelActive: {
    top: -9,
    left: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#223E86',
    backgroundColor: '#F4F5FA',
    paddingHorizontal: 4,
    zIndex: 2,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    height: 54,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  inputBoxFocused: {
    borderColor: '#223E86',
    shadowColor: '#223E86',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#1f2937',
    paddingVertical: 0,
  },

  eyeBtn: {
    padding: 4,
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 6,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    marginRight: 10,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  checkboxChecked: {
    backgroundColor: '#223E86',
    borderColor: '#223E86',
  },

  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
  },

  termsLink: {
    color: '#223E86',
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#223E86',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    shadowColor: '#223E86',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },

  orText: {
    marginHorizontal: 12,
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '500',
  },

 socialRow: {
  flexDirection: 'row',
  justifyContent: 'center',   // center them
  marginBottom: 24,
  gap: 18,                    // spacing between icons
},

socialBtn: {
  alignItems: 'center',
  justifyContent: 'center',

  padding: 8,                 // thin padding
  borderRadius: 10,           // small rounding (or remove)

  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#e5e7eb',

  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},

socialLogo: {
  width: 32,
  height: 32,
  resizeMode: 'contain',
},

  socialBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },

  bottomText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
  },

  loginLink: {
    fontWeight: '700',
    color: '#223E86',
  },
});