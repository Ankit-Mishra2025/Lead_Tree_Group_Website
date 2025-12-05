import React, { useState, useEffect } from "react";
import {
  ArrowRightLeft,
  BadgeIndianRupee,
  Banknote,
  Briefcase,
  Gift,
  Leaf,
  MoveUpRightIcon,
  Percent,
  Plane,
  SquareArrowOutUpRight,
  SquareArrowUpRight,
  Star,
  Stars,
  Ticket,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import AmericanExpress from "/CrediCardImages/AmericanAtmCard.avif";
import BankOfAmerica from "/CrediCardImages/BankOfAmerica.jpg";
import CityBank from "/CrediCardImages/CityBankAtm.png";
import WeelsFargo from "/CrediCardImages/WelsFargo.jpg";
import CapitalOne from "/CrediCardImages/CapitalOne.jpg";
import Chasesphere from "/CrediCardImages/ChassSphere.jpg";



const CreditCardFormPage = () => {
  const [openBank, setOpenBank] = useState(false);
  const [openCreditCard, setOpenCreditCard] = useState(false);

  const [bankData, setBankData] = useState([]);
  const [creditCardData, setCreditCardData] = useState([]);

  // ------ Fetch  American Bank Data ---------------
  const fetchBankOfAmericaData = async () => {
    try {
      const res = await fetch(
        "/CreditCardAccordianData/AmericanExpressData.json"
      );
      const data = await res.json();
      setBankData(data);
    } catch (error) {
      console.log("Bank Data fetch error", error);
    }
  };

  // ---------- Fetch American bank Credit Card Data ----------
  const fetchBankOfAmericaCreditCardData = async () => {
    try {
      const res = await fetch(
        "/CreditCardAccordianData/AmericanExpressCreditCardData.json"
      );
      const data = await res.json();
      setCreditCardData(data);
    } catch (error) {
      console.log("Credit Card Data fetch error", error);
    }
  };

  // Load bank data of American Bank when accordion opens
  useEffect(() => {
    if (openBank) fetchBankOfAmericaData();
  }, [openBank]);

  // Load credit card data when accordion opens
  useEffect(() => {
    if (openCreditCard) fetchBankOfAmericaCreditCardData();
  }, [openCreditCard]);

  return (
    <>
      <div className="flex p-8 flex-col">
        {/* ===================== HEADER ===================== */}
        <div className="flex w-full items-center justify-around  mt-5">
          <p className="text-gray-300 text-[15px] w-70">
            Publications featuring LendingTree experts this month
          </p>

          <p className="text-gray-300 text-[17px] font-semibold font-mono">
            <span className="bg-gray-300 h-25 w-25 rounded-full text-gray-400">
              TNY
            </span>{" "}
            The Newyork Times
          </p>

          <p className="text-gray-400 text-[17px] font-semibold flex items-center gap-3">
            <span className="bg-gray-300 font-extrabold h-10 w-10 py-2 rounded-full text-[17px]">
              CNN
            </span>{" "}
            Entrepreneur
          </p>

          <p className="text-gray-400 text-[18px] font-extrabold flex items-center gap-2">
            <span className="bg-gray-300 h-8 w-8 rounded-full"></span>USA Today
          </p>

          <p className="text-gray-400 font-extrabold text-[24px]">Forbes</p>
        </div>

        {/*  SECTION TITLE == */}
        <div className="flex w-full p-3 flex-col">
          <h1 className="text-4xl px-2">
            Best Credit Card Offers of December 2025
          </h1>
          <p className="text-gray-700 text-[17px] px-3 mt-2 font-sans">
            It’s no secret you can receive amazing benefits when signing up for
            a new credit card. Yet, many people stick with the same card year
            after year and miss out on these valuable benefits. Sound familiar?
            Find your perfect card from one of our partners below and unlock a
            world of points and perks
          </p>

          <p className="h-7 bg-gray-100 rounded-xl mt-3 text-[12px] text-gray-500 flex items-center px-10">
            While this site receives compensation from companies listed here,
            this does not influence our ratings or reviews.
            <span>
              <Link to="#" className="text-blue-800 px-2 font-semibold">
                Learn More
              </Link>
            </span>
          </p>
        </div>

        {/* ==== Bank -1 American Express === */}

        <div className="w-6xl bg-white shadow-xl rounded-md min-h-screen mt-5 border border-gray-200 px-10">
          {/* CARD HEADER */}
          <div className="w-full flex gap-5 p-2 ">
            <img src={AmericanExpress} className="h-[120px] w-[180px]" />

            <h1 className="text-3xl font-semibold w-2xl">
              Blue Cash Everyday® Card from American Express
            </h1>

            <div className="flex flex-col items-center">
              <button className="w-40 px-3 py-3 rounded-4xl text-white font-semibold flex items-center justify-center gap-5 bg-blue-900 hover:bg-blue-800 cursor-pointer text-[18px]">
                Apply Now <SquareArrowOutUpRight />
              </button>
              <span className="text-gray-500 text-xs w-40">
                on American Express's secure site
              </span>

              <div className=" w-30 bottom-20  font-medium text-[20px] ">
                <div className="flex flex-row absolute left-80 ">
                  <Star className="text-yellow-400" />{" "}
                  <Star className="text-yellow-400" />{" "}
                  <Star className="text-yellow-400" />{" "}
                  <Star className="text-yellow-400" />{" "}
                  <Star className="text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 text-gray-600 text-sm p-5">
            {" "}
            <input type="checkbox" className="h-5 w-5 rounded-xl " /> Add to
            compare{" "}
          </div>

          <div className="flex w-full gap-5 justify-between p-2 mb-2">
            {" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Annual Fee</h6>{" "}
              <p className="text-gray-700">$0</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Regular APR</h6>{" "}
              <p className="text-gray-700">19.74%-28.74% Variable</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Rewards Rate</h6>{" "}
              <p className="text-gray-700">1% - 3% cash back</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Credit Needed
              </h6>{" "}
              <p className="text-blue-700">Good/Excellent</p>{" "}
            </div>{" "}
          </div>

          <hr className="mt-3 text-gray-200" />
          <div className="w-full flex flex-col mt-8">
            {" "}
            <h1 className="text-sm font-semibold text-gray-900">
              The Bottom Line
            </h1>{" "}
            <p className="text-gray-700 text-[16px] ">
              {" "}
              The Blue Cash Everyday® Card from American Express is a robust
              card with no annual fee. There is a great welcome offer, and you
              get the exceptional service you’d expect with any Amex credit
              card. To see rates & fees for Blue Cash Everyday® Card from
              American Express, please{" "}
              <span>
                <Link to="" className="text-blue-700">
                  click here.
                </Link>
              </span>{" "}
            </p>{" "}
          </div>

          {/* ===================== ACCORDION #1: OUR TAKE ===================== */}
          <div className="max-w-6xl flex mt-5">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenBank((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-800">
                  Our Take
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openBank ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openBank ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-4 shadow-sm ">
                  {bankData.map((item, index) => (
                    <div key={index} className="">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 ">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="w-full text-gray-300 h-2 " />

          {/* ===================== ACCORDION #2: CREDIT CARD DETAILS ===================== */}
          <div className="max-w-6xl flex">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenCreditCard((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-700">
                  Credit Card Details
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openCreditCard ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openCreditCard ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md  shadow-sm">
                  {creditCardData.map((item, index) => (
                    <div key={index} className="p-2">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====== Bank-2 City Bank == */}

        <div className="w-6xl bg-white shadow-xl rounded-md min-h-screen mt-5 border border-gray-200 p-5">
          {/* CARD HEADER */}
          <div className="w-full flex gap-10 ">
            <img src={CityBank} className="h-[120px] w-[200px]" />

            <h1 className="text-3xl font-semibold w-2xl">
              Citi Double Cash® Card
            </h1>

            <div className="flex flex-col items-center ">
              <button className="w-40 px-3 py-3 rounded-4xl text-white font-semibold flex items-center justify-center gap-5 bg-blue-900 hover:bg-blue-800 cursor-pointer text-[18px]">
                Apply Now <SquareArrowOutUpRight />
              </button>
              <span className="text-gray-500 text-xs w-40">
                on Citibank's secure site Rates & Fees
              </span>
            </div>
          </div>

          <div className=" w-30 relative bottom-20  font-medium  inset-x-60  justify-start text-[20px] ">
            <div className="flex w-full flex-row ">
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" /> <Star />
            </div>
          </div>
          <div className="flex w-full items-center gap-3 text-gray-600 text-sm px-5">
            {" "}
            <input type="checkbox" className="h-5 w-5 rounded-xl " /> Add to
            compare{" "}
          </div>

          <div className="flex w-full gap-8 justify-between p-2 mt-3">
            {" "}
            <div className="flex flex-col  ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Annual Fee</h6>{" "}
              <p className="text-gray-700">$0</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Welcome Offer
              </h6>{" "}
              <p className="text-gray-700">$200 cash rewards</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Rewards Rate</h6>{" "}
              <p className="text-gray-700">2% - 5% cash back</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Credit Needed
              </h6>{" "}
              <p className="text-blue-700">Good/Excellent</p>{" "}
            </div>{" "}
          </div>

          <hr className="mt-8 text-gray-200" />
          <div className="w-full flex flex-col mt-5">
            {" "}
            <h1 className="text-md font-semibold text-gray-900 flex items-center gap-2">
              <Leaf className="text-green-500" /> OFFER VALUATION
            </h1>{" "}
            <div className="flex w-[650px] items-center p-2 gap-5 mt-1">
              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Intro Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$200</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Monthly Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$127</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. First Year Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">
                  $1,723
                </p>
              </div>
            </div>
            <h1 className="text-[14px] font-semibold text-gray-900 mt-5 ">
              The Bottom Line
            </h1>{" "}
            <p className="text-gray-700 text-[16px] ">
              {" "}
              The Citi Double Cash® Card is great for those wanting to earn cash
              back on all purchases without having to worry about rotating
              categories and for those who carry a balance.{" "}
              <span>
                <Link to="" className="text-blue-700">
                  click here.
                </Link>
              </span>{" "}
            </p>{" "}
          </div>

          {/* ===================== ACCORDION #1: OUR TAKE ===================== */}
          <div className="max-w-6xl flex ">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenBank((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-800">
                  Our Take
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openBank ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openBank ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {bankData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full text-gray-300 h-2 " />

          {/* ===================== ACCORDION #2: CREDIT CARD DETAILS ===================== */}
          <div className="max-w-6xl flex">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenCreditCard((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-800">
                  Credit Card Details
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openCreditCard ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openCreditCard ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {creditCardData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========= Bank -03 Bank of America ======= */}
        <div className="w-6xl bg-white shadow-xl rounded-md min-h-screen mt-5 border border-gray-200 p-5">
          {/* CARD HEADER */}
          <div className="w-full flex gap-5 p-2 ">
            <img src={BankOfAmerica} className="h-[120px] w-[200px]" />

            <h1 className="text-3xl font-semibold">
              Bank of America® Customized Cash Rewards credit card
            </h1>

            <div className="flex flex-col items-center">
              <button className="w-40 px-3 py-3 rounded-4xl text-white font-semibold flex items-center justify-center gap-5 bg-blue-900 hover:bg-blue-800 cursor-pointer text-[18px]">
                Apply Now <SquareArrowOutUpRight />
              </button>
              <span className="text-gray-500 text-xs w-40">
                on Bank of America's secure site
              </span>
            </div>
          </div>

          <div className=" w-30   font-medium text-[20px] ">
            <div className="flex flex-row left-60 bottom-10 relative  ">
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />
            </div>
          </div>

          <div className="flex w-full items-center gap-2 text-gray-600 text-sm px-5">
            {" "}
            <input type="checkbox" className="h-5 w-5 rounded-xl " /> Add to
            compare{" "}
          </div>

          <div className="flex w-full gap-5 justify-between p-2 mt-3">
            {" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Annual Fee</h6>{" "}
              <p className="text-gray-700">$0</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Regular APR</h6>{" "}
              <p className="text-gray-700">19.74%-28.74% Variable</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Rewards Rate</h6>{" "}
              <p className="text-gray-700">1% - 3% cash back</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Credit Needed
              </h6>{" "}
              <p className="text-blue-700">Good/Excellent</p>{" "}
            </div>{" "}
          </div>

          <hr className="mt-8 text-gray-200" />
          <div className="w-full flex flex-col mt-5">
            {" "}
            <h1 className="text-md font-semibold text-gray-900 flex items-center gap-2">
              <Leaf className="text-green-500" /> OFFER VALUATION
            </h1>{" "}
            <div className="flex w-[650px] items-center p-2 gap-5">
              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Intro Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$200</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Monthly Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$48</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. First Year Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$771</p>
              </div>
            </div>
            <h1 className="text-[14px] font-semibold text-gray-900 mt-4 ">
              The Bottom Line
            </h1>{" "}
            <p className="text-gray-700 text-[16px] ">
              {" "}
              The Bank of America® Customized Cash Rewards credit card is a good
              rewards card that offers a chance to earn fantastic cash rewards
              rates on your spending.{" "}
              <span>
                <Link to="" className="text-blue-700">
                  click here.
                </Link>
              </span>{" "}
            </p>{" "}
          </div>

          {/* ===================== ACCORDION #1: OUR TAKE ===================== */}
          <div className="max-w-6xl flex mt-3">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenBank((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-800">
                  Our Take
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openBank ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openBank ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {bankData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="w-full text-gray-300 h-2 " />
          {/* ===================== ACCORDION #2: CREDIT CARD DETAILS ===================== */}
          <div className="max-w-6xl flex">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenCreditCard((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-800">
                  Credit Card Details
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openCreditCard ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openCreditCard ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {creditCardData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========= Bank-04  Weels fargo bank BOX */}
        <div className="w-6xl bg-white shadow-xl rounded-md min-h-screen mt-5 border border-gray-200 p-5">
          {/* CARD HEADER */}
          <div className="w-full flex gap-8 p-2">
            <img src={WeelsFargo} className="h-[120px] w-[200px]" />

            <h1 className="text-3xl font-semibold w-2xl">
              Wells Fargo Autograph® Card
            </h1>

            <div className="flex flex-col items-center">
              <button className="w-40 px-3 py-3 rounded-4xl text-white font-semibold flex items-center justify-center gap-5 bg-blue-900 hover:bg-blue-800 cursor-pointer text-[18px]">
                Apply Now <SquareArrowOutUpRight />
              </button>
              <span className="text-gray-500 text-xs w-40">
                on Wells Fargo's secure site Rates & Fees
              </span>
            </div>
          </div>

          <div className=" w-30  font-medium text-[20px] ">
            <div className="flex flex-row left-60 bottom-20 relative  ">
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-gray-700" />
            </div>
          </div>
          <div className="flex w-full items-center gap-3 text-gray-600 text-sm p-5">
            {" "}
            <input type="checkbox" className="h-5 w-5 rounded-xl " /> Add to
            compare{" "}
          </div>

          <div className="flex w-full gap-5 justify-between p-2 ">
            {" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Annual Fee</h6>{" "}
              <p className="text-gray-700">$0</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Regular APR</h6>{" "}
              <p className="text-gray-700">
                18.74%, 24.74%, or 28.74% Variable APR
              </p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Rewards Rate</h6>{" "}
              <p className="text-gray-700">1X - 3X points</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Credit Needed
              </h6>{" "}
              <p className="text-blue-700">Good/Excellent</p>{" "}
            </div>{" "}
          </div>

          <hr className="mt-8 text-gray-200" />
          <div className="w-full flex flex-col mt-5">
            {" "}
            <h1 className="text-md font-semibold text-gray-900 flex items-center gap-2">
              <Leaf className="text-green-500" /> OFFER VALUATION
            </h1>{" "}
            <div className="flex w-[650px] items-center p-2 gap-5">
              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Intro Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$200</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Monthly Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$90</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. First Year Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">
                  $1282
                </p>
              </div>
            </div>
            <h1 className="text-[14px] font-semibold text-gray-900 mt-4">
              The Bottom Line
            </h1>{" "}
            <p className="text-gray-700 text-[16px] ">
              {" "}
              This card stands out for offering a valuable rewards rate without
              charging an annual fee. Many cards with rewards rates this high
              charge annual fees close to $100 or higher. And when you consider
              this card’s welcome offer for new cardholders, the value only
              increases.{" "}
              <span>
                <Link to="" className="text-blue-700">
                  click here.
                </Link>
              </span>{" "}
            </p>{" "}
          </div>

          {/* ===================== ACCORDION #1: OUR TAKE ===================== */}
          <div className="max-w-6xl flex mt-3">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenBank((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-700">
                  Our Take
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openBank ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openBank ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {bankData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="w-full text-gray-300 h-2 " />
          {/* ===================== ACCORDION #2: CREDIT CARD DETAILS ===================== */}
          <div className="max-w-6xl flex ">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenCreditCard((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-700">
                  Credit Card Details
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openCreditCard ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openCreditCard ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {creditCardData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========= Bank-05  CapitalOne bank BOX */}

        <div className="w-6xl bg-white shadow-xl rounded-md min-h-screen mt-5 border border-gray-200 p-5">
          {/* CARD HEADER */}
          <div className="w-full flex gap-5 p-2">
            <img src={CapitalOne} className="h-[180px] w-[220px]" />

            <h1 className="text-3xl font-semibold w-2xl">
              Capital One Venture Rewards Credit Card
            </h1>

            <div className="flex flex-col items-center">
              <button className="w-40 px-3 py-3 rounded-4xl text-white font-semibold flex items-center justify-center gap-5 bg-blue-900 hover:bg-blue-800 cursor-pointer text-[18px]">
                Apply Now <SquareArrowOutUpRight />
              </button>
              <span className="text-gray-500 text-xs w-40">
                on Capital One's secure site Rates & Fees
              </span>
            </div>
          </div>

          <div className=" w-30  font-medium text-[20px] ">
            <div className="flex flex-row left-60 bottom-35 relative  ">
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-gray-700" />{" "}
              <Star className="text-gray-700" />
            </div>
          </div>

          <div className="flex w-full items-center gap-3 text-gray-600 text-sm p-5">
            {" "}
            <input type="checkbox" className="h-5 w-5 rounded-xl " /> Add to
            compare{" "}
          </div>

          <div className="flex w-full gap-5 justify-between p-2 ">
            {" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Annual Fee</h6>{" "}
              <p className="text-gray-700">$0</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Welcome Offer
              </h6>{" "}
              <p className="text-gray-700">75,000 miles</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Rewards Rate</h6>{" "}
              <p className="text-gray-700">2X - 5X Miles</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Credit Needed
              </h6>{" "}
              <p className="text-blue-700">Good/Excellent</p>{" "}
            </div>{" "}
          </div>

          <hr className="mt-8 text-gray-200" />
          <div className="w-full flex flex-col mt-5">
            {" "}
            <h1 className="text-md font-semibold text-gray-900 flex items-center gap-2">
              <Leaf className="text-green-500" /> OFFER VALUATION
            </h1>{" "}
            <div className="flex w-[650px] items-center p-2 gap-5">
              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Intro Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$920</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Monthly Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$119</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. First Year Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">
                  $2351
                </p>
              </div>
            </div>
            <h1 className="text-sm font-semibold text-gray-900 mt-4">
              The Bottom Line
            </h1>{" "}
            <p className="text-gray-700 text-[15px] ">
              {" "}
              The Capital One Venture Rewards Credit Card is a really good
              travel rewards card for the frequent traveler. You can earn tons
              of miles and use them in many different ways with no expiration
              dates or hidden fees.{" "}
              <span>
                <Link to="" className="text-blue-700">
                  click here.
                </Link>
              </span>{" "}
            </p>{" "}
          </div>

          {/* ========== ACCORDION #1: OUR TAKE ======= */}
          <div className="max-w-6xl flex mt-3">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenBank((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-700">
                  Our Take
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openBank ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openBank ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {bankData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="w-full text-gray-300 h-2 " />

          {/* ===================== ACCORDION #2: CREDIT CARD DETAILS ===================== */}
          <div className="max-w-6xl flex ">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenCreditCard((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-700">
                  Credit Card Details
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openCreditCard ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openCreditCard ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {creditCardData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========= Bank-06  Chase sphere bank BOX */}

        <div className="w-6xl bg-white shadow-xl rounded-md min-h-screen mt-5 border border-gray-200 p-5">
          {/* CARD HEADER */}
          <div className="w-full flex p-2">
            <img src={Chasesphere} className="h-[150px] w-[250px]" />

            <h1 className="text-3xl font-semibold w-2xl">
              Chase Sapphire Preferred® Card
            </h1>

            <div className="flex flex-col items-center">
              <button className="w-40 px-3 py-3 rounded-4xl text-white font-semibold flex items-center justify-center gap-5 bg-blue-900 hover:bg-blue-800 cursor-pointer text-[18px]">
                Apply Now <SquareArrowOutUpRight />
              </button>
              <span className="text-gray-500 text-xs w-40">
                on Chase's secure site Rates & Fees
              </span>
            </div>
          </div>

          <div className=" w-30  font-medium text-[20px] ">
            <div className="flex flex-row left-65 bottom-25 relative  ">
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-yellow-400" />{" "}
              <Star className="text-gray-700" />{" "}
              <Star className="text-gray-700" />
            </div>
          </div>

          <div className="flex w-full items-center gap-3 text-gray-600 text-sm px-5 py-2">
            {" "}
            <input type="checkbox" className="h-5 w-5 rounded-xl " /> Add to
            compare{" "}
          </div>

          <div className="flex w-full gap-5 justify-between p-2 mt-2">
            {" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Annual Fee</h6>{" "}
              <p className="text-gray-700">$0</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Welcome Offer
              </h6>{" "}
              <p className="text-gray-700">75,000 points</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">Rewards Rate</h6>{" "}
              <p className="text-gray-700">1X - 5X points</p>{" "}
            </div>{" "}
            <div className="flex flex-col ">
              {" "}
              <h6 className="text-gray-800 font-semibold">
                Credit Needed
              </h6>{" "}
              <p className="text-blue-700">Excellent</p>{" "}
            </div>{" "}
          </div>

          <hr className="mt-6 text-gray-200" />
          <div className="w-full flex flex-col mt-5">
            {" "}
            <h1 className="text-md font-semibold text-gray-900 flex items-center gap-2">
              <Leaf className="text-green-500" /> OFFER VALUATION
            </h1>{" "}
            <div className="flex w-[650px] items-center gap-5 p-2">
              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Intro Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$920</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. Monthly Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">$119</p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-[16px] font-semibold">
                  Est. First Year Rewards
                </h1>
                <p className="text-green-600 text-[18px] font-semibold">
                  $2351
                </p>
              </div>
            </div>
            <h1 className="text-[14px] font-semibold text-gray-900 mt-4">
              The Bottom Line
            </h1>{" "}
            <p className="text-gray-700 text-[15px] ">
              {" "}
              The Capital One Venture Rewards Credit Card is a really good
              travel rewards card for the frequent traveler. You can earn tons
              of miles and use them in many different ways with no expiration
              dates or hidden fees.{" "}
              <span>
                <Link to="" className="text-blue-700">
                  click here.
                </Link>
              </span>{" "}
            </p>{" "}
          </div>

          {/* ===================== ACCORDION #1: OUR TAKE ===================== */}
          <div className="max-w-6xl flex mt-3">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenBank((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-700">
                  Our Take
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openBank ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openBank ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {bankData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="w-full text-gray-300 h-2 " />

          {/* ===================== ACCORDION #2: CREDIT CARD DETAILS ===================== */}
          <div className="max-w-6xl flex">
            <div className="flex w-full flex-col p-2">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenCreditCard((prev) => !prev)}
              >
                <h1 className="text-[20px] font-semibold text-gray-700">
                  Credit Card Details
                </h1>
                <button className="text-[35px] font-semibold cursor-pointer">
                  {openCreditCard ? "-" : "+"}
                </button>
              </div>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openCreditCard ? "max-h-[500px] mt-4" : "max-h-0"
                }`}
              >
                <div className="rounded-md p-2 shadow-sm ">
                  {creditCardData.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-sm">{item.question}</h3>
                      <p className="text-gray-600 mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-6xl p-3  bg-white shadow-2xs border-b border-gray-200 rounded-md">
          <p className="text-gray-400 text-[12px]">
            *General Disclaimer: See the online credit card application for
            details about terms and conditions. We make every effort to maintain
            accurate information. However, all credit card information is
            presented without warranty. To confirm terms and conditions, click
            the "Apply Now" button and review info on the secure credit card
            terms page.
          </p>
        </div>

        <div className="flex mt-5 w-full flex-col p-5 ">
          <h2 className="text-[27px] font-semibold text-gray-700 ">
            Top Card Categories
          </h2>

          <div className="grid grid-cols-4 w-full gap-6 mt-4">
            <div className="h-[120px] w-[260px] bg-white shadow-lg border border-gray-300 hover:border-green-500 rounded-md p-5 cursor-pointer flex flex-col items-center">
              <Ticket className="text-emerald-500 " size={40} />
              <h2 className="text-[18px] font-semibold text-gray-800">
                Top Card Offers
              </h2>
            </div>

            <div className="h-[120px] w-[260px] bg-white shadow-lg border border-gray-300 hover:border-green-500 rounded-md p-5 cursor-pointer flex flex-col items-center">
              <Percent className="text-emerald-500 " size={40} />
              <h2 className="text-[18px] font-semibold text-gray-800">
                Low Intrests
              </h2>
            </div>

            <div className="h-[120px] w-[260px] bg-white shadow-lg border border-gray-300 hover:border-green-500 rounded-md p-5 cursor-pointer flex flex-col items-center">
              <ArrowRightLeft className="text-emerald-500 " size={40} />
              <h2 className="text-[18px] font-semibold text-gray-800">
                Balance Transfer
              </h2>
            </div>

            <div className="h-[120px] w-[260px] bg-white shadow-lg border border-gray-300 hover:border-green-500 rounded-md p-5 cursor-pointer flex flex-col items-center">
              <Banknote className="text-emerald-500 " size={40} />
              <h2 className="text-[18px] font-semibold text-gray-800">
                Cash Back
              </h2>
            </div>

            <div className="h-[120px] w-[260px] bg-white shadow-lg border border-gray-300 hover:border-green-500 rounded-md p-5 cursor-pointer flex flex-col items-center">
              <Gift className="text-emerald-500 " size={40} />
              <h2 className="text-[18px] font-semibold text-gray-800">
                Rewards
              </h2>
            </div>

            <div className="h-[120px] w-[260px] bg-white shadow-lg border border-gray-300 hover:border-green-500 rounded-md p-5 cursor-pointer flex flex-col items-center">
              <Plane className="text-emerald-500 " size={40} />
              <h2 className="text-[18px] font-semibold text-gray-800">
                Travel
              </h2>
            </div>

            <div className="h-[120px] w-[260px] bg-white shadow-lg border border-gray-300 hover:border-green-500 rounded-md p-5 cursor-pointer flex flex-col items-center">
              <Briefcase className="text-emerald-500 " size={40} />
              <h2 className="text-[18px] font-semibold text-gray-800">
                Business
              </h2>
            </div>

            <div className="h-[120px] w-[260px] bg-white shadow-lg border border-gray-300 hover:border-green-500 rounded-md py-5 px-5 cursor-pointer flex flex-col items-center">
              <BadgeIndianRupee className="text-emerald-500 " size={40} />
              <h2 className="text-[18px] font-semibold text-gray-800">
                No Annual fee
              </h2>
            </div>
          </div>

          <div className="flex w-full flex-col relative top-10 ">
            <h2 className="italic text-[18px] font-semibold ">Methodology</h2>
            <p className="italic text-[17px] text-gray-600">
              Our editors take a comprehensive, data-driven approach to identify
              the best credit cards in various categories. We use an objective
              rating and ranking system that evaluates over 100 credit cards
              from more than 50 issuers. While this site receives compensation
              from companies listed here, this does not influence our ratings or
              reviews. Learn more{" "}
              <Link to="#" className="text-blue-700">
                here.
              </Link>
            </p>
          </div>
        </div>
        <div className="flex rounded-md  w-full shadow-sm border border-gray-100 mt-10 p-2">
          <p className="text-xs text-gray-600">
            Editorial Note: This content is not provided or commissioned by the
            credit card issuer. Any opinions, analyses, reviews or
            recommendations expressed in this article are those of the author’s
            alone, and may not have been reviewed, approved or otherwise
            endorsed by the credit card issuer. This site may be compensated
            through a credit card issuer partnership.
          </p>
        </div>
      </div>
    </>
  );
};

export default CreditCardFormPage;
