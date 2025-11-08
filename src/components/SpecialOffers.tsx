import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { packageService, Package } from "../services/packageService";
import BgOffer from "../assets/img/Home/offer.jpg";

const SpecialOffers: React.FC = () => {
  const [offers, setOffers] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadSpecialOffers();
  }, []);

  const loadSpecialOffers = async () => {
    try {
      setLoading(true);
      const activePackages = await packageService.getPackages({ status: "Active" });
      const packagesWithImages = activePackages.filter(
        (pkg) => pkg.mainImage || (pkg.images && pkg.images.length > 0)
      );
      setOffers(packagesWithImages.slice(0, 3));
    } catch (error) {
      console.error("Error loading special offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath?: string) => (imagePath ? `https://backend.paradisepeaktravels.com${imagePath}` : "");

  const getPackageImage = (pkg: Package) =>
    pkg.mainImage ? getImageUrl(pkg.mainImage) : pkg.images && pkg.images.length > 0 ? getImageUrl(pkg.images[0].url) : "";

  const formatPrice = (pkg: Package) => {
    const symbol = pkg.currency === "USD" ? "US$" : "Rs.";
    return `${symbol}${pkg.price.toFixed(2)}`;
  };

  const handlePackageClick = (pkg: Package) => navigate(`/packages/${pkg.slug}`);

  return (
    /* removed -z-10 from section to avoid complex stacking issues */
    <section
      className="relative py-20 text-white bg-cover bg-center bg-no-repeat overflow-hidden bg-fixed"
      style={{ backgroundImage: `url(${BgOffer})` }}
    >
      {/* Overlay: allow pointer events to pass through */}
      {/* <div className="absolute inset-0 bg-[#00000080] pointer-events-none"></div> */}

      {/* Content must be above overlay */}
      <div className="relative max-w-7xl mx-auto text-center px-6 z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Special <span className="text-cyan-400">Offers & Packages</span>
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
         Discover our limited-time travel offers and exclusive tour packages across Sri Lanka and the Maldives. Whether you crave adventure, culture, or relaxation, ParadisePeak Travels brings you unforgettable experiences at unbeatable prices
        </motion.p>

        {loading ? (
          <div className="text-gray-300 py-16">Loading offers...</div>
        ) : offers.length === 0 ? (
          <div className="text-gray-300 py-16">No special offers available at the moment.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer._id}
                onClick={() => handlePackageClick(offer)}
                className="relative overflow-hidden group bg-[#23234c] shadow-lg hover:shadow-cyan-500/20 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <div className="relative">
                  <img
                    src={getPackageImage(offer)}
                    alt={offer.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-cyan-500 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-20">
                    <FaTag /> Special Offer
                  </div>
                </div>

                <div className="p-6 text-left flex flex-col justify-between h-[280px]">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                      {offer.description || offer.description || "Exciting adventure package awaits you!"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-cyan-400">{formatPrice(offer)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent outer card click
                        handlePackageClick(offer); // navigate to package page
                      }}
                      className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 text-white font-medium transition-all relative z-30"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecialOffers;
