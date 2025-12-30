import React from "react";


const Card = ({ item }) => {

    return (

        <div className="flex flex-col  bg-white  rounded-[30px]  w-[305px] h-[450px] text-[#071D2B] gap-3 font-roboto ">

            <h2 className="text-[30px] font-semibold pt-5 pl-5">{item.title}</h2>
            <p className="font-normal text-[14px] w-[280px] pl-5">{item.description}</p>
            <div className={`w-full h-full  flex justify-end relative`}>
                <div className={`${item.style} w-[350px] h-[300px] absolute mt-[15px] mr-[-50px]`}></div>
                <img
                    src={item.image || "path-to-placeholder-image.png"}
                    alt={item.title}
                    className={item.id !== 3?`w-[200px] h-[200px] mt-[77px] rounded-br-[30px] `:`w-[110px] h-[200px] mt-[77px] rounded-br-[30px]`}
                />
            </div>

        </div>

    );
};

export default Card;