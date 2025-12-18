"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AutoLoan, AutoLoanType } from "./schema";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import {
  Slider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";
import { Lock, Speed } from "@mui/icons-material";
import { differenceInYears } from "date-fns";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AutoLoanForm() {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
const[submitLoader,setSubmitLoader]=useState<boolean>(false)


  // --- Load defaultValues from localStorage ---
  const storedData =
    typeof window !== "undefined"
      ? localStorage.getItem("AutoLoanFormData")
      : null;

  const parsed = storedData ? JSON.parse(storedData) : null;

  const defaultValues: AutoLoanType = parsed
    ? {
        ...parsed,
        loanAmountValuation: Number(parsed.loanAmountValuation || 1000000),
      }
    : {
        autoLoanType: "",
        loanPaidTime: "",
        loanamountTime: "",
        AnnualIncome: "",
        firstName: "",
        lastName: "",
        phone: "",
        EmploymentStatus: "",
        Email: "",
        dob: null,
        loanPurpose: "",
        loanAmountValuation: 1000000, // number ✔
        creditScore: "",
        previousLoan: "",
        AutoModalAndYear: "",
        AutoMilage: "",
      };



  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<AutoLoanType>({
    resolver: zodResolver(AutoLoan),
    mode: "onTouched",
    defaultValues,
  });

  const allValues = watch();
  // -- Persist form data to localStorage ---
  useEffect(() => {
    localStorage.setItem(
      "AutoLoanFormData",
      JSON.stringify({
        ...allValues,
        loanAmountValuation: Number(allValues.loanAmountValuation),
      })
    );
  }, [allValues]);

  useEffect(() => {
    let mounted = true;
    const fetchSteps = async () => {
      try {
        const res = await fetch("/LoanFormsData/AutoLoanData.json");
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
        console.error(err);
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
         formType: "AutoLoan",
         source_name: "api_post_method",
         loan_type: "auto_loan",
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

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const inputClass = `
    w-full mt-8 px-3 py-3 text-[14px] sm:text-[14px] md:text-[16px]
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
          <div key={name} className="flex flex-col mb-6">
            <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl  text-center font-semibold text-black leading-snug w-[220px]  md:w-full">
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
            className="flex flex-col mb-8 relative w-full max-w-[600px] mx-auto px-3 sm:px-4"
          >
            <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl  text-center font-semibold text-black leading-snug w-[220px]  md:w-full">
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
                  className={`w-full mt-5 border rounded-md px-2 py-3 sm:px-4 sm:py-3 text-[14px] sm:text-[16px] md:text-[16px]  text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-1 focus:ring-green-500`}
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

      case "date":
        return (
          <div key={name} className="flex flex-col mb-8">
            <label className="mb-3 my-4 text-[28px] sm:text-[25px] md:text-4xl text-center text-gray-800 leading-snug">
              {field.label}
            </label>

            <Controller
              name={name}
              control={control}
              rules={{
                required: "Date of Birth is required",
                validate: (value) => {
                  if (!value) return "Date of Birth is required";

                  // Ensure value is a valid Date object
                  const dateValue =
                    value instanceof Date ? value : new Date(value);
                  if (isNaN(dateValue.getTime())) return "Invalid date";

                  // Year validation (4-digit)
                  const yearStr = dateValue.getFullYear().toString();
                  if (!/^[1-9][0-9]{3}$/.test(yearStr))
                    return "Please select a valid 4-digit year";

                  // Age validation >= 18
                  const age = differenceInYears(new Date(), dateValue);
                  if (age < 18) return "You must be at least 18 years old";

                  return true;

                },
              }}
              render={({ field: rhfField, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    {...rhfField}
                    disableFuture
                    openTo="year"
                    views={["year", "month", "day"]}
                    onChange={(date) => rhfField.onChange(date)}
                    maxDate={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      )
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        placeholder: field.placeholder || "DD/MM/YYYY",
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        InputLabelProps: {
                          sx: {
                            fontSize: "1.05rem",
                            fontWeight: 500,
                            color: "text.secondary",
                            "&.Mui-focused": { color: "#16A34A" },
                          },
                        },
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            transition: "all 0.3s ease",
                            backgroundColor: "#fff",
                            "&:hover": { transform: "scale(1.01)" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#16A34A",
                              boxShadow: "0 0 0 2px rgba(34,197,94,0.2)",
                              backgroundColor: "#F0FDF4",
                            },
                          },
                          "& input": {
                            padding: "16px 20px",
                            fontSize: { xs: "14px", sm: "16px", md: "16px" }, // responsive
                            fontWeight: 500,
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        );

      case "slider":
        return (
          <div key={name} className="flex flex-col mb-6">
            <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl  text-center font-semibold text-black leading-snug w-[250px]  md:w-full">
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
                      height: 5,
                      "& .MuiSlider-track": { backgroundColor: "#16A34A" },
                      "& .MuiSlider-rail": { backgroundColor: "#d1d5db" },
                      "& .MuiSlider-thumb": {
                        width: 28,
                        height: 28,
                        backgroundColor: "Black",
                        "&:hover, &.Mui-focusVisible, &.Mui-active": {
                          boxShadow: "0 0 0 8px rgba(5,150,105,0.16)",
                        },
                      },
                    }}
                  />
                  <input
                    type="text"
                    readOnly
                    className={`${inputClass} mt-3 bg-gray-50`}
                    value={`₹ ${((rhfField.value || 0) / 100000).toFixed(
                      1
                    )} Lakh`}
                  />
                </>
              )}
            />
          </div>
        );

      case "select":
        return (
          <div key={name} className="flex flex-col mb-8 gap-5">
            <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl   font-semibold text-black leading-snug w-[230px]  md:w-full text-center">
              {field.label}
            </label>

            <Controller
              name={name}
              control={control}
              render={({ field: rhfField }) =>
                name === "AutoModalAndYear" ? (
                  // 🔹 Dropdown for AutoModalAndYear
                  <div className="flex justify-center mt-6 w-full flex-col">
                    <div className="flex items-center justify-center">
                      <p className="text-[14px] sm:text-[16px] md:text-[18px] text-zinc-500 text-center">
                        Pick your Auto Model Year. You can change it any Time.
                      </p>
                    </div>

                    <div className="flex items-center justify-center w-full mt-3">
                      <select
                        {...rhfField}
                        className={`
      w-[60vw] max-w-[250px] min-w-[150px]  
      h-[50px] sm:h-[60px] md:h-[70px]  /* Responsive height */
      text-[15px] sm:text-[15px] md:text-[16px]
      border border-gray-400 rounded-2xl md:rounded-xl
      px-3 py-2 shadow-sm bg-white cursor-pointer
      focus:outline-none focus:ring-1 focus:ring-green-500
      focus:border-green-700 transition-all duration-300
      
    `}
                      >
                        <option
                          value=""
                          className="text-[16px] sm:text-[18px] md:text-[19px]"
                        >
                          Select Year
                        </option>
                        {field.options?.map((opt: any, idx: number) => (
                          <option
                            key={idx}
                            value={opt.value ?? opt}
                            className="text-[16px] sm:text-[18px] md:text-[19px]"
                          >
                            {opt.label || opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  // 🔘 Button style for all other selects
                  <div
                    className="
                grid grid-cols-2 gap-8 mt-6 justify-items-center
                sm:grid-cols-2 md:flex md:flex-wrap md:justify-center
              "
                  >
                    {field.options?.map((opt: any, idx: number) => {
                      const isActive = rhfField.value === (opt.value ?? opt);

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => rhfField.onChange(opt.value ?? opt)}
                          className={`
                      transition-all duration-300 ease-in-out rounded-2xl md:rounded-xl shadow-sm
                      border cursor-pointer px-2 border-gray-400
                      flex items-center justify-center text-center 
                      w-[35vw] max-w-[200px] min-w-[90px]
                      h-[90px] sm:h-[95px] md:h-[70px] min-h-[65px]
                      text-[13px] sm:text-[13px] md:text-[16px]
                      transform
                      ${
                        isActive
                          ? "bg-green-400 text-white border-green-700 scale-105"
                          : "bg-gray-100 text-black border-gray-200 hover:bg-green-100 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
                      }
                      active:scale-95 active:translate-y-0.5
                    `}
                        >
                          {opt.label || opt}
                        </button>
                      );
                    })}
                  </div>
                )
              }
            />

            {(errors as any)[name] && (
              <span className="text-red-500  font-semibold text-sm md:text-base mt-1 text-center">
                {(errors as any)[name]?.message}
              </span>
            )}
          </div>
        );

      default:
        return null;
    }
  };

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

  return (
    <>
      <div className="relative flex flex-col items-center justify-center  md:p-12">
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
              duration: 3000,
              iconTheme: { primary: "#16A34A", secondary: "#fff" },
            },
            error: {
              duration: 3000,
              iconTheme: { primary: "#DC2626", secondary: "#fff" },
            },
          }}
        />

        <div className="w-full max-w-xl p-6 md:p-8 rounded-lg z-10">
          <div className="w-full h-1 mb-6 bg-gray-300 rounded-full">
            <div
              className="h-1 bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center mb-5">
              <h1 className="text-[18px] font-thin text-green-700">
                Auto Loan
              </h1>
            </div>
            {steps.map((field, idx) => (
              <div
                key={field.name}
                style={{ display: idx === currentStep ? "block" : "none" }}
              >
                {renderField(field)}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between mt-15 gap-3">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full sm:w-auto px-6 py-3 text-[16px] bg-gray-200 hover:bg-gray-300 rounded-lg transition ease-in-out duration-200 cursor-pointer"
                >
                  ← Previous
                </button>
              )}

              {currentStep < steps.length - 1 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto px-9 py-3 sm:px-6 sm:py-3 text-[16px] bg-green-600 hover:bg-green-700 text-white rounded-lg transition ease-in-out duration-200 cursor-pointer hover:border border-green-700"
                >
                  Next →
                </button>
              )}
            </div>

            <div className="w-full flex items-center justify-center mt-15">
              {currentStep === steps.length - 1 && (
                <button
                  type="submit"
                  disabled={submitLoader}
                  className="
        w-xl sm:px-6 sm:py-4 md:px-5 py-4
        text-[15px] sm:text-[17px] md:text-[19px]  /* Responsive font size */
         bg-green-600 hover:bg-green-700
        text-white rounded-lg transition ease-in-out duration-200
        cursor-pointer
      "
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
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center gap-1">
          <Lock className="text-gray-900" />
          <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-thin text-gray-700 text-center leading-tight mt-[2px]">
            Your information is securely encrypted
          </p>
        </div>
      </div>
    </>
  );
}
