import React from "react";
import { FaSwimmer, FaUserNinja, FaCameraRetro, FaMapMarkedAlt, FaMountain, FaShip, FaUmbrellaBeach } from "react-icons/fa";
import { Link } from "react-router-dom";

import DiveBeginner from "../assets/img/Home/Services/1.webp";
import DiveAdvanced from "../assets/img/Home/Services/2.webp";
import DivePhoto from "../assets/img/Home/Services/3.webp";
import DiveExplore from "../assets/img/Home/Services/4.webp";

type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    icon: <FaUmbrellaBeach size={36} className="text-[#000000]" />,
    title: "Tropical Beach Escapes",
    description:
      "Relax and unwind on the golden beaches of Sri Lanka and the Maldives. Enjoy turquoise waters, luxury resorts, and breathtaking sunsets.",
    features: ["5-Star Beach Resorts", "Private Transfers", "Customized Itineraries"],
    image: DiveBeginner,
    alt: "Couple enjoying a beach sunset",
  },
  {
    icon: <FaMountain size={36} className="text-[#000000]" />,
    title: "Cultural & Nature Tours",
    description:
      "Explore Sri Lanka’s cultural heritage and natural wonders — from ancient temples and tea plantations to scenic highlands and waterfalls.",
    features: ["Heritage Sites", "Local Guides", "Eco-Friendly Transport"],
    image: DiveAdvanced,
    alt: "Traveler exploring a mountain view in Sri Lanka",
  },
  {
    icon: <FaShip size={36} className="text-[#000000]" />,
    title: "Island Hopping Adventures",
    description:
      "Discover multiple islands across the Maldives and Sri Lanka. Perfect for travelers seeking a blend of adventure, relaxation, and culture.",
    features: ["Luxury Cruises", "Multiple Destinations", "All-Inclusive Packages"],
    image: DivePhoto,
    alt: "Boat cruising between tropical islands",
  },
  {
    icon: <FaMapMarkedAlt size={36} className="text-[#000000]" />,
    title: "Tailor-Made Holiday Packages",
    description:
      "Create your dream vacation with ParadisePeak Travels. Choose destinations, activities, and accommodations that fit your style and budget.",
    features: ["Custom Itineraries", "Expert Travel Planning", "24/7 Support"],
    image: DiveExplore,
    alt: "Traveler planning a trip with a map",
  },
];

const Services = () => {
  const [hoverIndex, setHoverIndex] = React.useState<number>(0);

  return (
    <section className="bg-white py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-left">
          <p className="text-[#0f0061] text-xl sm:text-2xl uppercase tracking-wider mb-3">
            Our Services
          </p>
          <h2 className="text-[#0003af] text-3xl sm:text-4xl mb-4 leading-tight">
            Unlock Our Exclusive <br /> Services Just for You
          </h2>
          <p className="text-gray-600 max-w-full sm:max-w-md text-sm sm:text-base">
            Experience tailor-made Travel adventures designed for beginners and
            experts alike — explore the beauty of Maldives & Sri Lanka.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left image */}
          <div className="md:sticky md:top-28 w-full h-[250px] sm:h-[350px] md:h-[700px] overflow-hidden">
            <img
              src={services[hoverIndex].image}
              alt={services[hoverIndex].alt}
              className="w-full h-full object-cover shadow-xl transition-all duration-500"
            />
          </div>

          {/* Right service list */}
          <div className="space-y-10 sm:space-y-12">
            {services.map((service, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoverIndex(idx)}
                className={`group border-b border-gray-200 pb-8 sm:pb-10 transition-all duration-300 ${idx === services.length - 1 ? "border-none pb-0" : ""
                  }`}
              >
                {/* Header */}
                <div className="flex items-start cursor-pointer">
                  <span className="text-[#0b006b] text-base sm:text-lg font-semibold mr-3 min-w-[30px]">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <h3 className="text-gray-800 font-semibold text-lg sm:text-xl">
                    {service.title}
                  </h3>
                </div>

                {/* Expandable Content */}
                <div
                  className={`ml-10 overflow-hidden transition-all duration-500 ease-in-out ${hoverIndex === idx
                      ? "max-h-[400px] opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                    }`}
                >
                  <p className="text-gray-600 text-sm sm:text-base mt-4 mb-3 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm sm:text-base text-gray-700"
                      >
                        <div className="w-2 h-2 bg-[#001780] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <Link to="/packages">
              <button className="bg-[#001263] text-white px-8 sm:px-10 py-3 sm:py-4 font-semibold mt-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto">
                Explore All Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
