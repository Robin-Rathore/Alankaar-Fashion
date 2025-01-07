import React from 'react';
import { X, ShoppingBag, Truck, Shield } from 'lucide-react';

const OrderSummaryModal = ({ 
  orderDetails, 
  userDetails, 
  onProceedToPayment, 
  onBack,
  onClose 
}) => {
  const {
    productName,
    size,
    quantity,
    price,
    shippingCost = 0,
    image
  } = orderDetails;

  const subtotal = price * quantity;
  const total = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl mx-4 animate-slideIn">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white z-10 hover:opacity-80 transition-opacity"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-[#d44479] px-8 py-6 pattern-ethnic">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d44479] to-[#e65f8e] opacity-90"></div>
            <div className="relative">
              <h2 className="text-white text-2xl font-semibold font-serif">
                Order Summary
              </h2>
              <p className="text-white/80 mt-1">
                Please review your order details
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Product Details */}
            <div className="flex gap-6 pb-6 border-b border-gray-200">
              <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{productName}</h3>
                <div className="mt-1 text-sm text-gray-500">
                  <p>Size: {size}</p>
                  <p>Quantity: {quantity}</p>
                </div>
                <div className="mt-2 text-lg font-medium text-[#d44479]">
                  ₹{price.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="py-6 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Delivery Details</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>{userDetails.fullName}</p>
                <p>{userDetails.address}</p>
                <p>{userDetails.city}, {userDetails.state} {userDetails.zipCode}</p>
                <p>Phone: {userDetails.phoneNumber}</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="py-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">₹{shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-3 border-t border-gray-200">
                <span>Total</span>
                <span className="text-[#d44479]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="flex flex-col items-center text-center">
                <ShoppingBag className="w-6 h-6 text-[#d44479] mb-2" />
                <span className="text-xs text-gray-600">Secure Shopping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-[#d44479] mb-2" />
                <span className="text-xs text-gray-600">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-6 h-6 text-[#d44479] mb-2" />
                <span className="text-xs text-gray-600">Buyer Protection</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={onBack}
                className="flex-1 px-6 py-3 border-2 border-[#d44479] text-[#d44479] rounded-lg font-medium hover:bg-[#d44479] hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                onClick={onProceedToPayment}
                className="flex-1 px-6 py-3 bg-[#d44479] text-white rounded-lg font-medium hover:bg-[#c13367] transition-colors shadow-lg hover:shadow-xl"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pattern-ethnic {
          background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OrderSummaryModal;