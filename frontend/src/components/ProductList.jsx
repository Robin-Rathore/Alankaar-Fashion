import React, { useEffect, useState } from 'react';
import "./ProductCard.scss";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
const ProductList = () => {
    const [products,setProducts] = useState([]);

    const getProducts = async()=>{
      try {
        const { data } = await axios.get(
          "http://localhost:5001/api/v1/product/getProducts"
        );
        setProducts(data?.products);
        console.log(data?.products)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(()=>{
      getProducts()
    },[]);
    
    return (
      <>
      {/* <div  className="head text-[#d44479] font-semibold text-4xl m-6 ">New Launches</div>       */}
      <div className="flex flex-wrap justify-center">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      </>
    );
  };

  export default ProductList;