import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Package } from "../services/packageService";
import { packageService } from "../services/packageService";

const Bookable: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedPackages();
  }, []);

  const loadFeaturedPackages = async () => {
    try {
      setLoading(true);
      const activePackages = await packageService.getPackages({ status: "Active" });
      const packagesWithImages = activePackages.filter(
        (pkg) => pkg.mainImage || (pkg.images && pkg.images.length > 0)
      );
      setPackages(packagesWithImages.slice(0, 6));
    } catch (error) {
      console.error("Error loading packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (pkg: Package) => {
    const symbol = pkg.currency === "USD" ? "US$" : "Rs.";
    return `${symbol}${pkg.price.toFixed(2)}`;
  };

  const getImageUrl = (imagePath?: string) => (imagePath ? `https://backend.paradisepeaktravels.com${imagePath}` : "");

  const getPackageImage = (pkg: Package) =>
    pkg.mainImage ? getImageUrl(pkg.mainImage) : pkg.images && pkg.images.length > 0 ? getImageUrl(pkg.images[0].url) : "";

  const handlePackageClick = (pkg: Package) => navigate(`/packages/${pkg.slug}`);

  const displayPackages = packages.filter((pkg) => getPackageImage(pkg));

  return (
	<div className="bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-thin text-gray-900 mb-2">
          <span className="text-blue-900">Bookable</span> Adventures
        </h2>
        <h3 className="text-xl text-gray-700 mb-4">
          Explore curated experiences across Maldives & Sri Lanka
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Choose from beginner-friendly adventures to advanced excursions and create unforgettable memories with our exclusive packages.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-24">
          <span className="text-gray-500 text-lg">Loading amazing adventures...</span>
        </div>
      ) : displayPackages.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-gray-600 text-lg mb-2">No packages available</p>
          <p className="text-gray-400">Please check back later for exciting adventures!</p>
        </div>
      ) : (
        <>
          {/* Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {displayPackages.map((pkg) => (
              <div
                key={pkg._id}
                onClick={() => handlePackageClick(pkg)}
                className="bg-white shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition-all" data-aos="zoom-in"
              >
                <div className="relative">
                  <img
                    src={getPackageImage(pkg)}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">{pkg.title}</h3>
                  <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                    <span>{pkg.duration}</span>
                    {pkg.maxPeople && <span>Max: {pkg.maxPeople}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">{formatPrice(pkg)}</span>
                      <span className="text-gray-400 text-sm ml-1">/ {pkg.pricePerText || "person"}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePackageClick(pkg);
                      }}
                      className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 font-medium transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link to="/packages">
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 font-semibold transition">
                View All Packages
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
	</div>
  );
};

export default Bookable;
