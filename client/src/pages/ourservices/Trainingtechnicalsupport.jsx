import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "bootstrap-icons/font/bootstrap-icons.css";

const heroImage = "/assets/ourservices/technicaltraining.jpeg";

export default function TechnicalSupportTraining() {
  const heroRef = useRef(null);
  const whySectionRef = useRef(null);
  const approachRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animation
    const hero = heroRef.current;
    gsap.from(hero.querySelectorAll(".stagger"), {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });

    // Scroll reveal
    const sections = [
      whySectionRef.current,
      approachRef.current,
      ctaRef.current,
    ].filter((el) => el);

    gsap.set(sections, { opacity: 0, y: 30 });

    const reveal = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        }
      });
    };

    const observer = new IntersectionObserver(reveal, { threshold: 0.15 });
    sections.forEach((el) => observer.observe(el));

    return () => {
      sections.forEach((el) => observer.unobserve(el));
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <main className="min-h-screen text-primary">
      {/* HERO */}
      <header className="relative overflow-hidden min-h-64 sm:min-h-96">

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Technical Support & Training"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0  z-10"></div>

        {/* Content */}
        <div
          ref={heroRef}
          className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10"
        >
          <div className="p-6 sm:p-10 rounded-2xl">
            <h6 className="text-sm font-medium text-primary mb-2 stagger">
              SP Automation
            </h6>

            <h1 className="text-3xl sm:text-4xl text-black font-extrabold leading-tight mb-4 stagger">
              Technical Support & Training
            </h1>

            <h6 className="text-white text-base sm:text-lg mb-6 stagger">
              End-to-end technical support, product training, and hands-on 
              skill development to ensure smooth operations, faster adoption, 
              and maximum system uptime.
            </h6>

            <a
              href="/contactus"
              className="inline-flex items-center justify-center px-5 py-3 bg-green-700 hover:bg-green-800 text-white rounded-md font-semibold shadow-sm stagger"
            >
              Request a Training Session
            </a>
          </div>
        </div>
      </header>

      {/* WHY CHOOSE US */}
      <section
        ref={whySectionRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Why Our Technical Support Stands Out?
            </h2>

            <h6 className="text-gray-700 mb-4">
              Reliable assistance, expert guidance, and structured training 
              to keep your operations running smoothly — powered by industry experts 
              and real-time diagnostics.
            </h6>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 mt-2"></span>
                <span className="text-gray-700">24/7 remote assistance</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 mt-2"></span>
                <span className="text-gray-700">
                  On-site technical troubleshooting
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 mt-2"></span>
                <span className="text-gray-700">
                  Customized training programs
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 mt-2"></span>
                <span className="text-gray-700">
                  System health monitoring & reporting
                </span>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img
                src={heroImage}
                alt="Support engineer training"
                className="w-full h-52 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section
        ref={approachRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16"
      >
        <div className="bg-gradient-to-r from-white via-green-50 to-white rounded-2xl p-6 sm:p-10 shadow-inner">

          <h3 className="text-2xl font-bold mb-4">Our Training & Support Approach</h3>

          <h6 className="text-gray-700 mb-6">
            From hands-on demonstrations to guided troubleshooting — we ensure 
            your team is fully prepared to operate, maintain, and optimize 
            system performance.
          </h6>

          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <li className="p-4 bg-white rounded-lg shadow-sm">
              <strong className="text-green-700 block">1. Diagnose</strong>
              <span className="text-gray-600 text-sm">
                Identify issues with system checks & logs
              </span>
            </li>

            <li className="p-4 bg-white rounded-lg shadow-sm">
              <strong className="text-green-700 block">2. Train</strong>
              <span className="text-gray-600 text-sm">
                Hands-on training & guided demonstration
              </span>
            </li>

            <li className="p-4 bg-white rounded-lg shadow-sm">
              <strong className="text-green-700 block">3. Support</strong>
              <span className="text-gray-600 text-sm">
                Online, on-site & predictive maintenance help
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 mb-8"
      >
        <div className="bg-green-700 text-white rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6">

          <div>
            <h4 className="text-2xl font-bold">Need Technical Support or Training?</h4>
            <h6 className="text-white/90 mt-2">
              Connect with our expert team for fast, reliable assistance.
            </h6>
          </div>

          <a
            href="mailto:support@spautomation.example"
            className="inline-flex items-center px-6 py-3 bg-white text-green-700 rounded-md font-semibold shadow-sm hover:shadow-md"
          >
            Contact Support Team
          </a>
        </div>
      </section>
    </main>
  );
}
