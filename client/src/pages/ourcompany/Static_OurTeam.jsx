import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    id: 1,
    title: "Custom Engineering",
    desc: "We develop tailored engineering solutions focusing on automation, control systems, and custom industrial designs.",
    icon: "bi-tools",
  },
  {
    id: 2,
    title: "Industrial Automation",
    desc: "From PLC programming to SCADA development, we design intelligent automation systems for industries.",
    icon: "bi-cpu",
  },
  {
    id: 3,
    title: "Product Development",
    desc: "We help businesses bring ideas to life with complete product design, prototyping, and testing.",
    icon: "bi-lightbulb",
  },
  {
    id: 4,
    title: "Consulting & Training",
    desc: "Expert consulting and customized training programs to upskill teams in industrial technologies.",
    icon: "bi-chat-text",
  },
];

const excellenceData = [
  {
    id: 2,
    icon: "bi bi-lightning-charge",
    title: "Solar Energy Generated",
    value: "5MW+",
  },
  {
    id: 3,
    icon: "bi bi-sun",
    title: "Renewable Installations",
    value: "100+",
  },
  {
    id: 5,
    icon: "bi bi-battery-charging",
    title: "Energy Storage Solutions",
    value: "500+",
  },
  {
    id: 6,
    icon: "bi bi-globe",
    title: "CO₂ Emissions Reduced",
    value: "1200+ Tons",
  },
];

const teamData = [
  {
    id: 1,
    img: "/assets/ourteam/puneeta.jpg",
    name: "Puneet Audichya",
    role: "Director (Growth & Business Innovation)",
    desc: "With 25 years of industry experience, Puneet has shaped his career through leadership roles at top automation firms including Emerson, ABB, Rockwell, Honeywell, and Pepperl+Fuchs. In just four years as a business leader, he has propelled his organization to new heights, driving innovation and operational excellence that set industry benchmarks.",
  },
  {
    id: 2,
    img: "/assets/ourteam/sikha.jpg",
    name: "Shikha",
    role: "Founder and Director Financial Growth",
    desc: "Shikha is a dynamic industry leader whose journey from spiritual roots to corporate innovation is redefining automation. Recognized with award-winning achievements at Bharti Airtel, she leverages over 15 years of experience and unique perspective to influence progress and transformation.",
  },
  {
    id: 3,
    img: "/assets/ourteam/faize.jpg",
    name: "Md. Faize",
    role: "Senior Design Engineer",
    desc: "Md. Faize, with over 4 years at Exelcius Automation, is known for his extraordinary ability to master every aspect of engineering—design, project management, commissioning, testing, services, and administration—often all at once. His versatility consistently exceeds expectations.",
  },
];

export default function OurTeam() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const marqueeAnimation = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation setup
      if (marqueeInnerRef.current && marqueeRef.current) {
        const totalWidth = marqueeInnerRef.current.scrollWidth / 2; // Since duplicated
        marqueeAnimation.current = gsap.to(marqueeInnerRef.current, {
          x: -totalWidth,
          duration: 40, // Slowed down slightly for readability
          ease: "none",
          repeat: -1,
        });
      }
      // Pause on hover
      const handleMouseEnter = () => {
        if (marqueeAnimation.current) {
          marqueeAnimation.current.pause();
        }
      };
      const handleMouseLeave = () => {
        if (marqueeAnimation.current) {
          marqueeAnimation.current.play();
        }
      };
      marqueeRef.current.addEventListener("mouseenter", handleMouseEnter);
      marqueeRef.current.addEventListener("mouseleave", handleMouseLeave);

      gsap.to(".excellence-stat", {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".excellence-section",
          start: "top 80%",
        },
      });
      gsap.to(".expert-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".expert-section",
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      if (marqueeRef.current) {
        marqueeRef.current.removeEventListener("mouseenter", handleMouseEnter);
        marqueeRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Duplicate team data for seamless loop
  const duplicatedTeamData = [...teamData, ...teamData];

  return (
    <div ref={sectionRef} className="w-full overflow-hidden">
      {/* ------------------ TEAM SECTION ------------------ */}
      <section className="team-section py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">
            Meet Our Team
          </h2>
          <div
            ref={marqueeRef}
            className="overflow-hidden w-full"
          >
            <div
              ref={marqueeInnerRef}
              className="flex whitespace-nowrap"
            >
              {duplicatedTeamData.map((member, index) => (
                <div
                  // Using index for key because of duplication
                  key={`${member.id}-${index}`}
                  className="team-card inline-block mx-2 sm:mx-4 md:mx-6 flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow p-0 hover:shadow-xl transition-all duration-300 min-h-[220px] md:min-h-[280px] relative overflow-hidden">
                    
                    {/* VIEW 1: Default (Image + Name + Role) */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-95">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover mb-3 sm:mb-4 border-4 border-gray-100"
                      />
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 text-gray-800 text-center px-2">
                        {member.name}
                      </h3>
                      <h6 className="text-primary font-bold text-xs sm:text-sm md:text-base">
                        {member.role}
                      </h6>
                    </div>

                    {/* VIEW 2: Hover (Description Only) */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 bg-white transition-all duration-500 ease-in-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100">
                      {/* whitespace-normal is CRITICAL here to break the marquee's no-wrap rule */}
                      <h6 className="text-gray-600 text-xs sm:text-sm md:text-[15px] leading-relaxed text-center whitespace-normal font-medium px-2">
                        {member.desc}
                      </h6>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ EXCELLENCE SECTION ------------------ */}
      <section className="excellence-section py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">
            Our Excellence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {excellenceData.map((item) => (
              <div
                key={item.id}
                className="excellence-stat bg-gray-50 p-6 md:p-8 rounded-2xl shadow hover:shadow-lg transition duration-300 opacity-0 -translate-x-12"
              >
                <i className={`${item.icon} text-4xl md:text-5xl text-primary mb-4`}></i>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{item.value}</h3>
                <h6 className="text-gray-600 text-sm md:text-base">{item.title}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------ EXPERTISE SECTION ------------------ */}
      <section className="expert-section py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {expertiseData.map((item) => (
              <div
                key={item.id}
                className="expert-card bg-white p-6 md:p-8 rounded-2xl shadow hover:shadow-lg transition duration-300 opacity-0 translate-y-12"
              >
                <i className={`${item.icon} text-4xl md:text-5xl text-primary mx-auto mb-4 md:mb-5 block`}></i>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                <h6 className="text-gray-600 text-sm md:text-base">{item.desc}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}