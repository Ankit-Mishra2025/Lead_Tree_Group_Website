import React from "react";
import BusinessLoanMan from "../assets/BusinessLoanMan.jpg";
import { useNavigate } from "react-router-dom";
import { navigateToLoanForm } from "../Utils/navigationHelpers.js";

const BusinessLoanBanner = () => {
  const navigate = useNavigate();

  const handleCompareRates = () => {
    navigateToLoanForm(navigate, "businessLoan"); // ✅ fixed param
  };

  return (
    <div className="w-full h-[450px] bg-gray-100 relative">
      <div className="flex w-full p-5 ">
        <div className="flex justify-between items-center w-full">
          <div className="w-xl">
            <h5 className="text-gray-600 font-semibold text-[16px]">
              Business Loans
            </h5>
            <h2 className="text-[28px] font-bold text-gray-800">
              Shop and compare business loans
            </h2>
            <p className="w-[400px] mt-3 text-gray-700 text-[18px]">
              Our network of lenders will compete for your business, so you can
              get the funding you need for yours.
            </p>
            <div className="flex items-center gap-5">
              <button
                className="mt-4  w-70 px-6 py-4 bg-green-600 text-white text-[17px] rounded-md font-bold cursor-pointer hover:bg-green-700 hover:translate-x-1 transition-all duration-300"
                onClick={handleCompareRates}
              >
                Compare Business Loan
              </button>

              <button className="mt-4 ml-2 w-50 px-6 py-4 border border-green-600 text-[17px] rounded-md font-bold cursor-pointer">
                Read More
              </button>
            </div>
          </div>

          <img
            src="https://www.lendingtree.com/content/themes/lt-wp-www-theme/assets/images/home-page/business-loans-bullseye.webp"
            className="h-[350px] w-[400px] ml-5 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessLoanBanner;
