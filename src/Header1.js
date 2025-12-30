import React from "react";
import { Link } from "react-router-dom";

function Header1() {
  return (
    <div className="h-67.94px w-1920px  bg-[#2B2A29] font-Roboto text-white text-sm flex justify-center gap-5">
      <div className="my-2">Offers protection against viruses</div>
      <Link to="/download"><div className=" my-2 underline">Download Now</div></Link>
    </div>
  );
}

export default Header1;
