import React from "react";

const Card = ({ item }) => {
    return (
        <div className="h-[300px] flex flex-col  bg-white  rounded-[30px]  lg:w-[305px] lg:h-[450px] text-[#071D2B] gap-3 font-roboto">

            <h2 className="text-[20px] lg:text-[30px] font-semibold pt-5 pl-5">{item.title}</h2>
            <p className="font-normal text-[11px] lg:text-[14px] w-[280px] pl-5">{item.description}</p>
            <div className={`w-full h-full  flex justify-end relative`}>
            <div className={`${item.style} lg:w-[350px] lg:h-[300px] absolute mt-[15px] mr-[-50px]`}></div>
            <img
                src={item.image || "path-to-placeholder-image.png"}
                alt={item.title}
                className={item.id !== 3?`w-[150px] h-[150px] mt-[5px] lg:w-[200px] lg:h-[200px] lg:mt-[77px] rounded-br-[30px] `:`w-[110px] mt-[28px] h-[150px] lg:w-[110px] lg:h-[200px] lg:mt-[77px] rounded-br-[30px]`}
            />
            </div>
        </div>
    );
};

export default Card;