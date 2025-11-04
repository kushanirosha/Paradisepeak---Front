import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { packageService, Package } from "../services/packageService";

const PACKAGES_CACHE_KEY = "packages_cache";
const PACKAGES_CACHE_TIME_KEY = "packages_cache_time";
const PACKAGES_ACTIVE_TAB_KEY = "packages_active_tab";
const PACKAGES_SCROLL_Y_KEY = "packages_scroll_y";
const PACKAGES_RESTORE_FLAG_KEY = "packages_restore_scroll";

const Packages = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState(() => {
    const saved = sessionStorage.getItem(PACKAGES_ACTIVE_TAB_KEY);
    return saved || "Maldives Packages";
  });
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = sessionStorage.getItem(PACKAGES_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setPackages(parsed);
          setLoading(false);
        }
      } catch {}
    }

    const useSilent = Boolean(cached);
    loadPackages(useSilent);

    const shouldRestore =
      sessionStorage.getItem(PACKAGES_RESTORE_FLAG_KEY) === "1";
    if (shouldRestore) {
      const y = Number(sessionStorage.getItem(PACKAGES_SCROLL_Y_KEY) || 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, isNaN(y) ? 0 : y);
      });
      sessionStorage.removeItem(PACKAGES_RESTORE_FLAG_KEY);
    }
  }, []);

  const loadPackages = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await packageService.getPackages({ status: "Active" });
      setPackages(data);
      sessionStorage.setItem(PACKAGES_CACHE_KEY, JSON.stringify(data));
      sessionStorage.setItem(PACKAGES_CACHE_TIME_KEY, String(Date.now()));
      setError(null);
    } catch (err) {
      console.error("Error loading packages:", err);
      if (!silent) {
        setError(err.error || err.message || "Failed to load packages");
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const getPackagesByTabAndType = (tab, type) =>
    packages.filter(
      (pkg) =>
        pkg.category === (tab.includes("Maldives") ? "Maldives" : "Sri Lanka") &&
        pkg.type === type
    );

  const formatPrice = (pkg) => {
    const symbol = pkg.currency === "USD" ? "US$" : "Rs.";
    return `${symbol}${pkg.price.toFixed(2)}`;
  };

  const getPackageDetails = (pkg) => {
    const details = [];
    if (pkg.duration) details.push(pkg.duration);
    if (pkg.maxPeople) details.push(`Max ${pkg.maxPeople} people`);
    if (pkg.difficulty) details.push(pkg.difficulty);
    return details.slice(0, 3);
  };

  const getPackageFeatures = (pkg) => {
    const features = [];
    if (pkg.inclusions && pkg.inclusions.length > 0) {
      features.push(...pkg.inclusions.slice(0, 4));
    }
    return features;
  };

  const handlePackageClick = (pkg) => {
    sessionStorage.setItem(PACKAGES_SCROLL_Y_KEY, String(window.scrollY));
    sessionStorage.setItem(PACKAGES_RESTORE_FLAG_KEY, "1");
    navigate(`/packages/${pkg.slug}`);
  };

  const selectTab = (tab) => {
    setActiveTab(tab);
    sessionStorage.setItem(PACKAGES_ACTIVE_TAB_KEY, tab);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto py-32 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#120075]">
            Loading packages...
          </h1>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto py-32 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-red-500">
            Error loading packages
          </h1>
          <p className="text-gray-600 my-4">{error}</p>
          <button
            onClick={() => loadPackages(false)}
            className="bg-[#000769] text-white px-6 py-2 hover:bg-blue-800 transition"
          >
            Retry
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const multiDayTours = getPackagesByTabAndType(activeTab, "MULTI DAY TOURS");
  const dayTrips = getPackagesByTabAndType(activeTab, "DAY TRIPS");
  const experiences = getPackagesByTabAndType(activeTab, "EXPERIENCES");

  const renderPackageCard = (pkg) => (
    <div
      key={pkg._id}
      onClick={() => handlePackageClick(pkg)}
      className="bg-white shadow-md overflow-hidden cursor-pointer w-full sm:w-[calc(50%-12px)] lg:w-[calc(33%-16px)] mb-6"
    >
      <img
        src={
          pkg.mainImage
            ? `https://backend.colombodivers.lk${pkg.mainImage}`
            : "https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg.webp"
        }
        alt={pkg.title}
        className="w-full h-40 sm:h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{pkg.title}</h3>
        <div className="text-xl font-bold text-[#000769] mb-2">
          {formatPrice(pkg)}
          <span className="text-sm font-normal text-gray-600 ml-1">
            {pkg.pricePerText || "per person"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {getPackageDetails(pkg).map((detail, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-600 text-xs px-2 py-1"
            >
              {detail}
            </span>
          ))}
        </div>
        <div className="text-gray-600 text-sm">
          {getPackageFeatures(pkg).map((feature, idx) => (
            <div key={idx}>• {feature}</div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#120075]">
          Tour Packages
        </h1>
        <p className="text-center text-gray-700 mt-2 mb-8 text-sm sm:text-base">
          Choose from our carefully curated experiences. <br/>Enjoy expert-friendly advice and hassle-free booking for multi-day tours and unique experiences.
        </p>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-8">
          {["Maldives Packages", "Sri Lanka Packages"].map((tab) => (
            <button
              key={tab}
              onClick={() => selectTab(tab)}
              className={`px-4 py-2 font-semibold w-full sm:w-auto transition ${
                activeTab === tab
                  ? "bg-[#000769] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.replace(" Packages", "")}
            </button>
          ))}
        </div>

        {/* Packages by type */}
        {multiDayTours.length > 0 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-center my-6">MULTI DAY TOURS</h2>
            <div className="flex flex-wrap gap-4 justify-center">{multiDayTours.map(renderPackageCard)}</div>
          </>
        )}

        {dayTrips.length > 0 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-center my-6">DAY TRIPS</h2>
            <div className="flex flex-wrap gap-4 justify-center">{dayTrips.map(renderPackageCard)}</div>
          </>
        )}

        {experiences.length > 0 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-center my-6">EXPERIENCES</h2>
            <div className="flex flex-wrap gap-4 justify-center">{experiences.map(renderPackageCard)}</div>
          </>
        )}

        {multiDayTours.length === 0 && dayTrips.length === 0 && experiences.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            <h3 className="text-lg font-semibold">No packages available</h3>
            <p>No packages found for {activeTab.replace(" Packages", "")}. Please check back later.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Packages;
