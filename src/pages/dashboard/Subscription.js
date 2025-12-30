import React from 'react'
import a from "./Frame 904.svg"

const Subscription = ({expiresAt,name,devices}) => {

    let formattedDate = "No expiration date"; // Default fallback

    if (expiresAt) {
        const date = new Date(expiresAt);
        if (!isNaN(date)) {
            const options = { day: "2-digit", month: "long", year: "numeric" };
            formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
        } else {
            formattedDate = "Invalid date"; // Handle malformed dates
        }
    }


  return (
    <div>
      <div className="bg-white rounded-lg h-[170px] px-10 flex flex-col pt-6 mt-4 gap-3 ">
                              <div className="bg-gray-200 w-[170px] p-[5px] text-center rounded-xl">
                                  <p className="text-xs">Expiry: {formattedDate}</p>
                              </div>
                              <h1 className="text-xl font-bold">Actipace {name}</h1>
      
                              {/* <p className="text-xs text-[#5E5E5E] my-2">Licence Key : 1248594086809548</p> */}
      
                              <div className="flex">
                                  <img src={a} alt="a"/>
                                  <div className="mx-2">
                                      <h1 className="text-xl">Actipace</h1>
                                      <p className="text-[#5E5E5E] text-xs">{devices} devices</p>
                                  </div>
                              </div>
                          </div>
    </div>
  )
}

export default Subscription
