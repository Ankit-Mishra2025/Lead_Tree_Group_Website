import { LockKeyhole } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { navigateToLoanForm } from "../Utils/navigationHelpers.js";


const CreditLoanBanner = () => {


const navigate = useNavigate();

  const handleCompareRates = () => {
    navigateToLoanForm(navigate, "creditCard"); // ✅ fixed param
  };


  return (
    <div className="w-full flex flex-col p-5 min-h-[400px] ">
      <div className="flex w-full items-center justify-between ">
        <div className="left flex flex-col">
          <p className="text-[17px] text-gray-500 font-semibold ">
            Credit Cards
          </p>
          <h2 className="text-[25px] font-semibold">
            Shop and compare credit cards
          </h2>
          <p className="text-[16px] text-gray-600">
            From earning rewards to transferring a balance, find the right
            credit card to help you score everyday wins.
          </p>
          <button className="mt-4  w-60 px-5 py-4 bg-green-600 text-white text-[17px] rounded-md font-bold cursor-pointer hover:bg-green-700 hover:translate-x-1 transition-all duration-300" onClick={handleCompareRates}>
            Compare Credit Cards
          </button>
          <p className=" relative top-20 flex gap-1 items-center w-full text-[12px] text-gray-400 px-2">
            <LockKeyhole size={12} className="text-gray-400" />
            Privacy Secured |
               <span className="text-gray-400 px-1"> Advertising Disclousre</span>
          </p>
        </div>
        <div className="right flex ">
          <img src="https://www.lendingtree.com/content/themes/lt-wp-www-theme/assets/images/home-page/credit-cards-bullseye.webp" />
        </div>
      </div>
    </div>
  );
};

export default CreditLoanBanner;
