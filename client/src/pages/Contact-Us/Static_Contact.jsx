import React, { useState } from 'react';
import {
  GeoAltFill,
  EnvelopeFill,
  TelephoneFill,
  CheckCircleFill,
} from 'react-bootstrap-icons';

// You will need to install react-bootstrap-icons:
// npm install react-bootstrap-icons

// --- Contact Card Data (Updated) ---
const contactCards = [
  {
    icon: <GeoAltFill />, // Icon component
    title: 'Our Addresses',
    content: (
      <>
        <h6>Registered Address : 139, Lower Ground, Madhu Vihar Patparganj, New Delhi 110092</h6>
        <h6>Branch Office : B -71, Ground Floor, Transport Nagar, Sector 69, Noida 201301</h6>
      </>
    ),
    // Replace with your actual image paths
    image: '/assets/Contact/locn.jpg', 
  },
  {
    icon: <EnvelopeFill />,
    title: 'Emails',
    content: (
      <>
        <h6 className='text-bold'><a href="mailto:sales@spautomation.org">sales@spautomation.org</a></h6>
        <h6 className='text-bold'><a href="mailto:purchase@spautomation.org">purchase@spautomation.org</a></h6>
      </>
    ),
    // Replace with your actual image paths
    image: '/assets/Contact/contactus3.jpg',
  },
  {
    icon: <TelephoneFill />,
    title: 'Phones',
    content: (
      <>
        <h6>(+91) 99100 89643</h6>
        <h6>(+91) 92055 511005</h6>
      </>
    ),
    // Replace with your actual image paths
    image: '/assets/Contact/contactus2.jpg', 
  },
];


// --- Component ---
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section className="py-10 md:py-14 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* ====== Top Title ====== */}
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Contact Details
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Happy to Answer All Your Questions
          </h2>
        </div>

        {/* ====== NEW Contact Cards Grid (Matches Image) ====== */}
        <div className="grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-8 mb-20 md:mb-28">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl group animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              ></div>
              
              {/* Top Right Icon Box */}
              <div className="absolute top-5 right-5 bg-primary text-white p-4 rounded-lg shadow-lg">
                {/* Clone the icon component to pass props */}
                {React.cloneElement(card.icon, { size: 30, color: 'white' })}
              </div>

              {/* Bottom Content Box */}
              <div className="absolute bottom-5 left-5 right-5 bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <div className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {card.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ====== Get in Touch Section (Same as before) ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* --- Map Side --- */}
          <div className="h-96 md:h-full min-h-[500px] w-full rounded-lg shadow-2xl overflow-hidden animate-fadeInUp" style={{ animationDelay: '600ms' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7005.142481619714!2d77.38968469246073!3d28.61263680270215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef9166ea02d7%3A0x9a32f1a301ccc430!2sSector%2069%2C%20Noida%2C%20Uttar%20Pradesh%20201309!5e0!3m2!1sen!2sin!4v1763037105328!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>

          {/* --- Form Side --- */}
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl animate-fadeInUp" style={{ animationDelay: '750ms' }}>
            <div className="mb-8">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Contact Now
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                {formSubmitted ? 'Message Sent!' : 'Get In Touch With Us'}
              </h2>
            </div>
            
            {formSubmitted ? (
              // Success Message
              <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-6 rounded-md animate-fadeIn" role="alert">
                <div className="flex items-center">
                  <CheckCircleFill size={24} className="mr-3 text-green-500" />
                  <h3 className="text-xl font-semibold">Thank You!</h3>
                </div>
                <h6 className="mt-2">
                  Your message has been submitted successfully. We will get back to you shortly.
           </h6>
              </div>
            ) : (
              // Contact Form
              <form target='_blank' action="https://api.web3forms.com/submit" method='post' className="space-y-5 animate-fadeIn">
                  <input type="hidden" name="access_key" value="722799e7-b250-4def-8b99-cd6ac1a5ef59"/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-4 rounded-md bg-gray-100 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-4 rounded-md bg-gray-100 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone (Optional)"
                    className="w-full p-4 rounded-md bg-gray-100 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full p-4 rounded-md bg-gray-100 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write a Message"
                    rows="6"
                    required
                    className="w-full p-4 rounded-md bg-gray-100 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 rounded-md font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                   <h1> Submit Now</h1>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;