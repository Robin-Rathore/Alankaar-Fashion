import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch products
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://alankaar-fashion.onrender.com/api/v1/product/getProducts"
      );
      // Only take first 12 products initially
      const initialProducts = data?.products.slice(0, 12);
      setProducts(initialProducts);
      setHasMore(data?.products.length > 12);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Handle drag scroll
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Navigation functions
  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      sliderRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  // Handle product click
  const handleProductClick = (productId) => {
    if (!isDragging) {
      // Navigate to product detail page
      console.log('Navigate to:', productId);
    }
  };

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://alankaar-fashion.onrender.com/api/v1/product/getProducts?page=${page + 1}`
      );
      setProducts(prev => [...prev, ...data?.products.slice(0, 12)]);
      setPage(page + 1);
      setHasMore(data?.products.length > 12);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative px-4 py-8">
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">New This Week</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="rounded-full bg-white p-2 text-gray-600 shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="rounded-full bg-white p-2 text-gray-600 shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Products Slider */}
      <div
        ref={sliderRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          {loading && products.length === 0 ? (
            // Loading skeleton
            [...Array(4)].map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[400px] w-[50%] lg:w-[19%] flex-shrink-0 animate-pulse rounded-lg bg-gray-200"
              />
            ))
          ) : (
            products.map((product) => (
              <motion.div
                key={product._id}
                className="  w-[50%] lg:w-[19%] flex-shrink-0 snap-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard
                  product={product}
                  onClick={() => handleProductClick(product._id)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More Products'}
          </button>
        </div>
      )}

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductSlider;