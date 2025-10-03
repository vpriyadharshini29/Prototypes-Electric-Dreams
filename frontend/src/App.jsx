import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryServices from "./Pages/services";
import ServiceProducts from "./Pages/service products";
import ProductDetails from "./Pages/Product details";
import { CartProvider } from "./context/cartcontext";
import CartPopup from "./Pages/cartpopup";
import CheckoutPage from "./Pages/checkoutpage";
import HomePage from "./Pages/Homepage";
import Emergencyelectrican from "./Pages/Emergency page";
import AboutPage from "./Pages/Aboutpage";
import ContactPage from "./Pages/contactpage";
import AreaPage from "./Pages/Areapage";
import Login from "./Pages/Login";


// import CommercialServices from "./Pages/services";

export default function App() {
  return (
      <CartProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <CartPopup/>

        <main className="flex-grow container mx-auto p-6">
          <Routes>
            <Route path="/" element={<HomePage/>} />
              <Route path="/services/:categoryId" element={<CategoryServices />} />
              <Route path="/products/:serviceId" element={<ServiceProducts />} />
                 <Route path="/product/:productId" element={<ProductDetails />} />
                 <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/emergency" element={<Emergencyelectrican/>} />
                   <Route path="/about" element={<AboutPage/>} />
                    <Route path="/contact" element={<ContactPage/>} />
                     <Route path="/area" element={<AreaPage/>} />
                       <Route path="/login" element={<Login />} />
            
            {/* Add more routes as needed */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}
