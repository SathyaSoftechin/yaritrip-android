import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Check,
  Plus,
  Minus,
} from 'lucide-react-native';
import colors from '../theme/colors';
import useReviewPackage from '../hooks/useReviewPackage';

const SW = 2.5;

// ─── Traveller Card ───────────────────────────────────────────────────────────

const TravellerForm = ({ traveller, index, onChange, onRemove, canRemove }) => (
  <View style={styles.travellerCard}>
    <View style={styles.travellerRow}>
      {/* Illustration */}
      <Image
        source={require('../assets/traveller_illustration.png')}
        style={styles.travellerIllustration}
        resizeMode="contain"
      />

      {/* Info + Fields */}
      <View style={styles.travellerRight}>
        <View style={styles.travellerTitleRow}>
          <View>
            <Text style={styles.travellerTitle}>Traveler {index + 1}</Text>
            <Text style={styles.travellerSub}>
              {traveller.type === 'ADULT' ? 'ADULT - ABOVE 12 YEARS' : 'CHILD'}
            </Text>
          </View>
          {canRemove && (
            <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(index)}>
              <Minus size={13} color={colors.error} strokeWidth={SW} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.travellerFields}>
          <TextInput
            style={styles.fieldLarge}
            placeholder="Full Name (as per ID)"
            placeholderTextColor={colors.textMuted}
            value={traveller.name}
            onChangeText={(v) => onChange(index, 'name', v)}
          />
          <TextInput
            style={styles.fieldSmall}
            placeholder="Age"
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
            value={traveller.age}
            onChangeText={(v) => onChange(index, 'age', v)}
          />
        </View>
      </View>
    </View>
  </View>
);

// ─── Step 1: Traveller Details ────────────────────────────────────────────────

const TravellerDetailsStep = ({
  travellers, updateTraveller, addTraveller, removeTraveller,
  bookingForSelf, setBookingForSelf, onNext,
}) => (
  <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
    {/* Section Header */}
    <View style={styles.sectionHeaderCard}>
      <Image
        source={require('../assets/traveller_place.jpg')}
        style={styles.sectionHeaderImage}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.sectionCardTitle}>Traveller Details</Text>
        <Text style={styles.sectionCardSub}>
          {travellers.length} Travellers • {Math.ceil(travellers.length / 2)} Rooms
        </Text>
      </View>
    </View>

    {/* Radio */}
    <View style={styles.radioRow}>
      {[
        { label: "I'm Booking For Myself", val: true },
        { label: "I'm Booking For Someone else", val: false },
      ].map(({ label, val }) => (
        <TouchableOpacity
          key={label}
          style={styles.radioOpt}
          onPress={() => setBookingForSelf(val)}
        >
          <View style={[styles.radioCircle, bookingForSelf === val && styles.radioCircleActive]}>
            {bookingForSelf === val && <View style={styles.radioDot} />}
          </View>
          <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>

    {/* Traveller Cards */}
    {travellers.map((t, i) => (
      <TravellerForm
        key={t.id}
        traveller={t}
        index={i}
        onChange={updateTraveller}
        onRemove={removeTraveller}
        canRemove={travellers.length > 1}
      />
    ))}

    {/* Add Buttons */}
    <View style={styles.addBtnRow}>
      <TouchableOpacity style={styles.addBtn} onPress={() => addTraveller('ADULT')}>
        <View style={styles.addBtnIcon}>
          <Plus size={11} color={colors.textPrimary} strokeWidth={SW} />
        </View>
        <Text style={styles.addBtnText}>Add Adult</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addBtn} onPress={() => addTraveller('CHILD')}>
        <View style={styles.addBtnIcon}>
          <Plus size={11} color={colors.textPrimary} strokeWidth={SW} />
        </View>
        <Text style={styles.addBtnText}>Add Child</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.primaryBtn} onPress={onNext}>
      <Text style={styles.primaryBtnText}>Next</Text>
    </TouchableOpacity>
    <View style={{ height: 32 }} />
  </ScrollView>
);

// ─── Step 2: Add-ons ──────────────────────────────────────────────────────────

