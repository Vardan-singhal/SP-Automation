import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "bootstrap-icons/font/bootstrap-icons.css";

const heroImage = "/assets/ourservices/solarconsultancy.jpeg";

export default function SolarConsultancyServices() {
  const heroRef = useRef(null);
  const whySectionRef = useRef(null);
  const approachRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animation (on load)
    const hero = heroRef.current;
    gsap.from(hero.querySelectorAll(".stagger"), {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });

    // Set initial states for scroll-revealed sections
    const sections = [whySectionRef.current, approachRef.current, ctaRef.current].filter(
      el => el && el instanceof Element
    );
    gsap.set(sections, {
      opacity: 0,
      y: 30,
    });

    // Scroll reveal observer for multiple sections
    const reveal = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power3.out",
            overwrite: true 
          });
        }
      });
    };

    const observer = new IntersectionObserver(reveal, { threshold: 0.15 });
    sections.forEach(el => observer.observe(el));

    return () => {
      sections.forEach(el => {
        if (el && el instanceof Element) {
          observer.unobserve(el);
        }
      });
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <main className="min-h-screen  text-primary">
      {/* HERO */}
      <header className="relative overflow-hidden min-h-64 sm:min-h-96">

  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src={heroImage}
      alt="Solar consultancy services"
      className="w-full h-full object-fill rounded-sm"
    />
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 z-10"></div>

  {/* Text */}
  <div
    ref={heroRef}
    className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10"
  >
    <div className="p-6 sm:p-10 rounded-2xl">
      <h6 className="text-sm font-medium text-primary mb-2 stagger">
        SP Automation
      </h6>

      <h1 className="text-3xl sm:text-4xl text-white font-extrabold leading-tight mb-4 stagger">
        Solar Project Consultancy
      </h1>

      <h6 className="text-white/90 text-base sm:text-lg mb-6 stagger">
        Strategic advisory and feasibility analysis...
      </h6>

      <a
        href="/contact"
        className="inline-flex items-center justify-center px-5 py-3 bg-green-700 hover:bg-green-800 text-white rounded-md font-semibold stagger"
      >
        Get a Consultation
      </a>
    </div>
  </div>

</header>



      {/* WHY CHOOSE US */}
      <section ref={whySectionRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12 relative z-0">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why Choose S P Automation?</h2>
            <h6 className="text-gray-700 mb-4">
              Made in India, Built for the World — end-to-end solutions from design to deployment.
              Innovation-driven, performance-focused systems with unmatched nationwide support.
            </h6>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700">In-house manufacturing & quality assurance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700">IoT-enabled monitoring & smart BMS</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700">Tailored solutions for every scale</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700">End-to-end lifecycle support (O&M)</span>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block min-h-[200px]">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img 
                src={heroImage} 
                alt="solar panels closeup" 
                className="w-full h-52 object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS / APPROACH */}
      <section ref={approachRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16">
        <div className="bg-gradient-to-r from-white via-green-50 to-white rounded-2xl p-6 sm:p-10 shadow-inner">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Approach</h3>
          <h6 className="text-gray-700 mb-6">
            We combine technical depth and strategic insight: feasibility analysis, custom design,
            procurement, installation oversight, and long-term operations — all tailored for
            reliability and return on investment.
          </h6>

          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <li className="p-4 bg-white rounded-lg shadow-sm">
              <strong className="block text-green-700">1. Assess</strong>
              <span className="text-gray-600 text-sm">Site survey, shading & load study</span>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm">
              <strong className="block text-green-700">2. Design</strong>
              <span className="text-gray-600 text-sm">CAD plans, system sizing, BMS layout</span>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm">
              <strong className="block text-green-700">3. Deliver</strong>
              <span className="text-gray-600 text-sm">EPC execution, commissioning & O&M</span>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 mb-8">
        <div className="bg-green-700 text-white rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-bold">Ready to start your solar project?</h4>
            <h6 className="text-white/90 mt-2">Talk to our experts for a tailored, actionable plan.</h6>
          </div>

          <a
            id="contact"
            href="mailto:contact@spautomation.example"
            className="inline-flex items-center px-6 py-3 bg-white text-green-700 rounded-md font-semibold shadow-sm hover:shadow-md transition-shadow"
          >
            Request a Proposal
          </a>
        </div>
      </section>
    </main>
  );
}