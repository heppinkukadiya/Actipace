import React from "react";
import a from "../home/image/actipace-a.png"
import rm from "./image/Frame 848.png"
import tex from "./image/Group 77.svg"
import { Link } from "react-router-dom";
import WhyChooseUs from "./slider/WhyChooseUs";

const Product = () => {
    return (
        <div className="relative w-full">
            <div className="hidden lg:flex w-full absolute h-[350px] justify-end">
                <img src={a} alt="a" className="absolute w-[280px] h-[350px]"/>
            </div>
            <div className="w-full h-auto sm:h-[500px] px-4">

                <div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-20 mt-6 sm:mt-[50px]">

                    {/* Left Section */}
                    <div className="flex flex-col gap-6 sm:gap-10 mt-4 sm:mt-[40px]">
                        <div className="flex justify-center sm:justify-start">
                            <img
                                src={tex}
                                alt="Actipace Antivirus"
                                className="w-full max-w-[550px] h-auto object-contain"
                            />
                        </div>

                        <p className="max-w-[550px] text-sm sm:text-base font-normal text-[#071D2B] mx-auto sm:mx-0 text-center sm:text-left px-4 sm:px-0">
                            We believe that wherever you live, whatever you love, wherever you’re
                            going, and whatever you do, you have the right to live freely and
                            safely online.
                        </p>

                        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start mt-4 z-10">
                            <Link to="/price">
                                <button
                                    type="submit"
                                    className="w-[250px] h-[50px] px-6 py-3 bg-green-600 text-white font-semibold text-sm hover:bg-green-700 rounded-full shadow-custom2"
                                >
                                    Actipace Total Security
                                </button>
                            </Link>
                            <Link to="/price">
                                <button
                                    className="w-[250px] h-[50px] px-6 py-3 bg-green-600 text-white font-semibold text-sm hover:bg-green-700 rounded-full shadow-custom2"
                                >
                                    Actipace Antivirus
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <img
                            src={rm}
                            alt="Actipace Demo"
                            className="h-[400px] w-[400px] object-contain"
                        />
                    </div>
                </div>
            </div>


            <div className="w-full h-[850px] flex justify-center bg-[#ECFDF1]">
                <WhyChooseUs t1={"Why"} t2={"Choose Us"}/>
            </div>
        </div>
    );
};

export default Product;