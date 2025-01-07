import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import TopSlider from './components/TopSlider'
import Footer from './components/Footer'
import Divider from "@mui/material/Divider";
import IconsSection from './components/IconsSection';
import AdvPage from './components/AdvPage';
import VideoPage from './components/videoPage';
import Slideshow from './components/Sideshow';
import Card from './components/Card';
import ProductCard from './components/ProductCard';
import axios from 'axios';
import { User } from 'lucide-react';
import ProductList from './components/ProductList';
import ScrollToTop from './components/ScrollComponent';
import ProductSlider from './components/ProductSlider';
import InstantSareeShowcase from './components/InstantSareeShowcase';
import CustomerStories from './components/CustomerStories';


const ExperienceAndPartners = () => {
  const experienceData = [
    {
      id: 1,
      image: "https://www.pebblecart.com/cdn/shop/files/A_decade_old.gif?v=1668739055&width=130",
      title: "10+ Years",
      subtitle: "legacy"
    },
    {
      id: 2,
      image: "https://www.pebblecart.com/cdn/shop/files/Trusted_Product.gif?v=1668739055&width=130",
      title: "Trusted",
      subtitle: "Products"
    },
    {
      id: 3,
      image: "https://www.pebblecart.com/cdn/shop/files/Replacement.gif?v=1668739055&width=130",
      title: "Hassle Free",
      subtitle: "Replacement"
    },
    {
      id: 4,
      image: "https://www.pebblecart.com/cdn/shop/files/Warranty.gif?v=1668739055&width=130",
      title: "Assured",
      subtitle: "Warranty"
    },
    {
      id: 5,
      image: "https://www.pebblecart.com/cdn/shop/files/Free_shipping.gif?v=1668739055&width=130",
      title: "Fast & Free",
      subtitle: "Delivery"
    },
    {
      id: 6,
      image: "https://www.pebblecart.com/cdn/shop/files/Quick_SUpport.gif?v=1668739055&width=130",
      title: "Quick",
      subtitle: "Support"
    }
  ];

  const partners = [
    { id: 1, image: "https://www.pebblecart.com/cdn/shop/files/flipkar.png?v=1670224717&width=150", name: "Flipkart" },
    { id: 2, image: "https://www.pebblecart.com/cdn/shop/files/amazon.png?v=1670224717&width=150", name: "Amazon" },
    { id: 3, image: "https://www.pebblecart.com/cdn/shop/files/myntra.png?v=1670224717&width=150", name: "Myntra" },
    { id: 4, image: "https://www.pebblecart.com/cdn/shop/files/cred.png?v=1670224717&width=150", name: "Cred" },
    { id: 5, image: "https://www.pebblecart.com/cdn/shop/files/chroma_b51cf571-24a2-4fb6-9979-615b92c980ce.png?v=1670302692&width=150", name: "Chroma" },
    { id: 6, image: "https://www.pebblecart.com/cdn/shop/files/ajio.png?v=1670224717&width=150", name: "Ajio" },
    { id: 7, image: "https://www.pebblecart.com/cdn/shop/files/nykaa.png?v=1670224717&width=150", name: "Nykaa" },
    { id: 8, image: "https://www.pebblecart.com/cdn/shop/files/Untitled-1_copy.png?v=1670501575&width=150", name: "Other" }
  ];

  return (
    <div className="w-full">
      <hr className="w-full border-t border-gray-300 opacity-50" />

      {/* Experience Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-[#d44479] font-semibold text-3xl md:text-4xl mb-12 text-left">
          Experience EJ
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {experienceData.map((item) => (
            <div 
              key={item.id}
              className="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-16 md:w-20 lg:w-24 mb-3 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-800 text-sm md:text-base">
                  {item.title}
                </p>
                <p className="text-gray-600 text-xs md:text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="w-full border-t border-gray-300 opacity-50" />

      {/* Partners Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-[#d44479] font-semibold text-3xl md:text-4xl mb-12 text-center">
          Official Partners
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group"
            >
              <div className="bg-[#FAFAFA] rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:bg-white">
                <a 
                  href="#" 
                  className="block w-full h-full flex items-center justify-center"
                  aria-label={`Visit ${partner.name}`}
                >
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-auto h-12 md:h-14 object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="w-full border-t border-gray-300 opacity-50" />
    </div>
  );
};


const FrontPage = () => {
    const [item,setItem] = useState()
    const user = JSON.parse(localStorage?.getItem("user"));
    const getCart = async () => {
        try {
          const { data } = await axios.get(
            `https://alankaar-fashion.onrender.com/api/v1/user/getCart/${user.id}`
          );
          setItem(data?.cart?.cart);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(()=>{
getCart()
      },[user?.id])
  return (
    <>
     <ScrollToTop/>
      <Header/>
      {/* <TopSlider/> */}
      <Slideshow/>
      <Card/>
      {/* <ProductSlider/> */}
      <ProductList/>
      {/* <Divider style={{marginTop:"20px"}}/> */}
      <IconsSection/>
      {/* <AdvPage/> */}
      <InstantSareeShowcase/>
      <CustomerStories/>
      <ExperienceAndPartners/>
      <VideoPage/>
      <Footer/>
    </>
  )
}

export default FrontPage
