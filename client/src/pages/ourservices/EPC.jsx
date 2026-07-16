import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function EPC() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          src="/assets/ourservices/EPC.jpg"
          alt="Engineering Procurement Construction"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center px-6 fade-up">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide">
            Engineering · Procurement · Construction
          </h1>
          <h6 className="text-gray-200 md:text-lg max-w-2xl mx-auto">
            Complete end-to-end EPC solutions ensuring precision engineering,
            timely execution, and reliable infrastructure delivery.
          </h6>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-gray-50">
        <div className="fade-up max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Delivering Excellence Across Every Stage of EPC Execution
          </h2>
          <h6 className="text-gray-600">
            At S P Automation, we streamline the complete EPC lifecycle—
            from engineering design and procurement optimization to on-site
            construction and project commissioning. Our integrated approach
            ensures quality, safety, and operational reliability for every project.
          </h6>
        </div>
      </section>

      {/* EPC CAPABILITIES */}
      <section className="py-14 px-6 md:px-16 lg:px-28">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center fade-up">
          Core EPC Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "bi-pen",
              title: "Engineering Design",
              text: "Complete structural, electrical, mechanical, and automation design with detailed project planning.",
            },
            {
              icon: "bi-box-seam",
              title: "Procurement Management",
              text: "Reliable sourcing, vendor evaluation, quality assurance, and optimized supply chain coordination.",
            },
            {
              icon: "bi-building",
              title: "Construction Execution",
              text: "Professional site management, systematic installation, and safety-compliant execution.",
            },
            {
              icon: "bi-diagram-3",
              title: "Project Integration",
              text: "Seamless integration of systems ensuring synchronized operation across all engineering disciplines.",
            },
            {
              icon: "bi-shield-check",
              title: "Quality & Safety",
              text: "Strict quality control protocols and globally compliant safety standards throughout project execution.",
            },
            {
              icon: "bi-bar-chart-line",
              title: "Testing & Commissioning",
              text: "Performance validation, system checks, and handover with operational readiness assurance.",
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
          EPC Workflow Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {[
            {
              icon: "bi-search",
              title: "Project Planning",
              text: "Requirement mapping, feasibility study, and preliminary engineering.",
            },
            {
              icon: "bi-pencil-square",
              title: "Detailed Engineering",
              text: "Final design documents, drawings, BOQs, and technical specifications.",
            },
            {
              icon: "bi-truck",
              title: "Procurement & Logistics",
              text: "Vendor management, material delivery, and equipment scheduling.",
            },
            {
              icon: "bi-hammer",
              title: "Construction & Commissioning",
              text: "Site execution, testing, validation, and project handover.",
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
          Ready to Build with Reliable EPC Expertise?
        </h2>
        <h6 className="text-white max-w-2xl mx-auto mb-8 fade-up">
          Connect with our engineering specialists to plan, design, and execute
          your next industrial or commercial project with complete confidence.
        </h6>
        <button className="fade-up bg-green-500 hover:bg-primary px-8 py-3 rounded-sm font-semibold text-white shadow-lg transition">
          <a href="mailto:sales@spautomation.org">Contact Us</a>
        </button>
      </section>
    </div>
  );
}
