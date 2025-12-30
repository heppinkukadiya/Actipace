import React from "react";
import comp from "./Group 76.svg"

const Devices = ({expiresAt,licenseKey,computerName,expiry,plan}) => {
    let formattedDate = "No expiration date"; // Default fallback

    if (expiresAt) {
        const date = new Date(expiresAt);
        if (!isNaN(date)) { // Ensure valid date
            const options = { day: "2-digit", month: "long", year: "numeric" };
            formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
        } else {
            formattedDate = "Invalid date"; // Handle malformed dates
        }
    }
    else if (expiry) { // Ensure expiry exists
        const [day, month, year] = expiry.split("-"); // Extract day, month, year
        const date = new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD

        if (!isNaN(date)) { // Ensure valid date
            const options = { day: "2-digit", month: "long", year: "numeric" };
            formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
        } else {
            formattedDate = "Invalid date"; // Handle malformed dates
        }
    }
    else {
        formattedDate = "No expiration date"; // Default fallback
    }


    return (
    <div>
        <div className="bg-white rounded-xs h-[150px]  w-[350px]  flex justify-between ">
          <div className="h-full ml-4 flex flex-col justify-center">
            <div className="bg-gray-200 w-[150px]  text-center rounded-xl">
              <p className="text-xs">Expiry: {formattedDate}</p>
            </div>
            <div className="my-3">
              <h1 className="text-bold">{computerName}({plan})</h1>
            </div>
            <p className="text-xs text-[#5E5E5E]">Licence Key : {licenseKey}</p>
          </div>
          <div>
            <img className="h-full" src={comp} alt="comp" />
          </div>
      </div>
    </div>
  );
};

export default Devices;
