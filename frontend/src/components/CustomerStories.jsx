import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Custom hook for animations
const useSliderAnimation = (totalSlides) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const timeoutRef = useRef(null);

  const navigate = useCallback((newIndex) => {
    if (isAnimating) return;
    
    setDirection(newIndex > currentSlide ? 'next' : 'prev');
    setIsAnimating(true);
    setCurrentSlide(newIndex);

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 750);
  }, [currentSlide, isAnimating]);

  const next = useCallback(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    navigate(nextIndex);
  }, [currentSlide, totalSlides, navigate]);

  const prev = useCallback(() => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    navigate(prevIndex);
  }, [currentSlide, totalSlides, navigate]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { currentSlide, isAnimating, direction, next, prev, navigate };
};

// Testimonial data with more detailed content
const testimonials = [
  {
    id: 1,
    name: 'Mary Jimmy',
    location: 'San Francisco, USA',
    role: 'Fashion Enthusiast',
    image: 'https://img.freepik.com/free-photo/young-indian-woman-wearing-sari_23-2149400839.jpg?t=st=1735917690~exp=1735921290~hmac=01f25d38978d45005cf5a25cd7bf35f9d3dcb0368f83ef423fe44d024625be26&w=1800',
    quote: "I'm absolutely delighted with my recent purchase of a black floral saree. The intricate detailing and the way it drapes is simply exceptional. The fitted blouse complements it perfectly, though I might consider a minor adjustment for daily wear comfort. The customer service team was incredibly helpful throughout the process.",
    productName: 'Black Floral Embroidered Silk Saree',
    productLink: '#',
    rating: 5,
    purchaseDate: 'December 2024'
  },
  {
    id: 2,
    name: 'Carolina Rabinovich',
    location: 'New York, USA',
    role: 'Art Director',
    image: 'https://i.pinimg.com/736x/9e/34/1a/9e341ab74287181119437557474bffc6.jpg',
    quote: "Attending my first Indian wedding was a magical experience, made even more special by this stunning ensemble. The colors are vibrant yet sophisticated, and the comfort level exceeded my expectations. I received countless compliments throughout the event. The quality of craftsmanship is evident in every detail.",
    productName: 'Designer Wedding Collection Lehenga',
    productLink: '#',
    rating: 5,
    purchaseDate: 'November 2024'
  },
  {
    id: 3,
    name: 'Sarah Chen',
    location: 'Singapore',
    role: 'Business Executive',
    image: 'https://i.pinimg.com/550x/7f/6f/0f/7f6f0fcc80be814f312f1eb4f51b0426.jpg',
    quote: "The attention to detail in my custom lehenga is remarkable. From the initial consultation to the final delivery, every step was handled with utmost professionalism. The embroidery work is exquisite, and the fit is perfect. It's exactly what I envisioned for my special day.",
    productName: 'Custom Bridal Lehenga',
    productLink: '#',
    rating: 5,
    purchaseDate: 'October 2024'
  }
];

// Navigation button component
const NavigationButton = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      absolute top-1/2 -translate-y-1/2 ${direction === 'prev' ? 'left-4' : 'right-4'}
      w-10 h-10 rounded-full bg-white/90 shadow-lg backdrop-blur-sm
      flex items-center justify-center
      transition-all duration-300
      hover:bg-white hover:scale-110
      disabled:opacity-50 disabled:cursor-not-allowed
      sm:w-12 sm:h-12
    `}
    aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} slide`}
  >
    {direction === 'prev' ? (
      <ChevronLeft className="w-5 h-5 text-gray-800" />
    ) : (
      <ChevronRight className="w-5 h-5 text-gray-800" />
    )}
  </button>
);

// Progress indicator component
const ProgressIndicator = ({ total, current, onSelect }) => (
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        className={`
          w-12 h-1 rounded-full transition-all duration-300
          ${current === index ? 'bg-gray-800 scale-100' : 'bg-gray-300 scale-90 hover:scale-95'}
        `}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

// Rating stars component
const RatingStars = ({ rating }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Main component
const CustomerStories = () => {
  const { 
    currentSlide, 
    isAnimating, 
    direction, 
    next, 
    prev, 
    navigate 
  } = useSliderAnimation(testimonials.length);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-gray-900 mb-4">
          Customer Stories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover how our customers are transforming their special occasions with our carefully crafted ethnic wear
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
            willChange: 'transform'
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full flex-shrink-0"
            >
              <div className="grid md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-[400px] md:h-[600px] bg-gray-50">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} wearing ${testimonial.productName}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="relative flex flex-col justify-center p-8 md:p-12 bg-white">
                  <Quote className="absolute top-8 left-8 w-8 h-8 text-gray-200" />
                  
                  <div className="mb-8">
                    <RatingStars rating={testimonial.rating} />
                  </div>

                  <blockquote className="mb-8">
                    <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </blockquote>

                  <div className="mt-auto">
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500">
                        {testimonial.location} • {testimonial.role}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Purchased in {testimonial.purchaseDate}
                      </p>
                    </div>

                    <a
                      href={testimonial.productLink}
                      className="
                        inline-flex items-center gap-2 
                        px-6 py-3 bg-gray-900 text-white rounded-lg
                        hover:bg-gray-800 transition-colors
                        font-medium
                      "
                    >
                      View {testimonial.productName}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <NavigationButton direction="prev" onClick={prev} disabled={isAnimating} />
        <NavigationButton direction="next" onClick={next} disabled={isAnimating} />
        
        {/* Progress Indicators */}
        <ProgressIndicator 
          total={testimonials.length}
          current={currentSlide}
          onSelect={navigate}
        />
      </div>
    </section>
  );
};

export default CustomerStories;