import React, { useEffect, useState } from "react";
import AutoManImage from "/src/assets/AutoSellImage.png";
import CarPic from "/src/assets/CarPic.jpg"; // ✅ new mobile image
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import { ArrowRight, Book, PowerIcon } from "lucide-react";
import { CurrencyRupeeSharp } from "@mui/icons-material";
import carSell from "/src/assets/CarSell.jpg";
import CarDocument from "/src/assets/CarDocument.avif";
import CarInspect from "/src/assets/CarInspect.avif";
import CarMan from "/src/assets/CarMan.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AutoSell = () => {
  const [carData, setCarData] = useState([]);
  const [registrationNumber, setRegistrationNumber] = useState("");

  const Navigate = useNavigate();

  const carSellNavigate = () => {
    Navigate("/Car-Valuation");
  };

  const BikeNavigate = () => {
    Navigate("/Bike-Valuation");
  };

  // Typewriter placeholder
  const [text] = useTypewriter({
    words: ["HR 26 CD 3233", "DL 10 AB 1234", "MH 12 XY 4567"],
    loop: 0,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  // Fetch JSON data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/AutoSellData.json");
        const data = await res.json();
        setCarData(data[0]);
      } catch (error) {
        console.log("❌ Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration No is", registrationNumber);

    toast.success("Form Submitted Successfully!");
  };

  return (
    <div className="flex flex-col w-full bg-gray-100 overflow-hidden">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            padding: "15px 20px",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 500,
          },
        }}
      />

      {/* 🔹 Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-20">
        {/* 🖼️ Background Image */}
        {/* ✅ Desktop and Mobile Image Swap */}
        <picture>
          <source media="(max-width: 900px)" srcSet={CarPic} />
          <img
            src={AutoManImage}
            alt="Auto Sell"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
          />
        </picture>

        {/* 🌟 Main Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-10 md:gap-16">
          {/* 🧩 Left Text */}
          <div className=" relative top-10 w-full  text-center md:text-left text-white flex flex-col items-center md:items-start">
            <h2 className="text-4xl sm:text-3xl md:text-4xl lg-text-4xl font-bold  drop-shadow-lg">
              Sell your Vehicle in minutes
            </h2>
            <p className="text-base sm:text-xl md:text-2xl font-semibold mt-4 drop-shadow-md">
              Get doorstep pickup and instant payment
            </p>
          </div>

          {/* 📋 Right Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 bg-opacity-95 shadow-xl rounded-2xl w-full  max-w-md mx-auto p-6 sm:p-6 flex flex-col gap-6 items-center mt-10 md:mt-0"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 text-center">
              Know Your Vehicle Price Now
            </h2>

            <input
              type="text"
              required
              onChange={(e) => setRegistrationNumber(e.target.value)}
              value={registrationNumber}
              className="w-full py-3 sm:py-4 px-4 sm:px-5 text-xl sm:text-2xl font-bold rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-400 text-center text-gray-900 transition-all duration-300"
              placeholder={text}
            />

            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition text-base sm:text-lg cursor-pointer"
            >
              Get Vehicle Price
            </button>

            <div className="text-gray-500 text-center text-sm sm:text-base">
              ------------ Or ------------
            </div>
            <div className="flex flex-col">
              <p className="text-gray-900 font-semibold text-base sm:text-[19px] relative right-0">
                Start With Your Vehicle Type
              </p>
              <div className=" mt-5 flex gap-8   items-center justify-center  w-full text-gray-700 sm:flex-col md:flex-row       ">
                <div className="flex items-center gap-1 text-[13px]">
                  <PowerIcon size={14} color="blue" />
                  Instant quotes
                </div>
                <div className="flex items-center gap-1 text-[13px]">
                  <Book size={14} color="blue" />
                  Free Evaluation
                </div>
                <div className="flex items-center gap-1 text-[13px]">
                  <CurrencyRupeeSharp sx={{ fontSize: 14, color: "blue" }} />
                  Instant Payment
                </div>
              </div>
              <div className="flex flex-row gap-9 w-full justify-center mt-8 items-center">
                <button className=" text-white text-[18px] font-semibold px-4 py-4 bg-green-500 w-30 rounded-md cursor-pointer transition-transform duration-100 hover:bg-emerald-500 hover:scale-103"
                onClick={BikeNavigate}
                >
                  Bike
                </button>
                <button
                  className=" text-white px-4 py-4 text-[18px] font-semibold bg-green-600 w-30 rounded-md cursor-pointer transition-transform duration-100 hover:bg-emerald-500 hover:scale-103 "
                  onClick={carSellNavigate}
                >
                  Car
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 🔹 Why Sell Here Section */}
      <div className="flex flex-col items-center w-full bg-white rounded-md shadow-md mt-5 p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl text-blue-900 font-semibold mb-6">
          Why Sell Here?
        </h2>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full">
          {[
            {
              img: carSell,
              title: "Sell From Anywhere",
              desc: "From inspection to payment, everything right from your doorstep!",
            },
            {
              img: CarDocument,
              title: "Instant Payment",
              desc: "Get your payment within a day after inspection",
            },
            {
              img: CarInspect,
              title: "Great Price",
              desc: "Largest dealer network + Smart AI Pricing Engine = best deal",
            },
            {
              img: CarMan,
              title: "Warranty Included",
              desc: "We stay with you throughout your car ownership journey",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center max-w-[270px]">
              <div className="h-[200px] sm:h-[230px] md:h-[250px] w-full bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg sm:text-xl mt-3">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm text-center mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoSell;
