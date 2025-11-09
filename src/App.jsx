// App.js
import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/route";
import AOS from "aos";
import "aos/dist/aos.css";
import FloatingHelp from "./components/FloatingHelp";
import logo from "./assets/logo.png"; // ← Change to your logo path

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    // Hide splash after 2.8 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Simple Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <img
              src={logo}
              alt="Logo"
              className="w-32 h-32 md:w-40 md:h-40 animate-pulse"
            />
            <p className="mt-6 text-gray-600 text-lg font-medium animate-fadeIn">
              Loading your journey...
            </p>
          </div>
        </div>
      )}

      {/* Main App */}
      <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <AppRoutes />
        <FloatingHelp />
      </div>
    </>
  );
}

export default App;