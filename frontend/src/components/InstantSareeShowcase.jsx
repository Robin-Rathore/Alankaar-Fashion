import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const InstantSareeShowcase = () => {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    {
      id: 1,
      src: "https://img.freepik.com/free-photo/young-indian-woman-wearing-sari_23-2149400848.jpg?t=st=1735915485~exp=1735919085~hmac=607458a0c98bec2c7d73bc6abba44697f33918b5760a5d5687f6ae156888c2e2&w=1800",
      alt: "Full length grey saree",
    },
    {
      id: 2,
      src: "https://img.freepik.com/free-photo/young-indian-woman-wearing-sari_23-2149400847.jpg?t=st=1735916634~exp=1735920234~hmac=1501246e0675057ed4ddb0f00e680435462643df17e2da981063791488a066a2&w=740",
      alt: "Saree draping detail",
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-photo/young-indian-woman-wearing-sari_23-2149400850.jpg?t=st=1735916646~exp=1735920246~hmac=9067170d5db17687c8b89de2ac38955e86d3c2180f2d9e17cb01c31513c18a95&w=740",
      alt: "Saree border detail",
    },
    {
      id: 4,
      src: "https://img.freepik.com/free-photo/young-indian-woman-wearing-sari_23-2149400849.jpg?t=st=1735915401~exp=1735919001~hmac=f88e8f1ac811612c2e29f641fcb48c18703b65e637a497ee2df73718fd066e9b&w=740",
      alt: "Back view of saree",
    }
  ];

  return (
    <div className="min-h-screen bg-[#c69c7130] m-4 rounded">
      <div className="max-w-[2000px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side - Image Gallery (Now spans 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-[70vh] overflow-hidden rounded-xl">
              <img
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-32" />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`relative overflow-hidden rounded-lg aspect-[3/4] transition-all duration-300 ${
                    activeImage === index ? 'ring-2 ring-[#562B08] ring-offset-2' : 'opacity-70'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="lg:col-span-1 space-y-12 p-6 sticky top-0 h-fit">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-[#562B08]/10 rounded-full">
                <span className="text-[#562B08] font-medium">Resort Prints</span>
              </div>
              
              <h1 className="font-serif text-5xl lg:text-6xl text-[#562B08] leading-tight">
                Instant Saree™
              </h1>
              
              <h2 className="font-serif italic text-3xl text-[#8B4513] leading-relaxed">
                Wedding-Ready Within A Minute
              </h2>
              
              <div className="h-px bg-[#8B4513]/20 w-full"></div>
            </div>

            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Experience the perfect blend of tradition and convenience with our pre-draped masterpiece. 
                Crafted in luxurious grey silk with intricate pearl embellishments.
              </p>

              <div className="space-y-6">
                <h3 className="text-xl font-medium text-[#562B08]">Signature Features</h3>
                <ul className="space-y-4">
                  {[
                    "Pre-draped innovation for instant wear",
                    "Premium silk with pearl detailing",
                    "Modern silhouette meets tradition",
                    "Perfect for destination weddings"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <ArrowRight size={16} className="text-[#562B08]" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <h4 className="text-lg font-medium text-[#562B08]">Styling Notes</h4>
                <p className="text-gray-700 leading-relaxed">
                  Pair with minimalist jewelry for modern elegance, or go traditional 
                  with statement pieces for classic charm. Perfect for both day and 
                  evening ceremonies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantSareeShowcase;