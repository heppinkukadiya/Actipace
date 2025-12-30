import React from "react";
import bg1 from "./image/cleanup_bg.jpg.svg";
import Heading1 from "./image/IMG_3342.PNG";
import HomeEmg from "./image/Home.svg";
import Clip from "./image/Clip.png";
import image1 from "./image/Image.svg";
import image2 from "./image/Image2.svg";
import Frame840 from "./image/Frame 840.svg";
import Background from "./image/Background.png";
import Background1 from "./image/Background(1).png";
import actipace_a from "./image/actipace-a.png";
import heading2 from "./image/Group 77.png";
import frame1 from "./image/video_homepage.webm.png"
import { Link, useNavigate } from "react-router-dom";
import { IoGridSharp } from "react-icons/io5";
import WhyChooseUs from "./slider/WhyChooseUs"

function Section1() {
    const navigate = useNavigate();

    // NOTE: For Kalam font to work, it must be imported globally (e.g., in index.html).
    const kalamStyle = { fontFamily: 'Kalam, cursive', color: '#000000' };

    return (
        <div className="w-full lg:h-full relative">
            <div className="hidden lg:w-full lg:absolute  lg:h-[350px] lg:flex lg:justify-end">
                <img src={actipace_a} alt="a" className="absolute w-[280px] h-[350px]" />
            </div>
            {/* FIX: Removed lg:h-[430px] to allow content to expand without overflow. */}
            <div className="mt-[56px] flex lg:justify-center lg:items-center lg:mt-0">
                {/* Free antivirus is your ... heading*/}
                <div className="space-y-10 flex justify-between flex-col items-center">

                    {/* --- TEXT ABOVE IMAGE (Unveiling... | Kalam Bold | Adjusted Size) --- */}
                    <p
                        className="text-center font-kalam lg:mt-4  font-bold text-2xl lg:text-4xl"
                    >
                        Unveiling
                        <br />
                        a world-first innovation in Ransomware Protection
                    </p>

                    {/* --- IMAGE --- */}
                    <img
                        src={Heading1}
                        alt="head"
                        className="max-w-full h-auto object-contain lg:w-[600px] px-10 lg:h-13 lg:mx-20"
                    />

                    {/* --- TEXT BELOW IMAGE (Set 1 | Setting a New Benchmark... | Kalam Regular | 24px) --- */}
                    <p
                        className="text-center font-normal text-[24px] mt-4"
                        style={kalamStyle}
                    >
                        Setting a New Benchmark for the
                        <br />
                        Future of Cybersecurity
                    </p>

                    {/* --- TEXT BELOW IMAGE (Set 2 | Unalterable... | Kalam Bold | 27px) --- */}
                    <p
                        className="text-center font-black text-[27px] mt-2"
                        style={kalamStyle}
                    >
                        Unalterable. Undeletable. Unencryptable
                    </p>

                    <div className="flex flex-col items-center font-[400px] text-[10px] lg:text-[14px] lg:flex-col lg:items-center">
                        We believe everyone has the right to be safe online, which is why we
                        offer our
                        <p>
                            award-winning <u> free antivirus </u> to millions of people around the
                            world.
                        </p>
                    </div>
                    <div>
                        <Link to={"/download"}>
                            <button className=" bg-[#FA7223] text-white font-Roboto lg:mb-4 rounded-[400px] w-[200px] h-[50px] flex justify-center items-center gap-3 text-[14px] hover:scale-95 transition-all duration-200">
                                <IoGridSharp className="w-[25px] h-[25px]"/>
                                Free Download
                            </button>
                        </Link>
                    </div>
                </div>

            </div>

            <div className="relative  z-10">
                <div className="flex items-center justify-center my-12 lg:top-14 relative">
                    <div className="flex items-center justify-center  h-50vh absolute -top-11">
                        <div className="w-[70px] mb-[330px] ml-[160px] flex justify-center lg:w-full lg:h-50vh lg:mb-[580px] lg:mr-[190px] lg:ml-0 absolute pointer-events-none">
                            {/* green errows over center image */}
                            {/* harsh */}
                            <img src={Clip} alt="C" className="mr-[430px] z-[-1]"></img>
                        </div>
                        {/* black window over green image */}
                        <div className="flex items-center justify-center h-50vh absolute  left-50 mb-[130px]">
                            <img src={HomeEmg} alt="home" className="w-[250px]  lg:w-[680px] lg:h-[420px] rounded-xl "></img>
                        </div>
                        {/* green image */}
                        <img src={bg1} alt="bg1" className="p-3 w-[1000px] h-[430px] rounded-xl lg:p-0"></img>
                    </div>
                    {/* harsh */}
                    {/* actipace total security image */}
                    <div className="flex items-center  justify-center h-10 bottom-0 absolute ">
                        <div className="flex items-center mb-[100px]  justify-center lg:mb-[600px] absolute">
                            <WhyChooseUs className="h-[300px] w-[300px]  lg:h-[600px] lg:w-[1000px]" t1={"Actipace"} t2={"Total Security"}/>

                        </div>

                        <img src={image2} alt="i2" className="mt-[140px] h-[200px] lg:h-[450px]  lg:mb-[100px] lg:mt-0" />
                    </div>
                    {/* its to easy to install big bg image*/}
                    <img src={image1} alt="i1" className="mt-[130px] h-[500px] lg:h-[1280px] lg:mt-[100px] object-cover" />
                </div>
            </div>
            <div className="w-full h-[320px] lg:h-[510px] relative z-8 mt-[-105px] lg:mt-[-50px] " >
                <img src={Frame840} alt="840" className="absolute h-[550px]  lg:w-full lg:object-cover" />
                <div className="absolute z-10 mt-[250px] flex justify-center items-center w-full lg:mt-[441px]">
                    <button onClick={()=>navigate("/download")} className="text-[11px] absolute w-[120px]  h-[35px] text-[#FA7223] bg-white font-Roboto rounded-[400px] lg:w-[220px] lg:h-[55px] flex justify-center font-semibold items-center gap-3 lg:text-[14px]">
                        <IoGridSharp className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]"/>
                        Free Download
                    </button>
                </div>
            </div>
            <div className="relative lg:h-[650px]">

                <div className="flex absolute ml-[20px] lg:ml-[250px]">

                    <img src={Background} alt="B" className="lg:w-[800px] lg:h-[550px]" />

                    <div>
                        {/* light green pillar  */}
                        <img src={Background1} alt="B" className="lg:w-[550px] lg:h-[550px]" />
                    </div>
                </div>

                <div className="absolute flex items-center flex-col gap-4 justify-center w-full mt-[35px] lg:mt-[65px] lg:gap-7">
                    {/* level up your quality work */}

                    <img src={heading2} alt="C" className="w-[300px] lg:h-[70px] lg:w-[800px]" />
                    <img src={frame1} alt="" className="w-[300px] lg:h-[450px] lg:w-[800px] rounded-[10px]  object-cover"/>

                </div>

                {/* </div> */}
            </div>
        </div>
    );
}

export default Section1;
