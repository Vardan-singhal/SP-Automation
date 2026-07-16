import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function RooftopSolarServices() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Prevent index.css animation conflict → keep items visible
      gsap.set(".fade-up", { opacity: 1 });

      gsap.utils.toArray(".fade-up").forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full bg-white text-gray-800">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[65vh] flex items-center justify-center overflow-hidden">
        <img
          src="/assets/ourservices/rooftopsolar.jpeg"
          alt="Rooftop Solar Installation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center px-6 fade-up">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide">
            Rooftop Solar Services
          </h1>
          <h6 className="text-gray-200 md:text-lg max-w-2xl mx-auto">
            End-to-end rooftop solar deployment designed for long-term efficiency, 
            performance, and sustainability.
          </h6>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-gray-50">
        <div className="fade-up max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Powering Industries With Smart Rooftop Solar
          </h2>
          <h6 className="text-gray-600">
            At S P Automation, we deliver high-performance industrial rooftop solar 
            solutions engineered to reduce energy cost, enhance reliability, and support 
            carbon-neutral goals. Our systems are designed for maximum efficiency and 
            minimal maintenance.
          </h6>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-14 px-6 md:px-16 lg:px-28">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 fade-up text-center">
          Our Rooftop Solar Offerings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="p-8 rounded-xl shadow-md bg-white fade-up hover:shadow-xl transition">
            <i className="bi bi-building-check text-4xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Industrial Rooftop Solutions</h3>
            <h6 className="text-gray-600 text-sm">
              Customized rooftop systems engineered for factories, warehouses, 
              and manufacturing units.
            </h6>
          </div>

          <div className="p-8 rounded-xl shadow-md bg-white fade-up hover:shadow-xl transition">
            <i className="bi bi-lightning-charge text-4xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">High-Efficiency Power Output</h3>
            <h6 className="text-gray-600 text-sm">
              Optimized design ensures maximum solar energy generation with minimal space.
            </h6>
          </div>

          <div className="p-8 rounded-xl shadow-md bg-white fade-up hover:shadow-xl transition">
            <i className="bi bi-wrench-adjustable-circle text-4xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Installation & Commissioning</h3>
            <h6 className="text-gray-600 text-sm">
              Professional and timely execution with complete safety compliance.
            </h6>
          </div>

          <div className="p-8 rounded-xl shadow-md bg-white fade-up hover:shadow-xl transition">
            <i className="bi bi-gear-wide-connected text-4xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">System Optimization</h3>
            <h6 className="text-gray-600 text-sm">
              Performance-tuned systems for long-term output stability and reliability.
            </h6>
          </div>

          <div className="p-8 rounded-xl shadow-md bg-white fade-up hover:shadow-xl transition">
            <i className="bi bi-shield-check text-4xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Maintenance & Support</h3>
            <h6 className="text-gray-600 text-sm">
              Comprehensive O&M to ensure optimal performance year-round.
            </h6>
          </div>

          <div className="p-8 rounded-xl shadow-md bg-white fade-up hover:shadow-xl transition">
            <i className="bi bi-cloud-check text-4xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Remote Monitoring</h3>
            <h6 className="text-gray-600 text-sm">
              Real-time diagnostics and energy analytics using IoT platforms.
            </h6>
          </div>

        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-green-50">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 fade-up text-center">
          How We Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {[
            {
              icon: "bi-search",
              title: "Site Assessment",
              text: "Load analysis and rooftop feasibility study.",
            },
            {
              icon: "bi-diagram-3",
              title: "System Design",
              text: "Tailored engineering layout based on structural capacity.",
            },
            {
              icon: "bi-hammer",
              title: "Installation",
              text: "Safe, reliable, and compliant execution.",
            },
            {
              icon: "bi-graph-up-arrow",
              title: "Monitoring & Maintenance",
              text: "Performance optimization with remote insights.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="fade-up bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition"
            >
              <i className={`${step.icon} text-4xl text-green-600 mb-4`}></i>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <h6 className="text-gray-600 text-sm">{step.text}</h6>
            </div>
          ))}

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-primary text-white text-center px-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 fade-up">
          Ready to Transition to Smart Rooftop Solar?
        </h2>
        <h6 className="text-white max-w-2xl mx-auto mb-8 fade-up">
          Connect with our experts to explore the best rooftop solar solution 
          for your facility.
        </h6>
        <button className="fade-up bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full font-semibold text-white shadow-lg transition">
          <h6><a href="mailto:">Contact Us</a></h6>
        </button>
      </section>

    </div>
  );
}
