import {Suspense,lazy} from "react"
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



// import About from "./About/About";


import ExtraPage from "./pages/ExtraPage/ExtraPage";
import SmartsuppChat from "./SmartsuppChat";
import actipace_a from "../src/pages/home/image1/actipace-a.png"
import Checkout from "./pages/CheckOut/Checkout";
import UserDashboard from "./pages/dashboard/UserDashboard";
const Home = lazy(()=> import ("./pages/home/Home"));
const Price = lazy(()=> import ("./pages/Price/Price"));


function App() {
  return (
    <Router>
      <Header1 />
      <Navbar />
      <SmartsuppChat/>
      <Routes>
        {/* <Footer className="absolute bottom-0 w-full" />  */}
        <Route path="/" element={<Suspense fallback={"loding...."}><Home /></Suspense>} />
        <Route path="/product" element={<Product />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/newpassword/:token" element={<NewPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/award" element={<Award />} />
        <Route path="/download" element={<ExtraPage />} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/dashboard" element={<UserDashboard/>}/>
        <Route path="/price" element={<Suspense fallback={"loding...."}><Price /></Suspense>} />
        {/* <Route path="/contact" element={<ContactPage />} />  */}
      </Routes>
      <Footer className="absolute bottom-0 w-full" />
    </Router>
  );
}

export default App;
