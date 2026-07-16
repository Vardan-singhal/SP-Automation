import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MissionVision() {
  const bannerRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Banner Animation
      gsap.from(bannerRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.2,
        ease: "power3.out",
      });

      // Mission Section Animation
      gsap.from(missionRef.current, {
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 85%",
          markers: false, // Set to true for debugging in dev
        },
        opacity: 0,
        x: -80,
        duration: 1.3,
        ease: "power3.out",
      });

      // Vision Section Animation
      gsap.from(visionRef.current, {
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top 85%",
          markers: false, // Set to true for debugging in dev
        },
        opacity: 0,
        x: 80,
        duration: 1.3,
        ease: "power3.out",
      });
    });

    // Refresh ScrollTrigger after a short delay to handle dynamic content
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full">
      {/* ===========================
          BANNER SECTION
      ============================== */}
      <div
        ref={bannerRef}
        className="w-full h-56 md:h-72 lg:h-80 bg-cover bg-center flex items-center justify-center text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/assets/ourcompany/MISSIONVISION.jpeg')", // Added gradient overlay for better text readability
           // Fallback color if image fails
        }}
        role="banner"
        aria-label="Mission and Vision Banner"
      >
        
      </div>

      {/* ===========================
          MISSION SECTION
      ============================== */}
      <section
        ref={missionRef}
        className="py-14 px-5 md:px-16 lg:px-32 flex flex-col md:flex-row items-center gap-10"
        aria-labelledby="mission-heading"
      >
        <div className="w-full md:w-1/2 space-y-5 order-2 md:order-1">
          <h2 id="mission-heading" className="text-3xl md:text-4xl font-semibold text-primary">
            Our Mission
          </h2>
          <h6 className="text-gray-600 leading-relaxed text-lg">
            Our mission is to deliver innovative, reliable, and sustainable
            solutions that empower businesses to grow. We strive to build
            long-lasting relationships through transparency, quality service, and
            continuous improvement.
          </h6>
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img
            src="/assets/ourcompany/mission.jpeg"
            alt="Team collaborating on automation project, representing our commitment to innovative solutions"
            className="rounded-xl shadow-md w-full h-64 md:h-80 object-cover lazyload" // Added lazyload class for performance; implement via IntersectionObserver if needed
            loading="lazy" // Native lazy loading
          />
        </div>
      </section>

      {/* ===========================
          VISION SECTION
      ============================== */}
      <section
        ref={visionRef}
        className="py-14 px-5 md:px-16 lg:px-32 flex flex-col-reverse md:flex-row items-center gap-10 bg-gray-50"
        aria-labelledby="vision-heading"
      >
        <div className="w-full md:w-1/2">
          <img
            src="/assets/ourcompany/vision.jpeg"
            alt="Futuristic automation landscape, symbolizing our vision for global innovation"
            className="rounded-xl shadow-md w-full h-64 md:h-80 object-cover lazyload"
            loading="lazy"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-5">
          <h2 id="vision-heading" className="text-3xl md:text-4xl font-semibold text-primary">
            Our Vision
          </h2>
          <h6 className="text-gray-600 leading-relaxed text-lg">
            Our vision is to become a global leader in innovation, delivering
            excellence in every step. We aim to create a future where technology
            and creativity work together to make life better and more efficient.
          </h6>
        </div>
      </section>
    </div>
  );
}