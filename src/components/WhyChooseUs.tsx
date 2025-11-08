import React from "react";
import { motion } from "framer-motion";
import { FaWater, FaShieldAlt, FaUsers, FaFish, FaGlobeAmericas, FaPlaneDeparture } from "react-icons/fa";

const reasons = [
  {
    icon: <FaPlaneDeparture className="text-blue-600 text-3xl" />,
    title: "Expert Travel Planners",
    description:
      "Our dedicated travel experts curate every journey, ensuring your holiday across Sri Lanka and the Maldives is seamless and unforgettable.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
    title: "Safety & Comfort Guaranteed",
    description:
      "We prioritize your safety and comfort with trusted transport, reliable accommodations, and 24/7 support throughout your trip.",
  },
  {
    icon: <FaUsers className="text-blue-600 text-3xl" />,
    title: "Tailor-Made Experiences",
    description:
      "From adventure seekers to luxury travelers, we design tours that match your interests, pace, and style.",
  },
  {
    icon: <FaGlobeAmericas className="text-blue-600 text-3xl" />,
    title: "Diverse Destinations",
    description:
      "Discover pristine beaches, lush highlands, cultural landmarks, and hidden gems across Sri Lanka and the Maldives.",
  },
];


const WhyChooseUs: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-3xl text-[#00076b] mb-4">
        Why Choose Paradisepeak Travels for Your Next Travel Adventure?
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        With a commitment to professionalism, comfort, and unforgettable experiences, ParadisePeak Travels ensures every journey is a remarkable adventure across Sri Lanka and the Maldives.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 border border-gray-200 p-8 hover:shadow-md transition-all duration-300"
          >
            <div className="mb-4">{reason.icon}</div>
            <h3 className="text-lg text-gray-800 mb-2">{reason.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {reason.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
