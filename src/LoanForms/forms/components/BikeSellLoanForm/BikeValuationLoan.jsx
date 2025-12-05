import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { ElectricBolt } from "@mui/icons-material";
import BackgroundImage from "/src/assets/Background.webp";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BikeValuationLoan = () => {
  const [sellBikeData, setSellBikeData] = useState(null);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [InputResult, setInputResult] = useState("");

  // Selected Data
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedSellTime, setSelectedSellTime] = useState("");
  const [mobile, setMobile] = useState("");

  // ✅ Search Inputs (new)
  const [modelSearch, setModelSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const navigate = useNavigate();

  // Fetch Data
  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const res = await fetch("/LoanFormsData/BikeSellData.json");
        const data = await res.json();
        setSellBikeData(data[0]);
      } catch (err) {
        console.error("Error fetching bike data:", err);
      }
    };
    fetchBikeData();
  }, []);

  // Animation Variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
      transition: { duration: 0.4 },
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
      transition: { duration: 0.4 },
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    toast.success("Your Query is loaded");
    navigate("/Bike-Valuation");
  };

 const onSubmit = async (e) => {
  e.preventDefault();

  const payloadData = {
    brand: selectedBrand,
    model: selectedModel,
    year: selectedYear,
    fuel: selectedFuel,
    location: selectedLocation,
    sellTime: selectedSellTime,
    mobile: mobile,
  };

  console.log("Sending: ", payloadData);

  const payload = {
    secret_token: "cc-ASJFSNFRGF",
    data_list: [
      {
        source_name: "api_post_method",
        json_data: payloadData,
        bucket_is: "ach.zippycash.online",
        active: true,
        status: "on_submit",
        remark: "-",
      },
    ],
  };

  const res = await fetch(
    "https://ads.ads-astra.com/api/ndatalab_workspace/receiver-bucket1",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken":
          "0SGf2FTPgeyUgPnYTYVc9anlbIQZGm7IxMpoojKCMfNlzykSuW93sk4yqD14TMPr",
      },
      body: JSON.stringify(payload),
    }
  );

  toast.success("Successfully Submitted!");
};


  // ✅ Filtered Data for Models & Locations & Brand

  const filterdBrand =
    sellBikeData?.brands?.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    ) || [];

  const filteredModels =
    sellBikeData?.brands
      ?.find((b) => b.name === selectedBrand)
      ?.models?.filter((model) =>
        model.toLowerCase().includes(modelSearch.toLowerCase())
      ) || [];

  const filteredLocations =
    sellBikeData?.locations?.filter((loc) =>
      loc.toLowerCase().includes(locationSearch.toLowerCase())
    ) || [];

  return (
    <div className="relative w-full flex justify-center items-center">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            padding: "15px 20px",
            minWidth: "220px",
            maxWidth: "90%",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 500,
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            wordBreak: "break-word",
          },
          success: {
            iconTheme: { primary: "#16A34A", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#DC2626", secondary: "#fff" },
          },
        }}
      />

      {/* Background */}
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute inset-0 w-full min-h-screen object-cover object-top opacity-40"
      />

      <form
        onSubmit={onSubmit}
        className="top-10 relative z-10 flex flex-col items-center justify-start bg-gray-100 rounded-xl shadow-md max-w-[900px] w-[96%] sm:w-[88%] md:max-w-3xl h-[460px] px-4 sm:px-8 md:px-10 py-10 sm:py-10 mx-auto opacity-95 backdrop-blur-md overflow-y-auto overflow-x-hidden"
      >
        {/* Header Section */}
        {step <= 1 && (
          <div className="relative w-full flex flex-col px-4 sm:px-4 bg-slate-100 rounded-2xl py-10">
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <h2 className="text-[15px] sm:text-[16px] font-bold text-gray-900 mt-2 sm:mt-0">
                Enter Your Bike Registration Number
              </h2>
              <p className="mt-2 sm:mt-0 p-1 bg-fuchsia-600 text-[12px] sm:text-[13px] text-white rounded-md flex items-center gap-1">
                <ElectricBolt sx={{ fontSize: "13px" }} /> 2x Instant Result
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center w-full gap-3 mt-4 px-0 sm:px-3">
              <input
                type="text"
                value={InputResult}
                onChange={(e) => setInputResult(e.target.value)}
                placeholder="Enter Vehicle Number"
                className="border bg-white border-gray-300 px-3 py-3 rounded-md w-full text-[16px] sm:text-[18px] focus:outline-none focus:ring-1 focus:ring-green-400 placeholder:text-[14px]"
              />
              <button
                type="button"
                onClick={handleInputSubmit}
                className="bg-green-400 text-white px-4 py-3 rounded-lg hover:bg-green-500 text-[16px] sm:text-[18px] cursor-pointer w-full sm:w-80 mt-2 sm:mt-0"
              >
                Get Valuation
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        {step <= 1 && (
          <div className="text-gray-400 w-full flex items-center justify-center mt-8">
            <div className="w-full border-t border-gray-300"></div>
            <span className="font-semibold text-gray-700 px-3 text-sm">OR</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
        )}

        {/* Back Button */}
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="cursor-pointer absolute top-3 left-3 sm:left-5 text-gray-700 hover:text-green-500 transition-all z-20"
            aria-label="Back"
          >
            <ArrowLeft size={24} />
          </button>
        )}

        <p className="float-right relative left-80 font-semibold">
          {" "}
          Step:{step + 0}
        </p>

        {/* Steps */}
        <div className="relative w-full min-h-[360px]">
          <AnimatePresence custom={direction} mode="wait">
            {/* Step 1 - Brand */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[16px] sm:text-[17px] font-semibold mb-4 text-gray-800">
                  Select the <span className="font-semibold">brand </span> of
                  your Bike
                </h2>

                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search your brand..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm sm:text-[15px] focus:outline-none focus:ring-1 focus:ring-green-300"
                  />
                  <Search
                    size={19}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>

                <div className="mt-10 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 md:gap-5 lg:gap-6">
                  {filterdBrand.length > 0 ? (
                    filterdBrand.map((brand, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedBrand(brand.name);
                          handleNext();
                        }}
                        className={`flex flex-col items-center justify-center bg-gray-100 rounded-md shadow-sm cursor-pointer transition-all duration-200 ${
                          selectedBrand === brand.name
                            ? "border-green-500 shadow-md"
                            : "border-gray-300"
                        } px-3 py-3 sm:px-3 sm:py-2 md:px-3 md:py-3 lg:px-3 lg:py-4`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={brand.img}
                            alt={brand.name}
                            className="rounded-full object-contain transition-transform duration-300 hover:scale-105 lg:h-8 lg:w-8 md:h-8 md:w-8 sm:h-10 sm:w-10 max-[480px]:h-9 max-[480px]:w-9 max-[360px]:h-8 max-[360px]:w-8"
                          />
                          <span className="text-gray-900 text-[12px] font-semibold">
                            {brand.name}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm col-span-full">
                      No brand found.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2 - Model with Search */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full mt-3"
              >
                <h2 className="text-[16px] sm:text-[17px] font-semibold mb-4 text-gray-800">
                  Select the model of your Bike ({selectedBrand})
                </h2>

                {/* 🔍 Search Bar */}

                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search your Bike model..."
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm sm:text-[15px] focus:outline-none focus:ring-1 focus:ring-green-300"
                  />
                  <Search
                    size={19}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 s">
                  {filteredModels.length > 0 ? (
                    filteredModels.map((model, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedModel(model);
                          handleNext();
                        }}
                        className={`flex items-center justify-center px-3 py-6 sm:px-5 sm:py-10 bg-gray-100 shadow-xs border border-gray-300  ${
                          selectedModel === model
                            ? "border-green-500 shadow-md"
                            : "border-gray-300"
                        } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                      >
                        <span className="text-gray-800 font-medium text-[13px] sm:text-sm text-center px-2">
                          {model}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm col-span-full">
                      No models found.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3 - Year */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[16px] sm:text-[17px] font-semibold mb-4 text-gray-800">
                  Select Model Year
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-6 shadow-2xs">
                  {sellBikeData?.years?.map((year, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedYear(year);
                        handleNext();
                      }}
                      className={`flex items-center justify-center px-10 py-6 sm:px-10 sm:py-5 bg-gray-100 border border-gray-200 shadow-md  ${
                        selectedYear === year
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-800 font-medium text-[14px] sm:text-sm text-center px-2">
                        {year}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4 - Fuel */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[16px] sm:text-[17px] font-semibold mb-4 text-gray-800">
                  Select the <span className="font-bold">variant</span> of your
                  Bike
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {sellBikeData?.fuels?.map((fuels, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedFuel(fuels);
                        handleNext();
                      }}
                      className={`flex items-center justify-center px-3 py-6 sm:px-5 sm:py-10 bg-gray-100 border border-gray-300 shadow-md ${
                        selectedFuel === fuels
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-800 font-medium text-[13px] sm:text-sm text-center px-2">
                        {fuels}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5 - Location with Search */}
            {step === 5 && (
              <motion.div
                key="step5"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[16px] sm:text-[17px] font-semibold mb-4 text-gray-800">
                  Select RTO location of your Bike
                </h2>

                {/* 🔍 Location Search */}

                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search your city..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm sm:text-[15px] focus:outline-none focus:ring-1 focus:ring-green-300"
                  />
                  <Search
                    size={19}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedLocation(location);
                          handleNext();
                        }}
                        className={`flex items-center justify-center px-3 py-3 sm:px-5 sm:py-5 bg-gray-100  border border-gray-300 shadow-md  ${
                          selectedLocation === location
                            ? "border-green-500 shadow-md"
                            : "border-gray-300"
                        } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                      >
                        <span className="text-gray-800 font-medium text-[13px] sm:text-sm text-center px-2">
                          {location}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm col-span-full">
                      No locations found.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 6 */}
            {step === 6 && (
              <motion.div
                key="step6"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[16px] sm:text-[17px] font-semibold mb-4 text-gray-800">
                  When do you want to sell your car?
                </h2>
                <div className="grid grid-cols-1 gap-4 mt-2">
                  {sellBikeData?.SellPeriod?.map((sellperiod, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedSellTime(sellperiod);
                        handleNext();
                      }}
                      className={`flex items-center justify-center w-full py-4 sm:py-5 bg-gray-100 border ${
                        selectedSellTime === sellperiod
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-800 font-medium text-[13px] sm:text-sm text-center px-2">
                        {sellperiod}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 7 */}
            {step === 7 && (
              <motion.div
                key="step7"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center justify-center w-full mt-8"
              >
                <div className="relative bottom-5 flex flex-col  px-10 w-3xl">
                  <p className="text-gray-800 text-[14px]">One Last step</p>
                  <p className="text-gray-800 font-semibold mt-3 text-[18px]">
                    Enter Your mobile number to see your Bike Valuation
                  </p>
                  <div className="flex w-full  items-center gap-5 mt-5">
                    <input
                      type="text"
                      required
                      maxLength={10}
                      minLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Mobile number"
                      className="px-3 py-3 focus:outline-none focus:border border-gray-300 rounded-lg focus:ring-1 ring-green-500 w-full border placeholder:text-[14px] "
                    />

                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold  py-3 rounded-lg transition-all duration-300 w-70 text-[18px] cursor-pointer"
                    >
                      Get Otp
                    </button>
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-600 mb-4">
                  Don't worry we will not span you. :)
                </p>

                <div className="flex w-full gap-2 items-center justify-center mt-10 ">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded-md cursor-pointer"
                  />
                  <p className="font-bold text-[14px]">
                    Receive updates on whatshap
                  </p>
                </div>
                <div>
                  <p className="text-[12px] mt-5 text-gray-600">
                    By logging in, I agree{" "}
                    <span className="text-green-700">terms</span> and{" "}
                    <span className="text-green-700">policy</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
};

export default BikeValuationLoan;
