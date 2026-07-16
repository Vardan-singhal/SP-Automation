import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { FaTools, FaIndustry } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const GetQuoteModal = ({ isOpen, onClose }) => {
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const products = [
    {
      name: "uPVC Window Machine",
      icon: <FaTools className="text-red-600" />,
      subItems: [
        { name: "uPVC Welding Machine" },
        { name: "uPVC Cutting Machine" },
        { name: "uPVC Cleaning Machine" },
        { name: "uPVC Copy Router & Lock Hole Machine" },
        { name: "uPVC Glazing Bead Cutting Machine" },
        { name: "uPVC Drainage Water Slot Machine" },
        { name: "uPVC Mullion Cutting Machine" },
        { name: "uPVC Interlock punching (IPL-300)" },
        { name: "Hand Tools" },
        { name: "Other Special Machine" },
      ],
    },
    {
      name: "Aluminum Window Machine",
      icon: <FaIndustry className="text-red-600" />,
      subItems: [
        { name: "Aluminum Cutting Machine" },
        { name: "Aluminum Lock Hole Machine" },
        { name: "Aluminum Mullion Machine" },
        { name: "Aluminum Punching & Crimping Machine" },
      ],
    },
  ];

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/enquiries`, { ...quoteForm, source: "quote" });
      setQuoteForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        product: "",
        message: "",
      });
      onClose();
      alert("Thank you for your quote request! We'll contact you shortly.");
    } catch (err) {
      console.error("Quote submission failed:", err);
      alert("Something went wrong submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[5000] backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-all duration-300"
        >
          <FiX className="text-xl" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Request a Quote
            </h2>
            <p className="text-gray-600">
              Fill out the form below and our team will get back to you within
              24 hours.
            </p>
          </div>

          <form onSubmit={handleQuoteSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={quoteForm.name}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={quoteForm.phone}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={quoteForm.company}
                  onChange={handleQuoteChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="ABC Enterprises"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product of Interest*
                </label>
                <select
                  id="product"
                  name="product"
                  value={quoteForm.product}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                >
                  <option value="">Select a product</option>
                  {products.map((category) => (
                    <optgroup key={category.name} label={category.name}>
                      {category.subItems.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={quoteForm.message}
                  onChange={handleQuoteChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Tell us about your requirements, quantity needed, etc."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetQuoteModal;