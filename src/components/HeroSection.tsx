import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


import hero1 from "../assets/img/Home/Hero/hero1.webp";
import hero2 from "../assets/img/Home/Hero/hero2.webp";
import hero3 from "../assets/img/Home/Hero/hero3.webp";
import hero4 from "../assets/img/Home/Hero/hero4.webp";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const images = [hero1, hero2, hero3, hero4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, [images.length]);

  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt="Paradisepeak Travels"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Text Content */}
      <div className="relative text-center text-white px-6 md:px-12 max-w-3xl">
        <motion.h1
          className="text-4xl md:text-6xl mb-4 drop-shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore the Deep with{" "}
          <span className="text-cyan-400">Paradisepeak Travels</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 leading-relaxed text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Dive into Sri Lanka’s most stunning underwater worlds — from coral gardens to
          hidden shipwrecks. Discover your next adventure beneath the surface.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <button
            onClick={() => navigate("/packages")}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg">
            Book Your Dive
          </button>
          <button
            onClick={() => navigate("/about")}
            className="border-2 border-white hover:bg-white hover:text-black px-6 py-3 font-semibold transition-all duration-300">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-white" : "bg-gray-400"
              }`}
            onClick={() => setCurrentIndex(i)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
