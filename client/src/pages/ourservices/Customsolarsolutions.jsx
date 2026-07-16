import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap-icons/font/bootstrap-icons.css";

gsap.registerPlugin(ScrollTrigger);

export default function CustomSolarSolutions() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fix disappearing elements
      gsap.set(".fade-up", { opacity: 1 });

      // Scroll fade animations
      gsap.utils.toArray(".fade-up").forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 35,
          duration: 1,
          ease: "power3.out",
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full bg-gray-50 text-gray-800">

      {/* ======================= HERO ======================= */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <img
          src="/assets/ourservices/customsolution.jpg"
          alt="Custom Solar Solutions"
          className="absolute inset-0 w-full h-full object-fill z-0"
        />

        {/* Dark overlay for visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

        <div className="relative z-10 text-center px-6 fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Custom Solar Solutions
          </h1>
          
          <h6 className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
            Tailored solar systems designed to match your unique energy needs,
            optimized for performance, reliability, and long-term savings.
          </h6>
        </div>
      </section>

      {/* ======================= FEATURES ======================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 fade-up text-primary">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "bi-person-gear",
              title: "Customized Solar Designs",
              desc: "Every solar system is engineered based on your load, space, region and power goals.",
            },
            {
              icon: "bi-house-gear",
              title: "Rooftop & Ground-Mount Solutions",
              desc: "Tailored systems for homes, industries, warehouses and institutions.",
            },
            {
              icon: "bi-lightning",
              title: "High-Efficiency Panels",
              desc: "We provide top-tier solar panels for maximum energy generation.",
            },
            {
              icon: "bi-cpu",
              title: "Smart Monitoring Systems",
              desc: "Track energy in real-time with intelligent IoT-based monitoring.",
            },
            {
              icon: "bi-shield-check",
              title: "Safety & Compliance",
              desc: "Fully compliant solutions meeting all electrical and safety standards.",
            },
            {
              icon: "bi-check-circle-fill",
              title: "Quality Assurance",
              desc: "Premium components for long-term reliability and minimal maintenance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-2xl shadow-md fade-up border border-gray-200 hover:shadow-xl transition-all"
            >
              <i className={`text-4xl text-primary ${item.icon}`}></i>
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              
              <h6 className="mt-3 text-gray-600 leading-relaxed">{item.desc}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= PROCESS ======================= */}
      <section className="py-20 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 fade-up text-primary">
          Our Process
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              icon: "bi-clipboard-data",
              title: "Requirement Study",
              desc: "We analyze your power consumption and site feasibility.",
            },
            {
              step: "02",
              icon: "bi-rulers",
              title: "System Sizing",
              desc: "Accurate system sizing based on sunlight, load, and future growth.",
            },
            {
              step: "03",
              icon: "bi-pencil-square",
              title: "System Design",
              desc: "Detailed panel layout, wiring design and inverter configuration.",
            },
            {
              step: "04",
              icon: "bi-truck",
              title: "Installation",
              desc: "Professional installation using high-quality hardware.",
            },
            {
              step: "05",
              icon: "bi-speedometer",
              title: "Testing & Optimization",
              desc: "System tested for efficiency, safety and peak performance.",
            },
            {
              step: "06",
              icon: "bi-phone",
              title: "Support",
              desc: "We provide ongoing service, performance monitoring and support.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="fade-up p-10 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl border transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-primary">{item.step}</span>
                <i className={`text-3xl text-primary ${item.icon}`}></i>
              </div>

              <h3 className="text-2xl font-semibold">{item.title}</h3>
              
              <h6 className="text-gray-600 mt-3 leading-relaxed">{item.desc}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section className="py-20 bg-primary text-white text-center px-6 fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Build Your Custom Solar Solution
        </h2>
        
        <h6 className="max-w-3xl mx-auto text-lg mb-8 opacity-90">
          From concept to commissioning — we design solar systems that match
          your exact requirements.
        </h6>

        <a
          href="mailto:sales@spautomation.org"
          className="inline-flex items-center px-6 py-3 bg-white text-green-700 rounded-md font-semibold shadow hover:shadow-md"
        >
          <i className="bi-envelope-fill mr-2"></i>
          Contact Us
        </a>
      </section>

    </div>
  );
}
