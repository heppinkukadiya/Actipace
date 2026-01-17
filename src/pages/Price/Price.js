import React, { useEffect, useState } from "react";

import sec1 from "./image/Section1.png";

import actipace_a from "../home/image1/actipace-a.png";
import axios from "axios";
import { categories } from "../../services/Api";
import { useNavigate } from "react-router-dom";

import { MdOutlineHorizontalRule } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import faq from "./faq";
import head from "./image/Group 79.svg";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { Currency } from "../../Atoms";
import toast from "react-hot-toast";
import { PiCurrencyInr } from "react-icons/pi";
import { IoLogoUsd } from "react-icons/io5";

function Price() {
    // i need token here
    const navigate = useNavigate();

    const curr = useRecoilValue(Currency);
    const icon = curr === "USD" ? 1 : 2;

    // const [ft,setft] = useState("");
    // const [fI,setfI] = useState("");
    // const [fL,setfL] = useState("");

    const [LiteD, SetLiteD] = useState(1);
    const [LiteY, SetLiteY] = useState(1);
    const [TotalD, SetTotalD] = useState(1);
    const [TotalY, SetTotalY] = useState(1);
    const [InterD, SetInterD] = useState(1);
    const [InterY, SetInterY] = useState(1);
    const [amountA, setamountA] = useState(0);
    const [amountB, setamountB] = useState(0);
    const [amountC, setamountC] = useState(0);

    // Frankfurter exchange rate INR -> USD
    async function getFrankRate(from, to) {
        try {
            const res = await axios.get(
                `https://api.frankfurter.app/latest?from=${from}&to=${to}`
            );
            return res.data.rates[to];
        } catch (error) {
            toast.error("Error fetching exchange rates");
            return null;
        }
    }

    useEffect(() => {
        const data = {
            device: LiteD,
            year: LiteY,
            id: 3,
        };

        const amountfetch = async () => {
            try {
                const amount = await axios.post(categories.GETPLAN_API, data);

                if (curr === "USD") {
                    const rate = await getFrankRate("INR", "USD");
                    if (rate) {
                        const converted = amount.data.amount.price * rate;
                        setamountA(Number(converted.toFixed(2)));
                    }
                } else {
                    setamountA(Number(amount.data.amount.price));
                }
            } catch (e) {
                //console.log(e);
            }
        };

        amountfetch();
    }, [LiteD, LiteY, curr]);

    useEffect(() => {
        const data = {
            device: TotalD,
            year: TotalY,
            id: 1,
        };

        const amountfetch = async () => {
            try {
                const amount = await axios.post(categories.GETPLAN_API, data);

                if (curr === "USD") {
                    const rate = await getFrankRate("INR", "USD");
                    if (rate) {
                        const converted = amount.data.amount.price * rate;
                        setamountB(Number(converted.toFixed(2)));
                    }
                } else {
                    setamountB(Number(amount.data.amount.price));
                }
            } catch (e) {
                //console.log(e);
            }
        };

        amountfetch();
    }, [TotalD, TotalY, curr]);

    useEffect(() => {
        const data = {
            device: InterD,
            year: InterY,
            id: 2,
        };

        const amountfetch = async () => {
            try {
                const amount = await axios.post(categories.GETPLAN_API, data);

                if (curr === "USD") {
                    const rate = await getFrankRate("INR", "USD");
                    if (rate) {
                        const converted = amount.data.amount.price * rate;
                        setamountC(Number(converted.toFixed(2)));
                    }
                } else {
                    setamountC(Number(amount.data.amount.price));
                }
            } catch (e) {
                //console.log(e);
            }
        };

        amountfetch();
    }, [InterD, InterY, curr]);

    const handleBuyA = async () => {
        const data = {
            device: TotalD,
            year: TotalY,
            id: 1,
            curr,
            amount: amountB,
            name: "Total Security",
            icon,
            //token:localStorage.getItem("token")
        };
        // console.log("price page",data.token);
        navigate("/checkout", { state: data });
        //await buycourse(data, navigate);
        // window.location.reload();
    };

    const handleBuyB = async () => {
        const data = {
            device: InterD,
            year: InterY,
            id: 2,
            curr,
            amount: amountC,
            name: "Internet Security",
            icon,
            //token:localStorage.getItem("token")
        };
        // console.log("price page",data.token);
        navigate("/checkout", { state: data });
        //await buycourse(data, navigate);

        //window.location.reload();
    };

    const handleBuyC = async () => {
        const data = {
            device: LiteD,
            year: LiteY,
            id: 3,
            curr,
            amount: amountA,
            name: "Basic Defence",
            icon,
            //token:localStorage.getItem("token")
        };
        // console.log("price page",data.token);
        navigate("/checkout", { state: data });
        //await buycourse(data, navigate);
        //window.location.reload();
    };

    function DeviceSetP(Device, SetDevice) {
        if (Device === 3) {
            SetDevice(Device + 2);
        } else if (Device === 5) {
            SetDevice(Device + 5);
        } else if (Device === 10) {
            return;
        } else {
            SetDevice(Device + 1);
        }
    }

    function DeviceSetM(Device, SetDevice) {
        if (Device === 10) {
            SetDevice(Device - 5);
        } else if (Device === 5) {
            SetDevice(Device - 2);
        } else if (Device === 1) {
            return;
        } else {
            SetDevice(Device - 1);
        }
    }

    function YearSetP(Year, SetYear) {
        if (Year === 3) {
            return;
        }
        SetYear(Year + 1);
    }

    function YearSetM(Year, SetYear) {
        if (Year === 1) {
            return;
        }
        SetYear(Year - 1);
    }

    const [openCategory, setOpenCategory] = useState(null);

    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleCategory = (category) => {
        setOpenCategory(openCategory === category ? null : category);
        console.log("category", category);
        setOpenQuestion(null);
    };

    const toggleQuestion = (questionIndex) => {
        setOpenQuestion(openQuestion === questionIndex ? null : questionIndex);
    };

    return (
        <div className="w-full relative flex-col">
            <div className="hidden lg:flex w-full absolute h-[350px] justify-end">
                <img src={actipace_a} alt="a" className="absolute w-[280px] h-[350px]" />
            </div>
            <div className="flex items-center justify-center container mt-[50px]">
                <img src={sec1} alt="" className="lg:w-2/3 md: w-[500px] " />
            </div>

            {/* </div> */}
            <div className="w-auto h-auto flex flex-col sm:flex-row md:flex-row lg:flex-row justify-center items-center gap-[40px] mt-[50px]">
                <div className="w-[320px] h-[790px] flex flex-col shadow-2xl">
                    <div className="bg-[#31BF5C] h-[5px]"></div>
                    <div className="text-[24px] mt-[15px] ml-[15px] font-bold">
                        Total Security
                    </div>
                    <div className="h-10 text-[50px] mt-[20px] mb-[50px] justify-center flex text-[#31BF5C] font-inter font-bold">
                        {curr === "USD" ? (
                            <IoLogoUsd className="h-[30px] w-[30px] mt-[17px]" />
                        ) : (
                            <PiCurrencyInr className="h-[30px] w-[30px] mt-[17px]" />
                        )}
                        <p>{amountB}</p>
                    </div>

                    <div className="flex justify-center items-center gap-10 mt-5">
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div className="flex gap-3 justify-center items-center">
                                <button
                                    onClick={() => DeviceSetM(TotalD, SetTotalD)}
                                    className="bg-[#9DA9B0] w-[25px] h-[25px] rounded-full text-white text-[30px] sm:text-[10px] md:text-[15px] flex justify-center items-center font-[700px]"
                                >
                                    <MdOutlineHorizontalRule className="w-[25px]" />
                                </button>
                                <div className="w-[35px] h-[30px] bg-[#e4e5e5] text-[#424D56] flex justify-center items-center text-[20px] rounded-[4px] font-normal">
                                    {TotalD}
                                </div>
                                <button
                                    onClick={() => DeviceSetP(TotalD, SetTotalD)}
                                    className="bg-[#31BF5C] w-[25px] h-[25px] rounded-full text-white text-[17px] flex justify-center items-center font-[700px]"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="font-bold text-[14px] text-[#424D56]">
                                DEVICES
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div className="flex gap-3 justify-center items-center">
                                <button
                                    onClick={() => YearSetM(TotalY, SetTotalY)}
                                    className="bg-[#9DA9B0] w-[25px] h-[25px] rounded-full text-white text-[30px] flex justify-center items-center font-[700px]"
                                >
                                    <MdOutlineHorizontalRule className="w-[25px]" />
                                </button>
                                <div className="w-[35px] h-[30px] bg-[#e4e5e5] text-[#424D56] flex justify-center items-center text-[20px] rounded-[4px] font-normal">
                                    {TotalY}
                                </div>
                                <button
                                    onClick={() => YearSetP(TotalY, SetTotalY)}
                                    className="bg-[#31BF5C] w-[25px] h-[25px] rounded-full text-white text-[17px] flex justify-center items-center font-[700px]"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="font-bold text-[14px] text-[#424D56]">YEAR</div>
                        </div>
                    </div>
                    <div className="w-ful  flex justify-center items-center mt-[30px]">
                        <button
                            className="w-[280px] h-[55px] bg-[#31BF5C] rounded-sm text-white"
                            onClick={() => handleBuyA()}
                        >
                            BUY NOW
                        </button>
                    </div>

                    <div className="text-[12px] flex flex-col ml-[20px] mt-[30px] gap-[5px] font-[200px]">
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Real Time
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Ransomware
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> USB
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Temp Files
                            Cleaner
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Website
                            Blocker
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Webcam
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Advertise
                            Blocker (Phishing and Malicious
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal ml-[20px]">
                            Website Protection)
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Privacy
                            Cleaner
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Wifi
                            Scanner
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Data
                            Encryption
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Data
                            Recovery
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Backup
                            Manager
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Game
                            Booster
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Registry
                            Cleaner
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Registry
                            Optimizer
                        </p>
                    </div>
                </div>

                <div className="w-[320px] h-[790px] flex flex-col shadow-2xl">
                    <div className="bg-[#31BF5C] h-[5px]"></div>
                    <div className="text-[24px] mt-[15px] ml-[15px] font-bold">
                        Internet Security
                    </div>
                    <div className="h-10 text-[50px] mt-[20px] mb-[50px] justify-center flex text-[#31BF5C] font-inter font-bold">
                        {curr === "USD" ? (
                            <IoLogoUsd className="h-[30px] w-[30px] mt-[17px]" />
                        ) : (
                            <PiCurrencyInr className="h-[30px] w-[30px] mt-[17px]" />
                        )}
                        <p>{amountC}</p>
                    </div>

                    <div className="flex justify-center items-center gap-10 mt-5">
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div className="flex gap-3 justify-center items-center">
                                <button
                                    onClick={() => DeviceSetM(InterD, SetInterD)}
                                    className="bg-[#9DA9B0] w-[25px] h-[25px] rounded-full text-white text-[30px] flex justify-center items-center font-[700px]"
                                >
                                    <MdOutlineHorizontalRule className="w-[25px]" />
                                </button>
                                <div className="w-[35px] h-[30px] bg-[#e4e5e5] text-[#424D56] flex justify-center items-center text-[20px] rounded-[4px] font-normal">
                                    {InterD}
                                </div>
                                <button
                                    onClick={() => DeviceSetP(InterD, SetInterD)}
                                    className="bg-[#31BF5C] w-[25px] h-[25px] rounded-full text-white text-[17px] flex justify-center items-center font-[700px]"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="font-bold text-[14px] text-[#424D56]">
                                DEVICES
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div className="flex gap-3 justify-center items-center">
                                <button
                                    onClick={() => YearSetM(InterY, SetInterY)}
                                    className="bg-[#9DA9B0] w-[25px] h-[25px] rounded-full text-white text-[30px] flex justify-center items-center font-[700px]"
                                >
                                    <MdOutlineHorizontalRule className="w-[25px]" />
                                </button>
                                <div className="w-[35px] h-[30px] bg-[#e4e5e5] text-[#424D56] flex justify-center items-center text-[20px] rounded-[4px] font-normal">
                                    {InterY}
                                </div>
                                <button
                                    onClick={() => YearSetP(InterY, SetInterY)}
                                    className="bg-[#31BF5C] w-[25px] h-[25px] rounded-full text-white text-[17px] flex justify-center items-center font-[700px]"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="font-bold text-[14px] text-[#424D56]">YEAR</div>
                        </div>
                    </div>
                    <div className="w-ful  flex justify-center items-center mt-[30px]">
                        <button
                            className="w-[280px] h-[55px] bg-[#31BF5C] rounded-sm text-white"
                            onClick={() => handleBuyB()}
                        >
                            BUY NOW
                        </button>
                    </div>
                    <div className="text-[12px] flex flex-col ml-[20px] mt-[30px] gap-[5px] font-[200px]">
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Real Time
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Ransomware
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> USB
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Temp Files
                            Cleaner
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Website
                            Blocker
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Webcam
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Advertise
                            Blocker (Phishing and Malicious
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal ml-[20px]">
                            Website Protection)
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Privacy
                            Cleaner
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Wifi
                            Scanner
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Data Encryption
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Data Recovery
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Backup Manager
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Game Booster
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Registry Cleaner
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Registry Optimizer
                        </p>
                    </div>
                </div>

                <div className="w-[320px] h-[790px] flex flex-col shadow-2xl">
                    <div className="bg-[#31BF5C] h-[5px]"></div>
                    <div className="text-[24px] mt-[15px] ml-[15px] font-bold">
                        Basic Defense
                    </div>
                    <div className="h-10 text-[50px] mt-[20px] mb-[50px] justify-center flex text-[#31BF5C] font-inter font-bold">
                        {curr === "USD" ? (
                            <IoLogoUsd className="h-[30px] w-[30px] mt-[17px]" />
                        ) : (
                            <PiCurrencyInr className="h-[30px] w-[30px] mt-[17px]" />
                        )}
                        <p>{amountA}</p>
                    </div>

                    <div className="flex justify-center items-center gap-10 mt-5">
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div className="flex gap-3 justify-center items-center">
                                <button
                                    onClick={() => DeviceSetM(LiteD, SetLiteD)}
                                    className="bg-[#9DA9B0] w-[25px] h-[25px] rounded-full text-white text-[30px] flex justify-center items-center font-[700px]"
                                >
                                    <MdOutlineHorizontalRule className="w-[25px]" />
                                </button>
                                <div className="w-[35px] h-[30px] bg-[#e4e5e5] text-[#424D56] flex justify-center items-center text-[20px] rounded-[4px] font-normal">
                                    {LiteD}
                                </div>
                                <button
                                    onClick={() => DeviceSetP(LiteD, SetLiteD)}
                                    className="bg-[#31BF5C] w-[25px] h-[25px] rounded-full text-white text-[17px] flex justify-center items-center font-[700px]"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="font-bold text-[14px] text-[#424D56]">
                                DEVICES
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div className="flex gap-3 justify-center items-center">
                                <button
                                    onClick={() => YearSetM(LiteY, SetLiteY)}
                                    className="bg-[#9DA9B0] w-[25px] h-[25px] rounded-full text-white text-[30px] flex justify-center items-center font-[700px]"
                                >
                                    <MdOutlineHorizontalRule className="w-[25px]" />
                                </button>
                                <div className="w-[35px] h-[30px] bg-[#e4e5e5] text-[#424D56] flex justify-center items-center text-[20px] rounded-[4px] font-normal">
                                    {LiteY}
                                </div>
                                <button
                                    onClick={() => YearSetP(LiteY, SetLiteY)}
                                    className="bg-[#31BF5C] w-[25px] h-[25px] rounded-full text-white text-[17px] flex justify-center items-center font-[700px]"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="font-bold text-[14px] text-[#424D56]">YEAR</div>
                        </div>
                    </div>
                    <div className="w-ful  flex justify-center items-center mt-[30px]">
                        <button
                            className="w-[280px] h-[55px] bg-[#31BF5C] rounded-sm text-white"
                            onClick={() => handleBuyC()}
                        >
                            BUY NOW
                        </button>
                    </div>

                    <div className="text-[12px] flex flex-col ml-[20px] mt-[30px] gap-[5px] font-[200px]">
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Real Time
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Ransomware
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> USB
                            Protection
                        </p>
                        <p className="text-[#071D2B] text-[14px] font-normal flex items-center gap-2">
                            <FaCheck className="w-[12px] h-[12px] text-[#31BF5C]" /> Temp Files
                            Cleaner
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Website Blocker
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Webcam Protection
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Advertise Blocker (Phishing
                            and Malicious
                        </p>
                        <p className="ml-[20px] text-[#9DA9B0] text-[14px] font-normal">
                            Website Protection)
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Privacy Cleaner
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Wifi Scanner
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Data Encryption
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Data Recovery
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Backup Manager
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Game Booster
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Registry Cleaner
                        </p>
                        <p className="text-[#9DA9B0] text-[14px] font-normal flex items-center gap-3">
                            <ImCross className="w-[8px] h-[8px]" /> Registry Optimizer
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full flex mt-10 flex-col items-center gap-8 mb-20">
                <div className="md: w-[300px] lg:w-full flex justify-start max-w-[1150px]">
                    <img src={head} alt="" className="h-[60px] w-auto " />
                </div>
                <div className="text-[#374151] text-[14px] font-normal w-full max-w-[1150px] text-center sm:text-left">
                    Explore our FAQ section to discover detailed answers to the most
                    frequently asked questions.
                </div>

                <div className="w-full flex flex-col justify-center items-center text-[#374151] font-normal text-[16px]">
                    {Object.entries(faq).map(([key, { category, questions }]) => (
                        <div key={key} className="mb-4 w-full max-w-[1150px] px-4">
                            {/* Category */}
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full text-left border p-4 rounded-md flex justify-between hover:bg-gray-100"
                            >
                                {category}
                                <div className="text-[#374151]">
                                    {openCategory === category ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </div>
                            </button>

                            {/* Questions */}
                            {openCategory === category && (
                                <div className="mt-2 border rounded-md bg-gray-50">
                                    {questions.map((q, index) => (
                                        <div key={index} className="border-b last:border-b-0">
                                            <button
                                                onClick={() => toggleQuestion(index)}
                                                className="w-full text-left p-4 flex justify-between bg-white hover:bg-gray-100"
                                            >
                                                {q.question}
                                                <div className="text-[#374151]">
                                                    {openQuestion === index ? (
                                                        <FaChevronUp />
                                                    ) : (
                                                        <FaChevronDown />
                                                    )}
                                                </div>
                                            </button>

                                            {/* Answer */}
                                            {openQuestion === index && (
                                                <div
                                                    className="p-4 bg-gray-50 text-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: q.answer }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Price;
