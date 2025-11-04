import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import ApiService from "../services/ApiService";

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await ApiService.getGallery();
        if (data && data.data) setGalleryItems(data.data);
      } catch (err) {
        console.error("Failed to load gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = galleryItems.filter((item) => {
    const tab = activeTab.toLowerCase();
    if (tab === "all") return true;
    return item.country?.toLowerCase() === tab;
  });

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) => (prev! + 1) % filteredItems.length);
      else if (e.key === "ArrowLeft")
        setSelectedIndex(
          (prev) => (prev! - 1 + filteredItems.length) % filteredItems.length
        );
      else if (e.key === "Escape") setSelectedIndex(null);
    },
    [selectedIndex, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const journeyPanels = useMemo(
    () => [
      {
        title: "Meaningful Moments Come From Real Connections.",
        img: "https://images.unsplash.com/photo-1615039666131-964929ad0f1e?q=80&w=1974&auto=format&fit=crop",
      },
      {
        title: "We Believe True Indulgence Is Personal.",
        img: "https://images.unsplash.com/photo-1557750505-e7b4d1c40410?q=80&w=1974&auto=format&fit=crop",
      },
      {
        title: "Rebalance In Unforgettable Settings.",
        img: "https://images.unsplash.com/photo-1618288197176-1641dce9b108?q=80&w=1974&auto=format&fit=crop",
      },
      {
        title: "We Don’t Just Serve - We Share Stories.",
        img: "https://images.unsplash.com/photo-1667537506981-4c67c8b82f85?q=80&w=1964&auto=format&fit=crop",
      },
    ],
    []
  );

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      <div className="mt-36 max-w-7xl mx-auto px-6 text-center">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#120075] mb-4">
            Explore the Underwater World
          </h1>
          <p className="text-md sm:text-lg text-gray-600 mb-0">
            Dive into the crystal-clear waters of Maldives and Sri Lanka
          </p>
          <p className="text-md sm:text-md text-gray-500">
            Discover vibrant coral reefs, exotic marine life, and unforgettable
            Travel adventures along Sri Lanka’s most beautiful coasts.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["all", "Maldives", "Sri Lanka"].map((tab) => (
            <button
              key={tab}
              className={`px-6 sm:px-8 py-2 font-semibold transition-all duration-300  ${
                activeTab === tab
                  ? "bg-[#01004b] text-white"
                  : "bg-[#d9e2ff] text-[#01004b]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all"
                ? "All"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            const imgSrc = item.image?.startsWith("http")
              ? item.image
              : `https://backend.colombodivers.lk${item.image}`;
            return (
              <div
                key={idx}
                className="relative group overflow-hidden border border-gray-200 cursor-pointer -lg"
                onClick={() => setSelectedIndex(idx)}
              >
                <img
                  src={imgSrc}
                  alt={item.title}
                  className="w-full h-64 sm:h-72 md:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="absolute bottom-4 left-4 text-left text-white opacity-0 group-hover:opacity-100 transition duration-500">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.location && <p className="text-sm">{item.location}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <img
            src={
              filteredItems[selectedIndex].image?.startsWith("http")
                ? filteredItems[selectedIndex].image
                : `https://backend.colombodivers.lk${filteredItems[selectedIndex].image}`
            }
            alt="fullscreen"
            className="max-h-[80vh] max-w-[90vw] object-contain mb-4 border-4 border-white -lg"
          />
          <div
            className="flex overflow-x-auto gap-2 px-4 pb-4 w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems.map((item, i) => (
              <img
                key={i}
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `https://backend.colombodivers.lk${item.image}`
                }
                alt={item.title}
                className={`w-24 h-16 sm:w-28 sm:h-20 object-cover cursor-pointer border-2 -md ${
                  selectedIndex === i
                    ? "border-[#01004b]"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
          <p className="text-white text-sm mt-2">
            (Use ← / → keys to navigate)
          </p>
        </div>
      )}

      {/* Journey Section */}
      <section className="pb-20 max-w-7xl mx-auto px-6 pt-20">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#01004b] mb-6">
          Our Journey Through Time
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {journeyPanels.map((p, i) => (
            <div
              key={i}
              className="relative h-[220px] sm:h-[260px] md:h-[300px] lg:h-[420px] group overflow-hidden -lg"
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="bg-white/20 backdrop-blur-sm px-3 py-2 text-sm font-medium ">
                  {p.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;
