import React from "react";
import HomeRefinance from "../assets/HomeRefinance.jpg";
import { navigateToLoanForm } from "../Utils/navigationHelpers.js";
import { useNavigate } from "react-router-dom";

const HomePurchaseLoanBanner = () => {
  const navigate = useNavigate();

  const handleCompareRates = () => {
    navigateToLoanForm(navigate, "homePurchaseLoan"); // ✅ fixed param
  };

  return (
    <div className="w-full h-[450px] bg-gray-100 relative  ">
      <div className="flex w-full p-5 ">
        <div className="flex justify-between items-center w-full ">
          <div className="w-xl">
            <h5 className="text-gray-600 font-semibold text-[16px]">
              Home Purchase
            </h5>
            <h2 className="text-[28px] font-bold text-gray-800">
              Compare top mortgage lenders
            </h2>
            <p className="w-[500px] mt-3 text-gray-700 text-[17px]">
              Get multiple lenders to compete for your business and see how much
              you could save. It pays to compare your options — literally.
            </p>
            <div className="flex items-center gap-5">
              <button
                className="mt-4  w-50 px-8 py-3 bg-green-600 text-white text-[18px] rounded-md font-bold cursor-pointer hover:bg-green-700 hover:translate-x-1 transition-all duration-300"
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
            src="https://www.lendingtree.com/content/themes/lt-wp-www-theme/assets/images/home-page/home-purchase-bullseye.webp"
            className="h-[380px] w-[400px] ml-5 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePurchaseLoanBanner;
