import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/login-visual.png";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (error) setError("");

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };


  const verify = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: localStorage.getItem("email"),
        otp: otp.join(""),
      });
      navigate("/home");
    } catch {
      setError("Please enter a valid OTP");
    }
  };


  return (
    <div className="h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 items-center justify-center">
        <img
          src={img}
          alt="Productr"
          className="w-auto h-auto max-w-full max-h-full object-contain p-4"
        />
      </div>

      <div className="md:hidden flex justify-center py-6 bg-gradient-to-br from-blue-50 to-gray-100">
        <img src={img} alt="Productr" className="w-32 h-32 object-contain" />
      </div>

      {/* Right Side - OTP Content */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white w-full h-full flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-[#111652] mb-6 text-center md:text-left">
              Login to your Productr Account
            </h2>

            <label className="block text-sm font-medium text-[#344054] mb-2">
              Enter OTP
            </label>

            <div className="flex justify-between gap-2 mb-1">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className={`w-12 h-12 text-center text-lg rounded-lg focus:outline-none focus:ring-2 mb-3
        ${error
                      ? "border border-red-400 focus:ring-red-300"
                      : "border border-gray-300 focus:ring-[#07107466]"
                    }
      `}
                />
              ))}
            </div>
            {error && (
              <p className="text-sm text-red-500 mb-6">
                {error}
              </p>
            )}

            <button
              onClick={verify}
              className="bg-[#071074] text-white w-full py-3 rounded-lg font-medium cursor-pointer"
            >
              Enter your OTP
            </button>

            <p className="text-sm text-[#98A2B3] mt-4 text-center">
              Didn’t receive OTP?
              <span className="text-[#071074] font-medium cursor-pointer ml-1">
                Resend in 20s
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
