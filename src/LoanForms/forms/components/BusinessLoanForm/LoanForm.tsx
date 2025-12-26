"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessLoanSchema, BusinessLoanSchemaType } from "./schema";

import {
  Slider,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";

import toast, { Toaster } from "react-hot-toast";
import { Lock, Speed } from "@mui/icons-material";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BusinessLoanForm() {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
const[submitLoader,setSubmitLoader]=useState<boolean>(false)


  // localStorage Storage ---
  const storedData =
    typeof window !== "undefined"
      ? localStorage.getItem("BusinessLoanFormData")
      : null;

  const defaultValues: BusinessLoanSchemaType = storedData
    ? JSON.parse(storedData)
    : {
        businessName: "",
        businessType: "",
        businessIndustry: "",
        loanAmount: 1000000,
        LoanPurpose: "",
        loanUrgency: "",
        loanAmountNeeded: 500000,
        creditScore: "",
        email: "",
        zipCode: "",
      };

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<BusinessLoanSchemaType>({
    resolver: zodResolver(businessLoanSchema),
    mode: "onTouched",
    defaultValues,
  });

  const allValues = watch();

  // --- Persist form data to localStorage ---
  useEffect(() => {
    localStorage.setItem("BusinessLoanFormData", JSON.stringify(allValues));
  }, [allValues]);

  // --- Data fetching from public folder ---
  useEffect(() => {
    let mounted = true;
    const fetchSteps = async () => {
      try {
        const res = await fetch("/LoanFormsData/BusinessLoanData.json");
        if (!res.ok) throw new Error("Failed to load form data");
        const data = await res.json();
        if (mounted) {
          const flatSteps: any[] = [];
          data.forEach((step: any) => {
            step.fields.forEach((field: any) => {
              flatSteps.push({ ...field, title: step.title });
            });
          });
          setSteps(flatSteps);
        }
      } catch (err) {
        console.error("Error loading form data:", err);
        if (mounted) setSteps([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchSteps();
    return () => {
      mounted = false;
    };
  }, []);

const savePartialData = async (data:any) => {
  console.log("Saving partial:", data);  // ⭐ console pe full data
  
  const payload = {
    secret_token: "cc-ASJFSNFRGF",
    data_list: [
      {
        source_name: "api_partial_save",
        json_data: {
          loan_type: "personal_loan",
          ...data
        }
      }
    ]
  };

  try {
    const response = await fetch("https://ads.ads-astra.com/api/ndatalab_workspace/receiver-bucket1", {
      method: "POST",
      headers: {"Content-Type": "application/json",
        "X-CSRFToken": "0SGf2FTPgeyUgPnYTYVc9anlbIQZGm7IxMpoojKCMfNlzykSuW93sk4yqD14TMPr"},
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("Partial Save Response:", result);
    console.log("Payload Sent:", payload);

  } catch (e) {
    console.log("Partial save failed", e);
  }
};




const navigate=useNavigate()

const onSubmit = async (data: any) => {
    if (submitLoader) return;

    try {
      setSubmitLoader(true);

      const payload = {
        formType: "BusinessLoan",
        source_name: "api_post_method",
        loan_type: "business_loan",
        bucket_is: "ach.zippycash.online",
        active: true,
        status: "on_submit",
        remark: "-",

        json_data: {
          ...data,
          creditScore: data.creditScore?.value || data.creditScore || "",
        },
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx9itRP647YupPfHX8tKT_7F74Athjy1VZhPzdc_2srG_vFHF_lQPfp8ppugJVOERURQA/exec",
        {
          method: "POST",

          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const result = await response.json();

      if (!result || result.success !== true) {
        throw new Error(result?.error || "Submission failed");
      }

      navigate("/successPage");
    } catch (error: any) {
      console.error("Submit Error:", error);
      toast.error(error?.message || "Submission failed. Please try again.");
    } finally {
      setSubmitLoader(false);
    }
  };

  const onError = () =>
    toast.error("❌ Please fill all required fields correctly!");

  //Next Button Logic
  const nextStep = async () => {
    const currentFields = steps
      .filter((_, idx) => idx === currentStep)
      .map((f) => f.name);

    // Force validation for untouched fields as well
    const valid = await trigger(currentFields, { shouldFocus: true });

    if (!valid) {
      // Show inline error messages only, no toaster
      return;
    }
savePartialData(allValues)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  //Back Button Logic
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // All Inputs Styling
 const inputClass = `
   w-full mt-8 px-3 py-3 text-[15px] sm:text-[14px] md:text-[16px]
    border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 focus:bg-green-50 focus:border-green-200
    transition-all duration-300 ease-in-out
    hover:translate-y-1 hover:scale-103
  `;

  const renderField = (field: any) => {
    const name = field.name;

    switch (field.type) {
      case "text":
      case "email":
        return (
          <div key={name} className="flex flex-col mb-6 items-center">
           <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl  text-center font-semibold text-black leading-snug w-[250px]  md:w-full">
              {field.label}
            </label>
            <Controller
              name={name}
              control={control}
              render={({ field: rhfField }) => (
                <input
                  {...rhfField}
                  type={field.type}
                  placeholder={field.placeholder || ""}
                  className={`${inputClass} `}
                />
              )}
            />
             {(errors as any)[name] && (
              <span className="text-red-500 text-sm md:text-base mt-1">
                {(errors as any)[name]?.message}
              </span>
            )}
          </div>
        );

      case "phone":
        return (
          <div
            key={name}
            className="flex flex-col mb-8 relative w-full max-w-[600px] mx-auto px-3 sm:px-4 items-center"
          >
           <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl  text-center font-semibold text-black leading-snug w-[250px]  md:w-full">
              {field.label}
            </label>

            <Controller
              name={name}
              control={control}
              rules={{
                required: "Phone number is required",
                validate: (val) => {
                  if (!val) return "Phone number is required";

                  const cleaned = val.replace(/\s/g, "");
                  if (!/^[1-9][0-9]{9}$/.test(cleaned)) {
                    return "Enter a valid 10-digit phone number (cannot start with 0)";
                  }

                  return true;
                },
              }}
              render={({ field: rhfField }) => (
                <input
                  type="tel"
                  {...rhfField}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  className={`w-full mt-5 border rounded-xl px-2 py-3 sm:px-8 sm:py-6 text-[14px] sm:text-[16px] md:text-[16px]  text-gray-900 placeholder-gray-400  focus:outline-none focus:ring-1 focus:ring-green-400 focus:bg-green-50 focus:border-green-200
    transition-all${
                    errors[name]
                      ? "border-red-500 text-red-600 focus:ring-red-400"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              )}
            />

            {(errors as any)[name] && (
              <span className="text-red-500 text-[13px] sm:text-[14px] md:text-[16px] mt-2 text-center sm:text-left">
                {(errors as any)[name]?.message}
              </span>
            )}
          </div>
        );

      case "slider":
        return (
          <div key={name} className="flex flex-col mb-6 ">
            <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl  text-center font-semibold text-black leading-snug  w-full  md:w-full flex items-center ">
              {field.label}
            </label>
            <Controller
              name={name}
              control={control}
              render={({ field: rhfField }) => (
                <>
                  <Slider
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={rhfField.value}
                    onChange={(_, value) => rhfField.onChange(value)}
                    valueLabelDisplay="auto"
                    sx={{
                      marginTop: "50px",
                      height: 5,
                      "& .MuiSlider-track": { backgroundColor: "#16A34A" },
                      "& .MuiSlider-rail": { backgroundColor: "#d1d5db" },
                      "& .MuiSlider-thumb": {
                        width: 28,
                        height: 28,
                        backgroundColor: "Black",
                        "&:hover, &.Mui-focusVisible, &.Mui-active": {
                          boxShadow: "0 0 0 8px rgba(30,150,120,0.16)",
                          border: "1px solid black",
                        },
                      },
                    }}
                  />
                  <input
                    type="text"
                    readOnly
                    className={`${inputClass} mt-3 bg-gray-50`}
                    value={`₹ ${(rhfField.value || 0).toLocaleString()}`}
                  />
                </>
              )}
            />
          </div>
        );

      case "select":
        return (
          <div key={name} className="flex flex-col mb-8 w-full items-center">
            {/* Label */}
            <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl   font-semibold text-black leading-snug w-[230px]  md:w-full text-center">
              {field.label}
            </label>

            <FormControl
              fullWidth
              sx={{
                mt: { xs: 2, sm: 3, md: 4 },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    borderColor: "#16A34A",
                    boxShadow: "0 0 0 2px rgba(34,197,94,0.15)",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#16A34A",
                },
              }}
            >
              <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={{
                  required: field.required
                    ? `${field.label} is required`
                    : false,
                }}
                render={({ field: rhfField }) => (
                  <Select
                    {...rhfField}
                    displayEmpty
                    sx={{
                      py: "5",
                      backgroundColor: "#FFFFFF",
                      borderRadius: { xs: 0.8, sm: 1.5, md: 2 },
                      "&.Mui-focused": {
                        boxShadow: "0 0 0 2px rgba(22,163,74,0.2)",
                      },
                      "& .MuiSelect-select": {
                        padding: { xs: "15px", sm: "14px", md: "16px" },
                        fontSize: { xs: "14px", sm: "16px", md: "17px" },
                        color: rhfField.value ? "black" : "#6B7280",
                      },
                    }}
                    MenuProps={{
                      disableAutoFocusItem: true, // prevent focus flicker
                      PaperProps: {
                        sx: {
                          borderRadius: { xs: 1, sm: 1.5, md: 2 },
                          mt: { xs: 2, sm: 1 },
                          backgroundColor: "#FFFFFF",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          p: 1,
                        },
                      },
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                    }}
                  >
                    {/* Placeholder */}
                    <MenuItem
                      value=""
                      disabled
                      sx={{
                        color: "#B6AE9F",
                        fontSize: { xs: "14px", sm: "14px", md: "16px" },
                      }}
                    >
                      {field.placeholder ?? "Select an option"}
                    </MenuItem>

                    {/* Options */}
                    {field.options?.map((opt: any, idx: number) => (
                      <MenuItem
                        key={idx}
                        value={opt.value ?? opt}
                        disableRipple
                        sx={{
                          py: 1.5,
                          px: 1.5,
                          borderRadius: 1,
                          backgroundColor: "#FFFFFF",
                          fontSize: { xs: "13px", sm: "14px", md: "16px" },
                          border: "1.5px solid #E5E7EB",
                          transition:
                            "background-color 0.25s ease, border 0.25s ease",
                          "&:hover": {
                            backgroundColor: "#CBCBCB", // ✅ hover only this item
                            border: "1px solid #16A34A",
                          },
                          "&:not(:hover)": {
                            backgroundColor: "#FFFFFF", // ✅ keeps others static
                            borderColor: "#E5E7EB",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#BBF7D0 !important", // selected stays light green
                            border: "1px solid #16A34A",
                          },
                        }}
                      >
                        {opt.label ?? opt}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              {/* Error message */}

              {(errors as any)[name] && (
                <span className="text-red-500 text-sm md:text-base mt-1 text-center font-semibold">
                  {(errors as any)[name]?.message}
                </span>
              )}
            </FormControl>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <CircularProgress color="success" size={50} />
        <span className="mt-4 text-lg sm:text-base text-gray-700 text-center">
          Loading...
        </span>
      </div>
    );

  if (!steps || steps.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        No form configuration found.
      </div>
    );

  //Progress Bar Logic
  const progress =
    steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <CircularProgress color="success" size={60} />
        <span className="mt-4 text-lg sm:text-base text-gray-700 text-center">
          Loading...
        </span>
      </div>
    );

  if (!steps || steps.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No form configuration found.</p>
      </div>
    );

  return (
    <>
      <div className="relative flex flex-col items-center justify-center p-4 md:p-12">
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000, // 3 seconds for notification show
            style: {
              marginLeft: "30px",
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
              duration: 3000,
              iconTheme: {
                primary: "#16A34A",
                secondary: "#fff",
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: "#DC2626",
                secondary: "#fff",
              },
            },
          }}
        />

        {/* Form Container */}
        <div className="w-full max-w-xl   md:p-8 rounded-lg  z-10">
          <div className="w-full h-1 mb-6 bg-gray-300 rounded-full">
            <div
              className="h-1 bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Form */}
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex justify-center items-center mb-5">
              <h1 className="text-[16px] text-green-800">BUSINESS LOAN</h1>
            </div>

            {/* Render Current Step */}
            {steps.map((field, idx) => (
              <div
                key={field.name}
                style={{ display: idx === currentStep ? "block" : "none" }}
              >
                {renderField(field)}
              </div>
            ))}

            {/* Navigation Buttons (Previous / Continue) */}
            {currentStep < steps.length && (
              <div className="flex flex-col sm:flex-row justify-between mt-15 gap-3">
                {/* Previous Button */}
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full  sm:w-auto px-5 py-3 sm:px-6 sm:py-3 text-[17px] bg-gray-200 hover:bg-gray-300 rounded-lg transition ease-in-out duration-200 cursor-pointer "
                  >
                    ← Back
                  </button>
                )}

                {/* Next Button */}
                {currentStep < steps.length - 1 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto   sm:mt-0 px-5 py-3 sm:px-8 sm:py-3 text-[17px] bg-green-600 hover:bg-green-700 text-white rounded-lg transition ease-in-out duration-200 cursor-pointer "
                  >
                    Next →
                  </button>
                )}
              </div>
            )}

            {/* Submit / Register Button */}
            {currentStep === steps.length - 1 && (
              <button
                type="submit"
                disabled={submitLoader}
                className="
                
                 w-full 
                px-4 py-3 sm:px-5 sm:py-4 
                text-[17px] sm:text-[18px]
                bg-green-600 hover:bg-green-700 
                text-white  font-semibold
                rounded-lg 
                mt-9
                transition ease-in-out duration-200 
                cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
               
              >
               {
                  submitLoader?(
                    <div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin h-5 w-5"/>Submitting.</div>
                  ):(
                    "Register"
                  )
                }
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center items-center  sm:mt-5">
              {/* Secure Info */}
              <div className="flex items-center justify-center gap-1">
                <Lock className="text-gray-900" />
                <p className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-gray-700 text-center leading-tight">
                  Your information is securely encrypted
                </p>
              </div>
      
              {/* Credit Score Info */}
              <div className="flex items-center justify-center gap-1 mt-1">
                <Speed className="text-gray-900" />
                <p className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-gray-700 text-center leading-tight">
                  No Impact to your credit score
                </p>
              </div>
            </div>
    </>
  );
}
