import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import AutoBuyForm from "../AutoBuyForm/AutoBuyForm";
import AutoSell from "../AutoSellForm/AutoSell";



const VehicleSelection = () => {
  const [CarToggle, SetCarToggle] = useState(true);

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* 🔹 Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-green-200  w-full text-center py-4  rounded-md font-semibold text-xl shadow-2xs">
        Car Marketplace
      </div>

      {/* 🔹 Button Section */}
      <div className="bg-gray-200 rounded-md relative top-10  shadow-md">
        <div className="flex items-center justify-center bg-gray-100 w-80 m-auto gap-1 p-3 rounded-md shadow-sm">
          {/* 👇 Buy Car Button */}
          <button
            onClick={() => SetCarToggle(true)}
            className={`text-[20px] w-30 px-3 py-2 rounded-md font-semibold cursor-pointer transition-all duration-300 
              ${
                CarToggle
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
          >
            Buy 
          </button>

          {/* 👇 Sell Car Button */}
          <button
            onClick={() => SetCarToggle(false)}
            className={`text-[20px] w-30 px-3 py-2 rounded-md font-semibold cursor-pointer transition-all duration-300 
              ${
                !CarToggle
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
          >
            Sell
          </button>

 


        </div>
      </div>

      {/* 🔹 Animated Form Section */}
      <div className="relative w-full flex justify-center mt-10 overflow-hidden">
        <AnimatePresence >
          {CarToggle ? (
            <motion.div
              // key="buy"
              // initial={{ x: -200, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              // exit={{ x: 200, opacity: 0 }}
              // transition={{ duration: 0.2, ease: "easeInOut" }}
              // className="w-full flex justify-center"
            >
            
           <AutoBuyForm/>
            </motion.div>
          ) : (
            <motion.div
              key="sell"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full flex justify-center"
            >
           <AutoSell/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VehicleSelection;
