import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Share2, Ruler, Medal } from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `https://ej-backend.onrender.com/api/v1/product/getProduct/${params.id}`
      );
      setProduct(data?.product);
    };
    fetchProduct();
  }, [params.id]);

  const handleZoom = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;
    setZoomStyle({
      transform: 'scale(2)',
      transformOrigin: `${x}% ${y}%`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const productData = new FormData();
    // Your existing form data logic
    try {
      await axios.post(
        `https://ej-backend.onrender.com/api/v1/user/addToCart/${user._id}`,
        productData
      );
      toast.success("Added to Cart");
    } catch (error) {
      toast.error("Please login first");
    }
  };

  if (!product) return null;

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div 
              className="relative overflow-hidden rounded-lg bg-white aspect-[3/4]"
              onMouseMove={handleZoom}
              onMouseLeave={() => setZoomStyle({})}
            >
              <img
                src={product.images[selectedPhoto]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={zoomStyle}
              />
              <div className="absolute top-4 right-4 space-x-2">
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhoto(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                    selectedPhoto === idx ? 'ring-2 ring-gold' : ''
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif text-gray-900">{product.name}</h1>
              <p className="mt-2 text-gray-600 italic">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-semibold">
                ₹{(product.price - (product.price * product.discount / 100)).toLocaleString()}
              </span>
              <span className="text-lg text-gray-500 line-through">₹{product.price}</span>
              <span className="text-gold">{product.discount}% OFF</span>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Select Size</span>
                <button className="flex items-center text-gold hover:underline">
                  <Ruler className="w-4 h-4 mr-1" />
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                      selectedSize === size 
                        ? 'border-gold text-gold' 
                        : 'border-gray-300 hover:border-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Add to Cart
                </button>
                <Link
                  to="/OrderDetails"
                  className="w-full px-6 py-3 text-sm flex justify-center items-center font-semibold text-white bg-primary rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Buy Now
                </Link>
              </div>

              {/* Share & Wishlist */}
              <div className="flex justify-center space-x-4">
                <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </button>
                <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              {[
                { icon: <Medal className="w-5 h-5" />, text: "Premium Quality" },
                { icon: "🪡", text: "Handcrafted" },
                { icon: "📦", text: "Free Shipping" },
                { icon: "↩️", text: "Easy Returns" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-600">
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Product Specifications */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {/* Keep your existing specification list structure */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product)
                    .filter(([key]) => 
                      ['model', 'category', 'screenSize', 'type', 'displayType', 
                       'charging', 'battery', 'bluetoothVersion', 'notification', 
                       'voiceAssistance'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-500">{key}:</span>
                        <span className="text-sm text-gray-900">{value}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;