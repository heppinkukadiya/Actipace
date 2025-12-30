import React from "react";
import Section from "./image/Section.png";
import SectionErrow from "./image/SectionErrow.png";
import Section2 from "./image/Section2.png";
import Section3 from "./image/Group 80.svg";
import secondaryarrow from "./image/secondary_arrow_sm_01.svg fill.svg";
import { Link } from "react-router-dom";
import features from "./Feature"
function Grid() {
  return (
    <>
      {/* <div className="grid grid-cols-1"> */}
      <div
              className="mt-[300px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-x-1 w-full max-w-[1000px] container mx-auto px-4 space-x-1 lg:mt-[30px]">
              {features.map((feature, index) => (
                  <div
                      key={index}
                      className="flex flex-col items-center justify-center bg-white text-black rounded-2xl p-6 border lg:h-64 lg:w-64"
                  >
                      <div className="lg:w-16 lg:h-16 flex items-center justify-center mb-4">
                          <img
                              src={feature.icon}
                              alt={feature.title}
                              className="w-full h-full object-contain"
                          />
                      </div>
                      <h3 className="text-[15px] font-semibold mb-2">{feature.title}</h3>
                      <p className="text-[12px] text-center">{feature.description}</p>
                  </div>
              ))}
          </div>
      <div className="w-2/3 container  px-4">
        <img src={SectionErrow} alt="" className="w-16 mt-2 lg:ml-[170px] lg:mt-0 lg:w-24"></img>
      </div>
      <div className="relative h-[330px] lg:h-[800px]">
        <div className="flex items-center justify-center flex-col">
          <img src={Section} alt="" className="h-[180px]  px-5 lg:px-0 lg:h-full lg:w-[1100px]"></img>
          <div className="absolute mr-[30px] mt-[270px] lg:mr-[250px] lg:mt-[700px]">
            <img src={Section2} alt="" className="h-[140px] lg:h-full "></img>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center w-full">
          <img src={Section3} alt="" className="w-[500px]"></img>
        </div>
        <div className="flex  flex-col items-center gap-4 mt-[30px] mb-[30px]">
          <div className="">
            <Link to="/download"><button className="bg-[#FA7223] text-[10px] p-2 lg:text-[14px] text-white font-Roboto lg:py-3 lg:px-3  rounded-md">
              Start now - It's free
            </button></Link>
          </div>
          <div >
            <img src={secondaryarrow} alt="" className=""></img>
          </div>
          <div className="flex justify-center flex-col items-center text-[11px]">
            <div className="font-Inter ">No credit card required</div>
            <div>Instant access</div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Grid;
