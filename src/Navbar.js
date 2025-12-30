import React, { useState } from "react";
import logo from "./pages/home/image/acticipace_logo.png";
import { IoGridSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Currency } from "./Atoms";
import ID from "./pages/Support/India.png";
import UD from "./pages/Support/Flag_of_the_United_States.png";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { categories } from "./services/Api";
import user from "../src/pages/dashboard/icons8-user-50.png";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [curr, setCurr] = useRecoilState(Currency);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleOptionClick = (value) => {
    setCurr(value);
    setIsOpen(false);
  };

  const handlesubmit = () => {
    async function datafetch() {
      toast.loading("loading....");

      try {
        const response = await axios.get(categories.DASHBOARD, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Safeguard against missing or malformed data
        const { data } = response;
        if (data && data.data) {
          navigate("./dashboard", { state: data }); // Ensure it's an array
        }
        else {
          toast.error("No data found");
        }


        toast.dismiss();
      } catch (e) {
        console.log(e)
        toast.dismiss();
        if(e.status === 401)
        {
            navigate("/login")
            toast.error(e.response.data.message);
        } // Remove the loading toast
        else if (e.response && e.response.data && e.response.data.message) {
          toast.error(e.response.data.message); // Show error message from response
        } else {
          toast.error("An error occurred"); // Show generic error message
        }
        console.error(e);
      }
    }

    datafetch();
  };

  const options = [
    { value: "INR", label: "INR", img: ID },
    { value: "USD", label: "USD", img: UD },
  ];

  return (
      <nav className="bg-white text-[#071D2B] w-full shadow-md relative">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8 lg:py-4">
          {/* Logo */}
          <Link to="/">
          <img src={logo} alt="Logo" className="w-[140px] h-auto"/>
          </Link>
          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
                to="/"
                className={`hover:text-gray-400 ${
                    location.pathname === "/" ? "text-[#FA7223]" : "text-[#071D2B]"
                }`}
            >
              Home
            </Link>
            <Link
                to="/product"
                className={`hover:text-gray-400 ${
                    location.pathname === "/product"
                        ? "text-[#FA7223]"
                        : "text-[#071D2B]"
                }`}
            >
              Product
            </Link>
            {/*<Link*/}
            {/*    to="/login"*/}
            {/*    className={`hover:text-gray-400 ${*/}
            {/*        location.pathname === "/login"*/}
            {/*            ? "text-[#FA7223]"*/}
            {/*            : "text-[#071D2B]"*/}
            {/*    }`}*/}
            {/*>*/}
            {/*  Dealer Registration*/}
            {/*</Link>*/}
            <Link
                to="/support"
                className={`hover:text-gray-400 ${
                    location.pathname === "/support"
                        ? "text-[#FA7223]"
                        : "text-[#071D2B]"
                }`}
            >
              Support
            </Link>
            <Link
                to="/about"
                className={`hover:text-gray-400 ${
                    location.pathname === "/about"
                        ? "text-[#FA7223]"
                        : "text-[#071D2B]"
                }`}
            >
              About
            </Link>
            <Link
                to="/price"
                className={`hover:text-gray-400 ${
                    location.pathname === "/price"
                        ? "text-[#FA7223]"
                        : "text-[#071D2B]"
                }`}
            >
              Pricing
            </Link>
            <Link
                to="/award"
                className={`hover:text-gray-400 ${
                    location.pathname === "/award"
                        ? "text-[#FA7223]"
                        : "text-[#071D2B]"
                }`}
            >
              Award
            </Link>
            <Link
                to="/contact"
                className={`hover:text-gray-400 ${
                    location.pathname === "/contact"
                        ? "text-[#FA7223]"
                        : "text-[#071D2B]"
                }`}
            >
              Contact
            </Link>

              <a
                  href="https://actipace.com/corporate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 text-[#071D2B]"
              >
                  Corporate
              </a>



              {/*<div className="relative">*/}
            {/*  <button*/}
            {/*      className="appearance-none w-[120px] h-[47px] border border-[#FA7223] px-4 py-2 text-gray-700 bg-white shadow-md flex items-center justify-between"*/}
            {/*      onClick={toggleDropdown}*/}
            {/*  >*/}
            {/*    <img*/}
            {/*        src={options.find((o) => o.value === curr)?.img}*/}
            {/*        alt={curr}*/}
            {/*        className="w-6 h-6 mr-2"*/}
            {/*    />*/}
            {/*    {curr}*/}
            {/*    <FaChevronDown className="text-gray-500"/>*/}
            {/*  </button>*/}
            {/*  {isOpen && (*/}
            {/*      <ul className="absolute w-[120px] border border-[#FA7223] bg-white shadow-md mt-2 z-10">*/}
            {/*        {options.map((option) => (*/}
            {/*            <li*/}
            {/*                key={option.value}*/}
            {/*                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"*/}
            {/*                onClick={() => handleOptionClick(option.value)}*/}
            {/*            >*/}
            {/*              <img*/}
            {/*                  src={option.img}*/}
            {/*                  alt={option.label}*/}
            {/*                  className="w-6 h-6 mr-2"*/}
            {/*              />*/}
            {/*              {option.label}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*      </ul>*/}
            {/*  )}*/}
            {/*</div>*/}
          </div>

          {/* Free Download Button (Desktop Only) */}

          <div className="hidden lg:flex lg:gap-3">
            <Link to="/download" className=" ">
              <button
                  className="bg-[#FA7223] text-white font-Roboto px-4 py-2 rounded text-[14px] flex items-center gap-2">
                <IoGridSharp className="w-5 h-5"/>
                Free Download
              </button>
            </Link>
          </div>
          <button
              onClick={handlesubmit}
              className="hidden w-10 h-10 rounded-full lg:mr-[-2%]  lg:flex items-center justify-center bg-[#FA7223]"
          >
            <img src={user} alt="user" className="w-6 h-6 "/>
          </button>
          <button
              className="lg:hidden text-2xl"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
          >
            <FaBars/>
          </button>
        </div>

        <div
            className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
                menuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-20 w-3/4 max-w-[300px]`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
                className="text-2xl"
                onClick={toggleMenu}
                aria-label="Close Menu"
            >
              <FaTimes />
            </button>
          </div>
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <button
                  onClick={handlesubmit}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
              >
                <img src={user} alt="user" className="w-6 h-6" />
              </button>
            </li>
            <li>
              <Link
                  to="/"
                  onClick={toggleMenu}
                  className={`hover:text-gray-400 ${
                      location.pathname === "/" ? "text-[#FA7223]" : "text-[#071D2B]"
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                  to="/product"
                  onClick={toggleMenu}
                  className={`hover:text-gray-400 ${
                      location.pathname === "/product"
                          ? "text-[#FA7223]"
                          : "text-[#071D2B]"
                  }`}
              >
                Product
              </Link>
            </li>
            {/*<li>*/}
            {/*  <Link*/}
            {/*      to="/login"*/}
            {/*      onClick={toggleMenu}*/}
            {/*      className={`hover:text-gray-400 ${*/}
            {/*          location.pathname === "/login"*/}
            {/*              ? "text-[#FA7223]"*/}
            {/*              : "text-[#071D2B]"*/}
            {/*      }`}*/}
            {/*  >*/}
            {/*    Dealer Registration*/}
            {/*  </Link>*/}
            {/*</li>*/}
            <li>
              <Link
                  to="/support"
                  onClick={toggleMenu}
                  className={`hover:text-gray-400 ${
                      location.pathname === "/support"
                          ? "text-[#FA7223]"
                          : "text-[#071D2B]"
                  }`}
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                  to="/about"
                  onClick={toggleMenu}
                  className={`hover:text-gray-400 ${
                      location.pathname === "/about"
                          ? "text-[#FA7223]"
                          : "text-[#071D2B]"
                  }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                  to="/price"
                  onClick={toggleMenu}
                  className={`hover:text-gray-400 ${
                      location.pathname === "/price"
                          ? "text-[#FA7223]"
                          : "text-[#071D2B]"
                  }`}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                  to="/award"
                  onClick={toggleMenu}
                  className={`hover:text-gray-400 ${
                      location.pathname === "/award"
                          ? "text-[#FA7223]"
                          : "text-[#071D2B]"
                  }`}
              >
                Award
              </Link>
            </li>
            <li>
              <Link
                  to="/contact"
                  onClick={toggleMenu}
                  className={`hover:text-gray-400 ${
                      location.pathname === "/contact"
                          ? "text-[#FA7223]"
                          : "text-[#071D2B]"
                  }`}
              >
                Contact
              </Link>
            </li>

              <li>
                  <a
                      href="https://actipace.com/corporate"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleMenu}
                      className="hover:text-gray-400 text-[#071D2B]"
                  >
                      Corporate
                  </a>
              </li>



              {/*<li className="relative">*/}
            {/*  <button*/}
            {/*      className="appearance-none w-[120px] h-[47px] border border-[#FA7223] px-4 py-2 text-gray-700 bg-white shadow-md flex items-center justify-between"*/}
            {/*      onClick={toggleDropdown}*/}
            {/*  >*/}
            {/*    <img*/}
            {/*        src={options.find((o) => o.value === curr)?.img}*/}
            {/*        alt={curr}*/}
            {/*        className="w-6 h-6 mr-2"*/}
            {/*    />*/}
            {/*    {curr}*/}
            {/*    <FaChevronDown className="text-gray-500" />*/}
            {/*  </button>*/}
            {/*  {isOpen && (*/}
            {/*      <ul className="absolute w-[120px] border border-[#FA7223] bg-white shadow-md mt-2 z-10">*/}
            {/*        {options.map((option) => (*/}
            {/*            <li*/}
            {/*                key={option.value}*/}
            {/*                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"*/}
            {/*                onClick={() => handleOptionClick(option.value)}*/}
            {/*            >*/}
            {/*              <img*/}
            {/*                  src={option.img}*/}
            {/*                  alt={option.label}*/}
            {/*                  className="w-6 h-6 mr-2"*/}
            {/*              />*/}
            {/*              {option.label}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*      </ul>*/}
            {/*  )}*/}
            {/*</li>*/}

            <li>
              <Link
                  to="/download"
                  onClick={toggleMenu}
                  className="bg-[#FA7223] text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <IoGridSharp className="w-5 h-5" />
                Free Download
              </Link>
            </li>
          </ul>
        </div>
      </nav>
  );
}

export default Navbar;
