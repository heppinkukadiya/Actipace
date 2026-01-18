import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Header1 from "./Header1";
import Footer from "./pages/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Product from "./pages/Product/Product";
import About from "./pages/About/About";
import Support from "./pages/Support/Support";
import Login from "./pages/Dealer-Registation/Login";
import Signup from "./pages/Dealer-Registation/Signup";
import ResetPassword from "./pages/Dealer-Registation/ResetPassword";
import NewPassword from "./pages/Dealer-Registation/NewPassword";
import Contact from "./pages/Contact/Contact";
import Award from "./pages/Award/Award";
import ExtraPage from "./pages/ExtraPage/ExtraPage";
import SmartsuppChat from "./SmartsuppChat";
import Checkout from "./pages/CheckOut/Checkout";
import UserDashboard from "./pages/dashboard/UserDashboard";

import { setupAxiosLoader } from "./api/axiosLoader";
import RouteLoader from "./component/RouteLoader";
import GlobalLoader from "./component/GlobalLoader";

const Home = lazy(() => import("./pages/home/Home"));
const Price = lazy(() => import("./pages/Price/Price"));

// ✅ Fullscreen fallback loader (Tailwind)
const PageFallback = () => (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-lg">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
            <p className="text-sm font-semibold text-gray-800">Loading...</p>
        </div>
    </div>
);

function App() {
    const [loading, setLoading] = useState(false);

    // ✅ API Loading (Axios)
    useEffect(() => {
        setupAxiosLoader(setLoading);
    }, []);

    return (
        <Router>
            {/* ✅ Route Change Loader */}
            <RouteLoader setLoading={setLoading} />

            {/* ✅ Global Loader UI (API + Route change) */}
            <GlobalLoader show={loading} />

            <Header1 />
            <Navbar />
            <SmartsuppChat />

            {/* ✅ Wrap all routes in ONE Suspense (fix white screen on first load) */}
            <Suspense fallback={<PageFallback />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route path="/newpassword/:token" element={<NewPassword />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/award" element={<Award />} />
                    <Route path="/download" element={<ExtraPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/price" element={<Price />} />
                </Routes>
            </Suspense>

            <Footer className="absolute bottom-0 w-full" />
        </Router>
    );
}

export default App;
