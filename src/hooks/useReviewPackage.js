import { useState, useCallback } from 'react';
import {
  updateTravellers,
  confirmBooking,
  createPayment,
  paymentSuccess,
} from '../services/packageService';

const STEPS = ['TravellerDetails', 'AddOns', 'PaymentSummary'];

const INSURANCE_PRICE_PER_PERSON = 117;

const useReviewPackage = ({ packageId, bookingId, basePrice = 0, travellersCount = 2 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingForSelf, setBookingForSelf] = useState(true);
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ── Booking API state ──────────────────────────────────────────────────────
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isBookingError, setIsBookingError] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const [travellers, setTravellers] = useState(
    Array.from({ length: travellersCount }, (_, i) => ({
      id: String(i + 1),
      name: '',
      age: '',
      type: 'ADULT',
      email: '',
      mobile: '',
      gender: '',
      passport: '',
    })),
  );

  // ── Traveller mutations ────────────────────────────────────────────────────
  const updateTraveller = useCallback((index, field, value) => {
    setTravellers((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    );
  }, []);

  const addTraveller = useCallback((type = 'ADULT') => {
    setTravellers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: '',
        age: '',
        type,
        email: '',
        mobile: '',
        gender: '',
        passport: '',
      },
    ]);
  }, []);

  const removeTraveller = useCallback((index) => {
    setTravellers((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  // ── Price calculations ─────────────────────────────────────────────────────
  const couponDiscount = Math.round(basePrice * 0.05);
  const gst = Math.round(basePrice * 0.05);
  const insuranceCost = insuranceSelected
    ? INSURANCE_PRICE_PER_PERSON * travellers.length
    : 0;
  const grandTotal = basePrice - couponDiscount + gst + insuranceCost;

  // ── Step navigation ────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const currentStepName = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  // ── Booking flow ───────────────────────────────────────────────────────────
  // Booking was already created on "Book Now" in PackageDetailScreen.
  // Here: update travellers → confirm → payment → payment-success.
  const handleProceedToPay = useCallback(async () => {
    if (!termsAccepted) return;
    setIsBookingLoading(true);
    setIsBookingError(false);
    try {
      // Step 1: Save traveller details
      await updateTravellers(bookingId, { travellers });

      // Step 2: Confirm booking
      await confirmBooking(bookingId);

      // Step 3: Create payment then mark success
      await createPayment(bookingId);
      const result = await paymentSuccess(bookingId);

      setBookingResult(result);
      setIsBookingSuccess(true);
    } catch (err) {
      setIsBookingError(true);
    } finally {
      setIsBookingLoading(false);
    }
  }, [termsAccepted, bookingId, travellers]);

  return {
    currentStep,
    currentStepName,
    isLastStep,
    goNext,
    goBack,
    bookingForSelf,
    setBookingForSelf,
    travellers,
    updateTraveller,
    addTraveller,
    removeTraveller,
    insuranceSelected,
    setInsuranceSelected,
    insuranceCost,
    termsAccepted,
    setTermsAccepted,
    couponDiscount,
    gst,
    grandTotal,
    basePrice,
    submitBooking: handleProceedToPay,
    isBookingLoading,
    isBookingSuccess,
    isBookingError,
    bookingResult,
  };
};

export default useReviewPackage;