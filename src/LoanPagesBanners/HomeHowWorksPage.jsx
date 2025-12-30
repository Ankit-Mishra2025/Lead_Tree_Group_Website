import {
  ArrowLeftRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  HandHeart,
  Handshake,
  MoveRight,
} from "lucide-react";
import React, { useState } from "react";
import { SilderData } from "../SliderData/SliderData.jsx";
import { motion } from "framer-motion";
import ArrowImage from "../../src/assets/ArrowImage.png";

const HomeHowWorksPage = () => {
  return (
    <div className="flex w-full p-5 min-h-[400px] flex-col mt-5">
      <h2 className="text-[35px] text-center font-semibold">
        How <span className="text-green-600">Lead Tree</span> Works ?
      </h2>

      <h3 className="text-center text-[#8D929A] text-[13px] md:text-[14px]">
        Geeting matched with the right lender is simple and takes just minutes
      </h3>
    
      <div className="relative flex w-full items-center justify-between top-10 px-40">
        {/* ICON 1 */}
        <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-[#cdfbe2] z-10">
          <HandHeart className="h-7 w-7 text-[#46ab75]" />
        </div>

        {/* CONNECTOR */}
        <div className="flex-1 relative h-0.5 bg-[#D2D2D2]">
          <MoveRight
            className="absolute left-58 -top-[7px] text-[#D2D2D2]"
            size={16}
          />
        </div>

        {/* ICON 2 */}
        <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-[#cdfbe2] z-10">
          <FileText className="h-7 w-7 text-[#46ab75]" />
        </div>

        {/* CONNECTOR */}
        <div className="flex-1 relative h-0.5 bg-[#D2D2D2]">
          <MoveRight
            className="absolute left-58 -top-[7px] text-[#D2D2D2]"
            size={16}
          />
        </div>

        {/* ICON 3 */}
        <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-[#cdfbe2] z-10">
          <Handshake className="h-7 w-7 text-[#46ab75]" />
        </div>

        {/* CONNECTOR */}
        <div className="flex-1 relative h-0.5 bg-[#D2D2D2]">
          <MoveRight
            className="absolute left-58 -top-[7px] text-[#D2D2D2]"
            size={16}
          />
        </div>

        {/* ICON 4 */}
        <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-[#cdfbe2] z-10">
          <ArrowLeftRight className="h-7 w-7 text-[#46ab75]" />
        </div>
      </div>

      <div className="flex w-full items-center gap-10 justify-center relative top-15">
        <div className="h-40 w-[250px] bg-white shadow-sm  rounded-md cursor-pointer border border-gray-300 hover:border-green-600 transition-all duration-400 hover:-translate-y-1 flex flex-col items-center justify-center p-2 ">
          <h2 className="font-bold text-gray-800">Select Loan Type</h2>
          <p className="text-[#9CA5AC] text-[13px] text-center">
            Choose the loan fits your need from our comprehensive list of
            options
          </p>
        </div>

        <div className="h-40 w-[250px] bg-white shadow-sm  rounded-md cursor-pointer border border-gray-300 hover:border-green-600 transition-all duration-400 hover:-translate-y-1 flex flex-col items-center justify-center p-2 ">
          <h2 className="font-bold text-gray-800">Fill Form</h2>
          <p className="text-[#9CA5AC] text-[13px] text-center">
            Complete a simple form with your minimum details
          </p>
        </div>

        <div className="h-40 w-[250px] bg-white shadow-sm  rounded-md cursor-pointer border border-gray-300 hover:border-green-600 transition-all duration-400 hover:-translate-y-1 flex flex-col items-center justify-center p-2 ">
          <h2 className="font-bold text-gray-800">
            Connect with Local Vendors
          </h2>
          <p className="text-[#9CA5AC] text-[13px] text-center">
            Our System connects you with verified, trusted lenders in your area
            who compete for your busines
          </p>
        </div>

        <div className="h-40 w-[250px] bg-white shadow-sm  rounded-md cursor-pointer border border-gray-300 hover:border-green-600 transition-all duration-400 hover:-translate-y-1 flex flex-col items-center justify-center p-2 ">
          <h2 className="font-bold text-gray-800">Compare & Choose</h2>
          <p className="text-[#9CA5AC] text-[13px] text-center">
            Review personalised options, compare rate and terms, and select the
            best option for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeHowWorksPage;
