import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 flex flex-col mt-32">
        {/* Header */}
        <header className="bg-blue-900 text-white py-6 shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Terms and Conditions</h1>
            <button
              onClick={() => navigate("/")}
              className="text-white hover:underline"
            >
              ← Back to Home
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Paradise peak Travels (Pvt) Ltd. By using our services, you agree
              to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="text-xl font-semibold mb-4">Booking & Payment</h2>
            <p className="text-gray-700 mb-4">
              All bookings must be confirmed with full payment. Payment slips
              should be uploaded as proof of payment. Paradise peak Travels (Pvt) Ltd is
              not responsible for delays caused by banks or other payment
              methods.
            </p>

            <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>
            <p className="text-gray-700 mb-4">
              Cancellations must be made at least 48 hours before the booked date.
              Please contact our support team at{" "}
              <a href="tel:+94758109822" className="text-blue-900 hover:underline">
                +94 75 810 9822
              </a>{" "}
              for assistance. Terms and conditions apply.
            </p>

            <h2 className="text-xl font-semibold mb-4">Liability</h2>
            <p className="text-gray-700 mb-4">
              Paradise peak Travels (Pvt) Ltd is not responsible for any losses, damages, or
              inconveniences caused during travel or due to unforeseen events.
            </p>

            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              For any questions regarding these terms, please contact us at{" "}
              <a href="mailto:info@colombodivers.com" className="text-blue-900 hover:underline">
                info@colombodivers.com
              </a>.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
