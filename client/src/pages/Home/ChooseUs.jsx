import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const features = [
  {
    iconClass: 'bi-geo-alt-fill',
    title: 'Made in India, Built for the World',
    description:
      'Proudly engineered in India with global standards, delivering reliable automation solutions that scale worldwide.',
    backgroundImage: '/assets/Banners/whyus-1.jpg', // Retain or update as needed
  },
  {
    iconClass: 'bi-arrow-left-right',
    title: 'End-to-End Solutions from Design to Deployment',
    description:
      'Comprehensive services covering ideation, custom design, rigorous testing, and seamless on-site deployment for optimal results.',
    backgroundImage: '/assets/Banners/whyus-2.jpg', // Retain or update as needed
  },
  {
    iconClass: 'bi-lightning-charge-fill',
    title: 'Innovation-Driven, Performance-Focused',
    description:
      'Harnessing cutting-edge technology and data-driven insights to drive efficiency, reduce costs, and maximize performance.',
    backgroundImage: '/assets/Banners/whyus-3.jpg', // Retain or update as needed
  },
  {
    iconClass: 'bi-headset',
    title: 'Unmatched Service, Nationwide Support',
    description:
      'Round-the-clock expert assistance with a vast network ensuring prompt, reliable support across every corner of the nation.',
    backgroundImage: '/assets/Banners/whyus-4.jpg', // Retain or update as needed
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h6 className="flex items-center justify-center text-[#89EA5F] font-semibold text-sm uppercase tracking-wider mb-2">
            <i className="bi bi-patch-check-fill text-xl mr-2"></i> WHY CHOOSE US
          </h6>
          <h2 className="text-4xl sm:text-5xl font-bold text-green-900 leading-tight">
            Why Choose S P Automation?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                relative group flex flex-col p-6 rounded-3xl overflow-hidden
                transition-all duration-500 ease-in-out
                bg-white text-gray-800
              `}
              // Inline style for dynamic background image and hover effect
              style={{
                // Base background for all cards (white or dark gradient for the first one)
                background: '#fff',
                // Always include background-image, but control its size and position for the effect
                backgroundImage: `url(${feature.backgroundImage})`,
                backgroundSize: '0% 0%', // Initially hidden
                backgroundPosition: 'left center', // Start from left
                backgroundRepeat: 'no-repeat',
                transition: 'background-size 0.5s ease-in-out, background-position 0.5s ease-in-out, background-image 0.5s ease-in-out, background-color 0.5s ease-in-out, color 0.5s ease-in-out',
              }}
            >
              {/* Overlay for hover effect - controls visibility of text/icon on hover */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-br from-black/60 to-black/30 opacity-0
                  group-hover:opacity-100 transition-opacity duration-500 ease-in-out
                `}
                style={{
                  // On hover, grow background image to cover and position it
                  backgroundImage: `url(${feature.backgroundImage})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>

              {/* Content of the card */}
              <div className="relative z-10">
                <div
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl
                    bg-[#89EA5F]/20 text-[#89EA5F]
                    group-hover:bg-white/20 group-hover:text-white transition-colors duration-500
                  `}
                >
                  <i className={`bi ${feature.iconClass}`}></i>
                </div>
                <h3
                  className={`
                    font-bold text-xl mb-3
                    text-gray-900
                    group-hover:text-white transition-colors duration-500
                  `}
                >
                  {feature.title}
                </h3>
                <h6
                  className={`
                    text-base leading-relaxed
                    text-gray-600
                    group-hover:text-gray-200 transition-colors duration-500
                  `}
                >
                  {feature.description}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div>
      {/* Ensure Bootstrap Icons CSS is linked in public/index.html */}
      <WhyChooseUs />
    </div>
  );
}