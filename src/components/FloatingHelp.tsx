import React, { useState, useEffect } from "react";
import { FaArrowUp, FaWhatsapp, FaTimes } from "react-icons/fa";

const FloatingHelp = () => {
  const [showTop, setShowTop] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Show back-to-top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Hotline / Chat Icon */}
      <div
        className="fixed right-6 bottom-20 z-50 cursor-pointer flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-lg text-white animate-bounce"
        onClick={() => setShowChat(true)}
        title="24/7 Support"
        data-aos="zoom-in"
      >
        <FaWhatsapp size={28} />
      </div>

      {/* Back to Top */}
      {showTop && (
        <div
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-50 cursor-pointer flex items-center justify-center w-14 h-14 rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 transition-transform duration-300 hover:scale-110"
          data-aos="fade-up"
          title="Back to Top"
        >
          <FaArrowUp />
        </div>
      )}

      {/* Chat Popup */}
      {showChat && (
        <div
          className="fixed right-6 bottom-24 w-80 bg-white border shadow-lg rounded-lg p-4 z-50 animate-slide-up"
          data-aos="fade-left"
        >
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold text-lg text-gray-800">24/7 Support</div>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowChat(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="text-gray-600 mb-4 text-sm">
            Hello! How can I help you today?
          </div>

          <a
            href="https://wa.me/94758109822?text=Hello%20I%20need%20help"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
          >
            <FaWhatsapp className="mr-2" /> Chat on WhatsApp
          </a>
        </div>
      )}
    </>
  );
};

export default FloatingHelp;