const AddOnsStep = ({
  travellers, insuranceSelected, setInsuranceSelected, insuranceCost, onNext,
}) => (
  <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
    {/* Section Header */}
    <View style={styles.sectionHeaderCard}>
      <Image
        source={require('../assets/insurance_square.jpg')}
        style={styles.sectionHeaderImage}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.sectionCardTitle}>Package Add-on's</Text>
        <Text style={styles.sectionCardSub}>Protect your trip with add-ons</Text>
      </View>
    </View>

    {/* Insurance Card */}
    <TouchableOpacity
      style={[styles.insuranceCard, insuranceSelected && styles.insuranceCardActive]}
      onPress={() => setInsuranceSelected(!insuranceSelected)}
      activeOpacity={0.8}
    >
      <View style={styles.insuranceHeaderRow}>
        <Image
          source={require('../assets/insurance_illustration.jpg')}
          style={styles.insuranceIllustration}
          resizeMode="contain"
        />
        <View style={styles.insuranceHeaderText}>
          <Text style={styles.insuranceTitle}>Travel + Medical Insurance</Text>
          <Text style={styles.insuranceSub}>Comprehensive coverage for a worry-free journey</Text>
        </View>
      </View>

      <View style={styles.insuranceDivider} />

      <View style={styles.benefitRow}>
        <Text style={styles.benefitIcon}>🕐</Text>
        <Text style={styles.benefitText}>Trip Delay Coverage Up to ₹5,000</Text>
      </View>
      <View style={styles.benefitRow}>
        <Text style={styles.benefitIcon}>🧳</Text>
        <Text style={styles.benefitText}>Lost Baggage Up to ₹25,000</Text>
      </View>
      <View style={styles.benefitRow}>
        <Text style={styles.benefitIcon}>🛡️</Text>
        <Text style={styles.benefitText}>Medical Emergency</Text>
      </View>

      <View style={styles.insuranceTotalPill}>
        <Text style={styles.insuranceTotalText}>
          Total: ₹{insuranceCost.toLocaleString('en-IN')} for {travellers.length} travellers
        </Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.primaryBtn} onPress={onNext}>
      <Text style={styles.primaryBtnText}>Next</Text>
    </TouchableOpacity>
    <View style={{ height: 32 }} />
  </ScrollView>
);

// ─── Step 3: Payment Summary ──────────────────────────────────────────────────

