import React, { useState } from "react";

import actipace from "./image/actipace.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { categories } from "../../services/Api";
import toast from "react-hot-toast";


const NewPassword = () => {
  const {token} = useParams();
 

  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleNewPassword = async (e) => {
    e.preventDefault(); 
    const id = toast.loading();// Prevent form submission refresh
    try{
      
      const payload = {
        token,               // Ensure this matches the backend's `req.body.token`
        password: newpassword, // Rename to match backend field
        confirmPassword: confirmpassword, // Rename to match backend field
    };

        const response = await axios.post(categories.RESETPASSWORD_API,payload)
        //console.log("res....",response)
        toast.success(response.data.message)
    }catch(e){
        //console.log(e)
        toast.error(e.response.data.message)
    }
    toast.remove(id);
    setNewPassword("");
    setConfirmPassword("");
   // navigate("/login"); // Navigate to the home page
  };
  return (
    <div className="flex -my-20 items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <img src={actipace} alt="" className="mx-24 my-4"></img>
        <h2 className="text-center text-md font-bold text-gray-700">
          New Password
        </h2>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="dealerCode"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="dealerCode"
              type="password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Your Email"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dealerCode"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="dealerCode"
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <button
            onClick={handleNewPassword}
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Reset
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default NewPassword;
