// src/pages/ourcompany/SPAutomationFAQs.jsx

import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { QuestionCircleFill } from "react-bootstrap-icons";

gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------------
// FAQ DATA (26 QUESTIONS)
// --------------------------------------------------
const faqData = [
  { id: 1, question: "What does SP Automation do?", answer: "SP Automation specializes in industrial automation, robotics, and process improvement solutions." },
  { id: 2, question: "Do you provide customized automation solutions?", answer: "Yes! We create fully customized automation solutions tailored to your workflow." },
  { id: 3, question: "Which industries do you serve?", answer: "Manufacturing, automotive, pharma, packaging, food processing, electronics, and more." },
  { id: 4, question: "Do you offer maintenance and support?", answer: "We offer AMC, remote support, on-site maintenance, and operator training." },
  { id: 5, question: "How long does a project take?", answer: "1–8 weeks depending on complexity, hardware delivery, and programming." },
  { id: 6, question: "Do you provide on-site visits?", answer: "Yes, we inspect your facility before proposing a solution." },
  { id: 7, question: "Is consultation free?", answer: "Yes, the first consultation is free." },
  { id: 8, question: "Do you supply industrial robots?", answer: "Yes, including cobots, 6-axis arms, pick & place robots, and custom solutions." },
  { id: 9, question: "What certifications do you hold?", answer: "We are GST-certified and follow engineering compliance standards." },
  { id: 10, question: "Who are your major clients?", answer: "Excelcius Automation, VTRON Automobiles, Cube Highways, Solapur Highways, and more." },
  { id: 11, question: "How can we contact SP Automation?", answer: "Call +91 99100 89643 or +91 92055 511005." },
  { id: 12, question: "What does 'Made in India' mean?", answer: "All technology is locally designed and built to ensure high quality." },
  { id: 13, question: "What is intelligent power management?", answer: "It optimizes power use between solar, battery, and grid." },
  { id: 14, question: "How does IoT monitoring work?", answer: "Live monitoring on mobile & desktop with analytics." },
  { id: 15, question: "What is a Smart BMS?", answer: "A Battery Management System protects and improves battery health." },
  { id: 16, question: "What financing options are available?", answer: "We provide EMI and finance partnerships." },
  { id: 17, question: "What warranty do you provide?", answer: "Panels: 25 years. Inverters: 10 years. Batteries: 5–10 years." },
  { id: 18, question: "What is the solar installation process?", answer: "Survey → Design → Approvals → Installation → Testing → Handover." },
  { id: 19, question: "Do solar panels need maintenance?", answer: "Minimal — usually cleaning and seasonal checks." },
  { id: 20, question: "What is the lifespan of a solar system?", answer: "25+ years for panels; 10–15 years for electronics." },
  { id: 21, question: "Can I expand my system later?", answer: "Yes, our systems are modular and upgradable." },
  { id: 22, question: "Do you serve residential customers?", answer: "Yes, we install rooftop systems & battery backups." },
  { id: 23, question: "What safety standards do you follow?", answer: "We follow BIS, IEC, and industry safety certifications." },
  { id: 24, question: "How can I get a quote?", answer: "Call us for a free survey and detailed proposal." },
  { id: 25, question: "What is a microgrid?", answer: "A local grid that operates independently using solar + storage." },
  { id: 26, question: "What is the environmental impact of solar?", answer: "Solar reduces carbon emissions and supports renewable energy." },
  { id: 27, question: "Do you provide automation training?", answer: "Yes, we provide operator training and technical certifications." },
];

// --------------------------------------------------
// GSAP TWO-COLUMN SECTION
// --------------------------------------------------
const TwoColumnSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    gsap.from(leftRef.current, {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: wrapperRef.current, start: "top 85%" },
    });

    gsap.from(rightRef.current, {
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: wrapperRef.current, start: "top 85%" },
    });
  }, []);

  return (
    <></>
  );
};

// --------------------------------------------------
// MAIN PAGE
// --------------------------------------------------
const SPAutomationFAQs = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center items-center pt-16 bg-gray-50">

     <div className="flex items-center gap-3 mb-10">
      {/* Bootstrap Icon */}
      <QuestionCircleFill size={40} className="text-primary" />

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        FAQs
      </h2>
    </div>

      {/* TWO COLUMN GSAP SECTION */}
      <TwoColumnSection />

      {/* FAQ SECTION (TWO COLUMNS) */}
      <div className="max-w-6xl mx-auto mb-16 px-6 ">
        <div className="grid md:grid-cols-2 gap-8">
          {faqData.map((faq) => (
            <div key={faq.id} className="bg-white shadow rounded-xl p-5 border">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                <FaChevronDown
                  className={`transition-transform ${openId === faq.id ? "rotate-180" : ""}`}
                />
              </div>

              {openId === faq.id && (
                <h6 className="mt-3 text-gray-600">{faq.answer}</h6>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* STILL HAVE QUESTIONS */}
      <div className="w-full bg-primary py-16 border-t">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Still Have Questions?
          </h2>
          <h6 className="text-gray-600 mb-6">
            Our team is always ready to help you with automation, robotics,
            solar or support-related queries.
          </h6>

          {/* Bootstrap Icons (Phone + Mail) */}
          <div className="flex justify-center gap-10 text-gray-700 text-lg">
            <h6 className="flex items-center gap-2">
              <i className="bi bi-telephone-fill text-green-950"></i>
              +91 99100 89643
            </h6>

            <h6 className="flex items-center gap-2">
              <i className="bi bi-envelope-fill text-green-950"></i>
            sales@spautomation.org
            </h6>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SPAutomationFAQs;
