import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function EnergyStorageIntegration() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure NOTHING starts invisible — fixes your disappearing issue
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
      {/* HERO */}
      <section className="relative w-full h-[65vh] flex items-center justify-center overflow-hidden">
        <img
          src="/assets/ourservices/energystorage.png"
          alt="Energy Storage Systems"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center px-6 fade-up">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide">
            Energy Storage Integration
          </h1>
          <h6 className="text-gray-200 md:text-lg max-w-2xl mx-auto">
            Advanced lithium-ion storage systems engineered for reliability,
            scalability, and clean power independence.
          </h6>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-gray-50">
        <div className="fade-up max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Powering a Smarter, More Resilient Energy Future
          </h2>
          <h6 className="text-gray-600">
            S P Automation delivers next-gen lithium-ion storage solutions
            ensuring reliability, peak load efficiency, and uninterrupted backup
            support with advanced intelligent BMS technology.
          </h6>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-14 px-6 md:px-16 lg:px-28">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center fade-up">
          Energy Storage Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "bi-battery-charging",
              title: "Lithium-Ion Battery Packs",
              text: "High-efficiency modular battery systems with long lifecycle performance.",
            },
            {
              icon: "bi-cpu",
              title: "Smart BMS Integration",
              text: "Intelligent monitoring and protection for optimal performance and safety.",
            },
            {
              icon: "bi-lightning",
              title: "Peak Load Management",
              text: "Reduce grid dependency and operational cost through efficient load balancing.",
            },
            {
              icon: "bi-bricks",
              title: "Scalable Energy Storage",
              text: "Flexible configurations for small to large industrial applications.",
            },
            {
              icon: "bi-shield-lock",
              title: "High Safety Compliance",
              text: "Advanced thermal and electrical protection mechanisms built-in.",
            },
            {
              icon: "bi-cloud-check",
              title: "Real-Time Monitoring",
              text: "IoT-enabled analytics for performance insights and remote diagnostics.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-xl shadow-md fade-up hover:shadow-xl transition text-center"
            >
              <i className={`${item.icon} text-4xl text-primary mb-4`}></i>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <h6 className="text-gray-600 text-sm">{item.text}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-green-50">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center fade-up">
          Our Integration Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {[
            {
              icon: "bi-search",
              title: "Energy Assessment",
              text: "Load profiling and requirement analysis for optimal storage design.",
            },
            {
              icon: "bi-diagram-3",
              title: "System Engineering",
              text: "Technical layout, capacity sizing, and safety configuration.",
            },
            {
              icon: "bi-hammer",
              title: "Installation & Setup",
              text: "Expert deployment with complete electrical compliance.",
            },
            {
              icon: "bi-bar-chart-line",
              title: "Monitoring & Optimization",
              text: "Continuous performance tracking through intelligent BMS.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="fade-up bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition"
            >
              <i className={`${step.icon} text-4xl text-primary mb-4`}></i>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <h6 className="text-gray-600 text-sm">{step.text}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center px-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 fade-up">
          Ready to Unlock Reliable Energy Storage?
        </h2>
        <h6 className="text-white max-w-2xl mx-auto mb-8 fade-up">
          Get in touch with our experts to explore advanced lithium-ion energy
          storage solutions tailored to your operational needs.
        </h6>
        <button className="fade-up bg-green-500 hover:bg-primary px-8 py-3 rounded-sm font-semibold text-white shadow-lg transition">
          <a href="mailto:sales@spautomation.org">Contact Us</a>
        </button>
      </section>
    </div>
  );
}
