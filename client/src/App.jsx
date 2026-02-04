import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import OTP from "./pages/auth/OTP";
import Home from "./pages/dashboard/Home";
import Products from "./pages/dashboard/Products/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
