import React, {useState} from "react";
import Frame840 from "./Frame840.png";
import acti from "../home/image/actipace-a.png";
import loc from "./image/Icon.svg";
import mail from "./image/icn_mail.svg.svg";
import call from "./image/icn_call.svg.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

import axios from "axios";
import {categories} from "../../services/Api";

function Support() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            firstName, lastName, email, number, message
        }

        const backendcalling = async () => {
            const toastId = toast.loading("loading....")
            try {
                const result = await axios.post(categories.SUPPORT, data);
                toast.success(result.data.message, {id: toastId});

                setFirstName("");
                setLastName("");
                setEmail("");
                setNumber("");
                setMessage("");
            } catch (e) {
                toast.error(e.response.data.message, {id: toastId});
                return;
            }
        }

        backendcalling();

    };


    return (
        <div className="w-full min-h-screen h-full">
            <div className="lg:h-[850px]">
                <div className="absolute mt-0">
                    <img  src={Frame840} alt="" className="h-[200px] lg:h-auto"/>
                </div>

                <div className=" w-full flex justify-center absolute lg:mt-[290px]">
                    <div className="flex flex-col-reverse lg:flex-row h-auto lg:h-[439px] z-10 shadow-md w-[1000px] items-center ">
                        <div className="lg:w-[700px]">
                            <div className="bg-white p-8 rounded-l-[4px]">
                                <h2 className="text-[24px] font-[600px] mb-4">HAPPY TO SERVE YOU</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-4 mt-14">
                                        <div className="relative z-0 w-full group">
                                            <input
                                                type="text"
                                                id="firstname"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#9DA9B0] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="firstname"
                                                className="peer-focus:font-medium absolute font-[500px] text-[#9DA9B0] text-[14px] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                First Name
                                            </label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                id="lastname"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#9DA9B0] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="lastname"
                                                className="peer-focus:font-medium absolute font-[500px] text-[#9DA9B0] text-[14px] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Last Name
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="relative z-0 w-full group">
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#9DA9B0] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label
                                                htmlFor="email"
                                                className="peer-focus:font-medium absolute font-[500px] text-[#9DA9B0] text-[14px] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Email
                                            </label>
                                        </div>
                                        <div className=" z-10 w-full group mt-1 border-0 border-b-2 border-[#9DA9B0] ">
                                            <PhoneInput
                                                country={"in"}
                                                value={number}
                                                onChange={(value) => setNumber(value)}
                                                inputStyle={{
                                                    width: "100%",
                                                    border: "none",
                                                    fontSize: "14px",
                                                    borderBottom: "white",
                                                    backgroundColor: "white"
                                                }}
                                                dropdownStyle={{position: "absolute"}}
                                                buttonStyle={{
                                                    backgroundColor: "white",
                                                    border: "none",
                                                }}
                                            />
                                        </div>

                                    </div>
                                    <div className="relative w-full group  z-0 mt-[40px]">
                                        <input
                                            type="text"
                                            id="text2"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#9DA9B0] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label
                                            htmlFor="text2"
                                            className="peer-focus:font-medium  absolute font-[500px] text-[#9DA9B0] text-[14px] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Applying for: Write us about whatever you want to say
                                        </label>
                                    </div>
                                    <div className="mt-8">
                                        <button
                                            type="submit"
                                            className="bg-[#31BF5C] text-white font-[500px] py-2 px-4 rounded-[4px] text-[12px] h-[40px] w-[140px]"
                                        >
                                            Submit Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className=" bg-[#071D2B] w-[350px] rounded-r-[4px] h-[400px]  lg:h-full mt-28 lg:mt-0">
                            <div className="text-[#FFFFFF] flex flex-col gap-6 mt-8 ml-7 ">
                                <div className="text-[24px] font-[600px] mb-3">Technical support</div>
                                <div className="flex gap-4">
                                    <img src={loc} alt="" className="h-[20px] w-[20px]"/>
                                    <p className="text-[14px] font-[500px]">G-103, HTC Market, Anjana Farm, Mithi Khadi Road, Surat, Gujarat, India</p>
                                </div>
                                <div className="flex gap-4 ml-1">
                                    <img src={call} alt="" className="h-[18px] w-[18px]"/>
                                    <p className="text-[14px] font-[500px]">+(91) 9081114931</p>
                                </div>
                                <div className="flex gap-4 ml-1">
                                    <img src={mail} alt="" className="h-[18px] w-[18px]"/>
                                    <p className="text-[14px] font-[500px]">info@actipace.com</p>
                                </div>
                            </div>
                            <img src={acti} alt="" className="absolute w-[180px] h-[220px]  lg:mt-[14px] ml-[170px] lg:ml-[150px]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support;