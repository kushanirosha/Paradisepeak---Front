import React, { useState, useEffect } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { packageService, Package } from "../services/packageService";
import ApiService from "../services/ApiService";
import logo from "../assets/logo.png";

const PackageDetails = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
  const [previewSlip, setPreviewSlip] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userid");
    setIsLoggedIn(!!(token && role && userId));
  }, []);

  useEffect(() => {
    if (slug) loadPackage();
  }, [slug]);

  const loadPackage = async () => {
    try {
      setLoading(true);
      const data = await packageService.getPackageBySlug(slug!);
      setPackageData(data);
      setError(null);
    } catch (err: any) {
      setError(err?.error || "Package not found");
    } finally {
      setLoading(false);
    }
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    return {
      monthName: monthNames[currentMonth],
      year: currentYear,
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    };
  };

  const getImageUrl = (path?: string) =>
    path ? `https://backend.paradisepeaktravels.com${path}` : null;

  const getAllImages = () => {
    if (!packageData) return [];
    const images = [];
    if (packageData.mainImage) {
      const url = getImageUrl(packageData.mainImage);
      if (url) images.push({ url, alt: `${packageData.title} - Main Image` });
    }
    if (packageData.images?.length) {
      packageData.images.forEach((img, i) => {
        if (img.url !== packageData.mainImage) {
          const url = getImageUrl(img.url);
          if (url) images.push({ url, alt: img.alt || `${packageData.title} ${i + 1}` });
        }
      });
    }
    return images;
  };

  const formatPrice = (pkg: Package) =>
    `${pkg.currency === "USD" ? "US$" : "Rs."}${pkg.price.toFixed(2)}`;

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const handleBooking = async () => {
    if (!selectedDate) {
      alert("Please select a date before booking.");
      return;
    }

    const userId = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      alert("Please log in again.");
      navigate("/login");
      return;
    }

    setIsPaymentLoading(true); // ✅ Start loading overlay

    let userData;
    try {
      userData = await ApiService.getUserDataById();
    } catch {
      alert("Error fetching user data. Please re-login.");
      setIsPaymentLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("packageId", packageData?._id);
    formData.append("packageName", packageData?.title);
    formData.append(
      "name",
      `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim() || userData?.name
    );
    formData.append("email", userData?.email);
    formData.append("phone", userData?.phone || "N/A");
    formData.append("travelersCount", (adults + children).toString());
    formData.append("dateFrom", selectedDate);
    formData.append("dateTo", selectedDate);
    if (paymentSlip) formData.append("paymentSlip", paymentSlip);

    try {
      await ApiService.createBooking(formData);
      alert("✅ Booking request sent successfully!");
      navigate("/bookinghistory");
    } catch {
      alert("❌ Booking failed. Please try again.");
    } finally {
      setIsPaymentLoading(false); // ✅ End loading overlay
    }
  };


  if (loading)
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto text-center py-32">
          <h1 className="text-lg font-semibold text-gray-700">Loading package details...</h1>
        </div>
        <Footer />
      </>
    );

  if (error || !packageData)
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto text-center py-32">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Package Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "Package not found."}</p>
          <button
            onClick={() => navigate("/packages")}
            className="bg-blue-900 text-white px-6 py-2 hover:bg-blue-800"
          >
            Back to Packages
          </button>
        </div>
        <Footer />
      </>
    );

  const calendar = generateCalendarDays();
  const maxPeople = packageData.maxPeople || 10;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white shadow-lg p-6 my-28">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200"
        >
          ← Back to Packages
        </button>

        {/* Image gallery */}
        {getAllImages().length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img
              src={getAllImages()[0].url}
              alt={getAllImages()[0].alt}
              className="w-full md:w-1/2 h-72 object-cover shadow cursor-pointer"
              onClick={() => setSelectedImageIndex(0)}
            />
            {getAllImages().length > 1 && (
              <div className="grid grid-cols-2 gap-3 md:w-1/2">
                {getAllImages().slice(1).map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-36 object-cover shadow cursor-pointer hover:opacity-90"
                    onClick={() => setSelectedImageIndex(i + 1)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">No images available</div>
        )}

        <div className="text-sm text-gray-500 mb-2">{packageData.type}</div>
        <h2 className="text-2xl font-semibold border-b-4 border-blue-900 inline-block mb-6">
          {packageData.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT */}
          <div className="flex-1 space-y-4">
            {packageData.description && (
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-700 mt-1">{packageData.description}</p>
              </div>
            )}
            {packageData.highlights?.length > 0 && (
              <div>
                <h3 className="font-semibold">Key Highlights</h3>
                <ul className="list-disc list-inside text-gray-700 mt-1">
                  {packageData.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            )}
            {packageData.inclusions?.length > 0 && (
              <div>
                <h3 className="font-semibold">What's Included</h3>
                <ul className="list-disc list-inside text-gray-700 mt-1">
                  {packageData.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}
                </ul>
              </div>
            )}
            {packageData.exclusions?.length > 0 && (
              <div>
                <h3 className="font-semibold">What's Excluded</h3>
                <ul className="list-disc list-inside text-gray-700 mt-1">
                  {packageData.exclusions.map((exc, i) => <li key={i}>{exc}</li>)}
                </ul>
              </div>
            )}
            <div>
              <h3 className="font-semibold">Package Details</h3>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                <li>Duration: {packageData.duration}</li>
                {packageData.maxPeople && <li>Max People: {packageData.maxPeople}</li>}
                {packageData.difficulty && <li>Difficulty: {packageData.difficulty}</li>}
                {packageData.location && <li>Location: {packageData.location}</li>}
                <li>Category: {packageData.category}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Cancellation Policy</h3>
              <p className="text-gray-600 mt-1">
                Please contact{" "}
                <a href="tel:+94773581241" className="text-blue-900 font-medium hover:underline">
                  +94 77 358 1241
                </a>{" "}
                for cancellation policy details.{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 font-medium hover:underline"
                >
                  Terms and conditions
                </a>{" "}
                apply.
              </p>
            </div>

          </div>

          {/* RIGHT - Booking */}
          <div className="flex-1 bg-gray-50 p-6 shadow space-y-5">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-900">{formatPrice(packageData)}</h2>
              <p className="text-sm text-gray-500">{packageData.pricePerText || "per person"}</p>
            </div>

            {/* Participants */}
            <div>
              <h4 className="font-semibold mb-2">Participants</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>Adults: {adults}</span>
                  <button
                    onClick={() => setAdults(Math.min(maxPeople, adults + 1))}
                    className="px-3 py-1 bg-gray-200  hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>Children: {children}</span>
                  <button
                    onClick={() => setChildren(Math.min(maxPeople, children + 1))}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div>
              <h4 className="font-semibold mb-2">Choose a Date</h4>
              <div className="text-sm mb-2 font-medium">
                {calendar.monthName} {calendar.year}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendar.days.map((day) => {
                  const dateString = `${calendar.year}-${calendar.monthName}-${String(day).padStart(2, "0")}`;
                  const selected = selectedDate === dateString;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateString)}
                      className={`p-2 text-xs border ${selected
                        ? "bg-blue-900 text-white"
                        : "bg-white text-gray-700 hover:bg-blue-50"
                        }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Cost */}
            <div className="bg-blue-50 border border-blue-100 p-4 ">
              <p className="font-semibold mb-1">Total Cost</p>
              <p className="text-xl font-bold text-blue-900">
                {packageData.currency === "USD" ? "US$" : "Rs."}
                {(packageData.price * (adults + children * 0.5)).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                {adults} Adults + {children} Children × {formatPrice(packageData)}
              </p>
            </div>

            {/* Buttons */}
            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-900 text-white py-3 font-medium hover:bg-blue-800"
              >
                Please Login
              </button>
            ) : (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full bg-blue-900 text-white py-3 font-medium hover:bg-blue-800"
              >
                Book Now
              </button>
            )}

            <p className="text-xs text-center text-gray-500">Secure booking • No hidden fees</p>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-20 flex items-center justify-center z-50"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            className="relative max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getAllImages()[selectedImageIndex]?.url}
              alt={getAllImages()[selectedImageIndex]?.alt}
              className="w-full h-full max-w-[80vw] max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-3 right-3 bg-white bg-opacity-80 w-10 h-10 text-2xl leading-none"
            >
              ×
            </button>
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 w-10 h-10 text-2xl"
              >
                ‹
              </button>
            )}
            {selectedImageIndex < getAllImages().length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 w-10 h-10 text-2xl"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-[60]">
          <div className="relative bg-white sm:w-[500px] max-h-[90vh] lg:w-1/2 overflow-y-auto p-6 shadow-2xl">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-3 right-3 text-gray-600 text-2xl"
            >
              ×
            </button>

            <h2 className="text-center text-blue-900 font-bold text-xl mb-4">
              Bank Payment Details
            </h2>

            <div className="text-sm text-gray-800 mb-4 space-y-1">
              <p><b>Bank Name:</b> Bank of Ceylon</p>
              <p><b>Account Name:</b> D M S P MADUSANKA</p>
              <p><b>Account Number:</b> 7010757</p>
              <p><b>Branch:</b> Athurugiriya Branch</p>
              <p><b>SWIFT Code:</b> BCEYLKLXXXX</p>
            </div>

            {/* ✅ Trust & Process Section */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-5 text-sm text-gray-700">
              <h3 className="font-semibold text-blue-900 mb-2">Our Secure Booking Process</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Upload your payment receipt — full or half payment accepted.</li>
                <li>If partial payment is made, the remaining amount must be paid on arrival before the trip starts.</li>
                <li>After uploading, our team will verify your payment and send a confirmation email.</li>
                <li>You can edit your package within <b>24 hours after booking confirmation</b> through your user dashboard.</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                By proceeding, you agree to our{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 underline font-medium"
                >
                  Terms & Conditions
                </a>.
              </p>
            </div>

            {/* Upload Slip */}
            <div className="mb-5">
              <label className="font-semibold block mb-2">Upload Payment Slip</label>
              <label
                htmlFor="slip-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-blue-900 p-6 bg-blue-50 hover:bg-blue-100 cursor-pointer transition"
              >
                {!previewSlip ? (
                  <>
                    <span className="text-4xl text-blue-900">📎</span>
                    <span className="mt-2 text-blue-900 font-medium">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-gray-500 text-xs">PNG, JPG, JPEG only</span>
                  </>
                ) : (
                  <img
                    src={previewSlip}
                    alt="Payment Slip Preview"
                    className="w-full h-56 object-contain"
                  />
                )}
                <input
                  id="slip-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPaymentSlip(file);
                      setPreviewSlip(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleBooking}
              disabled={!paymentSlip}
              className={`w-full py-3 font-semibold ${paymentSlip
                ? "bg-blue-900 text-white hover:bg-blue-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
      {/* PAYMENT LOADING OVERLAY */}
      {isPaymentLoading && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-70 z-[70] flex flex-col items-center justify-center text-white">
          <img
            src={logo} // ✅ replace with your actual logo path
            alt="Paradise Peak Travels"
            className="w-24 h-24 mb-6 animate-pulse"
          />
          <p className="text-xl font-semibold">Payment is proceeding...</p>
        </div>
      )}


      <Footer />
    </>
  );
};

export default PackageDetails;
