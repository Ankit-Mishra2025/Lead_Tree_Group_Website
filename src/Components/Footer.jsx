import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";

import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-[#0E1828]">
        <div className="w-full  min-h-[250px] flex p-10  ">
          <div className="flex flex-col w-md">
            <h2 className="font-semibold text-[15px] md:text-[17px] text-white">
              Lead <span className="text-green-700 font-semibold">Tree</span>{" "}
              Group
            </h2>

            <p className="text-white text-[12px] mt-3 font-semibold w-70">
              Connecting you with the best loan options from trusted local
              vendors
            </p>

            <div className="flex flex-col mt-8">
              <h2 className="text-[16px] text-white font-medium">Follow us</h2>

              <ul className="mt-2 text-[13px] text-slate-200 flex flex-row gap-2">
                <li className="h-8 w-8 rounded-md shadow-2xl  bg-[#152641]  flex items-center justify-center hover:bg-red-700 transition-all duration-300 hover:-translate-y-1 ">
                  <a href="#">
                   <FaYoutube size={20} />
                    
                  </a>
                </li>

                <li className="h-8 w-8 rounded-md shadow-2xl  bg-[#152641]  flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 ">
                  <a href="#">
                   <FaFacebookF size={20} />
                  
                  </a>
                </li>

                <li className="h-8 w-8 rounded-md shadow-2xl  bg-[#152641]  flex items-center justify-center  hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 transition-all duration-300 hover:-translate-y-1 ">
                  <a href="#">
                   
                   
                    <FaInstagram size={20}  />
                  </a>
                </li>

                <li className="h-8 w-8 rounded-md shadow-2xl  bg-[#152641]  flex items-center justify-center hover:bg-black transition-all duration-300 hover:-translate-y-1 ">
                  <a href="#">
                 
                  <FaXTwitter size={20} />
                  </a>
                </li>

                <li className="h-8 w-8 rounded-md shadow-2xl  bg-[#152641]  flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:-translate-y-1 ">
                  <a href="#">
                 
                   <FaLinkedinIn  size={20}/>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-3  gap-10 px-5 w-[70%]">
            <div className="flex flex-col">
              <h2 className="text-[16px] md:text-[17px] text-white font-semibold">
                Company
              </h2>

              <ul className=" mt-2 text-[13px] md:text-[15px] text-gray-200 flex flex-col gap-2">
                <li
                  className=" cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-1"
                >
                  <a href="#">About</a>
                </li>

                <li
                  className=" cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-1"
                >
                  <a href="#">Mission</a>
                </li>
                <li
                  className=" cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-1"
                >
                  <a href="#">Our Team</a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h2 className="text-[16px] md:text-[17px] text-white font-semibold">
                Services
              </h2>

              <ul className="mt-2 text-[13px] md:text-[15px] text-gray-200 flex flex-col gap-2">
                <li
                  className="cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-1"
                >
                  <a href="#">Privacy</a>
                </li>
                <li
                  className=" cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-1"
                >
                  <a href="#">Terms & Conditions</a>
                </li>

                <li
                  className=" cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-1"
                >

                  <a href="#">Disclaimer</a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h2 className="text-[16px] md:text-[17px] text-white font-semibold">
                Contact us
              </h2>

              <ul className="mt-2 text-[13px] md:text-[15px] text-gray-200 flex flex-col gap-2">
                <li
                  className=" cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-1"
                >
                  <a href="#">We@leadtree.com</a>
                </li>
                <li
                  className=" cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-1"
                >
                  <a href="#">012-345-6789</a>
                </li>
                    
             
                <li
                  className=" cursor-pointer hover:translate-x-2 hover:text-green-400 hover:font-bold 
          transition-all duration-400 hover:underline underline-offset-2"
                >
                  <a href="#">Betul | Gurugram</a>
                </li>
              
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
