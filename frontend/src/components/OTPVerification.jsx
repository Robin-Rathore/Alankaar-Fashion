import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@mui/material";
import { FiCheckCircle, FiMail } from "react-icons/fi";
import axios from "axios";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access location state
  const { email, otpId } = location.state; // Extract email and otpId
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Make sure email and otpId are passed properly
    if (!email || !otpId) {
        navigate("/register", { state: { error: "OTP verification failed. Please try again." } });
        toast.error("OTP verification failed. Please try again." );
      }      
  }, [email, otpId, navigate]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/v1/user/verify-otp", {
        email,
        otp: otpCode,
      });

      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError("Invalid OTP. Try again!");
        setOtp(["", "", "", ""]);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err.response?.data?.message || err.message);
      setError("Server error. Please try again later.");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("http://localhost:5001/api/v1/user/send-otp");
      alert("OTP resent successfully!");
    } catch (err) {
      console.error("Error resending OTP:", err.response?.data?.message || err.message);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center mb-6">
          <FiMail className="text-5xl text-indigo-500 mx-auto animate-bounce" />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            OTP Verification
          </h1>
          <p className="text-gray-600 mt-2">
            Enter the 4-digit code sent to your email.
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-xl text-center text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-transform transform hover:scale-105"
        >
          Verify OTP
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Didn’t receive the code?{" "}
          <button
            onClick={handleResendOtp}
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            Resend
          </button>
        </p>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <Dialog
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <FiCheckCircle className="text-6xl text-green-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Verification Successful!
            </h2>
            <p className="text-gray-600 mt-2">Redirecting to your dashboard...</p>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default OTPVerification;
