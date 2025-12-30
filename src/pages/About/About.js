import React from "react";
import img from "./image/Group 78.svg";
import ic1 from "./image/icon.svg";
import ic2 from "./image/icon-2.svg";
import ic3 from "./image/icon-3.svg";
import ic4 from "./image/icon-4.svg";
import ic5 from "./image/icon.svg.svg";
import ic6 from "./image/icon.svg-2.svg";
import ic7 from "./image/icon.svg-3.svg";
import a from "../home/image1/actipace-a.png"

const About = () => {
    return (
        <div className="bg-white relative">
            <div className="hidden lg:flex w-full absolute h-[350px] justify-end">
                <img src={a} alt="a" className="absolute w-[280px] h-[350px]"/>
            </div>
            {/* Hero Section */}
            <div className="text-center py-12 px-4 bg-white">
                <img
                    src={img}
                    alt="We protect digital freedom for everyone"
                    className="mx-auto mb-4"
                />
                <p className="text-[#071D2B] font-normal text-lg">
                    We believe that wherever you live, whatever you love, wherever you're going,<br/>
                    and whatever you do, you have the right to live freely and safely online.
                </p>
            </div>


            <div className="py-12 w-full">
                <div className="container mx-auto pt-10 w-full lg:w-[1000px] h-auto bg-[#ECFDF1]">
                    {/* First Row */}
                    <div className="flex flex-wrap justify-center pt-4 gap-4">
                        {/* Item 1 */}
                        <div
                            className="flex flex-col items-center text-center rounded-lg p-4 w-[45%] sm:w-[30%] md:w-[20%]">
                            <img src={ic1} alt="Customer Focus" className="h-[90px] mb-3"/>
                            <h3 className="font-semibold text-xs text-[#111827]">Customer Focus</h3>
                            <p className="font-normal text-xs mt-1 text-[#111827]">Prioritizing user needs and
                                support.</p>
                        </div>
                        {/* Item 2 */}
                        <div
                            className="flex flex-col items-center text-center rounded-lg p-4 w-[45%] sm:w-[30%] md:w-[20%]">
                            <img src={ic2} alt="Accountability" className="h-[90px] mb-3"/>
                            <h3 className="font-semibold text-xs text-black">Accountability</h3>
                            <p className="font-normal text-xs mt-1 text-[#111827]">Owning our solutions’
                                performance.</p>
                        </div>
                        {/* Item 3 */}
                        <div
                            className="flex flex-col items-center text-center rounded-lg p-4 w-[45%] sm:w-[30%] md:w-[20%]">
                            <img src={ic3} alt="Proactivity" className="h-[90px] mb-3"/>
                            <h3 className="font-semibold text-xs text-black">Proactivity</h3>
                            <p className="font-normal text-xs mt-1 text-[#111827]">Preventing threats before they
                                happen.</p>
                        </div>
                        {/* Item 4 */}
                        <div
                            className="flex flex-col items-center text-center rounded-lg p-4 w-[45%] sm:w-[30%] md:w-[20%]">
                            <img src={ic4} alt="Speed & Agility" className="h-[90px] mb-3"/>
                            <h3 className="font-semibold text-xs text-black">Speed & Agility</h3>
                            <p className="font-normal text-xs mt-1 text-[#111827]">Rapidly adapting to cyber security
                                challenges.</p>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {/* Item 5 */}
                        <div
                            className="flex flex-col items-center text-center rounded-lg p-4 w-[45%] sm:w-[30%] md:w-[20%]">
                            <img src={ic5} alt="Security & Privacy" className="h-[90px] mb-3"/>
                            <h3 className="font-semibold text-xs text-black">Security & Privacy</h3>
                            <p className="font-normal text-xs mt-1 text-[#111827]">Protecting data with <br/> utmost
                                care.</p>
                        </div>
                        {/* Item 6 */}
                        <div
                            className="flex flex-col items-center text-center rounded-lg p-4 w-[45%] sm:w-[30%] md:w-[20%]">
                            <img src={ic6} alt="Innovation" className="h-[90px] mb-3"/>
                            <h3 className="font-semibold text-xs text-black">Innovation</h3>
                            <p className="font-normal text-xs mt-1 text-[#111827]">Leading with
                                cutting-edge <br/> solutions.</p>
                        </div>
                        {/* Item 7 */}
                        <div
                            className="flex flex-col items-center text-center rounded-lg p-4 w-[45%] sm:w-[30%] md:w-[20%]">
                            <img src={ic7} alt="Integrity" className="h-[90px] mb-3"/>
                            <h3 className="font-semibold text-xs text-black">Integrity</h3>
                            <p className="font-normal text-xs mt-1 text-[#111827]">Building trust
                                through <br/> transparency.</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* About */}

            <div className="bg-[#31BF5C] text-white py-12 px-4">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full">
                    {/* Heading Section */}
                    <div className="w-full lg:w-1/3 flex justify-center lg:justify-center mb-6 lg:mb-0">
                        <h2 className="text-[24px] sm:text-[30px] font-normal text-center lg:text-center">About
                            Actipace</h2>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="text-[14px] sm:text-[15px] font-normal space-y-6 text-center lg:text-left">
                            <p>
                                At Actipace, we’ve been at the forefront of cyber security for over
                                a decade, specializing in cutting-edge antivirus solutions. With a
                                global presence and a loyal customer base, we take pride in
                                delivering robust and reliable protection to individuals and
                                businesses worldwide.
                            </p>
                            <p>
                                At the heart of Actipace is its advanced AI-driven engine, which
                                continuously scans and learns from emerging threats.
                            </p>
                            <p>
                                What truly sets us apart is our unwavering commitment to data
                                sovereignty and security.
                            </p>
                            <p>
                                "Acti" symbolizes action, and "Pace" reflects the speed we bring to defending against
                                evolving cyber threats.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Vision and Mission */}


            <div className="flex flex-col justify-center h-auto lg:h-[300px]  items-center py-12 px-4 w-full gap-[30px]">
                {/* Vision Section */}
                <div
                    className="flex flex-col md:flex-row items-center md:items-start justify-start gap-6 md:gap-12 lg:gap-24 w-full px-4">
                    <h3 className="text-[24px] sm:text-[30px] font-normal flex items-end justify-center text-center md:text-left text-[#161C26] w-full md:w-1/3 lg:pl-36">
                        Our Vision
                    </h3>
                    <p className="font-normal text-[14px] sm:text-[15px] text-center md:text-left text-[#161C26] w-full md:w-2/3 max-w-[650px] lg:ml-4">
                        Our vision is to be the global leader in cyber security by setting
                        up new standards for digital protection and not only defend
                        against current threats but also anticipate and mitigate future
                        risks, ensuring a secure and resilient digital landscape for
                        everyone.
                    </p>


                </div>

           
                <div
                    className="flex flex-col md:flex-row items-center md:items-start justify-start gap-6 md:gap-12 lg:gap-24 w-full px-4">
                    <h3 className="text-[24px] sm:text-[30px] font-normal flex items-end justify-center text-center md:text-left text-[#161C26] w-full md:w-1/3 lg:pl-28">
                        Mission
                    </h3>
                    <p className="font-normal text-[14px] sm:text-[15px] text-center md:text-left text-[#161C26] w-full md:w-2/3 max-w-[650px] lg:ml-4">
                        Our mission is to safeguard individuals and businesses from
                        evolving cyber threats by delivering cutting-edge, reliable, and
                        intelligent antivirus solutions.
                    </p>
                </div>
            </div>


        </div>
    );
};

export default About