import { AddHome, AutoAwesome, HomeFilled, HomeMax, HomeMiniTwoTone, HomeRepairService, Money, Umbrella } from "@mui/icons-material";
import { Calculator, Car, DollarSignIcon, Home, UmbrellaIcon, Wallet, Wallet2 } from "lucide-react";
import React from "react";

const HomePageWorkBanner = () => {
  return (
    <div className="w-full bg-gray-200 min-h-screen  justify-between flex mt-2">
      <div className="w-full  flex justify-around ">
        <div className="left flex w-[50%] flex-col relative top-20 px-10">
          <h2 className="text-gray-900 font-medium text-3xl">
            What does LeadTree do?
          </h2>
          <p className="mt-5 text-gray-900 text-[18px]">
            LeadTree is a marketplace, built to save you money—we don't make
            loans, we find them. In fact, we've been finding the best loans for
            Americans for more than 20 years. Our marketplace is the largest in
            the country, and it's filled with lenders you know and trust.
          </p>

          <div className="left_1_Links grid grid-cols-2 mt-20 gap-10">
            <ul className="flex flex-col gap-6">
              <a href="#">
 <li className="flex gap-4 text-[18px] text-gray-600 hover:text-blue-900">
                {" "}
                <span className="text-emerald-500 " >
                  <Home size={"32px"} />{" "}
                </span>
                Mortage Refinance{" "}
              </li>
              </a>
             

             <a href="#">
 <li className="flex gap-4 text-[18px] text-gray-600 hover:text-blue-900">
                {" "}
                <span className="text-emerald-500 ">
                  <AddHome  size={"35px"}  />{" "}
                </span>
                Home Equity Loans{" "}
              </li>
             </a>
             

             <a href="#">
 <li className="flex gap-4 text-[18px] text-gray-600 hover:text-blue-900">
                {" "}
                <span className="text-emerald-500">
                  <Wallet  size={"32px"} />{" "}
                </span>
                Credit Cards{" "}
              </li>
             </a>
             

             <a href="#">
<li className="flex gap-4 text-[18px] text-gray-600 hover:text-blue-900">
                {" "}
                <span className="text-emerald-500">
                  <Calculator size={"32px"} />{" "}
                </span>
                Mortage Calculator{" "}
              </li>
             </a>
              
            </ul>

            <ul className="flex flex-col gap-6">

              <a href="#">
<li className="flex gap-4 text-[18px] text-gray-600 hover:text-blue-900">
                {" "}
                <span className="text-emerald-500 " >
                  <DollarSignIcon size={"32px"} />{" "}
                </span>
                Personal Loan{" "}
              </li>
              </a>
               
<a href="#">
<li className="flex gap-4 text-[18px] text-gray-600 hover:text-blue-900">
                {" "}
                <span className="text-emerald-500 " >
                  <Car   size={"32px"} />{" "}
                </span>
              Auto Loan{" "}
              </li>
</a>


<a href="#">
<li className="flex gap-4 text-[18px] text-gray-600 hover:text-blue-900">
                {" "}
                <span className="text-emerald-500 " >
                  <Wallet2  size={"32px"} />{" "}
                </span>
              Free Credit score{" "}
              </li>
</a>


<a href="#">
<li className="flex gap-4 text-[18px] text-gray-600 hover:text-blue-900">
                {" "}
                <span className="text-emerald-500 " >
                  <UmbrellaIcon  size={"32px"} />{" "}
                </span>
              Insurance{" "}
              </li>
</a>



            </ul>
          </div>
        </div>

        <div className="relative top-15">
          <img
            src="https://www.lendingtree.com/content/themes/lt-wp-www-theme/assets/images/home-page/what-does-lt-do-woman.jpeg"
            className="h-[480px] w-[350px] object-fit rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageWorkBanner;
