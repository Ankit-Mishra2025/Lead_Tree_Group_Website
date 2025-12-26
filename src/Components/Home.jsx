import React, { useState } from "react";
import {
  CreditCard,
  Home,
  Building,
  Shield,
  DollarSign,
  TrendingUp,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Car,
  House,
  HouseHeartIcon,
  CarFront,
  Search,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 👇 Import all your banner components
import PersonalLoanBanner from "../LoanPagesBanners/PersonalLoanBanner";
import HomeLoanBanner from "../LoanPagesBanners/HomeLoanBanner";
import HomePurchaseLoanBanner from "../LoanPagesBanners/HomePurchaseLoanBanner";
import BusinessLoanBanner from "../LoanPagesBanners/BusinessLoanBanner";
import AutoLoanBanner from "../LoanPagesBanners/AutoLoanBanner";
import DebtReliefBanner from "../LoanPagesBanners/DebtReliefBanner";
import VehicleBanner from "../LoanPagesBanners/VehicleBanner";
import CreditLoanBanner from "../LoanPagesBanners/CreditLoanBanner";
import AutoInsuranceBanner from "../LoanPagesBanners/AutoInsuranceBanner";

const HomeCarousel = () => {
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const itemsPerPage = 6;

  const allItems = [
    {
      name: "Personal Loans",
      icon: <DollarSign size={24} />,
      banner: <PersonalLoanBanner />,
    },
    {
      name: "Home Loans",
      icon: <House size={24} />,
      banner: <HomeLoanBanner />,
    },
    {
      name: "Home Purchase",
      icon: <HouseHeartIcon size={24} />,
      banner: <HomePurchaseLoanBanner />,
    },
    { name: "Insurance", icon: <Shield size={24} /> },
    {
      name: "Business Loan",
      icon: <Briefcase size={24} />,
      banner: <BusinessLoanBanner />,
    },
    {
      name: "Credit Card",
      icon: <TrendingUp size={24} />,
      banner: <CreditLoanBanner />,
    },
    { name: "Auto Loan", icon: <Car size={24} />, banner: <AutoLoanBanner /> },
    {
      name: "Debt Relief",
      icon: <DollarSign size={24} />,
      banner: <DebtReliefBanner />,
    },

    {
      name: "Vehicle Loan",
      icon: <Car size={24} />,
      banner: <VehicleBanner />,
    },

    {
      name: "Auto Insurance",
      icon: <CarFront size={24} />,
      banner: <AutoInsuranceBanner />,
    },
  ];

  const startIndex = page * itemsPerPage;
  const visibleItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (startIndex + itemsPerPage < allItems.length) {
      setDirection(1);
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setDirection(-1);
      setPage(page - 1);
    }
  };

  // ✅ Smooth but subtle animation
  const variants = {
    enter: {
      opacity: 0,
      scale: 0.98,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <>
      {/* ✅ Heading */}
      <div className="" >
<div className="text-center mt-4 py-5 flex items-center justify-center flex-col  ">
        <h2 className="font-primary text-[40px] text-gray-800 mt-5">
          When Banks Compete, <span className="text-[#188234]">You Win.</span>
        </h2>
        <h4 className="w-[500px] text-[#8D929A] mt-2 ">
          Compare personalised loan offers from multiple lenders in minutes.
          Find the best rates on home loans, car loans, personal loans, and
          more.
        </h4>
      </div>

     <div className="flex items-center w-full justify-center font-semibold gap-4">
  <button className="bg-[#188234] px-4 py-2 rounded-4xl text-[#FCFCFC] cursor-pointer">
    Compare Loan Options
  </button>
  <button className="bg-[#FCFCFC] px-4 py-2 rounded-4xl text-[#8D929A] cursor-pointer shadow-md">
    How it Works
  </button>
</div>


<div className="flex items-center w-full justify-center mt-8 ">
  <motion.div
    className="relative w-xl rounded-full p-0.5"
    animate={{
      backgroundPosition: ["0% 25%", "200% 50%"],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      background: `
        linear-gradient(
          300deg,
          #4ade80 25%,
           #4ade80 55%,
          #4ade80 45%,
          #16a34a 90%,
          green 30%
        )
      `,
      backgroundSize: "200% 300%",
    }}
  >
    <div className="relative rounded-full bg-white px-2">
      <Search
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
    <Send className="text-green-500 absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer" size={23}/>
      <input
        type="text"
        placeholder="Ask Anything..."
        className="w-full px-10 py-2 rounded-full bg-white focus:outline-none"
      />
        
    </div>
  </motion.div>

</div>




<div className=" w-full mt-15 flex items-center  justify-center  ">

<div className="bg-[#1882340F] flex items-cente justify-center ml-5  py-3 w-3xl border-1 border-[#188234] rounded-full gap-7 ">
<div className="flex flex-col items-center  justify-center">
  <h2 className="font-semibold text-[#188234]">350+</h2>
<p className="text-[14px] font-semibold">Trusted Lenders</p>
</div>

<div className="flex items-center justify-center">
  <div className="w-[2px] h-13 bg-green-600 ml-3"></div>
</div>

<div className="flex flex-col items-center px-2 justify-center">
  <h2 className="font-semibold text-[#188234]">100M+</h2>
<p className="text-[14px] font-semibold">User Helped</p>
</div>

<div className="flex items-center justify-center">
  <div className="w-[2px] h-13 bg-green-600 ml-3"></div>
</div>


<div className="flex flex-col items-center px-2 justify-center">
  <h2 className="font-semibold text-[#188234]">$35B+</h2>
<p className="text-[14px] font-semibold">Loans Matched</p>
</div>

<div className="flex items-center justify-center">
  <div className="w-[2px] h-13 bg-green-600 ml-3"></div>
</div>

<div className="flex flex-col items-center px-2 justify-center">
  <h2 className="font-semibold text-[#188234]">4.8</h2>
<p className="text-[14px] font-semibold">Average Rating</p>
</div>



<div>

</div>
</div>
</div>







      {/* ✅ Carousel Section */}
      <div className="relative  mt-30  max-w-6xl mx-auto bg-white shadow-sm rounded-md  overflow-hidden py-1">
        {/* Previous Button */}
        {page > 0 && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center space-y-1">
            <button
              onClick={prevPage}
              className="bg-white shadow-lg p-3 rounded-md hover:bg-green-50 border border-gray-200 flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft
                size={25}
                className="text-green-800  hover:-translate-x-1 transition-all duration-300 "
              />
            </button>
            <span className="text-[13px] font-medium text-blue-600">
              Previous
            </span>
          </div>
        )}

        {/* Carousel Items */}
        <div className="flex justify-center items-center overflow-hidden gap-10">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex justify-center items-center space-x-5"
            >
              {visibleItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActive(index + startIndex)}
                  className={`flex flex-col  items-center justify-center w-36 h-24 rounded-md cursor-pointer  transition-all duration-200 ${
                    active === index + startIndex
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white hover:bg-green-50 text-gray-700 border-gray-200"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                      active === index + startIndex
                        ? "bg-white text-green-700"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[15px] font-medium text-center ${
                      active === index + startIndex
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        {startIndex + itemsPerPage < allItems.length && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center space-y-1 ">
            <button
              onClick={nextPage}
              className="bg-white shadow-lg p-3 rounded-md hover:bg-green-50 border border-gray-200 flex items-center justify-center cursor-pointer"
            >
              <ChevronRight
                size={25}
                className="text-green-800 hover:translate-x-1 transition-all duration-100"
              />
            </button>
            <span className="text-[13px] font-medium text-blue-600">
              More Options
            </span>
          </div>
        )}
      </div>

      {/* ✅ Dynamic Banner Section */}
      <div className="max-w-6xl mx-auto mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {allItems[active]?.banner || <PersonalLoanBanner />}
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
      
    </>
  );
};

export default HomeCarousel;
