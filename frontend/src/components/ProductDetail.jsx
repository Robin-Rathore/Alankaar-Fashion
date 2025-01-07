import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Share2, Ruler, Medal } from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast";
import OrderInformationForm from "./OrderPages/OrderInformationFrom";
import OrderSummaryModal from "./OrderPages/OrderSummaryModal";
import PaymentModal from "./OrderPages/PaymentModal";
import PaymentMethodHandler from "./OrderPages/PaymentMethodHandler";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const params = useParams();
  const id = params.id;
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(''); // or 'summary'
  const [userformData, setUserFormData] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `https://alankaar-fashion.onrender.com/api/v1/product/getProduct/${params.id}`
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

  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const productData = new FormData();
    productData.append("name", product?.name);
    productData.append("description", product?.description);
    productData.append("price", product?.price);
    productData.append("quantity", 1);
    productData.append("category", product?.category);
    productData.append("color", product?.color);
    productData.append("bluetoothVersion", product?.bluetoothVersion);
    productData.append("discount", product?.discount);
    productData.append("uid", product?._id);
    productData.append("screensize", product?.screensize);
    productData.append("model", product?.model);
    productData.append("displayType", product?.displayType);
    productData.append("charging", product?.charging);
    productData.append("battery", product?.battery);
    productData.append("stock", product?.stock);
    productData.append("image", product?.images[0]);

    try {
      await axios.post(
        `https://alankaar-fashion.onrender.com/api/v1/user/addToCart/${user.id}`,
        productData
      );
      toast.success("Added to Cart");
      // window.location.reload();
    } catch (error) {
      toast.error("Please login first");
    }
  };

  if (!product) return null;

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];



  //Payment logic

  const handleProcessPayment = async (method, formData) => {
    try {
      // Example implementation
      switch(method) {
        case 'card':
          // Initialize card payment gateway (e.g., Stripe/Razorpay)
          const response = await initiateCardPayment({
            cardNumber: formData.cardNumber,
            expiry: formData.expiry,
            cvv: formData.cvv,
            amount: orderDetails.total
          });
          break;
          
        case 'upi':
          // Handle UPI payment
          const upiResponse = await initiateUPIPayment({
            upiId: formData.upiId,
            amount: orderDetails.total
          });
          break;
          
        case 'netbanking':
          // Redirect to bank's payment page
          window.location.href = await generateNetBankingURL({
            bankCode: formData.bankCode,
            amount: orderDetails.total
          });
          break;
      }
      
      // Handle successful payment
      // Show success screen
      // Update order status
      
    } catch (error) {
      throw new Error('Payment failed. Please try again.');
    }
  };



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
                        ? 'border-[gold] text-[gold]' 
                        : 'border-gray-300 hover:border-[gold]'
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
                <button
                  onClick={() => setCurrentStep('information')}
                  className="bg-[#d44479] text-white ..."
                  // onClick={handleAddToCart}
                  // className="w-full px-6 py-3 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                   Buy Now
                </button>
                {currentStep === 'information' && (
                    <OrderInformationForm
                    orderDetails={{
                      productName: product.name,
                      size: product.size,
                      quantity: product.quantity,
                      price: product.price,
                      shippingCost: 0,
                      image: product.images[0]
                    }}
                      onSubmit={async (userformData) => {
                        // Your API call here
                        // const response = await fetch('/api/createOrder', {
                        //   method: 'POST',
                        //   headers: { 'Content-Type': 'application/json' },
                        //   body: JSON.stringify(formData)
                        // });
                        setCurrentStep('summary');
                        // Handle response...
                      }}
                      // onProceedtoSummary = {() =>{
                      //   setCurrentStep('summary');
                      // }}
                      onClose={() => setCurrentStep('')}
                    />
                  )}
                  {currentStep === 'summary' && (
                      <OrderSummaryModal
                        orderDetails={{
                          productName: product.name,
                          size: product.size,
                          quantity: product.quantity,
                          price: product.price,
                          shippingCost: 0,
                          image: product.images[0]
                        }}
                        userDetails={userformData} // Data collected from previous step
                        onProceedToPayment={() => {
                          // Handle payment navigation
                          setCurrentStep('payment');
                        }}
                        onBack={() => {
                          // Go back to information collection
                          setCurrentStep('information');
                        }}
                        onClose={() => {
                          // Close the modal
                          setCurrentStep('');
                        }}
                      />
                    )}
                    {currentStep === 'payment' && (
                      <PaymentModal
                        orderDetails={{
                          orderId: 'ORDER123',
                          total: 5098, // Total amount including shipping
                        }}
                        onPaymentSuccess={(response) => {
                          // Handle successful payment
                          // Update order status in your backend
                          // Show success message
                          // Navigate to order confirmation
                        }}
                        onPaymentFailure={(error) => {
                          // Handle payment failure
                          console.error('Payment failed:', error);
                        }}
                        onBack={() => setCurrentStep('summary')}
                        onClose={() => setCurrentStep('')}
                      />
                    )}
                    {/* {currentStep === 'paymentform' && (
                      <PaymentMethodHandler
                        selectedMethod={selectedMethod}
                        amount={orderDetails.total}
                        onProcessPayment={handleProcessPayment}
                        onBack={() => setShowPaymentForm(false)}
                      />
                    )} */}
                {/* <Link
                  to="/order-information-form"
                  className="w-full px-6 py-3 text-sm flex justify-center items-center font-semibold text-white bg-primary rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Buy Now
                </Link> */}
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