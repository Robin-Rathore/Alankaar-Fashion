import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Card() {
  useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => {
      AOS.init({
        offset: 100,
        duration: 800,
        easing: 'ease-out',
      });
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const collections = [
    {
      title: "Luxe Edition",
      path: "/luxeEditionPage",
      image: "https://www.karagiri.com/cdn/shop/products/banarasi-saree-tan-cream-banarasi-saree-silk-saree-online-15895385309287.jpg?v=1674045065",
      tagline: "Premium Collection"
    },
    {
      title: "Best Sellers",
      path: "/",
      image: "https://i.pinimg.com/736x/eb/3a/02/eb3a02eb9126d5eba0888b5c6eb3a462.jpg",
      tagline: "Most Loved Designs"
    },
    {
      title: "New Launches",
      path: "/newlaunches",
      image: "https://colorfulsaree.com/cdn/shop/files/premium-taby-silk-wedding-cream-saree-2.jpg?v=1714554033",
      tagline: "Latest Arrivals"
    },
    {
      title: "Value Edition",
      path: "/ValueEditionPage",
      image: "https://www.karagiri.com/cdn/shop/files/VASTUKALA-BWVSK-5119-1.jpg?v=1712748845",
      tagline: "Timeless Classics"
    }
  ];

  return (
    <div className="py-16 px-3 sm:px-5 lg:px-7 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Explore Collections
          </h1>
          <div className="w-20 h-1 bg-rose-400 mx-auto"/>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-8">
          {collections.map((collection, index) => (
            <Link 
              key={index} 
              to={collection.path}
              className="block py-2 transform transition duration-300 hover:-translate-y-1"
            >
              <div 
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 group-hover:to-black/70 transition-all duration-300"/>
                </div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Tagline */}
                  <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block px-3 py-1 bg-white/90 rounded-full text-xs text-gray-800 font-medium">
                      {collection.tagline}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-white text-xl font-medium tracking-wide group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                    {collection.title}
                  </h2>
                </div>

                {/* Border Overlay */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-xl transition-colors duration-300"/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;