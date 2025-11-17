// src/pages/PackageDetails.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { packageService, Package } from "../services/packageService";
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

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    // Empty slots before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getImageUrl = (path?: string) => path ? `https://backend.paradisepeaktravels.com${path}` : null;

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

  const maxPeople = packageData?.maxPeople || 10;

  // PRESERVED EXACTLY — your original booking logic
  const handleBookNow = () => {
    if (!isLoggedIn) {
      alert("Please login to continue booking.");
      navigate("/login");
      return;
    }
    if (!selectedDate) {
      alert("Please select a travel date.");
      return;
    }

    navigate("/bookings", {
      state: {
        packageId: packageData?._id,
        packageName: packageData?.title,
        adults,
        children,
        selectedDate,
        totalPrice: packageData?.price * (adults + children * 0.5),
        currency: packageData?.currency,
      },
    });
  };

  // Format date as YYYY-MM-DD
  const formatDateString = (day: number) => {
    const monthPadded = String(currentMonth + 1).padStart(2, "0");
    const dayPadded = String(day).padStart(2, "0");
    return `${currentYear}-${monthPadded}-${dayPadded}`;
  };

  const calendarDays = generateCalendarDays();

  if (loading) return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto text-center py-32">
        <h1 className="text-lg font-semibold text-gray-700">Loading package details...</h1>
      </div>
      <Footer />
    </>
  );

  if (error || !packageData) return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto text-center py-32">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Package Not Found</h1>
        <p className="text-gray-600 mb-6">{error || "Package not found."}</p>
        <button onClick={() => navigate("/packages")} className="bg-blue-900 text-white px-6 py-2 hover:bg-blue-800">
          ← Back to Packages
        </button>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white shadow-lg p-6 my-28">
        <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200">
          ← Back to Packages
        </button>

        {/* Image Gallery */}
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
          {/* LEFT: Details */}
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
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-900 font-medium hover:underline">
                  Terms and conditions
                </a>{" "}
                apply.
              </p>
            </div>
          </div>

          {/* RIGHT: Booking Card */}
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
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">-</button>
                  <span>Adults: {adults}</span>
                  <button onClick={() => setAdults(Math.min(maxPeople, adults + 1))} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">+</button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setChildren(Math.max(0, children - 1))} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">-</button>
                  <span>Children: {children}</span>
                  <button onClick={() => setChildren(Math.min(maxPeople, children + 1))} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">+</button>
                </div>
              </div>
            </div>

            {/* Calendar with Month/Year Navigation */}
            <div>
              <h4 className="font-semibold mb-2">Choose a Date</h4>
              <div className="flex items-center justify-between mb-3">
                <button onClick={handlePrevMonth} className="text-blue-900 bg-gray-100 font-bold hover:bg-blue-100 px-3 py-1">Previous</button>
                <div className="text-sm font-bold text-blue-900">
                  {monthNames[currentMonth]} {currentYear}
                </div>
                <button onClick={handleNextMonth} className="text-blue-900 bg-gray-100 font-bold hover:bg-blue-100 px-3 py-1">Next</button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600 mb-1">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="p-2"></div>;
                  }
                  const dateStr = formatDateString(day);
                  const isSelected = selectedDate === dateStr;
                  const isPast = new Date(dateStr) < new Date().setHours(0, 0, 0, 0);

                  return (
                    <button
                      key={day}
                      onClick={() => !isPast && setSelectedDate(dateStr)}
                      disabled={isPast}
                      className={`p-2 text-sm border rounded transition ${
                        isPast
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isSelected
                          ? "bg-blue-900 text-white"
                          : "bg-white hover:bg-blue-50 text-gray-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Cost */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded">
              <p className="font-semibold mb-1">Total Cost</p>
              <p className="text-xl font-bold text-blue-900">
                {packageData.currency === "USD" ? "US$" : "Rs."}
                {(packageData.price * (adults + children * 0.5)).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {adults} Adults + {children} Children × {formatPrice(packageData)}
              </p>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookNow}
              className="w-full bg-blue-900 text-white py-3 font-medium hover:bg-blue-800 transition"
            >
              Book Now
            </button>
            <p className="text-xs text-center text-gray-500">Secure booking • No hidden fees</p>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setSelectedImageIndex(null)}>
          <div className="relative max-w-[90%] max-h-[90%]" onClick={(e) => e.stopPropagation()}>
            <img
              src={getAllImages()[selectedImageIndex]?.url}
              alt={getAllImages()[selectedImageIndex]?.alt}
              className="w-full h-full max-w-[80vw] max-h-[80vh] object-contain"
            />
            <button onClick={() => setSelectedImageIndex(null)} className="absolute top-3 right-3 bg-white bg-opacity-80 w-10 h-10 text-2xl leading-none rounded-full">×</button>
            {selectedImageIndex > 0 && (
              <button onClick={() => setSelectedImageIndex(selectedImageIndex - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 w-10 h-10 text-2xl rounded-full">Previous</button>
            )}
            {selectedImageIndex < getAllImages().length - 1 && (
              <button onClick={() => setSelectedImageIndex(selectedImageIndex + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 w-10 h-10 text-2xl rounded-full">Next</button>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PackageDetails;