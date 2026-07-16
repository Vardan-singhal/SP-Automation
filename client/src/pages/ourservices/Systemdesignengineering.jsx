import React, { useEffect } from "react";
import gsap from "gsap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SystemDesignEngineering() {
  useEffect(() => {
    gsap.from(".sde-animate", {
      opacity: 1,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="w-full bg-gray-50 py-16">

      {/* HERO SECTION */}
      <section className="relative w-full px-6 md:px-16 lg:px-24 sde-animate">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div>
            <span className="text-primary font-semibold tracking-wide">
              SYSTEM DESIGN & ENGINEERING
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-3">
              Precision-Driven System Design for Solar & Industrial Projects
            </h1>

            <h6 className="mt-5 text-gray-600 text-lg leading-relaxed">
              Our engineering team creates optimized system designs focusing on
              performance, safety, and long-term reliability. From load analysis
              to structural planning, we deliver engineering excellence tailored
              to your project requirements.
            </h6>

           
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/assets/ourservices/Systemdesign.jpg"
              alt="System Design & Engineering"
              className="rounded-2xl shadow-lg w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="mt-20 px-6 md:px-16 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center sde-animate">
          Our System Design Capabilities
        </h2>

        <h6 className="text-center max-w-2xl mx-auto text-gray-600 mt-4 sde-animate">
          High-precision engineering solutions ensuring maximum efficiency,
          structural safety, and seamless project execution.
        </h6>

        <div className="mt-14 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg sde-animate">
            <i className="bi bi-diagram-3-fill text-4xl text-primary"></i>
            <h3 className="text-xl font-semibold mt-4">Electrical System Design</h3>
            <h6 className="text-gray-600 mt-2">
              Load calculation, SLD diagrams, cable sizing, inverter selection, 
              and complete electrical engineering for solar & industrial systems.
            </h6>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg sde-animate">
            <i className="bi bi-rulers text-4xl text-primary"></i>
            <h3 className="text-xl font-semibold mt-4">Structural & Layout Design</h3>
            <h6 className="text-gray-600 mt-2">
              Structural analysis, wind load testing, module layout planning, 
              and optimum land/roof utilisation.
            </h6>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg sde-animate">
            <i className="bi bi-cpu text-4xl text-primary"></i>
            <h3 className="text-xl font-semibold mt-4">Control & Automation Design</h3>
            <h6 className="text-gray-600 mt-2">
              SCADA architecture, PLC logic design, remote monitoring integration, 
              and automation planning for industrial processes.
            </h6>
          </div>

        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="mt-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center sde-animate">
            System Design Workflow
          </h2>

          <div className="mt-14 grid md:grid-cols-4 gap-10">

            {[
              { icon: "bi-lightbulb", title: "Requirement Analysis" },
              { icon: "bi-clipboard-data", title: "Technical Feasibility Study" },
              { icon: "bi-bezier2", title: "Design & Optimization" },
              { icon: "bi-check2-circle", title: "Documentation & Delivery" },
            ].map((step, index) => (
              <div key={index} className="text-center sde-animate">
                <i className={`bi ${step.icon} text-4xl text-primary`}></i>
                <h4 className="mt-4 text-lg font-semibold">{step.title}</h4>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}
