import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// --- SVG Icon Components ---
// Using inline SVGs for icons as requested in the image.

// A simple logo approximation
const LogoIcon = ({  }) => ( <img src="/assets/Banners/sp-icon.png" alt="logoicon" className='w-28 h-24'/> );

// --- Footer Component ---
const Footer = () => {

  const [description, setDescription] = useState(
    "Future-ready solar, storage, and power solutions. Aligned with India's self-manufacturing vision. Committed to quality, innovation, and partnerships."
  );

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios
      .get(`${API_URL}/footer`)
      .then((res) => setDescription(res.data.description))
      .catch(() => {}); // keep default text if the request fails
  }, []);

  const linkSections = [
        {
      title: 'Quick Links',
      links: [
        { href: '/', text: 'Home' },
        { href: '/ourcompany/about', text: 'About Us' },
        { href: '/ourcompany/team', text: 'Our Team' },
        { href: '/blogs', text: 'Blog' },
        { href: '/contact', text: 'Contact Us' },
      ],
    },
    {
      title: 'Services',
      links: [
       { href: '/ourservices/solar-consultancy-services', text: 'Solar consultancy' },
  { href: '/ourservices/system-design-engineering', text: 'System Design & Engineering' },
  { href: '/ourservices/engineering-procurement-container', text: 'EPC' },
  { href: '/ourservices/rooftop-solar-services', text: 'Rooftop Solar Service' },
  { href: '/ourservices/energy-storage-integration', text: 'Energy Storage Integration' },
  { href: '/ourservices/custom-solar-solution', text: 'Custom Solar Solutions' },
  { href: '/ourservices/turnkey-solution-for-enterprises', text: 'Turnkey Solution' },
  { href: '/ourservices/remote-monitoring-energy-analytics', text: 'Remote Monitoring Analytics' },
  { href: '/ourservices/training-technical-support', text: 'Technical Support Training' },
      ],
    },{
  title: 'Products',
  links: [
    { href: "products/1", text: "Mono-Crystalline Solar Panel 550W" },
    { href: "products/2", text: "Poly-Crystalline Solar Panel 330W" },
    { href: "products/3", text: "On-Grid Solar Inverter 5kW" },
    { href: "products/4", text: "Hybrid Solar Inverter 10kW" },
    { href: "products/7", text: "MPPT Charge Controller 60A" },
    { href: "products/8", text: "DC Surge Protection Device" },
    { href: "products/9", text: "Rooftop Solar Mounting Structure" },
    { href: "products/10", text: "3kW Grid-Tie Inverter" }
  ]
}
,
  ];

  const contactInfo = [
    {
      iconClass: 'bi-envelope-fill',
      title: 'Support & Email',
      href: 'mailto:sales@spautomation.org',
      content: 'sales@spautomation.org',
    },
    {
      iconClass: 'bi-telephone-fill',
      title: 'Customer Support',
      href: 'tel:+919910089643',
      content: '+91 99100 89643',
    },
    {
      iconClass: 'bi-geo-alt-fill',
      title: 'Our Location',
      href: '#', 
      content: ' B-71, Ground Floor, Transport Nagar, Sector 69, Noida 201301',
    },
  ];

  return (
    // Main footer container with dark green background
    <footer className="bg-green-950 text-white pb-8 pt-12 px-4 sm:px-6  lg:px-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* Top Section: Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-x-24 border-b  border-green-900 pb-4">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center lg:mb-0 md:mb-2 sm:mb-4 gap-4">
              <div className="flex-shrink-0 bg-[#89EA5F] text-green-950 p-6  rounded-full w-14 h-14 flex items-center justify-center">
                <i className={`${item.iconClass}  text-2xl`}></i>
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <h6 className="text-gray-300 text-sm text-justify">
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors duration-200"
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.content}
                  </a>
                </h6>
              </div>
            </div>
          ))}
  
    
        </div>

<hr className="col-span-full my-8 border-0 h-[2px] bg-gradient-to-r w-full from-green-400 via-green-300 to-green-400 rounded-full" />

        {/* Middle Section: Logo, Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Logo & About */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
          <a href="/"><LogoIcon /></a>    
             
            </div>
            <h4 className="text-gray-300 mb-6 text-sm text-justify leading-relaxed">
              {description}
            </h4>
            
          </div>
          {/* Columns 2-4: Link Sections */}
          {linkSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold text-xl mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="flex items-center">
                    <span className="text-[#89EA5F] mr-2 text-xl">•</span>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-12">
  <div className="bg-[#89EA5F] text-green-950 p-3 rounded-lg font-medium flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-2">
    
    {/* Left Column - Copyright */}
    <div>
      © 2025 <span className="font-semibold">SP Automation</span>. All rights reserved.
    </div>

    {/* Right Column - Developed & Designed */}
    <div>
      Developed & Designed by{" "}
      <a
        href="https://www.jaikviktechnology.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-900 font-semibold hover:underline hover:text-green-800 transition-all duration-300"
      >
        Jaikvik Technology India Pvt. Ltd.
      </a>
    </div>
  </div>
</div>

      </div>
    </footer>
  );
};

// Main App component to render the footer
export default function App() {
  return (
    <>
     
      <div className="w-full">
        {/* You can add other page content here */}
        <Footer />
      </div>
    </>
  );
}