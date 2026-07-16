import React, { useEffect, useState, useRef } from "react";
import productsData from '../../data/product.json';
import gsap from "gsap";

  const systems = [
    {
      title: "Off-Grid Solar System",
      description:
        "Independent solar solution that stores energy in batteries for locations without access to the electricity grid. Perfect for remote homes, farms, and cabins.",
      image: "/assets/ourproducts/off-grid.jpg", // replace with actual image
    },
    {
      title: "On-Grid Solar System",
      description:
        "Grid-tied solar solution that allows direct consumption of solar energy and feeding excess energy back to the grid. Ideal for residential and commercial rooftops.",
      image: "/assets/ourproducts/on-grid.jpg", // replace with actual image
    },
  ];

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Use bundled product JSON
    setProducts(productsData);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      gsap.from(".product-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading products...</p>
      </div>
    );
  }

 return (
  <>
    {/* Intro Section */}
    <div className="bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4">
          Off-Grid & On-Grid Solar Systems
        </h2>
        <h6 className="text-green-800 text-lg max-w-3xl mx-auto">
          Explore the right solar solution for your energy needs. Whether you need energy independence with an Off-Grid system or want to save on electricity bills with an On-Grid system, we have the perfect solution.
        </h6>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {systems.map((system, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={system.image}
              alt={system.title}
              className="w-full h-64 object-fill"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {system.title}
              </h3>
              <h6 className="text-black">{system.description}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Products Section */}
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Products
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-xl shadow-lg overflow-hidden relative group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-fill"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <h6 className="text-gray-600 text-sm mt-2">{product.excerpt}</h6>
            </div>

            <button 
              onClick={() => window.location.href = `/products/${product.id}`}
              className="absolute bottom-[-60px] left-0 w-full bg-primary text-white py-3 text-sm font-medium transition-all duration-300 group-hover:bottom-0"
            >
              <h6>More Details</h6>
            </button>
          </div>
        ))}
      </div>
    </div>
  </>
);

}
