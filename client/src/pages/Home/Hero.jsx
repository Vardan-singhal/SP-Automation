import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "bootstrap-icons/font/bootstrap-icons.css";

import slide1 from "/assets/Banners/slide1.jpg";
import slide2 from "/assets/Banners/slide2.jpg";
import slide3 from "/assets/Banners/slide3.webp";

const slides = [
  {
    id: 1,
    image: slide1,
    title: (
      <>
        Best <span className="text-primary">Electricity Service</span> <br />
        for Your Family
      </>
    ),
    description: (
      <h6>
    
      </h6>
    ),
  },
  {
    id: 2,
    image: slide2,
    title: (
      <>
        Reliable <span className="text-primary">Energy Solutions</span> <br />
        for Your Home
      </>
    ),
    description: (
      <h6>
     
      </h6>
    ),
  },
  {
    id: 3,
    image: slide3,
    title: (
      <>
        Future-Proof <span className="text-primary">Power</span> <br />
        Starts Here
      </>
    ),
    description: (
      <h6>
       
      </h6>
    ),
  },
];

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Diagonal Shape */}
      <div className="absolute top-0 left-0 w-full h-8 bg-primary origin-top-left -skew-y-2 z-10"></div>

      <Swiper
        modules={[Autoplay, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        className="relative"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[90vh] bg-center bg-cover flex items-center justify-start"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

              {/* Diagonal Overlay */}
              <div className="absolute top-0 left-0 w-full h-20 sm:h-12 md:h-24 bg-primary origin-top-left -skew-y-6 z-10"></div>

              {/* Content */}
              <div
                className="relative z-20 text-white w-full max-w-4xl px-8 sm:px-16 md:px-24"
              >
                {/* Animated Title */}
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 
                             animate-fadeInDown opacity-0"
                >
                  {slide.title}
                </h2>

                {/* Animated Description */}
                <h6
                  className="text-xl sm:text-lg md:text-2xl text-black max-w-2xl
                             animate-fadeInUp "
                >
                  {slide.description}
                </h6>

                {/* Animated Button */}
               
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <button
          type="button"
          className="swiper-button-prev-custom absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-30
                     flex items-center justify-center w-12 h-12 rounded-full 
                     bg-gray-800 bg-opacity-50 hover:bg-primary transition-all duration-300"
        >
          <i className="bi bi-caret-left text-white text-3xl"></i>
        </button>

        <button
          type="button"
          className="swiper-button-next-custom absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-30
                     flex items-center justify-center w-12 h-12 rounded-full 
                     bg-gray-800 bg-opacity-50 hover:bg-primary transition-all duration-300"
        >
          <i className="bi bi-caret-right text-white text-3xl"></i>
        </button>
      </Swiper>
    </section>
  );
};

export default Hero;
