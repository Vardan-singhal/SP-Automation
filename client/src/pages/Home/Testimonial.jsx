import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChatQuoteFill, ArrowLeft, ArrowRight, StarFill, Star } from "react-bootstrap-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const emptyReview = { name: '', designation: '', quote: ''};

const Testimonial = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reviewForm, setReviewForm] = useState(emptyReview);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fetchTestimonials = () => {
    axios
      .get(`${API_URL}/testimonials`)
      .then((res) => setTestimonials(res.data))
      .catch(() => setTestimonials([]));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.quote.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await axios.post(`${API_URL}/testimonials`, reviewForm);
      setSubmitted(true);
      setReviewForm(emptyReview);
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSubmitted(false);
    setSubmitError('');
    setReviewForm(emptyReview);
  };

  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed -z-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-70 -z-10"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Section */}
          <div className="text-center lg:text-left mb-12 lg:mb-0">
            <h5 className="text-lg font-medium text-[#89EA5F] mb-3">
              Testimonials
            </h5>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug">
              What Our Clients Say <br className="hidden sm:block" />
              About Our Solar Solutions
            </h2>

            <button
              onClick={() => setShowForm(true)}
              className="mt-8 inline-flex items-center gap-2 bg-[#89EA5F] text-green-950 font-semibold px-6 py-3 rounded-full hover:brightness-95 transition-all"
            >
              <i className="bi bi-pencil-square"></i> Add Your Review
            </button>
          </div>

          {/* Swiper Section */}
          <div className="relative w-full">
            {testimonials.length === 0 ? (
              <div className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl text-center text-gray-500">
                Be the first to share your experience!
              </div>
            ) : (
              <>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  onSwiper={setSwiperInstance}
                  className="w-full"
                >
                  {testimonials.map((item) => (
                    <SwiperSlide key={item._id}>
                      <div className="bg-white bg-opacity-95 p-6 sm:p-8 rounded-2xl shadow-xl relative">
                        {/* Background icon */}
                        <div className="absolute right-3 top-3 text-gray-200 opacity-25 pointer-events-none">
                          <ChatQuoteFill size={130} />
                        </div>

                        {/* Foreground content */}
                        <div className="relative z-10">
                          <div className="text-[#89EA5F] mb-3">
                            <ChatQuoteFill size={40} />
                          </div>


                          <h6 className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                            {item.quote}
                          </h6>

                          {/* Person Info */}
                          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 mt-4">
                            <div className="text-center sm:text-left">
                              <h5 className="text-lg font-semibold text-gray-900 leading-tight">
                                {item.name}
                              </h5>
                              <span className="text-sm sm:text-base text-[#89EA5F] font-medium block mt-1">
                                {item.designation}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Buttons */}
                <div className="flex justify-center lg:justify-start gap-4 mt-8 flex-wrap">
                  <button
                    onClick={() => swiperInstance?.slidePrev()}
                    className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-gray-800 transition-all duration-300 hover:bg-[#89EA5F] hover:text-white shadow-md"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft size={22} />
                  </button>
                  <button
                    onClick={() => swiperInstance?.slideNext()}
                    className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-gray-800 transition-all duration-300 hover:bg-[#89EA5F] hover:text-white shadow-md"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight size={22} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>

            {submitted ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-md">
                <h4 className="font-semibold mb-1">Thank you!</h4>
                <p className="text-sm">Your review has been submitted and will appear here once approved.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && <p className="bg-red-100 text-red-700 text-sm rounded p-2">{submitError}</p>}

                <input
                  type="text"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border rounded-md p-3 text-sm"
                  required
                />

                <input
                  type="text"
                  name="designation"
                  value={reviewForm.designation}
                  onChange={handleChange}
                  placeholder="Your City / Location (optional)"
                  className="w-full border rounded-md p-3 text-sm"
                />
                <textarea
                  name="quote"
                  value={reviewForm.quote}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  className="w-full border rounded-md p-3 text-sm"
                  required
                ></textarea>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-white py-3 rounded-md font-semibold disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}

            <button onClick={closeForm} className="mt-4 text-green-600 underline text-sm">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonial;