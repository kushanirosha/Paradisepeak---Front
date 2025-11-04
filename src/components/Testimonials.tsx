import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApiService from "../services/ApiService"; // adjust import path
import AddReview from "./AddReview";

type ReviewItem = {
  _id: string;
  review: string;
  rating: number;
  userName: string;
  email: string;
  createdAt?: string;
  status?: string;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<ReviewItem[]>([]);
  const [showAddReview, setShowAddReview] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await ApiService.getAllReviews(); // adjust method
      const approved = res.filter((r: ReviewItem) => r.status === "Approved");
      setTestimonials(approved);
    } catch (err) {
      console.error("Error fetching testimonials", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    pauseOnHover: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center space-x-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white transition-all"></div>
    ),
  };

  return (
    <section className="bg-[#315ea8] text-white py-16 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center px-6">
        <p className="uppercase tracking-wider text-sm text-gray-200">Reviews</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">
          What you wrote about us...
        </h2>

        <div className="flex justify-center items-center mb-14">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-2xl mx-0.5" />
          ))}
          <span className="ml-2 text-white text-lg">
            5/5 &nbsp;
            <span className="text-gray-200">3630 reviews</span>
          </span>
        </div>

        <Slider {...settings}>
          {testimonials.length === 0 ? (
            <div className="text-gray-300">No testimonials available.</div>
          ) : (
            testimonials.map((t) => (
              <div key={t._id} className="px-4">
                <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-100 mb-6">
                  {t.review}
                </p>

                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center mb-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl mx-0.5" />
                    ))}
                  </div>
                  <p className="font-semibold text-lg">{t.userName}</p>
                  {t.createdAt && (
                    <p className="text-gray-300 italic text-sm">
                      {new Date(t.createdAt).toISOString().split("T")[0]}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </Slider>

        {/* Write a Review Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowAddReview(true)}
            className="bg-white text-[#315ea8] font-semibold px-6 py-2 hover:bg-gray-200 transition-all"
          >
            Write a Review
          </button>
        </div>

        {/* AddReview Modal */}
        {showAddReview && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
            onClick={() => setShowAddReview(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-white rounded-lg overflow-hidden"
            >
              <AddReview onClose={() => setShowAddReview(false)} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
