import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/login-visual.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await axios.post("http://localhost:5000/api/auth/login", { email });
    localStorage.setItem("email", email);
    navigate("/otp");
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[white]">
      {/* Left Side - Image/Illustration */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 items-center justify-center">
        <div className="text-white w-full h-full flex items-center justify-center">
          <img
            src={img}
            alt="Productr"
            className="w-auto h-auto max-w-full max-h-full object-contain p-4 md:p-5"
          />
        </div>
      </div>

      <div className="md:hidden flex justify-center py-6 bg-gradient-to-br from-blue-50 to-gray-100">
        <img
          src={img}
          alt="Productr"
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white w-full h-full flex flex-col justify-between p-4 md:p-6 lg:p-8">
          {/* Header and Form Container */}
          <div className="flex-1 flex items-center justify-center py-4 md:py-0">
            <div className="w-full max-w-sm md:max-w-md">
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#111652] text-center md:text-left">
                  Login to your Productr Account
                </h2>
              </div>

              {/* Form */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    Email or Phone number
                  </label>
                  <input
                    className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-base"
                    placeholder="Enter email or phone number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  onClick={submit}
                  className="bg-[#071074] text-white w-full py-3 rounded-lg font-medium cursor-pointer hover:bg-blue-800 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center py-4 md:py-0">
            <div className="w-full max-w-sm md:max-w-md border border-gray-300 p-4 rounded-lg bg-gray-50">
              <p className="text-[#98A2B3] text-center text-sm md:text-base">
                Don't have a Productr Account{" "}
                <br />
                <button
                  onClick={() => navigate("/signup")}
                  className="text-[#071074] font-semibold hover:text-blue-800 hover:underline transition mt-1"
                >
                  SignUp Here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}