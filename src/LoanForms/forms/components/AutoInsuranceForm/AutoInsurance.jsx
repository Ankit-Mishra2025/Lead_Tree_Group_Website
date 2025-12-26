import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import { ElectricBolt } from "@mui/icons-material";
import BackgroundImage from "/src/assets/Background.webp";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { containerClasses } from "@mui/material";
import { useForm } from "react-hook-form";

const AutoInsurance = () => {
  const [sellCarData, setSellCarData] = useState(null);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [InputResult, setInputResult] = useState("");
  const [Mobile, setMobile] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);






  // ✅ Unified selected data (less state)
  const [selected, setSelected] = useState({
  brand: "",
  model: "",
  year: "",
  fuel: "",
  location: "",
  owner: "",
  gender: "",
  married: "",
  accidentFault: "",
  spouseMilitaryOptions: "",
  insuranceOptions: "",
  secondVehicle: "",
  lastStep: "",
  Mobile: "",

  // 👇 PERSONAL INFO
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  address: "",
  city: "",
  zip: "",
});


  
const [secondVehicleValues, setSecondVehicleValues] = useState({
  brand: "",
  model: "",
  year: ""
});

const handleSecondVehicleSelection = (value) => {
  setSelected((prev) => ({ ...prev, secondVehicle: value }));

  if (value === "No") {
    // Skip second vehicle details and go to step 13
    setStep(13);
  } else {
    // Stay on step 12 to show brand/model/year
    setStep(12);
  }
};

const handleInsuranceSelection = (value) => {
  setSelected((prev) => ({ ...prev, insuranceOptions: value }));

  if (value === "No") {
    // Skip insurance details and go to step 12
    setStep(12);
  } else {
    // Stay on step 11 to show insurance companies & years
    setStep(11);
  }
}

  const [PersonalData, setPersonalData] = useState([
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter first name",
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter last name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter email",
  },
  {
    id: "dob",
    label: "DOB",
    type: "date",
    required: true,
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    required: true,
  },
  {
    id: "city",
    label: "City",
    type: "text",
    required: true,
  },
  {
    id: "zip",
    label: "ZIP",
    type: "text",
    required: true,
  },
]);


  


const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  mode: "onBlur", // blur pe validation
});

const getRules = (field) => {
  const rules = {
    required: field.required ? `${field.label} is required` : false,
  };

  if (field.type === "email") {
    rules.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter valid email address",
    };
  }

  if (field.id === "zip") {
    rules.pattern = {
      value: /^[0-9]{5,6}$/,
      message: "Enter valid ZIP code",
    };
  }

  if (field.id === "dob") {
    rules.validate = {
      yearCheck: (value) => {
        if (!value) return true;
        const [year] = value.split("-");
        if (year.length !== 4) return "Year must be 4 digits";
        if (+year > new Date().getFullYear())
          return "Future date not allowed";
        return true;
      },
    };
  }

  return rules;
};


