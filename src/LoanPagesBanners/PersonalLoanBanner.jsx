import React from "react";
import { useNavigate } from "react-router-dom";

import { navigateToLoanForm } from "../Utils/navigationHelpers.js";

const PersonalLoanBanner = () => {
  const navigate = useNavigate();

  const handleCompareRates = () => {
    navigateToLoanForm(navigate, "personalLoan"); // ✅ fixed param
  };

  return (
    <div className="w-full min-h-[460px] bg-gray-100 relative">
      <div className="flex w-full p-5">
        <div className="flex justify-between items-center w-full">
          <div className="w-xl">
            <h5 className="text-gray-600 font-semibold text-[16px]">
              Personal Loan
            </h5>
            <h2 className="text-[28px] font-bold text-gray-800">
              Find the right personal loan rate for you
            </h2>
            <p className="w-[500px] mt-3 text-gray-700 text-[18px]">
              Need to consolidate debt or make a large purchase? We bring the
              lenders to you so you can shop and compare personal loan offers in
              minutes.
            </p>
            <button
              onClick={handleCompareRates}
              className="mt-4 ml-2 px-8 py-3 bg-green-600 text-white text-[17px] rounded-md font-bold cursor-pointer hover:bg-green-700 transition"
            >
              Compare Rates
            </button>
          </div>

          <img
            src="https://www.lendingtree.com/content/themes/lt-wp-www-theme/assets/images/home-page/personal-loan-bullseye.webp"
            className="h-[380px] w-[400px] ml-5 rounded-xl object-cover"
            alt="Happy person"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanBanner;
