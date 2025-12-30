import React from "react";
import Frame from "./image/Frame 840.svg";
import certi from "./image/AntiMalware_square_gold.png"

function Award() {
    return (
        <div>
            <div className="h-[90vh]">


                <section
                    className="relative h-1/2 bg-cover bg-center flex items-center justify-center text-center"
                    style={{
                        backgroundImage: `url('${Frame}')`,
                    }}
                >
                    <div className="bg-[#071D2B] bg-opacity-20 w-full h-full absolute top-0 left-0"></div>
                    <div className="relative z-10 text-white px-4 sm:px-6 md:px-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5">
                            Awards & Recognition
                        </h1>
                        <p className="font-normal text-xs sm:text-sm md:text-base lg:text-lg max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4">
                            We know the importance of what we protect. That’s why we welcome outside
                            evaluations of all our products – so you don’t just have to take our word for it.
                        </p>
                    </div>
                </section>


                <section
                    className="pt-24  md:py-20 lg:py-24 bg-white text-center flex flex-col items-center justify-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                        Top PC security awards
                    </h2>
                    <p className="font-normal text-xs sm:text-sm md:text-base lg:text-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-4 md:mx-auto">
                        Our flagship security software keeps getting faster and easier to use, while
                        still giving best-in-class protection that won’t slow you down.
                    </p>
                </section>

            </div>
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ">Certification</h1>
            <div className="flex justify-center my-14">
                <img className="lg:h-1/3 lg:w-1/3 " src={certi}/>
            </div>
        </div>
    );
}

export default Award;
                