import React from "react";
import { motion } from "framer-motion";

interface Award {
  title: string;
  description: string;
  year: number;
  iconUrl?: string;
}

const awards: Award[] = [
  {
    title: "Best Travel Experience Award",
    description:
      "Recognized for delivering exceptional holiday experiences across Sri Lanka and the Maldives with unmatched service quality.",
    year: 2024,
    iconUrl: "https://img.icons8.com/ios-filled/100/0077b6/trophy.png",
  },
  {
    title: "Excellence in Sustainable Tourism",
    description:
      "Honored for promoting eco-friendly travel and supporting local communities through responsible tourism initiatives.",
    year: 2023,
    iconUrl: "https://img.icons8.com/ios-filled/100/0077b6/leaf.png",
  },
  {
    title: "Top Island Getaway Provider",
    description:
      "Awarded for curating luxurious and memorable island escapes in the Maldives and Sri Lanka’s coastal regions.",
    year: 2022,
    iconUrl: "https://img.icons8.com/ios-filled/100/0077b6/medal.png",
  },
];


const AwardSection: React.FC = () => (
  <section className="py-24 bg-gradient-to-b from-[#e0f7ff] to-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-5xl text-[#003366] mb-3">
        Our Awards & Achievements
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Over the years, ParadisePeak Travels has been celebrated for creating unforgettable travel experiences, promoting sustainable tourism, and delivering exceptional service across Sri Lanka and the Maldives.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {awards.map((award, index) => (
          <motion.div
            key={award.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="bg-white border border-blue-100 text-center p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-center mb-5">
              <div className="bg-blue-100 p-4 rounded-full">
                <img src={award.iconUrl} alt={award.title} className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#003366] mb-2">
              {award.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {award.description}
            </p>
            <div className="text-blue-600 font-semibold text-sm">{award.year}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AwardSection;
