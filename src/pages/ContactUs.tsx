import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Lastsection from "../components/Lastsection";

function ContactUs() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqData = [
    {
      question: t("doINeedExperience"),
      answer: t("doINeedExperienceAnswer"),
    },
    {
      question: t("isEquipmentProvided"),
      answer: t("isEquipmentProvidedAnswer"),
    },
    {
      question: t("whatIsBestSeasonForTravel"),
      answer: t("whatIsBestSeasonForTravelAnswer"),
    },
    {
      question: t("canNonSwimmersJoin"),
      answer: t("canNonSwimmersJoinAnswer"),
    },
    {
      question: t("areYouPADIcertified"),
      answer: t("areYouPADIcertifiedAnswer"),
    },
    {
      question: t("whatShouldIBring"),
      answer: t("whatShouldIBringAnswer"),
    },
    {
      question: t("isSafetyEnsured"),
      answer: t("isSafetyEnsuredAnswer"),
    },
    {
      question: t("howToBookDive"),
      answer: t("howToBookDiveAnswer"),
    },
    {
      question: t("canIUseMyOwnGear"),
      answer: t("canIUseMyOwnGearAnswer"),
    },
    {
      question: t("whatIfBadWeather"),
      answer: t("whatIfBadWeatherAnswer"),
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <Layout>
      {/* Contact Section */}
      <div className="bg-[#f8f9fa] pt-14 ">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Panel */}
          <div
            className="flex-1 bg-cover bg-center bg-no-repeat text-white flex flex-col justify-center py-12"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=1974&auto=format&fit=crop')",
            }}
          >
            <div className="px-28">
              <h1 className="text-4xl md:text-5xl font-light mb-5 leading-tight text-center lg:text-left drop-shadow-md">
                {t("YouHaveQuestions")}
                <br />
                <span className="font-semibold">{t("WeHaveAnswers")}</span>
              </h1>
              <p className="text-base md:text-lg opacity-90 mb-10 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                {t("DiscoverOpportunities")}
              </p>

              <div className="mb-10">
                <h3 className="text-xl mb-3 font-medium">{t("Location")}:</h3>
                <div>
                  <div className="font-semibold">Paradisepeak Travels (Pvt) Ltd</div>
                  <p className="opacity-90 text-sm">
                    Topaz Beach Hotel, 21 Porutota Road, Maldives, Sri Lanka.
                  </p>
                </div>
                <h3 className="text-xl mt-5 font-medium">Branch:</h3>
                <p className="opacity-90 text-sm">
                  Nilaveli Beach Road, Sri Lanka, Sri Lanka
                </p>
                <div className="mt-4 text-sm opacity-90">
                  {t("OpeningHours")} <br /> {t("SriLankaTime")}
                </div>
              </div>

              <div>
                <h3 className="text-xl mb-3 font-medium">{t("SocialMedia")}</h3>
                <div className="flex space-x-5 mb-6 justify-center lg:justify-start text-lg">
                  <a
                    href="https://www.instagram.com/colombodivers?igsh=MXV2MjlvZWw5bmZtOQ=="
                    className="text-white opacity-80 hover:opacity-200"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1A2w7AJzej/?mibextid=wwXIfr"
                    className="text-white opacity-80 hover:opacity-200"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://wa.me/94777367776?text=Hello%20there!%20I%20am%20interested%20in%20your%20Travel%20packages."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="text-white opacity-80 hover:opacity-200"
                  >
                    <FaWhatsapp />
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 text-sm">
                  <div>
                    <div className="font-semibold">{t("Email")}</div>
                    <div className="opacity-90">
                      <a
                        href="mailto:info@colombodivers.lk"
                        className="hover:underline"
                      >
                        info@colombodivers.lk
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{t("contact")}</div>
                    <div className="opacity-90">
                      <a href="tel:+94777367776" className="hover:underline">
                        +94 77 736 7776
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Web3 Form */}
          <div className="flex-1 bg-white flex flex-col justify-center p-6 md:p-10 lg:pr-32">
            <div className="mb-6 text-center lg:text-left">
              <h2 className="text-2xl font-semibold text-[#2c3e50] mb-2">
                {t("TellUsWhatYouNeed")}
              </h2>
              <p className="text-gray-600 text-sm">{t("TeamAssistance")}</p>
            </div>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="flex flex-col gap-5"
            >
              <input
                type="hidden"
                name="access_key"
                value="d59e8a90-afea-4cac-a8f4-94543198cd6f"
              />

              <div>
                <label className="block mb-1 text-sm font-medium text-[#2c3e50]">
                  {t("Name")}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("YourName")}
                  className="w-full border border-gray-300 bg-[#f8f9fa] p-3 text-sm focus:outline-none focus:border-[#00137e]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-[#2c3e50]">
                  {t("PhoneNumber")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("PhoneNumber")}
                  className="w-full border border-gray-300 bg-[#f8f9fa] p-3 text-sm focus:outline-none focus:border-[#00137e]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-[#2c3e50]">
                  {t("EmailAddress")}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={t("EmailAddress")}
                  className="w-full border border-gray-300 bg-[#f8f9fa] p-3 text-sm focus:outline-none focus:border-[#00137e]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-[#2c3e50]">
                  {t("Message")}
                </label>
                <textarea
                  name="message"
                  placeholder={t("TellUsMore")}
                  className="w-full border border-gray-300 bg-[#f8f9fa] p-3 text-sm min-h-[120px] resize-y focus:outline-none focus:border-[#00137e]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#00137e] text-white py-3 text-sm font-semibold tracking-wide hover:bg-[#0b006dff] transition"
              >
                {t("Submit")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#00137e] text-center mb-10">
            {t("FAQ")}
          </h2>
          <div className="flex flex-col gap-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 shadow-sm">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50 text-[#2c3e50]"
                >
                  <span className="text-sm sm:text-base font-medium">
                    {String(index + 1).padStart(2, "0")} &nbsp;&nbsp;
                    {faq.question}
                  </span>
                  {expandedFAQ === index ? (
                    <FaChevronUp className="text-[#00137e]" />
                  ) : (
                    <FaChevronDown className="text-[#00137e]" />
                  )}
                </button>

                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-600 text-sm border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lastsection/>
    </Layout>
  );
}

export default ContactUs;
