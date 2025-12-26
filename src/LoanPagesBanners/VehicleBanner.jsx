import React from "react";
import { useNavigate } from "react-router-dom";

import { navigateToLoanForm } from "../Utils/navigationHelpers.js";

const VehicleBanner = () => {
  const navigate = useNavigate();

  const handleCompareRates = () => {
    navigateToLoanForm(navigate, "vehicleSelection"); // ✅ fixed param
  };

  // const handleVehcileTypeSelection=()=>{
  //   navigate("/LoanPageBanners/VehicleTypeSelection")
  // }

  return (
    <div className="w-full min-h-[460px] bg-gray-100 relative">
      <div className="flex w-full p-5">
        <div className="flex justify-between items-center w-full">
          <div className="w-xl">
            <h5 className="text-gray-600 font-semibold text-[16px]">
              Vehicle Loan
            </h5>
            <h2 className="text-[28px] font-bold text-gray-800">
              Find the best place to sell and purchase vehcile for you
            </h2>
            <p className="w-[500px] mt-3 text-gray-700 text-[18px]">
              Need to consolidate debt or make a large purchase? We bring the
              multiple varities of cars to you so you can shop and compare with
              multiple vehicles offers in minutes.
            </p>
            <button
              onClick={handleCompareRates}
              className="mt-4 ml-2 px-8 py-3 bg-green-600 text-white text-[17px] rounded-md font-bold cursor-pointer hover:bg-green-700 hover:translate-x-1 transition-all duration-300 "
            >
              Purchase
            </button>
          </div>

          <img
            src="https://e7.pngegg.com/pngimages/415/449/png-clipart-car-wash-car-wash-poster-washing-offer-thumbnail.png"
            className="h-[380px] w-[400px] ml-5 rounded-md object-cover"
            alt="Happy person"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleBanner;
