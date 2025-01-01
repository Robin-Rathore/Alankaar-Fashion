import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Share2 } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Royal Bridal Lehengas',
    description: 'Handcrafted with love for your special day',
    price: 'Starting from ₹45,999',
    tag: 'NEW ARRIVAL',
    image: 'https://www.manyavar.com/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dwe6547122/Ace_Your_Saree_Banner_D.jpg',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 2,
    name: 'Designer Silk Sarees',
    description: 'Timeless elegance in pure silk',
    price: 'Starting from ₹15,999',
    tag: 'BESTSELLER',
    image: 'https://singhanias.in/cdn/shop/collections/Category_banners-Kanchi-01.jpg?v=1706183649',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 3,
    name: 'Contemporary Fusion',
    description: 'Where tradition meets modern style',
    price: 'Starting from ₹12,999',
    tag: 'TRENDING',
    image: 'https://mysilklove.com/cdn/shop/articles/1800_1.png?crop=center&height=1200&v=1694605610&width=1200',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 4,
    name: 'Designer Gowns',
    description: 'Make a statement at every occasion',
    price: 'Starting from ₹28,999',
    tag: 'EXCLUSIVE',
    image: 'https://mysilklove.com/cdn/shop/articles/1800_18.png?v=1698478645&width=2048',
    color: 'from-emerald-500 to-teal-600'
  }
];

const CustomButton = ({ children, className = '', ...props }) => (
  <button
    className={`group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-4 font-medium transition-all duration-300 ease-out ${className}`}
    {...props}
  >
    <span className="absolute inset-0 h-full w-full bg-gradient-to-br opacity-50 transition-all duration-300 ease-out group-hover:opacity-70"></span>
    <span className="relative flex items-center gap-2">{children}</span>
  </button>
);

const Sideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touching, setTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + newDirection + categories.length) % categories.length;
      return newIndex;
    });
  };

  const handleTouchStart = (e) => {
    setTouching(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touching) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
      setTouching(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!touching) {
        paginate(1);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [touching]);

  return (
    <div className="relative mx-auto h-[80vh] max-h-[600px] w-full overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setTouching(false)}
          className="absolute h-full w-full"
        >
          <div className="relative h-full w-full">
            <img
              src={categories[currentIndex].image}
              alt={categories[currentIndex].name}
              className="h-full w-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
            
            {/* Tag */}
            <div className="absolute left-6 top-6">
              <span className="rounded bg-white/90 px-4 py-2 text-[12px] font-bold text-gray-900">
                {categories[currentIndex].tag}
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="absolute right-6 top-6 flex gap-3">
              <button className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30">
                <Heart className="h-4 w-4 text-white" />
              </button>
              <button className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30">
                <Share2 className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 1, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 text-center text-white"
            >
              <div className="space-y-4 bg-black/10 p-6 backdrop-blur-s">
                <h2 className="text-2xl font-bold md:text-4xl">
                  {categories[currentIndex].name}
                </h2>
                <p className="mx-auto max-w-2xl text-lg opacity-90">
                  {categories[currentIndex].description}
                </p>
                {/* <p className="text-xl font-semibold text-rose-300">
                  {categories[currentIndex].price}
                </p> */}
                
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  <CustomButton 
                    className={`bg-gradient-to-r ${categories[currentIndex].color} text-white h-[10px] w-15`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Shop Now
                  </CustomButton>
                  <CustomButton 
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black !h-[10px] w-15"
                  >
                    View Collection
                  </CustomButton>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'w-4 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default Sideshow;