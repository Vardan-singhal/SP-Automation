import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function About() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image column animation
      gsap.from(".about-img", {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Text column animation
      gsap.from(".about-text", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Feature items animation
      gsap.from(".feature-item", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---------------- LEFT IMAGE COLUMN ---------------- */}
          <div className="grid grid-cols-2 gap-4 items-center about-img">
            <img
              className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-[3/4]"
              src="/assets/ourcompany/solarpan.jpeg"
              alt="Solar Panel"
              onError={(e) =>
                (e.target.src =
                  "/assets/ourcompany/solarpan.jpeg")
              }
            />

            <img
              className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-[3/4] mt-12"
              src="/assets/ourcompany/energystore.png"
              alt="Energy Storage"
              onError={(e) =>
                (e.target.src =
                  "/assets/ourcompany/energystore.png")
              }
            />
          </div>

          {/* ---------------- RIGHT TEXT COLUMN ---------------- */}
          <div className="about-text">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              About <span className="text-primary">S P Automation</span>
            </h1>

            <h6 className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              S P Automation is a forward-thinking enterprise leading India’s
              transition toward advanced energy systems. In a world shaped by
              environmental responsibility, we deliver intelligent, future-ready
              solutions.
            </h6>

            <h6 className="text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
              Rooted in local production excellence, we reinforce our commitment
              to national development and industrial growth while enabling a
              smarter, cleaner, and more resilient energy future.
            </h6>

            {/* ---------------- FEATURES ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="feature-item p-4 rounded-lg flex flex-col items-center md:items-start text-center md:text-left">
                <i className="bi bi-gem icon-primary text-4xl mb-3"></i>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Quality
                </h3>
                <h6 className="text-gray-600 dark:text-gray-400">
                  Premium solar & power systems.
                </h6>
              </div>

              <div className="feature-item p-4 rounded-lg flex flex-col items-center md:items-start text-center md:text-left">
                <i className="bi bi-lightbulb icon-primary text-4xl mb-3"></i>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Innovation
                </h3>
                <h6 className="text-gray-600 dark:text-gray-400">
                  Future-ready energy technology.
                </h6>
              </div>

              <div className="feature-item p-4 rounded-lg flex flex-col items-center md:items-start text-center md:text-left">
                <i className="bi bi-flag-fill icon-primary text-4xl mb-3"></i>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Made in India
                </h3>
                <h6 className="text-gray-600 dark:text-gray-400">
                  Supporting national growth.
                </h6>
              </div>
            </div>
          </div>
          {/* End Right Column */}
        </div>
      </div>
    </section>
  );
}
