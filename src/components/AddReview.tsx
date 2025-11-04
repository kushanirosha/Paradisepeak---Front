import React, { useState } from "react";
import { FaStar, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import ApiService from "../services/ApiService";

type Props = {
  onClose?: () => void;
};

const AddReview: React.FC<Props> = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [formData, setFormData] = useState({ review: "", userName: "" });
  const [errors, setErrors] = useState({ review: "", userName: "", rating: "" });
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "userName" && value.trim()) setErrors(prev => ({ ...prev, userName: "" }));
    if (name === "review" && value.trim()) setErrors(prev => ({ ...prev, review: "" }));
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    if (value > 0) setErrors(prev => ({ ...prev, rating: "" }));
  };

  const validate = () => {
    let valid = true;
    let tempErrors = { review: "", userName: "", rating: "" };

    if (!formData.userName.trim()) {
      tempErrors.userName = "Please enter your name to personalize your review.";
      valid = false;
    }
    if (!formData.review.trim()) {
      tempErrors.review = "We'd love to hear your thoughts. Please write your review!";
      valid = false;
    }
    if (rating === 0) {
      tempErrors.rating = "Please select a rating to share your experience.";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    if (validate()) {
      try {
        const userId = localStorage.getItem("userid");
        if (!userId) {
          setGeneralError("You must be logged in to submit a review.");
          return;
        }

        const reviewData = { ...formData, rating, userId };
        await ApiService.createReview(reviewData);
        setSuccess(true);
        setFormData({ review: "", userName: "" });
        setRating(0);
      } catch (error: any) {
        setGeneralError(error.message || "Something went wrong. Please try again.");
      }
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100/30 to-blue-200/30">
              <FaCheckCircle size={44} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Thanks — Review submitted successfully!</h3>
            <p className="mt-2 text-gray-500">
              We appreciate your feedback. It helps others plan better journeys.
            </p>
            <button
              onClick={() => onClose && onClose()}
              className="mt-6 px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-blue-700/10 p-6 border-b border-blue-200 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Share Your Experience</h2>
          <p className="mt-1 text-blue-400">Let others know about your journey with us</p>
        </div>
        <button
          onClick={() => onClose && onClose()}
          aria-label="Close"
          className="text-white text-xl p-2 rounded hover:bg-white/10 transition"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className="p-8 space-y-6">
        {generalError && (
          <div className="flex items-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md shadow-sm animate-fade-in">
            <FaExclamationCircle className="mr-2 text-red-500" />
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">How would you rate your experience?</label>
            <div className="flex space-x-3 text-3xl">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <label key={i} className="cursor-pointer transform hover:scale-110 transition-transform">
                    <input
                      type="radio"
                      name="rating"
                      value={starValue}
                      className="hidden"
                      onClick={() => handleRatingChange(starValue)}
                    />
                    <FaStar
                      className={`${
                        starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                      } transition-colors duration-200`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            {errors.rating && (
              <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {errors.rating}
              </div>
            )}
          </div>

          {/* Review */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Review:</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows={4}
              placeholder="Share your thoughts..."
              className="w-full text-black border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition"
            />
            {errors.review && (
              <div className="flex items-center mt-1 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {errors.review}
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full text-black border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            {errors.userName && (
              <div className="flex items-center mt-1 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {errors.userName}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => onClose && onClose()}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-md transition transform hover:-translate-y-0.5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
