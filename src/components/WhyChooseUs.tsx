import React from "react";
import { motion } from "framer-motion";
import { FaWater, FaShieldAlt, FaUsers, FaFish } from "react-icons/fa";

const reasons = [
  {
    icon: <FaWater className="text-blue-600 text-3xl" />,
    title: "Experienced Instructors",
    description:
      "Our certified instructors have years of experience guiding divers through Sri Lanka’s most scenic underwater sites.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
    title: "Safety First Approach",
    description:
      "We maintain international safety standards and use top-quality equipment to ensure a secure and comfortable experience.",
  },
  {
    icon: <FaUsers className="text-blue-600 text-3xl" />,
    title: "Personalized Dive Trips",
    description:
      "Whether you’re a beginner or expert, we tailor each dive to match your skill level and interests.",
  },
  {
    icon: <FaFish className="text-blue-600 text-3xl" />,
    title: "Rich Marine Biodiversity",
    description:
      "Explore coral reefs, shipwrecks, and vibrant marine life that make every dive with us truly unforgettable.",
  },
];

const WhyChooseUs: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-3xl text-[#00076b] mb-4">
        Why Choose Paradisepeak Travels for Your Next Travel Adventure?
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        With a commitment to professionalism, safety, and marine conservation, we make every dive a remarkable journey beneath the waves.
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
