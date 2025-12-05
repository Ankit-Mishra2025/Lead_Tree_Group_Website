import React from "react";
import AutoLoanMan from "../assets/AutoLoan.jpg";
import { useNavigate } from "react-router-dom";
import { navigateToLoanForm } from "../Utils/navigationHelpers.js";

const AutoLoanBanner = () => {
  const navigate = useNavigate();

  
  const handleCompareRates = () => {
    navigateToLoanForm(navigate, "autoLoan"); // ✅ fixed param
  };

  return (
    <div className="w-full h-[450px] bg-gray-100 relative">
      <div className="flex w-full p-5 ">
        <div className="flex justify-between items-center w-full">
          <div className="w-xl">
            <h5 className="text-gray-600 font-semibold text-[16px]">
              Auto Loans
            </h5>
            <h2 className="text-[28px] font-bold text-gray-800">
              Discover the right auto loan for you
            </h2>
            <p className="w-[400px] mt-3 text-gray-700 text-[18px]">
              Take home the car you love. Compare auto loans to find the right
              fit for you.
            </p>
            <div className="flex items-center gap-5">
              <button
                className="mt-4 ml-2 w-50 px-8 py-3 bg-green-600 text-white text-[17px] rounded-md font-bold cursor-pointer"
                onClick={handleCompareRates}
              >
                Compare Rates
              </button>

              <button className="mt-4 ml-2 w-50 px-8 py-3 border border-green-600 text-[17px] rounded-md font-bold cursor-pointer">
                Read More
              </button>
            </div>
          </div>

          <img
            src="https://www.lendingtree.com/content/themes/lt-wp-www-theme/assets/images/home-page/auto-loan-bullseye.webp"
            className="h-[380px] w-[400px] ml-5 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AutoLoanBanner;
