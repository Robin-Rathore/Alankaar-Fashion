import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white text-2xl font-serif animate-pulse">
            EJ Luxury Edition
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Video Background Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Video Container */}
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center w-[117%]">
          <iframe
              width="120%"
              className="w-full h-full object-cover"
              src={`https://www.youtube.com/embed/z1-kR9-lkAk?autoplay=1&mute=${
                isMuted ? 1 : 0
              }&loop=1&controls=0&rel=0&iv_load_policy=3&playsinline=1&modestbranding=1&start=5&end=30&fs=0&disablekb=1&showinfo=0&playlist=z1-kR9-lkAk`}
              title="Video Player"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 opacity-90">
                EJ Luxury Edition
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Experience elegance redefined through our exclusive collection
              </p>
              <button className="px-8 py-3 bg-white/90 hover:bg-white text-black rounded-full transition-all duration-300 transform hover:scale-105">
                Explore Collection
              </button>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-8 z-30 hidden md:block">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-px bg-white/40 animate-pulse" />
              <span className="text-white/60 text-sm uppercase tracking-wider rotate-90 origin-left transform translate-y-8">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Optional: Additional Content Section */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
                Crafted for Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our luxury edition represents the pinnacle of fashion and craftsmanship. 
                Each piece is meticulously designed to bring out your unique style while 
                maintaining the highest standards of quality.
              </p>
              <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-all duration-300">
                View Details
              </button>
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/800/800"
                alt="Luxury Collection Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoPage;


