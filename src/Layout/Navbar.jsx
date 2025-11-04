import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav2 from "../components/Nav2";
import { useTranslation } from "react-i18next";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setAtTop(y < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("packages"), path: "/packages" },
    { name: t("gallery"), path: "/gallery" },
    { name: t("about"), path: "/about" },
    { name: t("contact"), path: "/contact" },
  ];

  return (
    <>
      <Nav2 />
      <nav
        className={`w-full fixed z-40 transition-all duration-200 ${
          atTop ? "top-10 bg-white shadow-sm" : "top-0 bg-[#F5EFE6] shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px] px-4 md:px-0">
          {/* Left: Logo */}
          <Link to="/" className="text-2xl text-[#0D1164] font-bold">
            Paradisepeak Travels
          </Link>

          {/* Desktop: Navigation Links */}
          <ul className="hidden md:flex items-center gap-10 text-base font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative transition-all hover:text-[#0D1164] ${
                    location.pathname === item.path ? "text-[#0D1164]" : ""
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#0D1164] rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Book Now Button */}
          <div className="hidden md:block">
            <button
              onClick={() => (window.location.href = "/packages")}
              className="bg-[#0D1164] text-white px-5 py-2 font-medium hover:bg-[#0D1144] transition"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <HiX className="w-6 h-6 text-[#0D1164]" />
              ) : (
                <HiMenu className="w-6 h-6 text-[#0D1164]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#F5EFE6] shadow-md">
            <ul className="flex flex-col gap-4 px-4 py-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-gray-700 font-medium py-2 px-2 rounded hover:bg-[#e0dfe5] ${
                      location.pathname === item.path ? "text-[#0D1164]" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    window.location.href = "/packages";
                  }}
                  className="w-full bg-[#0D1164] text-white px-5 py-2 font-medium hover:bg-[#0D1144] transition rounded"
                >
                  Book Now
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
