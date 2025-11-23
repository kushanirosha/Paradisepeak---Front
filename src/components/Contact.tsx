import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phonenumber: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("access_key", "e0f3ecc1-d704-4905-b9d3-67031a3c3d8c"); 
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phonenumber", values.phonenumber);
      formData.append("message", values.message);
      formData.append("subject", "New Contact Message from Paradise peak Travels");
      formData.append("from_name", "Paradise peak Travels Website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Your message has been sent successfully!");
        setValues({ name: "", email: "", phonenumber: "", message: "" });
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left Info Section */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl text-[#00137e] font-semibold mb-4">
            Get in Touch with Paradise peak Travels
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Whether you're planning your first journey or your next big adventure,
            our team is here to help you every step of the way.
          </p>

          {/* Locations */}
          <div className="flex flex-col sm:flex-row sm:gap-12 gap-6 mb-6">
            <div>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#00137e] hover:underline text-sm sm:text-base"
              >
                <FaMapMarkerAlt /> Sri Lanka
              </a>
              <p className="ml-6 text-gray-700 text-xs sm:text-sm">
                Jaya mawatha, Habarakada, Homagama.
              </p>
            </div>
            <div>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#00137e] hover:underline text-sm sm:text-base"
              >
                <FaMapMarkerAlt /> Maldives
              </a>
              <p className="ml-6 text-gray-700 text-xs sm:text-sm">
                Green house, Maafushi, Maldives.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#00137e] text-sm sm:text-base">
                <FaPhoneAlt /> Hotline
              </div>
              <a
                href="tel:+94758109822"
                className="ml-6 text-gray-700 hover:underline text-xs sm:text-sm"
              >
                +94 75 810 9822
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#00137e] text-sm sm:text-base">
                <FaEnvelope /> Email
              </div>
              <a
                href="mailto:info@paradisepeaktravels.com"
                className="ml-6 text-gray-700 hover:underline text-xs sm:text-sm"
              >
                info@paradisepeaktravels.com
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#00137e] text-sm sm:text-base">
                <FaClock /> Working Hours
              </div>
              <p className="ml-6 text-gray-700 text-xs sm:text-sm">
                Open Every Day — 8:00 AM to 5:00 PM
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <span className="text-[#00137e] font-medium text-sm sm:text-base">
              Follow Us:
            </span>
            <a
              href="https://www.facebook.com/share/1SJZwyLmAH/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00137e] hover:text-blue-700 transition text-lg"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/paradisepeaktravels?igsh=MTNoN3A3Y2gweG5uaQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00137e] hover:text-pink-600 transition text-lg"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 min-w-0 bg-white shadow-md border border-gray-200 p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-[#00137e] mb-4">
            Contact Form
          </h3>

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:gap-4 text-gray-700"
          >
            <input
              type="text"
              placeholder="Name"
              required
              value={values.name}
              className="border border-gray-300 p-2 text-sm sm:text-base w-full focus:border-[#00137e] focus:outline-none"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={values.phonenumber}
              className="border border-gray-300 p-2 text-sm sm:text-base w-full focus:border-[#00137e] focus:outline-none"
              onChange={(e) =>
                setValues({ ...values, phonenumber: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={values.email}
              className="border border-gray-300 p-2 text-sm sm:text-base w-full focus:border-[#00137e] focus:outline-none"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <textarea
              placeholder="Message"
              rows={4}
              required
              value={values.message}
              className="border border-gray-300 p-2 text-sm sm:text-base w-full resize-y focus:border-[#00137e] focus:outline-none"
              onChange={(e) =>
                setValues({ ...values, message: e.target.value })
              }
            />

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-[#00137e] hover:bg-blue-900"
              } text-white py-2 sm:py-3 text-sm sm:text-base uppercase tracking-wide transition-all duration-300 mt-3`}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