const PaymentSummaryStep = ({
  grandTotal, basePrice, couponDiscount, gst,
  travellers, termsAccepted, setTermsAccepted,
  onPay, isBookingLoading,
}) => (
  <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
    {/* Grand Total */}
    <View style={styles.grandTotalCard}>
      <View style={styles.grandTotalTopRow}>
        <Text style={styles.grandTotalLabel}>GRAND TOTAL - {travellers.length}Adults</Text>
        <View style={styles.offBadge}>
          <Text style={styles.offBadgeText}>10%OFF</Text>
        </View>
      </View>
      <View style={styles.grandTotalAmountRow}>
        <Text style={styles.rupeeSign}>₹ </Text>
        <Text style={styles.grandTotalAmount}>
          {Math.round(grandTotal).toLocaleString('en-IN')}
        </Text>
        <Text style={styles.grandTotalGst}> (Inclusive of GST)</Text>
      </View>
    </View>

    {/* Fare Breakdown */}
    <View style={styles.fareCard}>
      <Text style={styles.fareTitle}>Fare Break</Text>

      <View style={styles.fareRow}>
        <Text style={styles.fareLabel}>Total Basic Cost</Text>
        <Text style={styles.fareValue}>₹{Math.round(basePrice).toLocaleString('en-IN')}</Text>
      </View>
      <Text style={styles.fareSubText}>
        {Math.round(basePrice / Math.max(travellers.length, 1)).toLocaleString('en-IN')} × {travellers.length} Travellers
      </Text>

      <View style={styles.fareDivider} />

      <View style={styles.fareRow}>
        <Text style={styles.fareLabel}>Coupon Discount</Text>
        <Text style={[styles.fareValue, styles.discountValue]}>
          - ₹{Math.round(couponDiscount).toLocaleString('en-IN')}
        </Text>
      </View>

      <View style={styles.fareRow}>
        <Text style={styles.fareLabel}>Fees & Taxes</Text>
        <Text style={styles.fareValue}>+ ₹{Math.round(gst).toLocaleString('en-IN')}</Text>
      </View>
      <View style={styles.fareRow}>
        <Text style={styles.fareSubLabel}>GST 5.0%</Text>
        <Text style={styles.fareSubValue}>₹{Math.round(gst).toLocaleString('en-IN')}</Text>
      </View>

      <View style={styles.fareDivider} />

      <Text style={styles.importantTitle}>Important Information</Text>
      <TouchableOpacity
        style={styles.termsRow}
        onPress={() => setTermsAccepted(!termsAccepted)}
        activeOpacity={0.8}
      >
        <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
          {termsAccepted && <Check size={12} color={colors.white} strokeWidth={3} />}
        </View>
        <Text style={styles.termsText}>
          {'I confirm that i have read and i accept '}
          <Text style={styles.termsLink}>Cancellation Policy</Text>
          {', '}
          <Text style={styles.termsLink}>User Agreement</Text>
          {', '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' and '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
          {' of Yari Trip'}
        </Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      style={[styles.payBtn, (!termsAccepted || isBookingLoading) && styles.payBtnDisabled]}
      onPress={onPay}
      disabled={!termsAccepted || isBookingLoading}
      activeOpacity={0.85}
    >
      {isBookingLoading
        ? <ActivityIndicator color={colors.white} />
        : <Text style={styles.payBtnText}>Proceed to Pay</Text>}
    </TouchableOpacity>
    <View style={{ height: 40 }} />
  </ScrollView>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const ReviewPackageScreen = ({ navigation, route }) => {
  const { packageId, bookingId, basePrice = 0, travellersCount = 2 } = route.params || {};

  const {
    currentStep, currentStepName,
    goNext, goBack,
    bookingForSelf, setBookingForSelf,
    travellers, updateTraveller, addTraveller, removeTraveller,
    insuranceSelected, setInsuranceSelected, insuranceCost,
    termsAccepted, setTermsAccepted,
    couponDiscount, gst, grandTotal,
    submitBooking, isBookingLoading, isBookingSuccess,
  } = useReviewPackage({ packageId, bookingId, basePrice, travellersCount });

  React.useEffect(() => {
    if (isBookingSuccess) {
      Alert.alert(
        'Booking Confirmed',
        'Your package has been booked successfully.',
        [{ text: 'OK', onPress: () => navigation.popToTop() }],
      );
    }
  }, [isBookingSuccess, navigation]);

  const handleBack = () => {
    if (currentStep === 0) navigation.goBack();
    else goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={colors.textPrimary} strokeWidth={SW} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Package</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {[0, 1, 2].map((s) => (
          <React.Fragment key={s}>
            <View style={[styles.stepDot, s <= currentStep && styles.stepDotActive]} />
            {s < 2 && (
              <View style={[styles.stepLine, s < currentStep && styles.stepLineActive]} />
            )}
          </React.Fragment>
        ))}
      </View>

      {currentStepName === 'TravellerDetails' && (
        <TravellerDetailsStep
          travellers={travellers}
          updateTraveller={updateTraveller}
          addTraveller={addTraveller}
          removeTraveller={removeTraveller}
          bookingForSelf={bookingForSelf}
          setBookingForSelf={setBookingForSelf}
          onNext={goNext}
        />
      )}
      {currentStepName === 'AddOns' && (
        <AddOnsStep
          travellers={travellers}
          insuranceSelected={insuranceSelected}
          setInsuranceSelected={setInsuranceSelected}
          insuranceCost={insuranceCost}
          onNext={goNext}
        />
      )}
      {currentStepName === 'PaymentSummary' && (
        <PaymentSummaryStep
          grandTotal={grandTotal}
          basePrice={basePrice}
          couponDiscount={couponDiscount}
          gst={gst}
          travellers={travellers}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          onPay={submitBooking}
          isBookingLoading={isBookingLoading}
        />
      )}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },

  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.border },
  stepDotActive: { backgroundColor: colors.primary },
  stepLine: { width: 56, height: 2, backgroundColor: colors.border },
  stepLineActive: { backgroundColor: colors.primary },

  stepContent: { padding: 16 },

  // Section header card
  sectionHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 14,
  },
  sectionHeaderImage: { width: 48, height: 48, borderRadius: 10 },
  sectionCardTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  sectionCardSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  // Radio
  radioRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginBottom: 14 },
  radioOpt: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  radioCircle: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  radioCircleActive: { borderColor: colors.primary },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  radioLabel: { fontSize: 13, color: colors.textPrimary },

  // Traveller card
  travellerCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  travellerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  travellerIllustration: { width: 56, height: 72 },
  travellerRight: { flex: 1 },
  travellerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  travellerTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  travellerSub: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  removeBtn: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 1, borderColor: colors.error || '#EF4444',
    justifyContent: 'center', alignItems: 'center',
  },
  travellerFields: { flexDirection: 'row', gap: 8 },
  fieldLarge: {
    flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8,
    fontSize: 13, color: colors.textPrimary, backgroundColor: colors.background,
  },
  fieldSmall: {
    width: 64, borderWidth: 1, borderColor: colors.border, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8,
    fontSize: 13, color: colors.textPrimary, backgroundColor: colors.background,
  },

  // Add buttons
  addBtnRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: colors.border, borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    backgroundColor: colors.white,
  },
  addBtnIcon: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 1.5, borderColor: colors.textPrimary,
    justifyContent: 'center', alignItems: 'center',
  },
  addBtnText: { fontSize: 13, color: colors.textPrimary, fontWeight: '500' },

  primaryBtn: {
    backgroundColor: colors.primary, borderRadius: 30,
    paddingVertical: 15, alignItems: 'center',
  },
  primaryBtnText: { color: colors.white, fontWeight: '700', fontSize: 16 },

  // Insurance
  insuranceCard: {
    backgroundColor: colors.white, borderRadius: 12,
    borderWidth: 1, borderColor: colors.border,
    padding: 14, marginBottom: 20,
  },
  insuranceCardActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  insuranceHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  insuranceIllustration: { width: 56, height: 56, borderRadius: 8 },
  insuranceHeaderText: { flex: 1, justifyContent: 'center' },
  insuranceTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  insuranceSub: { fontSize: 11, color: colors.textSecondary, marginTop: 3 },
  insuranceDivider: { height: 1, backgroundColor: colors.border, marginBottom: 12 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  benefitIcon: { fontSize: 15 },
  benefitText: { fontSize: 13, color: colors.textSecondary },
  insuranceTotalPill: {
    marginTop: 8, borderWidth: 1, borderColor: colors.border,
    borderRadius: 24, paddingVertical: 11, alignItems: 'center',
    backgroundColor: colors.white,
  },
  insuranceTotalText: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },

  // Grand total
  grandTotalCard: {
    backgroundColor: '#EFF6FF', borderRadius: 12,
    padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: '#BFDBFE',
  },
  grandTotalTopRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  grandTotalLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  offBadge: {
    backgroundColor: colors.badge || '#F97316',
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4,
  },
  offBadgeText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  grandTotalAmountRow: { flexDirection: 'row', alignItems: 'baseline' },
  rupeeSign: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  grandTotalAmount: { fontSize: 30, fontWeight: '900', color: colors.textPrimary },
  grandTotalGst: { fontSize: 12, color: colors.textSecondary, marginLeft: 4 },

  // Fare
  fareCard: {
    backgroundColor: colors.white, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 16,
  },
  fareTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginBottom: 14 },
  fareRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4,
  },
  fareLabel: { fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
  fareValue: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  discountValue: { color: colors.error || '#EF4444' },
  fareSubText: { fontSize: 11, color: colors.textMuted, marginBottom: 12 },
  fareSubLabel: { fontSize: 12, color: colors.textSecondary },
  fareSubValue: { fontSize: 12, color: colors.textSecondary },
  fareDivider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },

  importantTitle: {
    fontSize: 15, fontWeight: '800', color: colors.textPrimary, marginBottom: 12,
  },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkbox: {
    width: 20, height: 20, borderRadius: 4, borderWidth: 2,
    borderColor: colors.border, justifyContent: 'center',
    alignItems: 'center', marginTop: 1, flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  termsText: { flex: 1, fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  termsLink: { color: colors.primary, fontWeight: '500' },

  payBtn: {
    backgroundColor: colors.primary, borderRadius: 30,
    paddingVertical: 16, alignItems: 'center',
  },
  payBtnDisabled: { opacity: 0.45 },
  payBtnText: { color: colors.white, fontWeight: '700', fontSize: 17 },
});

export default ReviewPackageScreen;