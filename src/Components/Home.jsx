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
      <div className="text-center mt-12 mb-8 py-5">
        <h2 className="font-bold text-[40px] text-gray-800 mt-5">
          When banks compete, <span className="text-green-600">you win.</span>
        </h2>
      </div>

      {/* ✅ Carousel Section */}
      <div className="relative  max-w-6xl mx-auto bg-white shadow-sm rounded-md  overflow-hidden py-1">
        {/* Previous Button */}
        {page > 0 && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center space-y-1">
            <button
              onClick={prevPage}
              className="bg-white shadow-lg p-3 rounded-md hover:bg-green-50 border border-gray-200 flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={25} className="text-green-800" />
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
              <ChevronRight size={25} className="text-green-800" />
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
    </>
  );
};

export default HomeCarousel;
