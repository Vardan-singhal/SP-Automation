import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const faqData = [
  {
    id: 1,
    question: "What does the 'Automation' part of your service mean?",
    answer:
      "It means your system is smart. We don't just install panels; we integrate a complete energy management system. You can monitor production in real-time, automatically use battery power during an outage, and even optimize energy use by connecting to your EV charger or smart thermostat, maximizing your savings.",
  },
  {
    id: 2,
    question: 'How much can I save, and what financing is available?',
    answer:
      "Savings vary, but many customers reduce their utility bills by 60-90%. We offer a free, custom quote to see your exact potential savings. We also provide several $0-down financing options, allowing you to switch to solar with no upfront cost and simply replace your high utility bill with a lower, fixed solar payment.",
  },
  {
    id: 3,
    question: 'What maintenance is required, and what is the warranty?',
    answer:
      'Solar panels are virtually maintenance-free, as rain typically cleans them. Our systems come with 24/7 monitoring, so we’re alerted if any issues arise. All our installations are backed by a 25-year panel performance warranty, a 10-year workmanship warranty, and individual warranties on components like inverters and batteries.',
  },
];

const AccordionItem = ({ item, isOpen, onToggle }) => {
  return (
    <li className="block mb-[30px] last:mb-0">
      <button
        type="button"
        onClick={onToggle}
        className={`relative flex items-center justify-between w-full text-left cursor-pointer transition-all duration-500 ease-in-out py-[17px] px-[30px] pr-[50px] rounded-md
          ${
            isOpen
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white text-gray-900 shadow-[0_10px_40px_0_rgba(0,0,0,0.1)]'
          }`}
      >
        <h5 className="text-lg font-semibold">{item.question}</h5>
        <span className="icon-outer absolute top-1/2 right-[30px] -translate-y-1/2">
          <i
            className={`bi bi-chevron-down text-xl transition-transform duration-500 ${
              isOpen ? 'rotate-180' : ''
            }`}
          ></i>
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-[25px] px-[30px]">
            <h6 className="text-gray-700">{item.answer}</h6>
          </div>
        </div>
      </div>
    </li>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.4 } // Trigger when 40% of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`faq-section py-28 lg:py-[115px] overflow-hidden transition-all duration-700 ease-in-out ${
        isInView ? 'bg-green-50' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- Image Column --- */}
          <div className="image-column">
            <div className="relative w-full max-w-[450px] mx-auto lg:mx-0 lg:mr-[30px] lg:pr-[90px] lg:pb-[75px]">
              {/* dotted background */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-[250px] right-[55px] w-[346px] h-[328px] -z-10
                  [background-image:radial-gradient(theme(colors.gray.300)_1.5px,transparent_1.5px)]
                  [background-size:16px_16px]"
              ></div>

              {/* main floating image */}
              <figure
                className="relative w-full aspect-[450/550] overflow-hidden rounded-xl animate-float
                [clip-path:polygon(0%_0%,_100%_0%,_100%_92%,_0%_100%,_0%_0%)]"
              >
                <img
                  src="/assets/Banners/faq.webp"
                  alt="Residential electrical work"
                  className="w-full h-full object-cover"
                />

                {/* diagonal shine */}
                <div className="absolute inset-0 before:content-[''] before:absolute before:top-0 before:left-[-75%]
                  before:w-[50%] before:h-full before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent
                  before:opacity-30 before:skew-x-[-20deg] before:animate-shine">
                </div>
              </figure>

              {/* secondary image */}
              <figure
                className="absolute right-0 bottom-0 w-full max-w-[300px] aspect-[300/240] overflow-hidden shadow-xl rounded-xl
                  transition-all duration-500 hover:scale-105 animate-float-slow"
              >
                <img
                  src="/assets/Banners/faq-2.jpg"
                  alt="Licensed electricians"
                  className="w-full h-full object-cover"
                />
              </figure>
            </div>
          </div>

          {/* --- Content Column --- */}
          <div className="content-column lg:pl-8">
            <div className="relative block lg:ml-[30px]">
              <div className="mb-12">
                <h5 className="block text-lg font-medium text-primary mb-2">FAQ’S</h5>
                <h2 className="block text-4xl lg:text-[40px] font-bold text-gray-900 mb-6 leading-[1.25]">
                  Frequently Asked Question
                </h2>
                <h6 className="text-base text-gray-700 leading-relaxed">
                  All of our Products are backed by our 100% satisfaction guarantee Our electricians.
                </h6>
              </div>

              <ul className="accordion-box">
                {faqData.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
