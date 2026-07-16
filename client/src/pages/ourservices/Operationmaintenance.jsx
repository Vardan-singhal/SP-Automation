import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap-icons/font/bootstrap-icons.css";

gsap.registerPlugin(ScrollTrigger);

export default function OperationsMaintenance() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fade-up").forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 90%",   // ⭐ triggers earlier so NOTHING stays hidden
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-white text-gray-800">

      {/* HERO */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white">
        <img
          src="/assets/ourservices/operationmaintenance.jpeg"
          alt="Operations & Maintenance"
          className="absolute inset-0 w-full h-full object-fill z-10"
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />

        <div className="fade-up max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold">Operations & Maintenance (O&M)</h1>
          <h6 className="text-lg md:text-xl opacity-90 mt-3">
            Maximizing System Performance With Reliable O&M Expertise
          </h6>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 md:px-20">
        <div className="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ensuring Peak Performance Throughout Your System’s Lifetime
          </h2>
          <h6 className="text-gray-600 max-w-3xl">
            Our preventive and corrective O&M services ensure maximum uptime, high performance,
            and long-term system health with real-time monitoring and expert maintenance.
          </h6>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 bg-gray-50 px-6 md:px-20">
        <h3 className="fade-up text-3xl font-bold text-gray-900 text-center mb-14">
          Our O&M Capabilities
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "bi-gear-fill",
              title: "Preventive Maintenance",
              desc: "Routine inspections, cleaning, and component upkeep.",
            },
            {
              icon: "bi-wrench-adjustable-circle-fill",
              title: "Corrective Repairs",
              desc: "Quick resolution of faults and breakdowns.",
            },
            {
              icon: "bi-graph-up-arrow",
              title: "Performance Monitoring",
              desc: "24/7 monitoring and real-time performance tracking.",
            },
            {
              icon: "bi-lightning-charge-fill",
              title: "Inverter & Battery Servicing",
              desc: "Specialized support for inverters and storage units.",
            },
            {
              icon: "bi-shield-check",
              title: "Safety & Compliance",
              desc: "Ensuring complete regulatory and safety adherence.",
            },
            {
              icon: "bi-journal-check",
              title: "AMC Packages",
              desc: "Affordable annual maintenance plans for all systems.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="fade-up bg-white p-8 rounded-2xl shadow-md hover:shadow-xl duration-300"
            >
              <i className={`${item.icon} text-4xl text-primary mb-4`} />
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <h6 className="text-gray-600">{item.desc}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-20 px-6 md:px-20">
        <h3 className="fade-up text-3xl font-bold text-center text-gray-900 mb-12">
          Our O&M Workflow
        </h3>

        <div className="grid md:grid-cols-4 gap-10">
          {[
            { icon: "bi-search", title: "Inspection", step: "Onsite review & system assessment." },
            { icon: "bi-bar-chart-steps", title: "Diagnostics", step: "Technical fault & performance diagnosis." },
            { icon: "bi-hammer", title: "Maintenance", step: "Execution of corrective & preventive actions." },
            { icon: "bi-check-circle-fill", title: "Reporting", step: "Detailed reports & performance summaries." },
          ].map((item, i) => (
            <div
              key={i}
              className="fade-up p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg duration-300 text-center"
            >
              <i className={`${item.icon} text-4xl text-primary mb-4`} />
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <h6 className="text-gray-600 text-sm">{item.step}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center px-6">
        <h3 className="fade-up text-3xl md:text-4xl font-bold mb-4">
          Achieve Maximum System Uptime
        </h3>
        <h6 className="fade-up opacity-90 max-w-2xl mx-auto mb-8">
          Partner with us for reliable, efficient, and long-lasting Operations & Maintenance services.
        </h6>
        <button className="fade-up bg-white text-green-700 font-semibold px-10 py-4 rounded-full shadow-md hover:bg-gray-200 duration-300">
          <h6><a href=",ailto:sales@spautomation.org">Contact Us</a></h6>
        </button>
      </section>
    </div>
  );
}