const handlePersonalNext = handleSubmit((data) => {
  setSelected((prev) => {
    const updated = { ...prev, ...data };
    savePartialData(updated); // ✅ PARTIAL SAVE
    return updated;
  });

  setStep(14); // ✅ go to final step
});





  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/LoanFormsData/AutosInsuranceData.json"); // CHECK NAME
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setPersonalData(data[0].personalInfoFields); // ⭐ PERFECT
        } else {
          console.log("Invalid JSON structure", data);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ Unified search inputs
  const [search, setSearch] = useState({
    brand: "",
    model: "",
    location: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch Data (once)
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const res = await fetch("/LoanFormsData/AutosInsuranceData.json");
        const data = await res.json();
        setSellCarData(data[0]);
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };
    fetchCarData();
  }, []);

  // ✅ Animation Variants (memoized)
  const variants = useMemo(
    () => ({
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
    }),
    []
  );

  const updateAndNext = (key, value) => {
  setSelected((prev) => {
    const updated = { ...prev, [key]: value };
    savePartialData(updated);
    return updated;
  });

  setDirection(1);
  setStep((prev) => prev + 1);
};

  const resetAllFields = () => {
    setSelected({
      brand: "",
      model: "",
      year: "",
      fuel: "",
      location: "",
      owner: "",
      gender: "",
      married: "",
      accidentFault: "",
      spouseMilitaryOptions: "",
      insuranceOptions: "",
      secondVehicle: "",
      Mobile: "",
      ...personalValues,
    });

    setMobile("");
    setSearch({ brand: "", model: "", location: "" });
  };

  const savePartialData = async (data) => {
    console.log("Saving partial:", data); // ⭐ console pe full data

    const payload = {
      secret_token: "cc-ASJFSNFRGF",
      data_list: [
        {
          source_name: "api_partial_save",
          json_data: {
            loan_type: "autoInsurance",
            ...data,
          },
        },
      ],
    };

    try {
      const response = await fetch(
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

      const result = await response.json();
      console.log("Partial Save Response:", result);
      console.log("Payload Sent:", payload);
    } catch (e) {
      console.log("Partial save failed", e);
    }
  };

  // ✅ Handlers (memoized)
  const handleNext = useCallback(() => {
    savePartialData(selected);
    setDirection(1);
    setStep((prev) => prev + 1);
  }, []);

  const handleBack = useCallback(() => {
    setDirection(-1);
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const handleInputSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Input Registration is", InputResult);
      toast.success("Your Query is loaded");

    

    },
    [InputResult, navigate]
  );

  const onSubmit = async (e) => {
    try {
      updateAndNext("Mobile", Mobile, true);
      setSubmitLoader(true);

 setTimeout(() => {
      setSubmitLoader(false)
      navigate("/successPage")
    },1000);

      e.preventDefault();



      const payloadData = {
        brand: selected.brand,
        model: selected.model,
        year: selected.year,
        fuel: selected.fuel,
        location: selected.location,

        Mobile: selected.Mobile,
        owner: selected.owner,
        gender: selected.gender,
        married: selected.married,
        accidentFault: selected.accidentFault,
        spouseMilitaryOptions: selected.spouseMilitaryOptions,
        insuranceOptions: selected.insuranceOptions,
        secondVehicle: selected.secondVehicle,
        lastStep: selected.lastStep,
     
        firstName: selected.firstName,
    lastName: selected.lastName,
    email: selected.email,
    dob: selected.dob,
    address: selected.address,
    city: selected.city,
    zip: selected.zip,
      };

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


      console.log("Submited data is", payloadData);
    } catch (error) {
      console.log("Error ", error);
    } finally {
      setSubmitLoader(false);
    }
  };



  // ✅ Handlers for selections and searches (memoized)
  const handleSelect = useCallback((key, value) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSearchChange = useCallback((key, value) => {
    setSearch((prev) => ({ ...prev, [key]: value }));
  }, []);

  // ✅ Filtered data (memoized to avoid re-filtering every render)
  const filteredBrands = useMemo(() => {
    if (!sellCarData?.brands) return [];
    return sellCarData.brands.filter((brand) =>
      brand.name.toLowerCase().includes(search.brand.toLowerCase())
    );
  }, [sellCarData, search.brand]);

  const filteredModels = useMemo(() => {
    if (!sellCarData?.brands || !selected.brand) return [];
    const brandObj = sellCarData.brands.find((b) => b.name === selected.brand);
    return (
      brandObj?.models?.filter((m) =>
        m.toLowerCase().includes(search.model.toLowerCase())
      ) || []
    );
  }, [sellCarData, selected.brand, search.model]);

  const filteredLocations = useMemo(() => {
    if (!sellCarData?.locations) return [];
    return sellCarData.locations.filter((loc) =>
      loc.toLowerCase().includes(search.location.toLowerCase())
    );
  }, [sellCarData, search.location]);

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
          },
          success: { iconTheme: { primary: "#16A34A", secondary: "#fff" } },
          error: { iconTheme: { primary: "#DC2626", secondary: "#fff" } },
        }}
      />

      {/* Background */}
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute inset-0 w-full min-h-screen object-cover object-top opacity-35 "
      />

      <form
        onSubmit={onSubmit}
        className="top-10 relative z-10 flex flex-col items-center justify-start bg-gray-100 rounded-xl shadow-md max-w-[800px] w-[96%] sm:w-[88%] md:max-w-4xl h-[480px] px-4 sm:px-8 md:px-10 py-10 sm:py-10 mx-auto opacity-95 backdrop-blur-md overflow-y-auto overflow-x-hidden"
      >
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

        <p className="float-end relative left-90 text-md font-semibold">
          Step: {step + 1}
        </p>
        {/* Steps */}
        <div className="relative w-full min-h-[360px]">
          <AnimatePresence custom={direction} mode="wait">
            {/* Step 1 */}

            {step === 1 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[18px] md:text-[30px] sm:text-[20px] font-bold mb-4 text-gray-800 text-center">
                  Select Vehicle Year
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 shadow-2xs">
                  {sellCarData?.years?.map((year, i) => (
                    <div
                      key={i}
                      onClick={() => updateAndNext("year", year)}
                      className={`flex items-center justify-center px-10 py-6 sm:px-10 sm:py-5 bg-gray-100 border border-gray-300 shadow-xs ${
                        selected.year === year
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-700 font-medium text-[16px] md:text-[16px] sm:text-sm text-center px-2">
                        {year}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Select the <span className="font-semibold">brand</span> of
                  your car
                </h2>

                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search your brand..."
                    value={search.brand}
                    onChange={(e) =>
                      handleSearchChange("brand", e.target.value)
                    }
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-green-300 focus:outline-none"
                  />
                  <Search
                    size={19}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredBrands.length > 0 ? (
                    filteredBrands.map((brand, i) => (
                      <div
                        key={i}
                        onClick={() => updateAndNext("brand", brand.name)}
                        className={`flex flex-col items-center justify-center bg-slate-50 shadow-sm rounded-md cursor-pointer transition-all  ${
                          selected.brand === brand.name
                            ? "border-green-500 shadow-md"
                            : "border-gray-300"
                        } px-5 py-4`}
                      >
                        <span className="text-gray-800 text-[14px] md:text-[16px] font-semibold">
                          {brand.name}
                        </span>
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

            {/* Step 3 - Model */}
            {step === 3 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Select the model of your {selected.brand} Car
                </h2>

                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search your car model..."
                    value={search.model}
                    onChange={(e) =>
                      handleSearchChange("model", e.target.value)
                    }
                    className="w-full px-4 py-3 pr-10 border border-gray-300  rounded-md text-sm focus:ring-1 focus:outline-none focus:ring-green-300"
                  />
                  <Search
                    size={19}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 mt-8">
                  {filteredModels.length > 0 ? (
                    filteredModels.map((model, i) => (
                      <div
                        key={i}
                        onClick={() => updateAndNext("model", model)}
                        className={`flex items-center justify-center px-3 py-6 md:px-5 md:py-6 bg-slate-100  rounded-lg hover:border-green-400 cursor-pointer border border-gray-300 shadow-xs ${
                          selected.model === model
                            ? "border-green-500 shadow-md"
                            : "border-gray-300"
                        }`}
                      >
                        <span className="text-gray-800 font-medium text-[14px] md:text-[16px] text-center">
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
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Select the <span className="font-bold">variant</span> of your{" "}
                  {selected.brand} Car
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
                  {sellCarData?.fuels?.map((fuels, i) => (
                    <div
                      key={i}
                      onClick={() => updateAndNext("fuel", fuels)}
                      className={`flex items-center justify-center px-5 py-4 md:px-5 md:py-6 bg-gray-100 border border-gray-300 shadow-xs ${
                        selected.fuel === fuels
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-700 font-medium text-[14px] md:text-[16px] sm:text-sm text-center px-2">
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
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Select RTO location of your car
                </h2>

                {/* 🔍 Location Search */}

                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search your city..."
                    value={search.location}
                    onChange={(e) =>
                      handleSearchChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm sm:text-[15px] focus:outline-none focus:ring-1 focus:ring-green-300"
                  />
                  <Search
                    size={19}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 mt-8">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location, i) => (
                      <div
                        key={i}
                        onClick={() => updateAndNext("location", location)}
                        className={`flex items-center justify-center px-3 py-3 sm:px-5 sm:py-5 bg-gray-100 border border-gray-300 shadow-xs  ${
                          selected.location === location
                            ? "border-green-500 shadow-md"
                            : "border-gray-300"
                        } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                      >
                        <span className="text-gray-700 font-medium text-[14px] md:text-[16px] sm:text-sm text-center px-2">
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
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Are You a HomeOwner ?
                </h2>
                <div className=" w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5 sm:gap-8 mt-8">
                  {sellCarData?.owner?.map((owner, i) => (
                    <div
                      key={i}
                      onClick={() => updateAndNext("owner", owner)}
                      className={`flex items-center justify-center w-full px-3 py-4 md:px-10 md:py-5 bg-gray-100 border border-gray-300 shadow-xs ${
                        selected.owner === owner
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-700 font-medium text-[14px] md:text-[20px] sm:text-sm text-center px-2">
                        {owner}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                key="step7"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Select Your Gender ?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 mt-8">
                  {sellCarData?.gender?.map((Gender, i) => (
                    <div
                      key={i}
                      onClick={() => updateAndNext("gender", Gender)}
                      className={`flex items-center justify-center px-3 py-5 md:px-5 md:py-6 sm:px-5 sm:py-10 bg-gray-100 border border-gray-300 shadow-xs ${
                        selected.Gender === Gender
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-800 font-medium text-[14px] md:text-[17px] sm:text-sm text-center px-2">
                        {Gender}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 8 && (
              <motion.div
                key="step8"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Are You Married ?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mt-8">
                  {sellCarData?.married?.map((married, i) => (
                    <div
                      key={i}
                      onClick={() => updateAndNext("married", married)}
                      className={`flex items-center justify-center px-3 py-5 md:px-5 md:py-6 sm:px-5 sm:py-10 bg-gray-100 border border-gray-300 shadow-xs ${
                        selected.married === married
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-700 font-medium text-[14px] md:text-[19px] sm:text-sm text-center ">
                        {married}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 9 && (
              <motion.div
                key="step9"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Any Fault accident in last 3 years ?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mt-8">
                  {sellCarData?.accidentFault?.map((accidentFault, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        updateAndNext("accidentFault", accidentFault)
                      }
                      className={`flex items-center justify-center px-3 py-5 md:px-5 md:py-6 sm:px-5 sm:py-10 bg-gray-100 border border-gray-300 shadow-xs ${
                        selected.accidentFault === accidentFault
                          ? "border-green-500 shadow-md"
                          : "border-gray-300"
                      } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                    >
                      <span className="text-gray-700 font-medium text-[14px] md:text-[18px] sm:text-sm text-center px-2">
                        {accidentFault}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 10 && (
              <motion.div
                key="step10"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
                  Are Your Spouse an active member or an honorably discharged
                  veteran of the Military ?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mt-10">
                  {sellCarData?.spouseMilitaryOptions?.map(
                    (spouseMilitaryOptions, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          updateAndNext(
                            "spouseMilitaryOptions",
                            spouseMilitaryOptions
                          )
                        }
                        className={`flex items-center justify-center px-3 py-5 md:px-4 md:py-6 sm:px-5 sm:py-10 bg-gray-100 border border-gray-300 shadow-xs ${
                          selected.spouseMilitaryOptions ===
                          spouseMilitaryOptions
                            ? "border-green-500 shadow-md"
                            : "border-gray-300"
                        } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
                      >
                        <span className="text-gray-700 font-medium text-[14px] md:text-[18px] sm:text-sm text-center px-2">
                          {spouseMilitaryOptions}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}


{step === 11 && (
  <motion.div
    key="step11"
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    className="w-full"
  >
    <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
      Are You Currently Insured with any company?
    </h2>

    {/* Insurance Yes/No Options */}
    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mt-8">
      {sellCarData?.insuranceOptions?.map((option, i) => (
        <div
          key={i}
          onClick={() => handleInsuranceSelection(option)}
          className={`flex items-center justify-center px-3 py-6 md:px-4 md:py-6 sm:px-5 sm:py-10 bg-gray-100 border border-gray-300 shadow-xs ${
            selected.insuranceOptions === option
              ? "border-green-500 shadow-md"
              : "border-gray-300"
          } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
        >
          <span className="text-gray-700 font-medium text-[14px] md:text-[18px] sm:text-sm text-center px-2">
            {option}
          </span>
        </div>
      ))}
    </div>

    {/* Conditional Insurance Details Dropdown */}
    {selected.insuranceOptions === "Yes" && (
      <div className="mt-6 flex flex-col gap-6 w-full max-w-md mx-auto">
        {/* Insurance Company Dropdown */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800">
            Select Insurance Company
          </label>
          <select
            value={selected.insuranceCompany}
            onChange={(e) =>
              setSelected((prev) => ({
                ...prev,
                insuranceCompany: e.target.value,
                insuranceYear: "", // Reset year on company change
              }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="">Select Company</option>
            {sellCarData?.insuranceDetails?.map((company, i) => (
              <option key={i} value={company.company}>
                {company.company}
              </option>
            ))}
          </select>
        </div>

        {/* Insurance Year Dropdown */}
        {selected.insuranceCompany && (
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Select Insurance Duration
            </label>
            <select
              value={selected.insuranceYear}
              onChange={(e) =>
                setSelected((prev) => ({
                  ...prev,
                  insuranceYear: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="">Select Year</option>
              {sellCarData?.insuranceDetails
                ?.find((c) => c.company === selected.insuranceCompany)
                ?.years.map((year, j) => (
                  <option key={j} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Next Button (Only show if company + year selected) */}
        {selected.insuranceCompany && selected.insuranceYear && (
          <button
            type="button"
            onClick={() => setStep(12)}
            className="mb-5 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Next
          </button>
        )}
      </div>
    )}
  </motion.div>
)}



            {step === 12 && (
  <motion.div
    key="step12"
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    className="w-full"
  >
    <h2 className="text-[18px] md:text-[35px] sm:text-[20px] text-center font-semibold mb-4 text-gray-800">
      Have you any kind of second vehicle ?
    </h2>

    {/* Yes / No selection */}
    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mt-8">
      {sellCarData?.secondVehicle?.map((secondVehicle, i) => (
        <div
          key={i}
          onClick={() => handleSecondVehicleSelection(secondVehicle)}
          className={`flex items-center justify-center px-3 py-6 md:px-4 md:py-6 sm:px-5 sm:py-10 bg-gray-100 border border-gray-300 shadow-xs ${
            selected.secondVehicle === secondVehicle
              ? "border-green-500 shadow-md"
              : "border-gray-300"
          } rounded-lg shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all duration-200`}
        >
          <span className="text-gray-700 font-medium text-[14px] md:text-[18px] sm:text-sm text-center px-2">
            {secondVehicle}
          </span>
        </div>
      ))}
    </div>

    {/* Conditional: Show Brand, Model, Year if 'Yes' */}
    {selected.secondVehicle === "Yes" && (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Brand */}
        <select
          value={secondVehicleValues.brand}
          onChange={(e) =>
            setSecondVehicleValues((prev) => ({
              ...prev,
              brand: e.target.value,
              model: "", // Reset model when brand changes
            }))
          }
          className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="">Select Brand</option>
          {sellCarData?.brands?.map((brand) => (
            <option key={brand.name} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>

        {/* Model */}
        <select
          value={secondVehicleValues.model}
          onChange={(e) =>
            setSecondVehicleValues((prev) => ({
              ...prev,
              model: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-green-500"
          disabled={!secondVehicleValues.brand} // Disable until brand is selected
        >
          <option value="">Select Model</option>
          {secondVehicleValues.brand &&
            sellCarData?.brands
              ?.find((b) => b.name === secondVehicleValues.brand)
              ?.models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
        </select>

        {/* Year */}
        <select
          value={secondVehicleValues.year}
          onChange={(e) =>
            setSecondVehicleValues((prev) => ({
              ...prev,
              year: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="">Select Year</option>
          {sellCarData?.years?.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => {
            // Save second vehicle details in selected state
            setSelected((prev) => ({
              ...prev,
              brand: secondVehicleValues.brand,
              model: secondVehicleValues.model,
              year: secondVehicleValues.year,
            }));
            // Move to Step 13
            setStep(13);
          }}
          disabled={
            !secondVehicleValues.brand ||
            !secondVehicleValues.model ||
            !secondVehicleValues.year
          }
          className="col-span-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mt-4 transition-all duration-300"
        >
          Next
        </button>
      </div>
    )}
  </motion.div>
)}


            {step === 13 && (
  <motion.div
    key="step13"
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    className="flex flex-col items-center justify-center w-full"
  >
    <h2 className="text-3xl font-semibold">Your Personal Info</h2>

    <div
      
      className="w-full grid grid-cols-2 gap-3 mt-8"
    >
      {PersonalData.map((infoData) => (
        <div key={infoData.id} className="w-full">
          <div className="flex w-full flex-col">
            <h2 className="text-[18px] md:text-[15px] sm:text-[15px] font-semibold text-gray-800">
              {infoData.label}
            </h2>

            <input
              type={infoData.type}
              placeholder={infoData.placeholder}
              {...register(infoData.id, getRules(infoData))}
              className={`w-full mt-2 border rounded-md px-2 py-3 sm:px-4 sm:py-3 text-[14px] sm:text-[16px]
                outline-none transition-all duration-200
                ${
                  errors[infoData.id]
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-1 focus:ring-green-500"
                }`}
            />

            {errors[infoData.id] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[infoData.id].message}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Hidden submit button (validation ke liye) */}
     <div className=" p-5 flex justify-center items-center">
 <button
  type="button"
  onClick={handlePersonalNext}
  className="w-40 py-3 font-semibold cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600 hover:translate-x-1 transition-all duration-300"
>
  Continue
</button>
      </div>
     
      
    </div>

    
  </motion.div>
)}


            {/* Step 14 */}
            {step === 14 && (
              <motion.div
                key="step14"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center justify-center w-full mt-8"
              >
                <div className="relative bottom-5 flex flex-col  px-10 w-3xl">
                  <p className="text-gray-800 text-[20px] font-semibold">
                    One Last step
                  </p>
                  <p className="text-gray-800 font-semibold mt-3 text-[17px]">
                    Enter Your mobile number to see your car Valuation
                  </p>
                  <div className="flex w-full  items-center gap-5 mt-5">
                    <input
                      type="text"
                      required
                      maxLength={10}
                      minLength={10}
                      value={Mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Mobile number"
                      className="px-3 py-3 focus:outline-none focus:border border-gray-300 rounded-lg focus:ring-1 ring-green-500 w-full border placeholder:text-[14px] "
                    />
                    <button
                      type="submit"
                      disabled={submitLoader}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold  py-3 rounded-lg transition-all duration-300 w-70 text-[18px] cursor-pointer"
                    >
                      {submitLoader ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin h-5 w-5" />{" "}
                          Validating.
                          
                        </div>
                     
                      ) : (
                        "Get Quotes"
                      )}
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
export default AutoInsurance;
