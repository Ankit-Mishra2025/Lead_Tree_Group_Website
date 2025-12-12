import { ArrowBigRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { navigateToLoanForm } from "../Utils/navigationHelpers.js";

const AutoInsuranceBanner = () => {
  const navigate = useNavigate();

  const handleCompareRates = () => {
    navigateToLoanForm(navigate, "autoInsurance"); // ✅ fixed param
  };

  return (
    <div className="w-full min-h-[460px] bg-gray-100 relative">
      <div className="flex w-full p-5">

        <div className="flex justify-between items-center w-full gap-20">
             <img
            src="https://midasrates.com/public/assets/driving.webp"
            className="h-[380px] w-[400px] ml-5 rounded-xl object-cover"
            alt="Vehicle Person"
          />
          <div className="w-xl">
            <h5 className="text-gray-600 font-semibold text-[16px]">
            Auto Insurance Loan
            </h5>
            <h2 className="text-[28px] font-bold text-gray-800">
              Find the right insurance for you
            </h2>
            <p className="w-[500px] mt-3 text-gray-700 text-[18px]">
             <span className="text-2xl font-semibold text-green-600">Lending tree gives</span>  the #1 Spot Online to Find the Best Insurance Quotes.
            </p>
            <div className="flex flex-col w-full mt-5 ">

               <p className="text-[17px] font-bold text-gray-800 flex items-center flex-row gap-2 w-full"> <ArrowBigRight className="text-green-600"/> Compare the best rates in minutes</p>
                <p className="text-gray-700 text-md px-8">Lending tree is 100% free to use</p>

 <p className="text-[17px] font-bold text-gray-800 flex items-center flex-row gap-2 mt-3 w-full"> <ArrowBigRight className="text-green-600"/> Stop Overpaying</p>
                <p className="text-gray-700 text-md px-8">Comparing Multiple Quotes Can Save You Up To 50%</p>


            </div>

            <button
              onClick={handleCompareRates}
              className="mt-10 ml-2 px-8 py-3  bg-green-600 text-white text-[17px] rounded-md font-bold cursor-pointer hover:bg-green-700 transition"
            >
              Compare Rates
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default AutoInsuranceBanner;
