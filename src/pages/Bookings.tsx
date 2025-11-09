// src/pages/Bookings.tsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCommentDots, FaCheckCircle } from "react-icons/fa";
import ApiService from "../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface BookingState {
  packageId: string;
  packageName: string;
  adults: number;
  children: number;
  selectedDate: string;
  totalPrice: number;
  currency: string;
}

const Bookings: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingState;

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
  const [previewSlip, setPreviewSlip] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  // Auto-fetch user data and pre-fill name/email
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        alert("You must be logged in to book.");
        navigate("/login");
        return;
      }

      try {
        const userData = await ApiService.getUserDataById();
        if (userData) {
          setFormData(prev => ({
            ...prev,
            fullName: userData.name || prev.fullName,
            email: userData.email || prev.email,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
        // Allow manual entry if fetch fails
      }
    };

    if (state) {
      fetchUserData();
    } else {
      navigate("/packages");
    }
  }, [state, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentSlip(file);
      setPreviewSlip(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!paymentSlip) return alert("Please upload payment slip");
    if (!formData.fullName || !formData.phone) return alert("Please fill all required fields");

    setIsLoading(true);

    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        alert("You must be logged in to book.");
        navigate("/login");
        setIsLoading(false);
        return;
      }

      let userData;
      try {
        userData = await ApiService.getUserDataById();
      } catch (err) {
        console.error("Failed to fetch user data", err);
        alert("Failed to load user info. Please try again.");
        setIsLoading(false);
        return;
      }

      const finalName = formData.fullName.trim() || userData?.name || "Guest";
      const finalEmail = formData.email || userData?.email;

      if (!finalEmail) {
        alert("Email is required. Please log in again.");
        setIsLoading(false);
        return;
      }

      const bookingFormData = new FormData();
      bookingFormData.append("userId", userId);
      bookingFormData.append("packageId", state.packageId);
      bookingFormData.append("packageName", state.packageName);
      bookingFormData.append("name", finalName);
      bookingFormData.append("email", finalEmail);
      bookingFormData.append("phone", formData.phone);
      bookingFormData.append("travelersCount", (state.adults + state.children).toString());
      bookingFormData.append("dateFrom", state.selectedDate);
      bookingFormData.append("dateTo", state.selectedDate);
      bookingFormData.append("specialRequests", formData.specialRequests);
      bookingFormData.append("paymentSlip", paymentSlip);

      await ApiService.createBooking(bookingFormData);
      setShowSuccess(true);

      // Save email for BookingHistory page
      localStorage.setItem("email", finalEmail);

    } catch (error: any) {
      console.error("Booking error:", error);
      alert(error?.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!state) return null;

  // SUCCESS SCREEN
  if (showSuccess) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
            <div className="mb-6">
              <FaCheckCircle className="text-8xl text-green-500 mx-auto animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Booking Successful!</h1>
            <p className="text-gray-700 text-lg mb-6">
              Thank you for your booking. Our team will verify your payment and confirm within <strong>24 hours</strong>.
            </p>
            <p className="text-gray-600 mb-8">
              You can track your booking status in your dashboard.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/bookinghistory")}
                className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold hover:bg-blue-800 transition text-lg"
              >
                Go to My Bookings
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition text-lg"
              >
                Back to Home
              </button>
            </div>

            <div className="mt-10 text-sm text-gray-600">
              <p>
                Need help? Contact us at{" "}
                <a href="tel:+94773581241" className="font-bold text-blue-900 hover:underline">
                  +94 77 358 1241
                </a>{" "}
                or{" "}
                <a href="mailto:info@paradisepeaktravels.com" className="font-bold text-blue-900 hover:underline">
                  info@paradisepeaktravels.com
                </a>
              </p>
              <p className="mt-3">
                Please contact{" "}
                <a href="tel:+94773581241" className="font-bold text-blue-900 hover:underline">
                  +94 77 358 1241
                </a>{" "}
                for cancellation policy details.{" "}
                <a href="/terms" target="_blank" className="font-bold text-blue-900 hover:underline">
                  Terms and conditions
                </a>{" "}
                apply.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // MAIN BOOKING FORM
  return (
    <Layout>
      {/* Hero */}
      <div className="w-full h-[60vh] relative">
        <img
          src="https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg"
          alt="Book Your Journey"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-10 text-white">
          <h1 className="text-5xl font-bold font-serif">Complete Your Booking</h1>
          <p className="text-xl mt-2">One step away from paradise</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white shadow-2xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Booking Details</h2>

          {/* Package Summary */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-xl text-blue-900">{state.packageName}</h3>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <p><strong>Adults:</strong> {state.adults}</p>
              <p><strong>Children:</strong> {state.children}</p>
              <p><strong>Date:</strong> {state.selectedDate}</p>
              <p><strong>Total:</strong> {state.currency === "USD" ? "US$" : "Rs."}{state.totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
                disabled
                readOnly
              />
              {formData.email && (
                <p className="text-xs text-gray-500 mt-1">
                  Email locked to your account
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94 77 123 4567"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                Travel Date
              </label>
              <input
                type="text"
                value={state.selectedDate}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div className="mb-8">
            <label className="flex items-center gap-2 font-semibold mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={4}
              placeholder="Dietary needs, room preferences, etc."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bank Details */}
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-blue-900 mb-3">Bank Transfer Details</h3>
            <div className="text-sm space-y-1">
              <p><strong>Bank:</strong> Bank of Ceylon</p>
              <p><strong>Account Name:</strong> D M S P MADUSANKA</p>
              <p><strong>Account No:</strong> 7010757</p>
              <p><strong>Branch:</strong> Athurugiriya</p>
              <p><strong>SWIFT:</strong> BCEYLKLXXXX</p>
            </div>
          </div>

          {/* Upload Slip */}
          <div className="mb-10">
            <label className="block font-bold mb-3">Upload Payment Slip <span className="text-red-500">*</span></label>
            <label
              htmlFor="slip-upload"
              className="block border-2 border-dashed border-blue-900 p-12 text-center cursor-pointer hover:bg-blue-50 transition rounded-lg"
            >
              {!previewSlip ? (
                <div>
                  <span className="text-6xl text-blue-900">Attach</span>
                  <p className="mt-3 text-lg font-medium text-blue-900">Click to upload</p>
                  <p className="text-gray-500">PNG, JPG, JPEG only</p>
                </div>
              ) : (
                <img src={previewSlip} alt="Payment Slip" className="max-h-80 mx-auto rounded" />
              )}
              <input id="slip-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!paymentSlip || isLoading || !formData.fullName || !formData.phone}
            className={`w-full py-4 text-xl font-bold text-white rounded-lg transition ${
              paymentSlip && !isLoading && formData.fullName && formData.phone
                ? "bg-blue-900 hover:bg-blue-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Processing..." : "Confirm & Complete Booking"}
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-gray-600 text-sm">
          <p>
            For any issues, please contact{" "}
            <a href="tel:+94773581241" className="font-bold text-blue-900 hover:underline">
              +94 77 358 1241
            </a>{" "}
            or email{" "}
            <a href="mailto:info@paradisepeaktravels.com" className="font-bold text-blue-900 hover:underline">
              info@paradisepeaktravels.com
            </a>
          </p>
          <p className="mt-3">
            Please contact{" "}
            <a href="tel:+94773581241" className="font-bold text-blue-900 hover:underline">
              +94 77 358 1241
            </a>{" "}
            for cancellation policy details.{" "}
            <a href="/terms" target="_blank" className="font-bold text-blue-900 hover:underline">
              Terms and conditions
            </a>{" "}
            apply.
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 text-white">
          <img src={logo} alt="Logo" className="w-28 h-28 mb-6 animate-pulse" />
          <p className="text-2xl font-semibold">Processing your booking...</p>
        </div>
      )}
    </Layout>
  );
};

export default Bookings;