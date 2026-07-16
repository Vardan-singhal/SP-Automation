import React, { useState } from "react";

const CatalogDownload = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleDownload = () => {
    const pdfUrl = "/catalog.pdf"; // Replace with your actual PDF path
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Window-Machinery-Catalog.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    if (!formSubmitted) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
      });
    }
  };

  return (
    <div className="relative bg-gray-50">
      {/* Fixed Catalog Button on the bottom-left */}
      <button
        className="fixed right-0 top-52 
  bg-gradient-to-r from-[#EB1C24] to-[#B01018] 
  text-white rotate-90 translate-x-20
  rounded-full shadow-xl 
  hover:scale-110 hover:shadow-2xl transition-all duration-300 
  z-[1000] flex items-center gap-2 px-4 py-2"
        onClick={() => setShowForm(true)}
      >
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>

        {/* Normal Horizontal Text */}
        <span className="tracking-wide font-semibold text-sm md:text-base">
          Download Catalog
        </span>
      </button>

      {/* Form Modal */}
      {showForm && !formSubmitted && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden animate-scaleIn my-8">
            {/* Close */}
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 z-50 bg-white rounded-full p-1 shadow-md"
            >
              ✕
            </button>

            <div className="p-6">
              <div className="bg-[#271E5A] text-white p-4 rounded-t-lg -m-6 mb-6">
                <h2 className="text-2xl font-bold">
                  Request Our Machinery Catalog
                </h2>
                <p className="text-blue-100 opacity-90">
                  Get detailed information about our UPVC and Aluminum Window
                  Machines
                </p>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="grid grid-cols-1 gap-4 mt-6"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Full Name *"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email Address *"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Phone Number *"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  placeholder="Company Name *"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                />
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                >
                  <option value="">I'm interested in *</option>
                  <option value="upvc-welder">UPVC Welders</option>
                  <option value="corner-cleaner">Corner Cleaners</option>
                  <option value="aluminum-cutter">Aluminum Cutters</option>
                  <option value="cnc-machines">CNC Machines</option>
                  <option value="all">All Machinery</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-[#EB1C24] hover:bg-[#D11A22] text-white font-medium py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  Submit & Download Catalog
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Thank You / Download Modal */}
      {formSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center relative animate-scaleIn">
            <button
              onClick={() => setFormSubmitted(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md"
            >
              ✕
            </button>

            <div className="mb-5">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                ✅
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-2">
                Your information has been submitted successfully.
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-[#271E5A] hover:bg-[#1E1648] text-white font-medium py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Download Catalog Now
            </button>

            <p className="text-xs text-gray-500 mt-4">
              The catalog contains detailed specifications of our UPVC and
              Aluminum window machinery.
            </p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CatalogDownload;
