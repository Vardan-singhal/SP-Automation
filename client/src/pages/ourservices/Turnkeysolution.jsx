import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap-icons/font/bootstrap-icons.css";

gsap.registerPlugin(ScrollTrigger);

export default function TurnkeySolutionsEnterprises() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ⭐ Ensures ALL fade-up items start visible (prevents disappearing)
      gsap.set(".fade-up", { opacity: 1 });

      // ⭐ Smooth fade-up scroll animations
      gsap.utils.toArray(".fade-up").forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none none", // ⭐ Never reverse or hide
          },
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-full bg-gray-50 text-gray-800">

      {/* HERO */}
      <section className="relative w-full h-[65vh] flex items-center justify-center">
        <img
          src="/assets/ourservices/turnkey.jpeg"
          className="absolute inset-0 w-full h-full object-fill z-0"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80"></div>

        {/* Hero Text */}
        <div className="relative z-10 text-center px-6 fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl mb-4">
            Turnkey Solar Solutions for Enterprises
          </h1>
          
          <h6 className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
            End-to-end solar project execution—designed, engineered, deployed
            and commissioned with precision for enterprise demands.
          </h6>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 fade-up">
          Complete Enterprise-Grade Solar Solutions
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "bi-diagram-3",
              title: "Comprehensive Project Planning",
              desc: "From feasibility studies to ROI projections and detailed engineering.",
            },
            {
              icon: "bi-building-check",
              title: "Compliance & Industry Standards",
              desc: "Meets global enterprise standards including safety & regulatory norms.",
            },
            {
              icon: "bi-cpu",
              title: "Smart Technology Integration",
              desc: "IoT sensors, smart inverters & intelligent power distribution.",
            },
            {
              icon: "bi-lightning-charge-fill",
              title: "High-Efficiency Power Systems",
              desc: "Optimized for long-life, reliability and peak energy output.",
            },
            {
              icon: "bi-shield-check",
              title: "Risk & Safety Management",
              desc: "Engineered to eliminate operational risks and enhance durability.",
            },
            {
              icon: "bi-gear-wide-connected",
              title: "Seamless Commissioning",
              desc: "Testing, validation and complete system handover with accuracy.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-2xl shadow-lg fade-up border border-gray-200 hover:shadow-2xl transition-all"
            >
              <i className={`text-3xl text-primary ${item.icon}`}></i>
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              
              <h6 className="mt-3 text-gray-600 leading-relaxed">{item.desc}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-24 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 fade-up">
          Our Turnkey Delivery Process
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              icon: "bi-search",
              title: "Enterprise Assessment",
              desc: "Understanding energy patterns & infrastructure feasibility.",
            },
            {
              step: "02",
              icon: "bi-layout-text-window-reverse",
              title: "Engineering & Design",
              desc: "Customized solar systems engineered for enterprise operations.",
            },
            {
              step: "03",
              icon: "bi-tools",
              title: "Procurement & Deployment",
              desc: "Top-grade components installed with engineering precision.",
            },
            {
              step: "04",
              icon: "bi-lightning-fill",
              title: "System Integration",
              desc: "Smart integration into existing electrical networks.",
            },
            {
              step: "05",
              icon: "bi-graph-up-arrow",
              title: "Performance Optimization",
              desc: "Advanced monitoring & tuning for maximum ROI.",
            },
            {
              step: "06",
              icon: "bi-check-circle-fill",
              title: "Commissioning & Handover",
              desc: "Final validation, training & complete documentation.",
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

      {/* CTA */}
      <section className="py-24 bg-primary text-white text-center px-6 fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Power Your Enterprise With Smarter Solar Solutions
        </h2>
        
        <h6 className="max-w-3xl mx-auto text-lg mb-8 opacity-90">
          We manage everything—from planning to commissioning—so your business stays energy-efficient and future-ready.
        </h6>

        <a
          href="mailto:sales@spautomation.org"
          className="inline-flex items-center px-6 py-3 bg-white text-green-700 rounded-md font-semibold shadow-sm hover:shadow-md"
        >
          Contact
        </a>
      </section>

    </div>
  );
}
