import React, { useState } from "react";
import eye from "./image/eye.png";
import actipace from "./image/actipace.png";
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// import icons from "./captcha/icons8-refresh-16.png"

import { useNavigate } from "react-router-dom";

import { categories } from "../../services/Api";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {

  const randomString  =  Math.random().toString(36).slice(8);
  const [captch,setCaptch] = useState(randomString);
  const [text,setText] = useState("");


  const refreshString = (e) =>{
    e.preventDefault();
    setText("");
    setCaptch(Math.random().toString(36).slice(8))
}
  const navigate = useNavigate();

  const [formData,setformData] = useState({email:"",otp:"",password:"",mobileNo:"",address:"",city:"",state:"",country:"",pincode:""})

  const [showPassword, setShowPassword] = useState(false);

  function changehandler(event) {
    setformData(prevFormData =>{
      return {
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  const [flag,setFlag] = useState(true);
  
  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSignup = (e) => {
    e.preventDefault(); // Prevent form submission refresh

    //captcha verification
    if(captch !== text)
    {
        alert("wrong captcha")
        setText("");
        setCaptch(Math.random().toString(36).slice(8))
        return;
    }
    //api call sending email
    const backendcalling = async () =>{
      const toastId = toast.loading("loading....")
      try{
          // console.log(categories.OTPSENDER_API);
          // console.log(formData)
         
          const result = await axios.post(categories.OTPSENDER_API,formData);
          //console.log(result.data)
          setFlag(false);
          toast.success(`${result.data.message}`,{id:toastId});
      }catch(e){
          toast.error(e.response.data.message,{id:toastId});
          return;
      }
    }
    backendcalling();
  };

  const handleSsignup=(e) =>{
    e.preventDefault();
    //console.log(formData);
    const backendcalling = async () =>{
      const toastId = toast.loading("loading....")
      try{
          // console.log(categories.OTPSENDER_API);
          // console.log(formData)
         
          const result = await axios.post(categories.SIGNUP_API,formData);
          //console.log(result.data)
          navigate("/login")
          toast.success(`${result.data.message}`,{id:toastId});
      }catch(e){
          toast.error(e.response.data.message,{id:toastId});
          return;
      }
    }
    backendcalling();
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      {flag ?( <>
        <div className="w-96 h-7/8 p-8 bg-white rounded-lg shadow-md my-[50px]">
        <img src={actipace} alt="" className="mx-24 "></img>
        <form className="w-full" onSubmit={handleSignup}>
          <div className="bg-[#D1ECF1] h-18 my-5 py-5 rounded-xl">
            <h2 className="text-center text-xs font-semibold text-gray-700 mb-4">
              Access and man age your instances from <br /> this actipace
              account.
            </h2>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={changehandler}
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile No.
            </label>
            <input
              id="mobile"
              type="text"
              name="mobileNo"
              required
              value={formData.mobileNo}
              onChange={changehandler}
              placeholder="Mobile No"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>

          {/* Password */}
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="flex justify-center mb-3 items-center">
            <div className="w-full">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={changehandler}
              placeholder="Password"
              className="w-full px-4 py-2  text-sm border rounded-l-md focus:ring focus:ring-green-200 focus:outline-none border-r-0"
            />
            </div>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className=" cursor-auto inset-y-0 right-2 text-sm text-green-600 "
            >
              <img src={eye} alt="" className="w-9 h-9 my-2"></img>
            </button>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={changehandler}
              placeholder="Address"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>

          {/* City and State */}
          <div className="mb-4 flex gap-2">
            <div className="w-1/2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                required
              value={formData.city}
              onChange={changehandler}
                placeholder="City"
                className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                name="state"
                required
              value={formData.state}
              onChange={changehandler}
                placeholder="State"
                className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Country and PIN Code */}
          <div className="mb-4 flex gap-2">
            <div className="w-1/2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                name="country"
                required
              value={formData.country}
              onChange={changehandler}
                placeholder="Country"
                className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="pinCode"
                className="block text-sm font-medium text-gray-700"
              >
                PIN Code
              </label>
              <input
                id="pinCode"
                type="number"
                name="pincode"
                required
              value={formData.pincode}
              onChange={changehandler}
                placeholder="PIN Code"
                className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Captcha */}
          <div className="mb-4 flex gap-3">
              <div className="bg-green-500 text-white px-5 py-2 rounded-md w-[100px]">{captch}</div>
              <Button
                      startIcon={<RefreshIcon />}
                      onClick={(e)=>refreshString(e)}
                      variant="contained"
                      color="green"
                    >
                      {/* Refresh */}
                    </Button>
                  {/* <img src={icons}/> */}
             
          </div>

          {/* Enter Code */}
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Code
            </label>
            <input
              id="code"
              type="text"
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
              placeholder="Code"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          {/* <Captcha/> */}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Register
          </button>
        </form>

       
        <p className="mt-4 text-center text-sm text-gray-500">
          Already a user?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login here
          </a>
        </p>
      </div>

     
       </>)
      :( <>
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <img src={actipace} alt="" className="mx-28 my-4"></img>
        <h2 className="text-center text-xs font-sm text-gray-700">
          Access and manage your instances from
          <br />
          this actipace account.
        </h2>
        <form className="mt-6" onSubmit={handleSsignup}>
          
          <div className="mb-6">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Otp
            </label>
            <input
              id="code"
              type="text"
              name="otp"
              required
              value={formData.otp}
              onChange={changehandler}
              placeholder="otp"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Login
          </button>
        </form>
        
      </div>
      </>)}
      
    </div>
  );
};

export default Signup;
