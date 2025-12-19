import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { SilderData } from "../SliderData/SliderData.jsx";
import { motion } from "framer-motion";

const HomePageChhoseReason = () => {
  const [index, setIndex] = useState(0);

  const itemsPerPage = 4; // ek baar me kitne card dikhane hai


  const nextPage = () => {
    if (index + itemsPerPage < SilderData.length) {
      setIndex(index + 1); // ek-ek slide move hoga
    }
  };



  const prevPage = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };



  return (
    <div className="flex w-full p-5 min-h-[400px] flex-col mt-5">
      <h2 className="text-[35px] text-center font-semibold">
        Why Should you choose <span>Lead tree</span>?
      </h2>

      <div className="flex items-center w-full gap-3 mt-10 overflow-hidden">
        {/* LEFT BUTTON */}
        <button
          onClick={prevPage}
          disabled={index === 0}
          className="cursor-pointer p-2 rounded-full bg-green-500 text-white disabled:bg-gray-300"
        >
          <ChevronLeft size={"25px"} />
        </button>




        {/* SLIDER */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-8"
            animate={{ x: -(index * 270) }} // ← MAGIC HERE
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {SilderData.map((item, idx) => (
              <div
                key={idx}
                className="min-w-[250px] h-[260px] border border-green-300 shadow-md rounded-xl bg-white flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 transition"
              >
                <div className="p-5 bg-emerald-50 rounded-full">
                  <span className="text-emerald-600 text-[30px]">
                    {item.icon}
                  </span>
                </div>

                <p className="text-[20px] font-semibold text-center px-3">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextPage}
          disabled={index + itemsPerPage >= SilderData.length}
          className="cursor-pointer p-2 rounded-full bg-green-500 text-white disabled:bg-gray-300"
        >
          <ChevronRight size={"25px"} />
        </button>
      </div>
    </div>
  );
};

export default HomePageChhoseReason;
