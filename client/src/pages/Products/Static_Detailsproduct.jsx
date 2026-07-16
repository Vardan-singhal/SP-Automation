import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsData from '../../data/product.json';
import gsap from "gsap";

export default function DetailProduct() {
  const { id } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Fetch specific product
  useEffect(() => {
    // Use imported products data
    const found = productsData.find((item) => item.id === Number(id));
    setProduct(found);
  }, [id]);

  // GSAP animation for detail page
  useEffect(() => {
    if (product) {
      gsap.from(".detail-animate", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h6 className="text-gray-500 text-base">Loading product details...</h6>
      </div>
    );
  }

  // Handle images as array (single or multiple)
  const images = Array.isArray(product.images) ? product.images : [product.image]; // Fallback if single image

  // Handle mouse move for zoom
  const handleMouseMove = (e, idx) => {
    if (hoveredIndex === idx) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"> {/* Reduced padding for less space */}
      {/* Product Image(s) + Name */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8 detail-animate"> {/* Reduced gap */}
        {/* Image Scroller with Zoom Effect */}
        <div className="relative">
          <div className="overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-hide">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-xl shadow-md overflow-hidden min-w-full h-72 sm:h-80 lg:h-96 cursor-zoom-in"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
              >
                <img
                  src={img}
                  alt={`${product.name} - Image ${idx + 1}`}
                  className="w-full h-full object-contain bg-white p-2 sm:p-4 transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Zoomed View (Amazon/Flipkart-style hover zoom panel) */}
          {hoveredIndex >= 0 && (
            <div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white shadow-2xl z-40 rounded-lg overflow-hidden pointer-events-none hidden sm:block"
              style={{
                backgroundImage: `url(${images[hoveredIndex]})`,
                backgroundSize: "300% 300%",
                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">{product.name}</h2> {/* Larger text */}
          <h6 className="text-gray-600 mt-4 text-lg sm:text-xl">{product.description}</h6> {/* Larger description */}

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg transition-all hover:bg-primary-dark"
          >
            <h5>Enquire About This Product</h5>
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 lg:mt-12 detail-animate text-center"> {/* Reduced margin */}
        <h3 className="text-3xl sm:text-4xl font-semibold mb-4">Key Features</h3> {/* Larger heading */}

        <ul className="list-none pl-0 space-y-3 text-gray-700 flex flex-col items-center text-lg sm:text-xl"> {/* Larger text */}
          {product.features.map((f, index) => (
            <li key={index} className="flex items-center gap-2 justify-center">
              <i className="bi bi-stars text-primary text-xl sm:text-2xl"></i> {/* Larger icon */}
              <span className="font-medium">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Specifications */}
      <div className="mt-8 lg:mt-12 detail-animate"> {/* Reduced margin */}
        <h3 className="text-3xl sm:text-4xl font-semibold mb-4">Specifications</h3> {/* Larger heading */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-100 p-4 rounded-sm shadow-sm border"
            >
              <h6 className="font-semibold capitalize text-lg sm:text-xl"> {/* Larger key */}
                {key.replace(/_/g, " ")}
              </h6>
              <h6 className="text-gray-700 text-base sm:text-lg">{value}</h6> {/* Larger value */}
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50 pt-20 lg:pt-24"> {/* Added pt-20 (5rem) for mobile, pt-24 for lg to push below header */}
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-xl overflow-y-auto max-h-[80vh]"> {/* Reduced width to max-w-sm on small screens, reduced padding, max-h for scroll if needed */}
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Enquiry for: {product.name}
            </h3>

            <form target="_blank" action="https://api.web3forms.com/submit" method="post" className="space-y-3 sm:space-y-4">
              <input type="hidden" name="access_key" value="722799e7-b250-4def-8b99-cd6ac1a5ef59" />

              <input
                type="text"
                name="name"           // <-- required
                placeholder="Your Name"
                className="w-full border rounded-sm p-2 sm:p-3 text-sm sm:text-base" // Reduced padding and text size
                required
              />

              <input
                type="email"
                name="email"          // <-- required
                placeholder="Email Address"
                className="w-full border rounded-sm p-2 sm:p-3 text-sm sm:text-base" // Reduced padding and text size
                required
              />

              <input
                type="tel"
                name="phone"          // <-- optional, but must have name
                placeholder="Phone Number"
                className="w-full border rounded-sm p-2 sm:p-3 text-sm sm:text-base" // Reduced padding and text size
              />

              <textarea
                name="message"        // <-- required
                placeholder="Your Message"
                className="w-full border rounded-sm p-2 sm:p-3 h-20 sm:h-24 text-sm sm:text-base" // Reduced height
                required
              ></textarea>

              <button className="w-full bg-primary text-white py-2 sm:py-3 rounded-sm transition-all text-base sm:text-lg font-semibold"> {/* Reduced padding */}
                <h1> Submit Enquiry</h1>
              </button>
            </form>

            <button
              onClick={() => setShowForm(false)}
              className="mt-3 sm:mt-4 text-green-600 underline text-sm sm:text-base" // Adjusted text size
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}