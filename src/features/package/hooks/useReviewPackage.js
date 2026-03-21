import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../services/packageService';

const STEPS = ['TravellerDetails', 'AddOns', 'PaymentSummary'];

const INSURANCE_PRICE_PER_PERSON = 117; // ₹936 / 8 travellers

const useReviewPackage = ({ packageId, basePrice = 0, travellersCount = 2 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingForSelf, setBookingForSelf] = useState(true);
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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
      { id: String(prev.length + 1), name: '', age: '', type, email: '', mobile: '', gender: '', passport: '' },
    ]);
  }, []);

  // ── Price calculations ─────────────────────────────────────────────────────
  const couponDiscount = Math.round(basePrice * 0.05);
  const gst = Math.round(basePrice * 0.05);
  const insuranceCost = insuranceSelected
    ? INSURANCE_PRICE_PER_PERSON * travellers.length
    : 0;
  const grandTotal = basePrice - couponDiscount + gst + insuranceCost;

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const currentStepName = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  // ── Booking API call ───────────────────────────────────────────────────────
  const {
    mutate: submitBooking,
    isPending: isBookingLoading,
    isSuccess: isBookingSuccess,
    isError: isBookingError,
    data: bookingResult,
  } = useMutation({
    mutationFn: () =>
      createBooking({
        packageId,
        totalAmount: grandTotal,
        travellers,
      }),
  });

  const handleProceedToPay = useCallback(() => {
    if (!termsAccepted) return;
    submitBooking();
  }, [termsAccepted, submitBooking]);

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
