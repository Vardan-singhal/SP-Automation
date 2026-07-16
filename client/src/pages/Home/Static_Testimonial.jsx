import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChatQuoteFill, ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Vikram Pratap Singh",
    designation: "Jhansi, India",
    image:
      "/assets/Banners/man.jpg",
    quote:
      "Switching to solar was the best decision for our family. Our energy bills have been cut in half, and the installation team was incredibly professional. We love our new high-efficiency panels!",
  },
  {
    name: "Mahendra Bopanna",
    designation: "Maharashtra, India",
    image:
      "/assets/Banners/man.jpg",
    quote:
      "As a small business, cutting overhead is crucial. The commercial solar installation has provided an amazing ROI. The system is reliable, and the solar battery backup gives us peace of mind.",
  },
  {
    name: "Roshan Aggarwal",
    designation: "Bijnor, India",
    image:
      "/assets/Banners/man.jpg",
    quote:
      "Our farm now runs almost entirely on solar power. The durable panels have withstood all weather, and the reduced operating costs are a huge benefit. Highly recommend for any agricultural business.",
  },
];

const Testimonial = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

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
          </div>

          {/* Swiper Section */}
          <div className="relative w-full">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              onSwiper={setSwiperInstance}
              className="w-full"
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
