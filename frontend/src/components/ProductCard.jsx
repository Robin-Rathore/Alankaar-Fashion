import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    
    <div
      className="w-1/2 lg:w-1/5 p-2 md:p-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-md overflow-hidden transition-all duration-300 group hover:shadow-lg">
        {/* Image Container */}
        <Link to={`/productDetail/${product._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          {/* Main Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Hover Image */}
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Wishlist Button with enhanced animation */}
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center 
                     opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0
                     hover:bg-white hover:scale-110 shadow-sm"
          >
            <Heart className="w-4 h-4 text-gray-700 transition-colors hover:text-red-500" />
          </button>

          {/* New Tag - if product is new */}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
        </div>
        </Link>
        {/* Product Info with enhanced styling */}
        <div className="p-4 bg-white transition-transform duration-300">
          <h3 className="text-sm font-medium text-gray-800 mb-1.5 truncate hover:text-black">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Discount tag if applicable */}
          {product.discount && (
            <span className="text-xs text-green-600 font-medium mt-1 block">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;