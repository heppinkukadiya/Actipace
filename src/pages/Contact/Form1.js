import React, { useState } from "react";
import toast from "react-hot-toast";

import axios from "axios";
import { categories } from "../../services/Api";

function Form1() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [comment, setComment] = useState("");

  const handleContact = (e) => {
    e.preventDefault();
    const data = {
      name,email,number,comment
    }

    const backendcalling = async () =>{
      const toastId = toast.loading("loading....")
      try{
          const result = await axios.post(categories.CONTACT,data);
          toast.success(result.data.message,{id:toastId});

          setEmail("");
          setComment("");
          setName("");
          setNumber("");
      }catch(e){
          toast.error(e.response.data.message,{id:toastId});
          return;
      }
    }

    backendcalling();

     // Prevent form submission refresh
    // Here you can validate inputs before navigation
    // navigate("/newpassword"); // Navigate to the home page
  };
  return (
    <div className="z-12">
      <div className="flex lg:items-center h-[700px] lg:h-[600px]">
        <div className=""></div>
        <div className="h-[546px] w-[400px] lg:w-[576px] p-10  rounded-lg lg:mt-8 lg:mr-10">
          <form onSubmit={handleContact}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4 flex flex-col gap-2">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <input
                    id="name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                    className="w-full px-4 py-2 mt-2 bg-[#F3F4F6] text-sm focus:ring focus:ring-green-200 focus:outline-none border-[0px] rounded-[4px] h-[50px]"
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <label
                    htmlFor="dealerCode"
                    className="block text-sm font-medium text-gray-700"
                >
                  Email*
                </label>
                <input
                    id="dealerCode"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-4 py-2 mt-2 bg-[#F3F4F6] text-sm focus:ring focus:ring-green-200 focus:outline-none border-[0px] rounded-[4px] h-[50px]"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col gap-2">
              <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700"
              >
                Phone*
              </label>
              <input
                  id="number"
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="number"
                  className="w-full px-4 py-2 mt-2 bg-[#F3F4F6] text-sm  focus:ring focus:ring-green-200 focus:outline-none border-[0px] rounded-[4px] h-[50px]"
              />
            </div>
            <div className="mb-4 flex flex-col gap-4 h-full w-full">
              <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
              >
                Comment*
              </label>
              <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder=""
                  className="resize-none w-full px-4 py-2 mt-2 h-[160px] bg-[#F3F4F6] text-sm focus:ring focus:ring-green-200 focus:outline-none border-[0px] rounded-[4px]"
              ></textarea>
            </div>
            <button
                className="px-4 py-2 text-white bg-green-500 rounded-[4px] hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 w-[170px] h-[50px]"
            >
              Submit Message
            </button>
          </form>
        </div>
        <div className="absolute bottom-14 right-4">
          <button className="w-10 h-10 flex items-center justify-center text-white"></button>
        </div>
      </div>
    </div>
  );
}

export default Form1;