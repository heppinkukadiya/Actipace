import React, { useState } from "react";
import actipace from "./image/actipace.png";

import toast from "react-hot-toast";
import axios from "axios";
import { categories } from "../../services/Api";

const ResetPassword = () => {

  const [email, setEmail] = useState("");

  const handleNewPassword =async (e) => {
    e.preventDefault();
    const id =toast.loading("loading.....");
    try{
        const payload ={email}
        const response = await axios.post(categories.RESETPASSWORDTOKEN_API,payload)
        toast.success(response.data.message,{autoClose: 5000});
        setEmail("");
        //console.log(response)
    }catch(e){
       toast.error(e.response.data.message)
    }
    toast.remove(id);
  };
  return (
    <div className="flex -my-20 items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <img src={actipace} alt="" className="mx-24 my-4"></img>
        <h2 className="text-center text-md font-bold text-gray-700">
          Forgot Password
        </h2>
        <h2 className="text-center my-3 text-xs font-xs text-gray-300">
          Enter your registered email id to get a link to
          <br />
          reset your password.
        </h2>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="dealerCode"
              className="block text-sm font-medium text-gray-700"
            >
              Your email id
            </label>
            <input
              id="dealerCode"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>

          <button
            onClick={handleNewPassword}
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Get Reset Link
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default ResetPassword;
