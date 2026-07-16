import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const AboutUs = () => {
  return (
    // ENHANCEMENT: Changed py-20 to py-16 sm:py-20 for better small-screen padding
    <section className="about-section relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Decorative pattern layer */}
      <div
        className="pattern-layer absolute bottom-0 right-0 w-[410px] h-[460px] bg-no-repeat hidden lg:block"
        style={{ backgroundImage: "url(assets/images/shape/shape-2.png)" }}
      ></div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column (Image + Video) */}
          {/* ENHANCEMENT: Changed mb-20 to mb-16 for a tighter mobile layout */}
          <div className="w-full lg:w-6/12 relative flex justify-center mb-16 lg:mb-0">
            <div className="relative w-full max-w-[420px]">
              {/* Decorative Dots (Top Left) */}
              {/* ENHANCEMENT: Reduced negative offset on mobile */}
              <div
                className="absolute -top-4 -left-4 sm:-top-8 sm:-left-10 w-24 h-24 bg-no-repeat opacity-50 z-10"
                style={{
                  backgroundImage: "url(assets/images/shape/shape-1.png)",
                }}
              ></div>

              {/* Video Animation (placed above image) */}
              {/* ENHANCEMENT: Scaled video and position for mobile */}
              <video
                src="/assets/Icons/icon1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute -top-8 -left-2 w-24 h-24 sm:-top-12 sm:-left-8 sm:w-28 sm:h-28 z-20 rounded-full shadow-lg bg-white object-cover"
              ></video>

              {/* Main Image */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/assets/Banners/aboutus.png"
                  alt="S P Automation"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>

               <div className="absolute -bottom-16 -left- sm:-left-12 w-40 h-40 bg-primary-dark text-white p-6 flex flex-col justify-center items-center text-center shadow-xl rounded-md z-30">
  <span className="text-4xl font-bold leading-none">2024</span>
  <span className="text-lg font-medium mt-1">Established</span>
  <span className="text-base font-light">Trusted</span>
  <span className="text-base font-light">Solar Solutions</span>
</div>


              {/* Experience Box - Commented out, but now also responsive */}
              {/*
              <div className="absolute -bottom-12 -left-4 w-36 h-36 sm:-bottom-16 sm:-left-12 sm:w-40 sm:h-40 bg-primary-dark text-white p-4 sm:p-6 flex flex-col justify-center items-center text-center shadow-xl rounded-md z-30">
                <span className="text-4xl sm:text-5xl font-bold leading-none">10</span>
                <span className="text-base sm:text-lg font-medium mt-1">Years</span>
                <span className="text-sm sm:text-base font-light">Experience of</span>
                <span className="text-sm sm:text-base font-light">This Field</span>
              </div>
              */}

              {/* Decorative Dots (Bottom Right) */}
              {/* ENHANCEMENT: Reduced negative offset on mobile */}
              <div
                className="absolute -bottom-12 -right-2 sm:-bottom-16 sm:-right-4 w-24 h-24 bg-no-repeat opacity-50 z-0"
                style={{
                  backgroundImage: "url(assets/images/shape/shape-1.png)",
                }}
              ></div>
            </div>
          </div>

          

          {/* Right Column (Content) */}
          <div className="w-full lg:w-6/12">
            <div className="relative ml-0 lg:ml-8">
              <div className="mb-6">
                <h5 className="text-primary text-base font-semibold uppercase mb-2">
                  About Us
                </h5>
                {/* ENHANCEMENT: Responsive text size for main heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Pioneering Advanced Energy Systems for a Future-Ready India
                </h2>
              </div>

              {/* ENHANCEMENT: text-base is good, space-y-4 helps flow */}
              <div className="text-gray-600 text-base leading-relaxed text-justify mb-8 space-y-4">
               <h6>

                  S P Automation is a forward-thinking enterprise at the helm of
                  India’s transition toward advanced energy systems.
                
               </h6>
               
              </div>

              {/* Icon Blocks */}
              <div className="flex flex-col sm:flex-row mb-10">
                {/* Block 1 */}
                <div className="flex items-center mb-6 sm:mb-0 sm:mr-10">
                  {/* ENHANCEMENT: Scaled icon circle size */}
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                    {/* ENHANCEMENT: Scaled icon font size */}
                    <i className="bi bi-sun text-primary text-2xl sm:text-3xl"></i>
                  </div>
                  {/* ENHANCEMENT: Scaled title font size */}
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 ml-4 leading-tight">
                    Solar
                    <br />
                    Infrastructure
                  </h4>
                </div>

                {/* Block 2 */}
                <div className="flex items-center">
                  {/* ENHANCEMENT: Scaled icon circle size */}
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                    {/* ENHANCEMENT: Scaled icon font size */}
                    <i className="bi bi-lightning text-primary text-2xl sm:text-3xl"></i>
                  </div>
                  {/* ENHANCEMENT: Scaled title font size */}
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 ml-4 leading-tight">
                    Power
                    <br />
                    Management
                  </h4>
                </div>
              </div>

              {/* Checkmark List */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-700">
                  {/* ENHANCEMENT: Scaled checkmark icon */}
                  <i className="bi bi-check-circle-fill text-primary text-xl sm:text-2xl mr-3 mt-1"></i>
                  {/* ENHANCEMENT: Scaled list text */}
                  <span className="text-base sm:text-lg">
                    Premium solar infrastructure
                  </span>
                </li>
                <li className="flex items-start text-gray-700">
                  <i className="bi bi-check-circle-fill text-primary text-xl sm:text-2xl mr-3 mt-1"></i>
                  <span className="text-base sm:text-lg">
                    High-performance energy storage systems
                  </span>
                </li>
                <li className="flex items-start text-gray-700">
                  <i className="bi bi-check-circle-fill text-primary text-xl sm:text-2xl mr-3 mt-1"></i>
                  <span className="text-base sm:text-lg">
                    Dependable power management technologies
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;