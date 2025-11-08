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
        title: "Maldives Luxury Escapes",
        desc: "Experience pristine beaches, turquoise waters, and overwater villas in the Maldives. Perfect for honeymooners and luxury travelers.",
        img: A1,
      },
      {
        title: "Cultural Journeys in Sri Lanka",
        desc: "Discover ancient temples, scenic highlands, and vibrant local traditions on curated tours across Sri Lanka.",
        img: A2,
      },
      {
        title: "Adventure & Wildlife Tours",
        desc: "Embark on safari adventures, whale watching, and trekking excursions for unforgettable experiences in nature.",
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
      name: "Mr. Shanaka",
      role: "Managing Director",
      img: "https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1703/tuktukdesign170300058/73533499-man-user-icon-profil-de-la-personne-avatar-glyph-illustration-vecteur.jpg?ver=6",
      socials: {
        facebook: "https://www.facebook.com/share/1SJZwyLmAH/?mibextid=wwXIfr",
        instagram: "https://www.instagram.com/roxshanaka?igsh=MWsxYW02cnphMDM5OQ%3D%3D&utm_source=qr",
        whatsapp: "https://wa.me/94773581241?text=Hello%20there!%20I%20am%20interested%20in%20your%20Travel%20packages.",
        email: "mailto:shanaka@paradisepeaktravels.com",
      },
    },
    // {
    //   name: "Mr. Vincent Fernando",
    //   role: "Founder",
    //   img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1000&auto=format&fit=crop",
    //   socials: {
    //     facebook: "#",
    //     instagram: "#",
    //     whatsapp: "#",
    //     email: "mailto:info@paradisepeaktravels.com",
    //   },
    // },
    // {
    //   name: "Jane Doe",
    //   role: "Dive Instructor",
    //   img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1000&auto=format&fit=crop",
    //   socials: {
    //     facebook: "#",
    //     instagram: "#",
    //     whatsapp: "#",
    //     email: "mailto:info@paradisepeaktravels.com",
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
    //     email: "mailto:info@paradisepeaktravels.com",
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
              Explore the Wonders of Sri Lanka & Maldives
            </h1>
            <p className="mt-5 text-gray-700 leading-relaxed text-justify">
               ParadisePeak Travels curates unforgettable travel experiences across Sri Lanka and the Maldives. 
              From luxury beach resorts to cultural excursions and wildlife adventures, we craft journeys tailored 
              to your preferences. Our expert team ensures every trip is seamless, safe, and filled with memorable moments.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed text-justify">
              Whether it's discovering ancient temples, relaxing on pristine beaches, or exploring local traditions, 
              ParadisePeak Travels brings you closer to the true essence of each destination. Let us turn your dream 
              holiday into reality with personalized itineraries and exceptional service.
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
                title: "Tailored Itineraries",
                desc: "Custom travel plans designed for every preference and interest.",
                icon: <FaStar className="text-[#01004b]" size={28} />,
              },
              {
                title: "Guided Tours",
                desc: "Experience the best of each destination with expert local guides.",
                icon: <FaUserFriends className="text-[#01004b]" size={28} />,
              },
              {
                title: "Cultural & Nature Exploration",
                desc: "Discover landmarks, wildlife, and hidden gems across Sri Lanka & Maldives.",
                icon: <FaGlobe className="text-[#01004b]" size={28} />,
              },
              {
                title: "Sustainable Travel",
                desc: "Eco-friendly and responsible tourism practices at the heart of our trips.",
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
                desc: "Every journey crafted with care and enthusiasm.",
                img: "https://images.unsplash.com/photo-1602002418211-9d76470fa71f?q=80&w=1974&auto=format&fit=crop",
                icon: <FaHeart />,
              },
              {
                title: "Personalized Service",
                desc: "Tailored experiences to match your preferences.",
                img: "https://www.100degreeseast.com/wp-content/uploads/2024/01/box_image18.jpg",
                icon: <FaUserFriends />,
              },
              {
                title: "Global Expertise",
                desc: "Local experiences enriched by worldwide connections.",
                img: "https://images.unsplash.com/photo-1727610542348-9636c3b65d2a?q=80&w=1979&auto=format&fit=crop",
                icon: <FaGlobe />,
              },
              {
                title: "Sustainable Tourism",
                desc: "Travel responsibly, protecting communities and wild places.",
                img: "https://plus.unsplash.com/premium_photo-1726729348504-1d89d93a7f94?q=80&w=2070&auto=format&fit=crop",
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
            ParadisePeak Travels started as a family-run venture, bringing unique and personalized travel experiences to Sri Lanka and the Maldives. 
            Over the years, we have grown into a trusted travel company, recognized for exceptional service, tailored itineraries, and responsible tourism practices. 
            Today, ParadisePeak Travels continues to deliver unforgettable journeys curated by experts who are passionate about showing you the best of every destination.
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
                  href="https://www.instagram.com/paradisepeaktravels?igsh=MTNoN3A3Y2gweG5uaQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-200"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/share/1SJZwyLmAH/?mibextid=wwXIfr"
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
                  href="https://wa.me/94773581241?text=Hello%20there!%20I%20am%20interested%20in%20your%20Travel%20packages."
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
                <a href="tel:+94773581241" className="text-[#003161]">
                  +94 77 358 1241
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
                  href="mailto:info@paradisepeaktravels.com"
                  className="text-[#003161]"
                >
                  info@paradisepeaktravels.com
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
                  href=""
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
