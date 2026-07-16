import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap-icons/font/bootstrap-icons.css";

gsap.registerPlugin(ScrollTrigger);

export default function RemoteMonitoringAnalytics() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO TEXT - Soft & visible instantly
      gsap.from(".hero-stagger", {
        opacity: 0,
        y: 15,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Fade-up sections on scroll
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",   // ensures element is ALWAYS visible before animating
            toggleActions: "play none none none",
          },
        });
      });

      // Card gentle hover animation (no scale jump)
      gsap.utils.toArray(".card-box").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-white text-gray-800 overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] md:h-[65vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 "></div>

        <img
          src="/assets/ourservices/remoteenergy.png"
          className="absolute inset-0 w-full h-full object-fill z-0"
          alt="Remote Monitoring"
        />

        <div ref={heroRef} className="relative z-10 px-6 max-w-4xl">
          <h1 className="hero-stagger text-4xl md:text-6xl font-bold leading-tight drop-shadow-xl">
            Remote Monitoring & Energy Analytics
          </h1>
          <h6 className="hero-stagger text-lg md:text-xl max-w-2xl mx-auto mt-4 ">
            Real-time insights and intelligent analytics for smarter performance.
          </h6>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-6 md:px-20 lg:px-32 fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Smarter Monitoring for Better Energy Management
          </h2>
          <h6 className="text-gray-600 text-lg md:text-xl leading-relaxed">
            IoT-driven dashboards, predictive alerts, and comprehensive insights give you full control
            over your energy ecosystem—anytime, anywhere.
          </h6>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-4 bg-gray-50 px-6 md:px-20 lg:px-32">
        <h3 className="fade-up text-3xl md:text-4xl font-bold text-center mb-10">
          Key Capabilities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: "bi-speedometer2",
              title: "Real-Time Monitoring",
              desc: "Live system tracking and fault analysis.",
            },
            {
              icon: "bi-graph-up-arrow",
              title: "Performance Analytics",
              desc: "Trends, benchmarks, and AI-driven insights.",
            },
            {
              icon: "bi-bell-fill",
              title: "Predictive Alerts",
              desc: "Instant alerts for faults or underperformance.",
            },
            {
              icon: "bi-cloud-check",
              title: "Cloud Data Access",
              desc: "Secure access anywhere, anytime.",
            },
            {
              icon: "bi-gear-wide-connected",
              title: "IoT Integration",
              desc: "Smart sensors for precision monitoring.",
            },
            {
              icon: "bi-journal-text",
              title: "Detailed Reports",
              desc: "Actionable reports for monthly & yearly trends.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="fade-up card-box bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="mb-4 text-center">
                <i className={`${item.icon} text-5xl text-primary`}></i>
              </div>
              <h4 className="text-xl font-semibold text-center">{item.title}</h4>
              <h6 className="text-gray-600 text-center mt-2">{item.desc}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 md:px-20 lg:px-32">
        <h3 className="fade-up text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: "bi-hdd-network",
              title: "Data Collection",
              desc: "Sensors gather real-time equipment data.",
            },
            {
              icon: "bi-cloud-arrow-up",
              title: "Cloud Processing",
              desc: "Encrypted data processed using analytics engines.",
            },
            {
              icon: "bi-bar-chart",
              title: "Dashboard View",
              desc: "Clear insights through interactive UI.",
            },
            {
              icon: "bi-lightning-charge-fill",
              title: "Smart Actions",
              desc: "Optimization and automate recommendations.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="fade-up p-8 card-box bg-white rounded-xl shadow-md text-center hover:shadow-lg transition-all"
            >
              <i className={`${item.icon} text-5xl text-primary`}></i>
              <h4 className="text-xl mt-4 font-semibold">{item.title}</h4>
              <h6 className="text-gray-600 mt-2">{item.desc}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center px-6 md:px-20 lg:px-32 fade-up">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Optimize Your Energy Performance
        </h3>
        <h6 className="text-lg max-w-xl mx-auto mb-6 opacity-90">
          Get real-time visibility, actionable intelligence, and total control.
        </h6>
        <button className="inline-flex items-center bg-white text-green-700 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 text-lg transition-all">
          <i className="bi bi-chat-dots-fill mr-2"></i>
          <a href="mailto:sales@spautomation.org">Contact Us</a>
        </button>
      </section>

    </div>
  );
}
