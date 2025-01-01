import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  User,
  Search,
  Phone,
  Heart,
  Menu,
  X,
  ChevronRight,
  PhoneCall,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import TopSlider from "./TopSlider";

// Enhanced menu data with images and descriptions for each category
const menuItems = [
  {
    id: 1,
    label: "New Arrivals",
    categories: [
      {
        name: "Latest Collections",
        link: "/new/latest",
        image: "https://m.media-amazon.com/images/I/61g90QOsHLL._AC_UF1000,1000_QL80_.jpg",
        description: "Fresh off the runway - our newest designs and styles",
      },
      {
        name: "This Week`s Highlights",
        link: "/new/highlights",
        image: "https://images.glowroad.com/faceview/e5f/d1c/e3d/db/imgs/dfa1fbe5-d66c-4c8a-a952-dab1def1fce2_31433245-xlgn400x400.jpeg?productId=P-22815936",
        description: "Curated selection of our best pieces this week",
      },
      {
        name: "Trending Now",
        link: "/new/trending",
        image: "https://assets.ajio.com/medias/sys_master/root/20240220/tnTr/65d3ccbe05ac7d77bb660c5b/quelea-red-traditional-women-floral-print-saree-with-contrast-border.jpg",
        description: "See what's making waves in the fashion world",
      },
      {
        name: "Coming Soon",
        link: "/new/coming-soon",
        image: "https://assets.ajio.com/medias/sys_master/root/20240102/H215/6593e6fdafa4cf41f5fb5a17/-473Wx593H-466936911-red-MODEL3.jpg",
        description: "Sneak peek into our upcoming collections",
      },
    ],
    featured: [
      {
        image: "https://rukminim2.flixcart.com/image/850/1000/l02r1jk0/sari/q/q/6/free-149-shiwaye-unstitched-original-imagby2swuah73mf.jpeg?q=20&crop=false",
        title: "Spring Collection 2025",
        description: "Discover our latest arrivals in ethnic wear",
        link: "/spring-collection",
      },
      {
        image: "https://sudathi.com/cdn/shop/files/3952S462_1.jpg?v=1727330980&width=1100",
        title: "Designer Picks",
        description: "Curated selection of premium designs",
        link: "/designer-picks",
      },
    ],
  },
  {
    id: 2,
    label: "Premium",
    categories: [
      {
        name: "Latest Collections",
        link: "/new/latest",
        image: "/api/placeholder/300/400",
        description: "Fresh off the runway - our newest designs and styles",
      },
      {
        name: "This Week`s Highlights",
        link: "/new/highlights",
        image: "/api/placeholder/300/400",
        description: "Curated selection of our best pieces this week",
      },
      {
        name: "Trending Now",
        link: "/new/trending",
        image: "/api/placeholder/300/400",
        description: "See what's making waves in the fashion world",
      },
      {
        name: "Coming Soon",
        link: "/new/coming-soon",
        image: "/api/placeholder/300/400",
        description: "Sneak peek into our upcoming collections",
      },
    ],
    featured: [
      {
        image: "/api/placeholder/300/400",
        title: "Spring Collection 2025",
        description: "Discover our latest arrivals in ethnic wear",
        link: "/spring-collection",
      },
      {
        image: "/api/placeholder/300/400",
        title: "Designer Picks",
        description: "Curated selection of premium designs",
        link: "/designer-picks",
      },
    ],
  },
  {
    id: 3,
    label: "Value Addition",
    categories: [
      {
        name: "Latest Collections",
        link: "/new/latest",
        image: "/api/placeholder/300/400",
        description: "Fresh off the runway - our newest designs and styles",
      },
      {
        name: "This Week`s Highlights",
        link: "/new/highlights",
        image: "/api/placeholder/300/400",
        description: "Curated selection of our best pieces this week",
      },
      {
        name: "Trending Now",
        link: "/new/trending",
        image: "/api/placeholder/300/400",
        description: "See what's making waves in the fashion world",
      },
      {
        name: "Coming Soon",
        link: "/new/coming-soon",
        image: "/api/placeholder/300/400",
        description: "Sneak peek into our upcoming collections",
      },
    ],
    featured: [
      {
        image: "/api/placeholder/300/400",
        title: "Spring Collection 2025",
        description: "Discover our latest arrivals in ethnic wear",
        link: "/spring-collection",
      },
      {
        image: "/api/placeholder/300/400",
        title: "Designer Picks",
        description: "Curated selection of premium designs",
        link: "/designer-picks",
      },
    ],
  },
  // ... other menu items remain the same
];

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById("mobile-menu");
      if (
        isMobileMenuOpen &&
        mobileMenu &&
        !mobileMenu.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Top Banner with sliding animation */}
      <motion.div
        className="py-[20px] sm:py-[0px] text-center text-sm text-white"
      >
        <TopSlider />
      </motion.div>

      {/* Main Header */}
      <header className="relative z-50 bg-white shadow-sm">
        {/* Pre-header Info Bar */}
        <div className="hidden border-b border-gray-100 bg-gray-50 py-2 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Clock className="h-4 w-4" />
                <span>Mon-Sat: 10AM - 8PM</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="h-4 w-4" />
                <span>Store Locator</span>
              </motion.div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <motion.a
                whileHover={{ scale: 1.05, color: "#000" }}
                href="/track"
                className="hover:text-gray-900"
              >
                Track Order
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, color: "#000" }}
                href="/support"
                className="hover:text-gray-900"
              >
                Customer Support
              </motion.a>
            </div>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="mx-auto max-w-7xl px-4 py-[1rem]">
          <div className="flex items-center justify-between gap-8">
            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="rounded-full p-2 hover:bg-gray-100 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </motion.button>

            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             <div className="logo text-[#d44479] flex flex-col justify-center items-center">
             <h1 className="text-2xl !text-[#d44479] font-bold bakbak-one-bold text-gray-900 md:text-3xl">
                अलंकार
              </h1>
              <span className="text-[8px] tracking-[.15rem] mt-[-3px]" >
                FASHION
              </span>
             </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:gap-8">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    setHoveredCategory(null);
                  }}
                >
                  <motion.button
                    className="group relative px-2 py-2 text-gray-600 hover:text-gray-900"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-rose-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredItem === item.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 lg:gap-4 w-[14rem] justify-between">
              {/* Action buttons with hover animations */}
              {[
                { icon: Search, action: () => setIsSearchOpen(true) },
                { icon: Heart, link: "/wishlist" },
                { icon: User, link: "/account" },
                { icon: ShoppingCart, link: "/cart", badge: 2 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center"
                >
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="rounded-full px-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <item.icon className="h-5 w-5" />
                    </button>
                  ) : (
                    <a
                      href={item.link}
                      className="relative rounded-full px-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-xs text-white"
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </a>
                  )}
                </motion.div>
              ))}

              {/* WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-green-500 ml-[15px] p-[6px] text-white hover:bg-green-600 md:block"
              >
                <PhoneCall className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Enhanced Mega Menu Drawer */}
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 z-50 bg-white shadow-lg"
              onMouseEnter={() => setHoveredItem(hoveredItem)}
              onMouseLeave={() => {
                setHoveredItem(null);
                setHoveredCategory(null);
              }}
            >
              <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex gap-12">
                  {/* Categories with hover effect */}
                  <div className="w-1/4">
                    <h3 className="mb-4 font-semibold text-gray-900">
                      Categories
                    </h3>
                    <ul className="space-y-3">
                      {menuItems
                        .find((item) => item.id === hoveredItem)
                        ?.categories.map((category, index) => (
                          <motion.li
                            key={index}
                            onMouseEnter={() => setHoveredCategory(category)}
                            whileHover={{ x: 10 }}
                          >
                            <a
                              href={category.link}
                              className="group flex items-center text-gray-600 hover:text-gray-900"
                            >
                              {category.name}
                              <motion.div
                                animate={{
                                  x: hoveredCategory === category ? 5 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </motion.div>
                            </a>
                          </motion.li>
                        ))}
                    </ul>
                  </div>

                  {/* Dynamic Featured Content */}
                  <div className="flex w-3/4 gap-8">
                    <AnimatePresence mode="wait">
                      {hoveredCategory ? (
                        // Show category-specific content
                        <motion.div
                          key="category"
                          className="flex w-full gap-8"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-1/2">
                            <div className="overflow-hidden rounded-lg">
                              <motion.img
                                src={hoveredCategory.image}
                                alt={hoveredCategory.name}
                                className="h-80 w-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <h4 className="mt-4 text-lg font-semibold text-gray-900">
                              {hoveredCategory.name}
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                              {hoveredCategory.description}
                            </p>
                          </div>
                          <div className="w-1/2">
                            <div className="h-full rounded-lg bg-gray-50 p-6">
                              <h4 className="text-lg font-semibold text-gray-900">
                                Why Choose This Category
                              </h4>
                              <ul className="mt-4 space-y-3">
                                <motion.li
                                  className="flex items-center text-gray-600"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                                  Exclusive Designs
                                </motion.li>
                                <motion.li
                                  className="flex items-center text-gray-600"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                                  Premium Quality
                                </motion.li>
                                <motion.li
                                  className="flex items-center text-gray-600"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                                  Premium Quality
                                </motion.li>
                                <motion.li
                                  className="flex items-center text-gray-600"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                                  Fast Delivery
                                </motion.li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        // Show default featured items
                        menuItems
                          .find((item) => item.id === hoveredItem)
                          ?.featured.map((feature, index) => (
                            <motion.div
                              key={index}
                              className="w-1/2"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <a href={feature.link} className="group block">
                                <div className="overflow-hidden rounded-lg">
                                  <motion.img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="h-80 w-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                                <h4 className="mt-4 text-lg font-semibold text-gray-900">
                                  {feature.title}
                                </h4>
                                <p className="mt-1 text-sm text-gray-600">
                                  {feature.description}
                                </p>
                              </a>
                            </motion.div>
                          ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsSearchOpen(false);
              }}
            >
              <div className="flex min-h-screen items-start justify-center px-4 pt-16">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="w-full max-w-2xl rounded-lg bg-white shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-4 p-4">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearching(true);
                      }}
                      placeholder="Search for products..."
                      className="flex-1 bg-transparent text-lg outline-none"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSearchOpen(false)}
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Search Results */}
                  {isSearching && (
                    <motion.div
                      className="border-t p-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">Quick Results</p>
                        {/* Example search results */}
                        {[1, 2, 3].map((_, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 rounded-lg p-2 hover:bg-gray-50"
                          >
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <img
                                src="/api/placeholder/64/64"
                                alt="Product"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                Sample Product {index + 1}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Category • ₹1,999
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
              }}
            >
              <motion.div
                id="mobile-menu"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="relative h-full w-4/5 max-w-sm bg-white"
              >
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </motion.button>

                <div className="flex h-full flex-col">
                  <div className="border-b p-4">
                    <motion.h1
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold"
                    >
                      अलंकार
                    </motion.h1>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {menuItems.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        className="py-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.1 }}
                      >
                        <h3 className="mb-2 font-semibold text-lg">
                          {item.label}
                        </h3>
                        <ul className="space-y-3 pl-4">
                          {item.categories.map((category, categoryIndex) => (
                            <motion.li
                              key={categoryIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: itemIndex * 0.1 + categoryIndex * 0.05,
                              }}
                            >
                              <a
                                href={category.link}
                                className="flex items-center text-gray-600 hover:text-gray-900"
                              >
                                <span>{category.name}</span>
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  className="ml-2"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </motion.div>
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile Footer Navigation */}
                  <div className="border-t p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: User, label: "Account", link: "/account" },
                        { icon: Heart, label: "Wishlist", link: "/wishlist" },
                        { icon: ShoppingCart, label: "Cart", link: "/cart" },
                        { icon: PhoneCall, label: "Contact", link: "/contact" },
                      ].map((item, index) => (
                        <motion.a
                          key={index}
                          href={item.link}
                          className="flex flex-col items-center gap-1 rounded-lg p-3 text-gray-600 hover:bg-gray-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className="h-6 w-6" />
                          <span className="text-sm">{item.label}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
