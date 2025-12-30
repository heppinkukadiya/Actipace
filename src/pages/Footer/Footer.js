import React from "react";
import fecebook from "./fecebook.png";
import insta from "./insta.png";
import twitter from "./twitter.png";
import youtube from "./youtube.png";
import flag from "./flag.png";
import actipace from "./Layer_1.png";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
      <footer className="bg-[#2B2A29] py-16 w-full h-auto text-white">
        <div className="container mx-auto px-16">
          <div className="flex flex-col lg:flex-row justify-between">
            {/* First Column */}
            <div className="mb-8 md:mb-0 h-auto flex flex-col items-center md:items-center">
              <a href="/" className="text-2xl font-bold">
                <img src={actipace} alt="Actipace Logo" className="w-[150px] h-auto"/>
              </a>
              <div className="flex items-center mt-4">
                <img src={flag} alt="India Flag" className="w-6 h-6 mr-2"/>
                <span>India (English)</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="flex mt-4 gap-4 justify-center md:justify-center">
                <a className="mr-4">
                  <img src={fecebook} alt="Facebook" className="w-6 h-6"/>
                </a>
                <a href="/" className="mr-4">
                  <img src={insta} alt="Instagram" className="w-6 h-6"/>
                </a>
                <a href="https://www.x.com/actipace" target="_blank" className="mr-4">
                  <img src={twitter} alt="Twitter" className="w-6 h-6"/>
                </a>
                <a href="/" className="mr-4">
                  <img src={youtube} alt="YouTube" className="w-6 h-6"/>
                </a>
              </div>
            </div>

            <div className="mb-8 md:mb-0 text-center">
              <h3 className="text-lg font-bold mb-4">Developed By</h3>
              <div className="font-Helvetic text-sm mb-4">
                <p>G-103, HTC Market, Anjana</p>
                <p>Farm, Mithi Khadi Road, Surat,</p>
                <p>Gujarat, India</p>
              </div>
            </div>


            <div className="mb-8 md:mb-0 text-center">
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="font-Helvetic text-sm mb-4 flex flex-col gap-2">
                <li>
                  <a href="https://actipace.com/support/open.php" target="_blank">Customer Service</a>
                </li>
                <li>
                  <Link to="/price">FAQs</Link>
                </li>
                <li>
                  <a href="/price">Renewals</a>
                </li>
              </ul>
            </div>

            <div className="mb-8 md:mb-0 text-center">
              <h3 className="text-lg font-bold mb-4">Policy</h3>
              <ul className=" font-Helvetic text-sm mb-4 flex flex-col gap-2">
                <li>
                  <a target="_blank" href="https://actipace.com/terms">Terms and conditions</a>
                </li>
                <li>
                  <a target="_blank" href="https://actipace.com/privacy/">Privacy Policy</a>
                </li>
                <li>
                  <a target="_blank" href="https://actipace.com/refund/">Cancellation and Refund</a>
                </li>
                <li>
                  <a href="https://actipace.com/refund" target="_blank">Shipping and Exchange
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-8 md:mb-0 text-center">
              <h3 className="text-lg font-bold mb-4">About</h3>
              <ul className="font-Helvetic text-sm mb-4 flex flex-col gap-2">
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <a href="/">Careers</a>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li> 
                  <Link to="/extrapage">Download</Link>
                </li>
              </ul>
            </div>


          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-8">
          <div className="w-full sm:w-[1280px] bg-[#0E2C40] h-[1px]"></div>
        </div>
        <div className="text-center mt-5">
          <p>&copy; Copyright 2024 Actipace Security - All Rights Reserved</p>
        </div>
      </footer>
  );
};

export default Footer;
