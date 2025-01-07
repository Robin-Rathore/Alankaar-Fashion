import React, { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// Bank list for net banking
const BANK_LIST = [
  { code: 'HDFC', name: 'HDFC Bank' },
  { code: 'ICICI', name: 'ICICI Bank' },
  { code: 'SBI', name: 'State Bank of India' },
  { code: 'AXIS', name: 'Axis Bank' },
  { code: 'PNB', name: 'Punjab National Bank' },
  { code: 'BOB', name: 'Bank of Baroda' },
  { code: 'YES', name: 'Yes Bank' }
];

// Initial form state
const INITIAL_FORM_STATE = {
  // Card Details
  cardNumber: '',
  cardHolder: '',
  expiry: '',
  cvv: '',
  // UPI Details
  upiId: '',
  // Net Banking
  bankCode: ''
};

/**
 * PaymentMethodHandler Component
 * Handles different payment method forms and their validation
 * 
 * @param {Object} props
 * @param {string} props.selectedMethod - Selected payment method (card/upi/netbanking)
 * @param {number} props.amount - Payment amount
 * @param {Function} props.onProcessPayment - Callback for payment processing
 * @param {Function} props.onBack - Callback for back button
 */
const PaymentMethodHandler = ({ 
  selectedMethod, 
  amount,
  onProcessPayment,
  onBack 
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upiVerified, setUpiVerified] = useState(false);

  // Form validation functions
  const validateCardNumber = (number) => {
    // TODO: Implement Luhn algorithm for card validation
    return number.replace(/\s/g, '').length === 16;
  };

  const validateExpiry = (expiry) => {
    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    return (
      month >= 1 && 
      month <= 12 && 
      year >= currentYear && 
      (year > currentYear || month >= currentMonth)
    );
  };

  const validateUPI = (upiId) => {
    // TODO: Implement actual UPI ID validation
    return /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/.test(upiId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)?.join(' ') || '';
    }

    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2');
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleVerifyUPI = async () => {
    // TODO: Implement actual UPI verification
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (validateUPI(formData.upiId)) {
        setUpiVerified(true);
        setError(null);
      } else {
        throw new Error('Invalid UPI ID');
      }
    } catch (err) {
      setError('UPI verification failed. Please check the ID and try again.');
      setUpiVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Validate based on payment method
      switch (selectedMethod) {
        case 'card':
          if (!validateCardNumber(formData.cardNumber)) {
            throw new Error('Invalid card number');
          }
          if (!validateExpiry(formData.expiry)) {
            throw new Error('Invalid expiry date');
          }
          if (formData.cvv.length < 3) {
            throw new Error('Invalid CVV');
          }
          break;
          
        case 'upi':
          if (!upiVerified) {
            throw new Error('Please verify your UPI ID first');
          }
          break;
          
        case 'netbanking':
          if (!formData.bankCode) {
            throw new Error('Please select a bank');
          }
          break;
      }

      setLoading(true);
      await onProcessPayment(selectedMethod, formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderCardForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none"
          value={formData.cardNumber}
          onChange={handleInputChange}
          maxLength="19"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Holder Name
        </label>
        <input
          type="text"
          name="cardHolder"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none"
          value={formData.cardHolder}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none"
            value={formData.expiry}
            onChange={handleInputChange}
            maxLength="5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="password"
            name="cvv"
            placeholder="123"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none"
            value={formData.cvv}
            onChange={handleInputChange}
            maxLength="4"
          />
        </div>
      </div>
    </div>
  );

  const renderUPIForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-4">
          <img 
            src="/api/placeholder/200/200"
            alt="QR Code"
            className="mx-auto rounded-lg"
          />
        </div>
        <p className="text-sm text-gray-600 mb-6">Scan with any UPI app</p>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or pay using UPI ID</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          UPI ID
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="upiId"
            placeholder="username@upi"
            className={`flex-1 px-4 py-3 border-2 rounded-lg focus:ring-2 focus:outline-none ${
              upiVerified 
                ? 'border-green-500 focus:ring-green-500' 
                : 'border-gray-200 focus:ring-[#d44479] focus:border-[#d44479]'
            }`}
            value={formData.upiId}
            onChange={handleInputChange}
          />
          <button 
            type="button"
            onClick={handleVerifyUPI}
            disabled={loading || !formData.upiId}
            className="px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            {upiVerified ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              'Verify'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderNetBankingForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {BANK_LIST.slice(0, 4).map((bank) => (
          <label
            key={bank.code}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.bankCode === bank.code 
                ? 'border-[#d44479] bg-pink-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="bankCode"
              value={bank.code}
              checked={formData.bankCode === bank.code}
              onChange={handleInputChange}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-900">{bank.name}</span>
          </label>
        ))}
      </div>
      
      <div className="mt-4">
        <select
          name="bankCode"
          value={formData.bankCode}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d44479] focus:border-[#d44479] focus:outline-none"
        >
          <option value="">Select Other Bank</option>
          {BANK_LIST.slice(4).map((bank) => (
            <option key={bank.code} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Display */}
        <div className="text-center mb-6">
          <span className="text-sm text-gray-600">Amount to Pay</span>
          <p className="text-2xl font-semibold text-[#d44479]">
            ₹{amount.toLocaleString()}
          </p>
        </div>

        {/* Payment Form Based on Selected Method */}
        {selectedMethod === 'card' && renderCardForm()}
        {selectedMethod === 'upi' && renderUPIForm()}
        {selectedMethod === 'netbanking' && renderNetBankingForm()}

        {/* Error Message */}
        {/* {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-[#d44479] text-[#d44479] rounded-lg font-medium hover:bg-[#d44479] hover:text-white transition-colors"
            disabled={loading}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-[#d44479] text-white rounded-lg font-medium hover:bg-[#c13367] transition-colors shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodHandler;