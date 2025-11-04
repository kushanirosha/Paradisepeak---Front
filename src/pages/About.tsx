import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import {
  FaHeart,
  FaUserFriends,
  FaGlobe,
  FaLeaf,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaAward,
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import A1 from "../assets/img/A1.webp";
import A2 from "../assets/img/A2.webp";
import A3 from "../assets/img/A3.webp";

function About() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slides = useMemo(
    () => [
      {
        title: "Shipwreck & Wreck Exploration",
        desc: "Dive into the history beneath the waves — explore cargo ship and WWII wrecks off Maldives and Sri Lanka, now alive with coral and marine life.",
        img: A1,
      },
      {
        title: "Coral Reef & Reef Travel",
        desc: "Swim through vibrant coral gardens teeming with tropical fish, colorful nudibranchs and reef sharks in clear Indian Ocean waters around Sri Lanka. :contentReference[oaicite:1]{index=1}",
        img: A2,
      },
      {
        title: "PADI Training & Discovery Dives",
        desc: "From first breaths underwater to advanced certification — our expert instructors guide you from Neophyte to Pro, in safe, friendly dive‑sites in Maldives & Sri Lanka.",
        img: A3,
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const team = [
    {
      name: "Mr. Sherik Fernando",
      role: "Managing Director",
      img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1000&auto=format&fit=crop",
      socials: {
        facebook: "#",
        instagram: "#",
        whatsapp: "#",
        email: "mailto:info@colombodivers.lk",
      },
    },
    {
      name: "Mr. Vincent Fernando",
      role: "Founder",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1000&auto=format&fit=crop",
      socials: {
        facebook: "#",
        instagram: "#",
        whatsapp: "#",
        email: "mailto:info@colombodivers.lk",
      },
    },
    // {
    //   name: "Jane Doe",
    //   role: "Dive Instructor",
    //   img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1000&auto=format&fit=crop",
    //   socials: {
    //     facebook: "#",
    //     instagram: "#",
    //     whatsapp: "#",
    //     email: "mailto:info@colombodivers.lk",
    //   },
    // },
    // {
    //   name: "John Smith",
    //   role: "PADI Course Director",
    //   img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    //   socials: {
    //     facebook: "#",
    //     instagram: "#",
    //     whatsapp: "#",
    //     email: "mailto:info@colombodivers.lk",
    //   },
    // },
  ];

  const [jIndex, setJIndex] = useState(0);
  const [jPaused, setJPaused] = useState(false);

  return (
    <Layout>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-28 md:pt-32">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10" data-aos="fade-down">
          {/* Left Text Section */}
          <div className="md:max-w-xl">
            <h1 className="text-4xl md:text-5xl text-[#01004b] tracking-tight">
              Dive into the Heart of Sri Lanka
            </h1>
            <p className="mt-5 text-gray-700 leading-relaxed text-justify">
              Paradisepeak Travels is the only recreational dive center offering
              Travel and dive training in Colombo. In addition, Paradisepeak Travels
              organizes both local and international dive trips, and provides
              Travel assistance around Sri Lanka. Owned and staffed by divers
              with a passion for Travel and a love for Sri Lanka, Paradisepeak Travels
              offers a range of internationally recognized PADI training courses
              carried out by certified instructors.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed text-justify">
              All dive trips are led by dive masters with many years of
              experience and in-depth knowledge of local dive sites. Our team
              has expertise in wreck exploration, technical Travel, underwater
              photography, and marine research — with extensive experience
              Travel around Sri Lanka and beyond. Experience the hidden beauty
              of Colombo, from shipwrecks to reefs teeming with marine life!
            </p>
          </div>

          {/* Right Auto-Slider */}
          <div className="relative w-full md:flex-1">
            <div
              className="bg-gray-100 shadow-inner overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative h-[320px] md:h-[400px]">
                {slides.map((card, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === i ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={index !== i}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      className="h-full w-full object-cover"
                    />
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-sm text-gray-200">Experience</p>
                      <h3 className="mt-1 text-xl md:text-2xl font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-sm md:text-base text-gray-200">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Pagination Dots */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2 w-2 rounded-full ${
                        index === i ? "bg-[#01004b]" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <section className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" data-aos="flip-up">
            {[
              {
                title: "Certified PADI Courses",
                desc: "Learn Travel with internationally recognized PADI training, led by certified instructors.",
                icon: <FaStar className="text-[#01004b]" size={28} />,
              },
              {
                title: "Guided Dive Trips",
                desc: "Experience the best dive sites around Sri Lanka with our experienced divemasters.",
                icon: <FaUserFriends className="text-[#01004b]" size={28} />,
              },
              {
                title: "Wreck & Reef Exploration",
                desc: "Discover shipwrecks, coral reefs, and underwater life teeming with biodiversity.",
                icon: <FaGlobe className="text-[#01004b]" size={28} />,
              },
              {
                title: "Specialized Travel Activities",
                desc: "Technical Travel, underwater photography, and marine research with expert guidance.",
                icon: <FaLeaf className="text-[#01004b]" size={28} />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-center text-3xl font-bold text-[#01004b]">
            The Art of Elegant Discovery
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
            {[
              {
                title: "Passion for Travel",
                desc: "We live and breathe travel—every journey crafted with care.",
                img: "https://images.unsplash.com/photo-1602002418211-9d76470fa71f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                icon: <FaHeart />,
              },
              {
                title: "Personal Service",
                desc: "Your preferences lead the way to a truly personal adventure.",
                img: "https://www.100degreeseast.com/wp-content/uploads/2024/01/box_image18.jpg",
                icon: <FaUserFriends />,
              },
              {
                title: "Global Expertise",
                desc: "Connections worldwide, experiences that feel wonderfully local.",
                img: "https://images.unsplash.com/photo-1727610542348-9636c3b65d2a?q=80&w=1979&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                icon: <FaGlobe />,
              },
              {
                title: "Sustainable Tourism",
                desc: "Travel responsibly—protecting communities and wild places.",
                img: "https://plus.unsplash.com/premium_photo-1726729348504-1d89d93a7f94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                icon: <FaLeaf />,
              },
            ].map((card, i) => (
              <div key={i} className="group relative overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <div className="mb-1 text-sm opacity-90">{card.icon}</div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm opacity-90">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our History Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 border-t border-gray-200 mt-12" data-aos="fade-up">
          <h2 className="text-3xl text-[#01004b] text-center">Our History</h2>
          <p className="mt-6 text-gray-700 leading-relaxed text-justify">
            Vincent Fernando, who took the first step for our establishment,
            started Travel activities in Katunariya area for his business in
            1988, and in 2009 he started the professional Travel center "Colombo
            Divers" in Dehiwala. As a family run business, "Paradisepeak Travels"
            quickly gained a high reputation by captivating customers with their
            unique sea explorations and set up new centers in Maldives and
            Sri Lanka as a wider business. Currently, Mr. Vincent's son, Mr.
            Sherik Fernando, continues "Paradisepeak Travels" as a successful
            business, and Paradisepeak Travels will continue to be with you in the
            future with a number of high quality Travel courses that offer
            certifications recognized worldwide.
          </p>
        </section>

        {/* Meet Our Team Section */}
        <section className="mx-auto max-w-7xl py-16 border-t border-gray-200">
          <h2 className="text-3xl text-[#01004b] text-center mb-10">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 shadow-sm"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-lg text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <div className="mt-4 flex justify-center gap-4 text-gray-700">
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={member.socials.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaWhatsapp />
                    </a>
                    <a href={member.socials.email}>
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12" data-aos="fade-up">
          <h2 className="text-center text-3xl font-bold text-[#01004b]">
            Recognition & Certifications
          </h2>

          <div className="mx-auto mt-3 max-w-5xl">
            <div className="-mx-4 flex items-center justify-center gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                "PADI Certified",
                "Tripadvisor",
                "Lonely Planet",
                "National Geographic",
                "CNN Travel",
              ].map((label) => (
                <span
                  key={label}
                  className="shrink-0 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs text-gray-700"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div
            className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4"
            role="list"
          >
            <div
              className="relative md:col-span-2 overflow-hidden"
              role="listitem"
              aria-label="Guest story"
            >
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop"
                alt="Beach lounge"
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-end p-6 text-white">
                <p className="text-sm md:text-base">
                  “Traveling alone can be intimidating, but with Paradisepeak Travels
                  I felt embraced. Staff remembered my name and preferences and
                  even suggested a local market that became the highlight of my
                  trip.”
                </p>
              </div>
            </div>

            <div
              className="bg-white/20 backdrop-blur-md border border-white/30 p-8 shadow-xl md:col-span-1 flex flex-col items-center justify-center"
              role="listitem"
              aria-label="Satisfaction metric"
            >
              <div className="text-5xl font-bold text-[#01004b]">80%</div>
              <p className="mt-2 text-center text-gray-700 text-sm font-medium">
                of customers recommend Paradisepeak Travels for the best experiences
              </p>
            </div>

            <div
              className="bg-white/20 backdrop-blur-md border border-white/30 p-8 shadow-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/30"
              role="listitem"
              aria-label="Award: Best Travel Agency"
            >
              <FaAward size={40} className="text-[#01004b]" />
              <h3 className="mt-3 text-lg font-semibold text-gray-800">
                Best Travel Agency
              </h3>
              <p className="mt-1 text-sm text-gray-700 text-center font-medium">
                Travel & Tourism Excellence Awards
              </p>
            </div>

            <div
              className="bg-white/20 backdrop-blur-md border border-white/30 p-8 shadow-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/30"
              role="listitem"
              aria-label="Average rating"
            >
              <div className="text-5xl font-bold text-[#01004b]">
                4.9<span className="text-gray-600 text-2xl align-top">/5</span>
              </div>
              <div
                className="mt-2 flex items-center gap-1"
                aria-label="Rating: 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="mt-2 text-center text-gray-700 text-sm font-medium">
                1k+ verified reviews
              </p>
            </div>

            <div
              className="bg-white/20 backdrop-blur-md border border-white/30 p-8 shadow-xl md:col-span-2 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/30"
              role="listitem"
              aria-label="Award: Customer Choice"
            >
              <div className="shrink-0">
                <FaStar size={40} className="text-[#01004b]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Customer Choice Award
                </h3>
                <p className="mt-1 text-sm text-gray-700 font-medium">
                  Top-rated by satisfied travelers for personal, responsible
                  journeys.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14" data-aos="fade-up">
          <h2 className="text-center text-3xl font-bold text-[#01004b]">
            Get in Touch
          </h2>
          <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4">
            <div className="relative overflow-hidden md:col-span-2">
              <img
                src="https://plus.unsplash.com/premium_photo-1661526169600-9e50d7f8209e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Contact banner"
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white">
                <h3 className="text-2xl font-semibold">
                  Speak to a Travel Expert
                </h3>
                <p className="mt-1 text-sm opacity-90">
                  Tell us your dream - our certified team will shape the
                  journey.
                </p>
                <div className="mt-4 flex gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white px-5 py-2 text-sm font-medium text-[#01004b] hover:bg-gray-100"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            <div
              className="bg-white p-8 text-center shadow-lg"
              role="region"
              aria-label="Social media links"
            >
              <h3 className="text-lg font-semibold">Follow us</h3>
              <p className="mt-1 text-gray-600 text-sm">
                Say hi and see latest trips
              </p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/colombodivers?igsh=MXV2MjlvZWw5bmZtOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-200"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/share/1A2w7AJzej/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-200"
                >
                  <FaFacebookF />
                </a>
                {/* <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <FaYoutube />
                </a> */}
                <a
                  href="https://wa.me/94777367776?text=Hello%20there!%20I%20am%20interested%20in%20your%20Travel%20packages."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-200"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            <div className="bg-white p-8 text-center shadow-lg">
              <div className="mb-3 flex justify-center">
                <FaPhoneAlt size={36} className="text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold">Call us</h3>
              <p className="mt-1 text-gray-600">
                <a href="tel:+94777367776" className="text-[#003161]">
                  +94 77 736 7776
                </a>
              </p>
            </div>

            <div className="bg-white p-8 text-center shadow-lg">
              <div className="mb-3 flex justify-center">
                <FaEnvelope size={36} className="text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold">Email us</h3>
              <p className="mt-1 text-gray-600">
                <a
                  href="mailto:info@colombodivers.lk"
                  className="text-[#003161]"
                >
                  info@colombodivers.lk
                </a>
              </p>
            </div>

            <div className="bg-white p-8 text-center shadow-lg md:col-span-2">
              <div className="mb-3 flex justify-center">
                <FaMapMarkedAlt size={36} className="text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold">Visit us</h3>
              <p className="mt-1 text-gray-600">Maldives & Sri Lanka</p>
              <p className="mt-2">
                <a
                  href="https://maps.app.goo.gl/4bSZn42DixwWUz8b9?g_st=iwb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#003161]"
                >
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default About;
