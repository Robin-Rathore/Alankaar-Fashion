import React, { useState } from 'react';
import { Phone, MapPin, X } from 'lucide-react';

const OrderInformationForm = ({ productDetails, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* Header with ethnic pattern */}
          <div className="relative bg-[#d44479] px-8 py-6 pattern-ethnic">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d44479] to-[#e65f8e] opacity-90"></div>
            <h2 className="relative text-white text-2xl font-semibold font-serif">
              Complete Your Order
            </h2>
            <p className="relative text-white/80 mt-1">
              Premium Collection
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#d44479]" />
                      Phone Number
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 text-[#d44479]" />
                  Delivery Address
                </div>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none transition-colors"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP Code"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d44479] hover:bg-[#c13367] text-white py-4 rounded-lg font-medium transition-colors duration-200 ease-in-out disabled:opacity-50 text-lg shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? 'Processing...' : 'Continue to Order Summary'}
              </button>
            </form>
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

export default OrderInformationForm;