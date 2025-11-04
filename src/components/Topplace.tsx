import React from "react";
import T1 from "../assets/img/Home/Top/1.webp";
import T2 from "../assets/img/Home/Top/2.webp";
import T3 from "../assets/img/Home/Top/3.webp";
import T4 from "../assets/img/Home/Top/4.webp";
import T5 from "../assets/img/Home/Top/5.webp";
import T6 from "../assets/img/Home/Top/6.webp";

const diveLocations = [
  {
    name: "Maha Gala",
    depth: "14 meters",
    img: T1,
    description:
      "A stunning coral-covered reef teeming with colorful marine life, perfect for intermediate divers.",
  },
  {
    name: "Uravi Gala",
    depth: "16 meters",
    img: T2,
    description:
      "Known for its clear visibility and vibrant schools of fish, this site offers a peaceful underwater escape.",
  },
  {
    name: "Godin Gala",
    depth: "13 meters",
    img: T3,
    description:
      "A shallow reef ideal for beginners, featuring small caves and soft corals with plenty of sea turtles.",
  },
  {
    name: "Raja Gala",
    depth: "15 meters",
    img: T4,
    description:
      "A breathtaking dive site with rocky formations and colorful coral gardens, popular among photographers.",
  },
  {
    name: "Dakune Gala",
    depth: "15 meters",
    img: T5,
    description:
      "Famous for its diverse marine biodiversity, from lionfish to moray eels hiding among coral crevices.",
  },
  {
    name: "Goda Maha Gala",
    depth: "15 meters",
    img: T6,
    description:
      "A majestic underwater cliff offering a thrilling dive experience with large reef fish and sea fans.",
  },
];

const Topplace = () => {
  const topSix = diveLocations.slice(0, 6);

  return (
    <section className="bg-white py-20 mb-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl mb-3 text-[#00076b]">
          Top Travel Destinations
        </h2>
        <p className="text-gray-600 mb-12">
          Book a trip to one of Sri Lanka’s most breathtaking dive sites.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topSix.map((loc, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer" data-aos="flip-left"
            >
              {/* Image */}
              <img
                src={loc.img}
                alt={loc.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Always visible name + depth */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 via-black/10 to-transparent text-left">
                <h3 className="text-white text-2xl font-semibold drop-shadow-lg">
                  {loc.name}
                </h3>
                <p className="text-gray-200 text-sm mt-1 drop-shadow-md">
                  {loc.depth}
                </p>
              </div>

              {/* Hover description */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
                <p className="text-white text-sm leading-relaxed text-center max-w-xs">
                  {loc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topplace;
