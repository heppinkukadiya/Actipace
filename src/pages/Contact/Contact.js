import React  from "react";
import Contact2 from "./Contact2";
import Form1 from "./Form1";
import acti from "../home/image/actipace-a.png"

const Contact = () => {
  return (
      <div className="relative">
          <div className="hidden lg:flex w-full absolute h-[350px] justify-end">
              <img src={acti} alt="a" className="absolute w-[240px] h-[320px]"/>
          </div>
          <div
              className="w-full h-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20 my-3 relative px-4 md:px-8">
              <div className="">
                  <Contact2/>
              </div>
              <div className="">
                  <Form1/>
              </div>
          </div>

          <div className="relative">
              <iframe
                  title="Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.1743527975636!2d72.8502445!3d21.1852317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e4ca3119ad9%3A0x37d1f15a771e41b0!2sHi-Tech%20Textile%20Centre%20(HTC%20Market)!5e0!3m2!1sen!2sin!4v1735810691257!5m2!1sen!2sin"
                  className="w-full h-[400px] md:h-[450px]"
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

      </div>
  );
};

export default Contact;