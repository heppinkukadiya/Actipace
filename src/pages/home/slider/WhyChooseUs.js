import React, { useState, useEffect } from "react";
import Card from "../slider/Card";
import Data from "../../Product/slider/Data";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

const WhyChooseUs = ({ t1, t2 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768); // assuming 768px is the breakpoint for small screens

    const totalGroups = Math.ceil(Data.length / (isSmallScreen ? 1 : 3));
    
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const prevHandler = () => {
        setCurrentIndex((currentIndex - (isSmallScreen ? 1 : 3) + Data.length) % Data.length);
    };

    const nextHandler = () => {
        setCurrentIndex((currentIndex + (isSmallScreen ? 1 : 3)) % Data.length);
    };

    const visibleCards = isSmallScreen
        ? [Data[currentIndex]] // Show only 1 card on small screens
        : [
            Data[currentIndex],
            Data[(currentIndex + 1) % Data.length],
            Data[(currentIndex + 2) % Data.length],
        ];

    const activeGroupIndex = Math.floor(currentIndex / (isSmallScreen ? 1 : 3));

    return (
        <div
            className="flex flex-col items-center lg:gap-y-20 lg:justify-between  lg:mt-14 relative lg:w-full lg:h-[700px] lg:max-w-[970px] lg:mx-auto">
            <div className="flex w-full  justify-between items-center">
                <h1 className="text-[22px] lg:text-[40px] font-semibold lg:mb-4 text-[#151C26] font-roboto ">
                    <span className="text-[#FA7223]">{t1} </span>{t2}
                </h1>

                <div className="flex gap-4">
                    <button
                        onClick={prevHandler}
                        className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] bg-[#FA7223] flex justify-center items-center text-[#FFFFFF]"
                    >
                        <FiArrowLeft className="lg:w-[30px] lg:h-[30px]"/>
                    </button>
                    <button
                        onClick={nextHandler}
                        className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] bg-[#FA7223] flex justify-center items-center text-[#FFFFFF]"
                    >
                        <FiArrowRight className="lg:w-[30px] lg:h-[30px]"/>
                    </button>
                </div>
            </div>

            <div
                className={`flex mt-4 gap-7 ${
                    isSmallScreen ? "overflow-hidden" : ""
                }`}
            >
                {visibleCards.map((item) => (
                    <Card key={item.id} item={item}/>
                ))}
            </div>

            <div
                className={`flex space-x-2 mt-6 mb-4 ${isSmallScreen ? "hidden" : ""}`}
            >
                {Array.from({length: totalGroups}).map((_, index) => (
                    <div
                        key={index}
                        className={`w-10 h-1 rounded-lg ${
                            index === activeGroupIndex ? "bg-[#FA7223]" : "bg-gray-500"
                        }`}
                    ></div>
                ))}
            </div>

        </div>
    );
};

export default WhyChooseUs;