import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion";

const OurCompany = () => {
  const location = useLocation();

  const menuItems = [
    { path: "about", name: "About SP Automation" },
    { path: "mission-vision", name: "Mission & Vision" },
    { path: "chooseus", name: "Why Choose Us" },
    { path: "team", name: "Our Team" },
    { path: "spautomationfaqs", name: "FAQs" },
  ];

  return (
    <div className="min-h-screen ">

      {/* --------------------------------------------------- */}
      {/*                    HERO SECTION                     */}
      {/* --------------------------------------------------- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="relative h-[50vh] w-full overflow-hidden"
      >
        {/* Background Video */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/ourcompany/solarvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <motion.div variants={staggerContainer(0.1, 0.3)} className="text-center md:text-left max-w-3xl">

            <motion.h1
              variants={textVariant(0.2)}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            >
               <span className="text-primary">SP Automation</span>
            </motion.h1>

          </motion.div>
        </div>
      </motion.section>

      {/* --------------------------------------------------- */}
      {/*               SIDEBAR + PAGE CONTENT                */}
      {/* --------------------------------------------------- */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-32 space-y-8">

                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden border"
                  style={{ borderColor: "#78D54E" }}
                >
                  <div
                    className="px-6 py-4 text-white"
                    style={{ backgroundColor: "#78D54E" }}
                  >
                    <h2 className="text-xl font-semibold">SP Automation</h2>
                  </div>

                  <ul className="divide-y" style={{ borderColor: "#78D54E" }}>
                    {menuItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={`/ourcompany/${item.path}`}
                          className={`block px-6 py-3 text-sm transition duration-150 ${
                            location.pathname === `/ourcompany/${item.path}`
                              ? "font-semibold border-l-4"
                              : "text-gray-700 hover:text-black"
                          }`}
                          style={{
                            backgroundColor:
                              location.pathname === `/ourcompany/${item.path}`
                                ? "#88E788"
                                : "transparent",
                            borderColor:
                              location.pathname === `/ourcompany/${item.path}`
                                ? "#88E788"
                                : "transparent",
                          }}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              <div
                className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8 border"
                style={{ borderColor: "#78D54E" }}
              >
                <Outlet />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default OurCompany;
