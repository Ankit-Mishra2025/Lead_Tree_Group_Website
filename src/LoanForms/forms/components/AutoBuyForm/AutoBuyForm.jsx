import React from "react";
import carSell from "/src/assets/CarSell.jpg";
import CarDocument from "/src/assets/CarDocument.avif";
import CarInspect from "/src/assets/CarInspect.avif";
import CarMan from "/src/assets/CarMan.jpg";
import { useNavigate } from "react-router-dom";

const AutoBuyForm = () => {
  const Navigate = useNavigate();
  const CarBrowseNavigate = () => {
    Navigate("/Buycar-browse/FilteredCard");
  };

  return (
    <div className="flex justify-center w-7xl bg-white rounded-md shadow-md  mt-5 p-10  flex-col items-center">
      <h2 className=" text-3xl text-green-700 font-semibold ">
        Why Chosse US?
      </h2>

      <div className="flex w-full gap-5  flex-wrap mt-5 ">
        <div className="flex flex-col">
          <div className="h-[250px] w-[250px] bg-gray-100 rounded-2xl flex flex-col">
            <img src={carSell} className="h-[250px] w-[270px] rounded-2xl" />
          </div>
          <h2 className="text-gray-900 font-semibold text-[23px] w-70">
            Buy From AnyWhere
          </h2>
          <p className="text-gray-900 font-semibold text-[13px] w-70 ">
            From inspection to payment, everything right from your doorstep!
          </p>
        </div>

        <div className="flex flex-col">
          <div className="h-[250px] w-[250px] bg-gray-100 rounded-2xl flex flex-col">
            <img
              src={CarDocument}
              className="h-[250px] w-[250px] rounded-2xl"
            />
          </div>
          <h2 className="text-gray-900 font-semibold text-[23px] w-70">
            Hassle Free Documentaion
          </h2>
          <p className="text-gray-900 font-semibold text-[13px] w-70 ">
            Documentation and RC transfers can take months! We’ll handle it all
          </p>
        </div>

        <div className="flex flex-col">
          <div className="h-[250px] w-[250px] bg-gray-100 rounded-2xl flex flex-col">
            <img src={CarInspect} className="h-[250px] w-[270px] rounded-2xl" />
          </div>
          <h2 className="text-gray-900 font-semibold text-[23px] w-70">
            200-Points Inspection
          </h2>
          <p className="text-gray-900 font-semibold text-[13px] w-70 ">
            Every car is carefully handpicked after a thorough quality
            inspection
          </p>
        </div>

        <div className="flex flex-col">
          <div className="h-[250px] w-[250px] bg-gray-100 rounded-2xl flex flex-col">
            <img src={CarMan} className="h-[250px] w-[270px] rounded-2xl" />
          </div>
          <h2 className="text-gray-900 font-semibold text-[23px] w-70">
            Warranty included
          </h2>
          <p className="text-gray-900 font-semibold text-[13px] w-70 ">
            Our way of being there for you through your car ownership journey
          </p>
        </div>

        <div className="flex items-center justify-center w-full mt-5">
          <button
            className=" w-80 px-10 py-4 rounded-xl  font-semibold bg-green-500 text-white text-xl cursor-pointer hover:bg-green-600 hover:scale-x-105 transition-all duration-100"
            onClick={CarBrowseNavigate}
          >
            Browse Cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoBuyForm;
