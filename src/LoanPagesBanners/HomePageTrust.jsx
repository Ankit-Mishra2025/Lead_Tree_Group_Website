import React from "react";

const HomePageTrust = () => {
  return (
    <div className="w-full min-h-screen flex p-10 flex-col">
      <h2 className="text-center font-semibold text-[35px]">
        Why <span className="text-green-600 font-semibold"> Millions</span>   of trust us?
      </h2>

      <div className="w-full flex items-center justify-around mt-5 ">
        <div className="left w-[50%] mt-5">
          <img
            src="https://www.lendingtree.com/content/themes/lt-wp-www-theme/assets/images/home-page/Phones-MP24.jpg"
            className="rounded-xl"
          />
        </div>
        <div className="right w-[50%] flex flex-col items-center gap-10 ">
          <div className="flex w-full flex-col">
            <div className="flex w-full gap-4">
              <span className="border border-green-700 text-green-600 h-8 w-8 rounded-full text-center flex items-center justify-center">
                1
              </span>
              <h2 className="text-[20px] text-gray-700 font-bold">
                {" "}
                Security
              </h2>
            </div>

            <p className="text-gray-800 text-[15px] px-12">
              Instead of sharing information with multiple lenders, fill out one
              simple, secure form in five minutes or less.
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="flex w-full gap-4">
              <span className="border border-green-700 text-green-600 h-8 w-8 rounded-full text-center flex items-center justify-center">
                2
              </span>
              <h2 className="text-[20px] text-gray-700 font-bold">
                {" "}
                Savings
              </h2>
            </div>

            <p className="text-gray-800 text-[15px] px-12">
              We'll match you with up to five lenders from our network of 300+ lenders who will call to compete for your business.
            </p>
          </div>


 <div className="flex w-full flex-col">
            <div className="flex w-full gap-4">
              <span className="border border-green-700 text-green-600 h-8 w-8 rounded-full text-center flex items-center justify-center">
                3
              </span>
              <h2 className="text-[20px] text-gray-700 font-bold">
                {" "}
                Verified
              </h2>
            </div>

            <p className="text-gray-800 text-[15px] px-12">
              We are Verified by all goverment licneces and provide a best and trusted suggestions according to your requirements.
            </p>
          </div>




           <div className="flex w-full flex-col">
            <div className="flex w-full gap-4">
              <span className="border border-green-700 text-green-600 h-8 w-8 rounded-full text-center flex items-center justify-center">
                4
              </span>
              <h2 className="text-[20px] text-gray-700 font-bold">
                {" "}
               Support
              </h2>
            </div>

            <p className="text-gray-800 text-[15px] px-12">
             We provide ongoing support with free credit monitoring, budgeting insights and personalized recommendations to help you save.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageTrust;
