import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backend.colombodivers.lk/api/v1/subscribers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        setSuccess("Thank you for subscribing!");
        setError("");
        setEmail("");
      } else {
        setError("Failed to subscribe. Please try again.");
        setSuccess("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setSuccess("");
    }
  };

  return (
    <footer className="bg-[#F5EFE6] border-t border-gray-200 pt-10 pb-6 px-4 sm:px-6 lg:px-16 text-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 mb-8">
          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg text-blue-900 mb-2">
              Useful Links
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/packages" className="hover:underline">Packages</a></li>
              <li><a href="/gallery" className="hover:underline">Gallery</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base sm:text-lg text-blue-900 mb-2">
              Contact Info
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li><a href="mailto:info@colombodivers.lk" className="hover:underline">Email: info@colombodivers.lk</a></li>
              <li><a href="tel:+94777367776" className="hover:underline">Phone: +94 77 736 7776</a></li>
              <li>
                <a href="https://www.google.com/maps?q=Maldives,+Sri+Lanka" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Address: Topaz Beach Hotel, 21 Porutota Road, Maldives, Sri Lanka
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-base sm:text-lg text-blue-900 mb-2">Resources</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li><a href="#" className="hover:underline">Newsletter</a></li>
              <li><a href="#" className="hover:underline">Subscribe</a></li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-base sm:text-lg text-blue-900 mb-2">Subscribe</h3>
            {error && <p className="text-red-600 text-sm sm:text-base mb-1">{error}</p>}
            {success && <p className="text-green-600 text-sm sm:text-base mb-1">{success}</p>}
            <p className="text-xs sm:text-sm mb-2">Join our community to receive updates</p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 py-2 sm:py-2 border border-gray-300 focus:outline-none focus:ring-blue-400 w-full sm:max-w-xs"
              />
              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-2 font-semibold hover:bg-blue-800 text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs sm:text-sm text-gray-500">
              By subscribing, you agree to our <a href="#" className="underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 text-xs sm:text-sm">
          <div className="mb-3 sm:mb-0 text-blue-900 font-semibold">
            Paradisepeak Travels (Pvt) Ltd
          </div>
          <div className="flex space-x-3 text-lg sm:text-xl">
            <a href="https://www.facebook.com/share/1A2w7AJzej/?mibextid=wwXIfr" className="text-blue-900 hover:text-blue-700" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.instagram.com/colombodivers?igsh=MXV2MjlvZWw5bmZtOQ==" className="text-blue-900 hover:text-blue-700" aria-label="Instagram"><FaInstagram /></a>
            {/* <a href="#" className="text-blue-900 hover:text-blue-700" aria-label="YouTube"><FaYoutube /></a> */}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-500 text-xs sm:text-sm">
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-2 sm:mb-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
          <div>&copy; 2025 Paradisepeak Travels (Pvt) Ltd. All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
