"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
  ClockIcon,
} from "@mui/x-date-pickers";
import {
  Slider,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";

import { differenceInYears } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { debtReliefLoanSchema, DebtReliefLoanSchemaType } from "./schema";
import { Lock, Speed } from "@mui/icons-material";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DebtReliefForm() {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
const [submitLoader,setSubmitLoader]=useState<boolean>(false)

  // --- Load defaultValues from localStorage ---
  const storedData =
    typeof window !== "undefined"
      ? localStorage.getItem("DebtReliefFormData")
      : null;

  const defaultValues: DebtReliefLoanSchemaType = storedData
    ? JSON.parse(storedData)
    : {
        debtAmount: 200000,
        fullName: "",
        EmploymentStatus: "",
        anualIncome: "",
        email: "",
        phone: "",
        zipCode: "",
        dob: null,
        loanUrgency: "",
        creditScore: "",
      };

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<DebtReliefLoanSchemaType>({
    resolver: zodResolver(debtReliefLoanSchema),
    mode: "onTouched",
    defaultValues,
  });

  const allValues = watch();

  // --- Persist form data to localStorage ---
  useEffect(() => {
    localStorage.setItem("DebtReliefFormData", JSON.stringify(allValues));
  }, [allValues]);

  // Fetch JSON data from public folder
  useEffect(() => {
    let mounted = true;
    const fetchSteps = async () => {
      try {
        const res = await fetch("/LoanFormsData/DebtReliefLoanData.json");
        if (!res.ok) throw new Error("Failed to load form data");
        const data = await res.json();
        if (mounted) {
          const flatSteps: any[] = [];
          data.forEach((step: any) => {
            step.fields.forEach((field: any) => {
              flatSteps.push({ ...field, step: step.step, title: step.title });
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
        formType: "DebtReliefLoan",
        source_name: "api_post_method",
        loan_type: "debtrelief_loan",
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

  const onError = () => {
    toast.error("Please fill all required fields correctly!");
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
    w-full mt-3 px-3 py-3 text-[16px] sm:text-[14px] md:text-[16px]
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
          <div key={name} className="flex flex-col mb-6 w-full">
            <label className="mb-3 my-2 text-[28px] sm:text-[25px] md:text-4xl text-center text-gray-800 leading-snug font-semibold">
              {field.label}
            </label>
            <Controller
              name={name}
              control={control}
              rules={{ required: `${field.label} is required` }}
              render={({ field: rhfField }) => (
                <input
                  {...rhfField}
                  type={field.type}
                  placeholder={field.placeholder || ""}
                  className={`${inputClass} ${
                    (errors as any)[name]
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
                  }`}
                />
              )}
            />
            {(errors as any)[name] && (
              <span className="text-red-500 text-sm mt-1">
                {(errors as any)[name]?.message}
              </span>
            )}
          </div>
        );

      case "phone":
        return (
          <div
            key={name}
            className="flex flex-col mb-8 relative w-full max-w-[600px] mx-auto px-3 sm:px-4 items-center justify-center"
          >
            <label className="mb-3 my-4 text-[28px] sm:text-[25px] md:text-4xl text-center text-gray-800 leading-snug font-semibold">
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
                  className={`w-full md:w-full mt-5 border rounded-md px-3 py-3 sm:px-3 sm:py-3 text-[15px] sm:text-[16px] md:text-[16px]  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-400 focus:bg-green-50 focus:border-green-200 transition-all ${
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

      case "date":
        return (
          <div key={name} className="flex flex-col mb-8">
            {/* Label */}
            <label className="mb-3 my-4 text-[28px] sm:text-[25px] md:text-4xl text-center text-gray-800 leading-snug font-semibold">
              {field.label}
            </label>

            {/* Date Picker */}
            <Controller
              name={name}
              control={control}
              render={({ field: rhfField }) => (
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
                        InputLabelProps: {
                          sx: {
                            fontSize: "1.05rem",
                            fontWeight: 500,
                            color: "text.secondary",
                          },
                        },
                        sx: {
                          // Overall input styling
                          mt: 2, // <-- Adds top margin between label and input
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#fff",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.01)",
                              borderColor: "#16A34A",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#16A34A", // Green border
                              boxShadow: "0 0 0 2px rgba(34,197,94,0.2)",
                              backgroundColor: "#BBF7D0", // bg-green-200 equivalent
                            },
                          },
                          "& input": {
                            padding: "16px 20px",
                            fontSize: "1rem",
                            fontWeight: 500,
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />

            {/* Error message */}
            {(errors as any)[name] && (
              <span className="text-red-500 text-sm md:text-base mt-1">
                {(errors as any)[name]?.message}
              </span>
            )}
          </div>
        );

      case "slider":
        return (
          <div key={name} className="flex flex-col mb-6 w-full">
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
                      height: 6,
                      "& .MuiSlider-track": { backgroundColor: "#16A34A" },
                      "& .MuiSlider-rail": { backgroundColor: "#d1d5db" },
                      "& .MuiSlider-thumb": {
                        width: 25,
                        height: 25,
                        backgroundColor: "#06923E",
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
          <div key={name} className="flex flex-col mb-8 w-full">
            {/* Label */}
            <label className="mb-3 text-[28px] sm:text-[25px] md:text-4xl   font-semibold text-black leading-snug w-full  md:w-full text-center">
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
                      backgroundColor: "#FFFFFF",
                      borderRadius: { xs: 1, sm: 1.5, md: 2 },
                      "&.Mui-focused": {
                        borderColor: "#16A34A",
                        boxShadow: "0 0 0 2px rgba(22,163,74,0.2)",
                      },
                      "& .MuiSelect-select": {
                        padding: { xs: "12px", sm: "14px", md: "16px" },
                        fontSize: { xs: "13px", sm: "15px", md: "17px" },
                        color: rhfField.value ? "black" : "#6B7280",
                      },
                    }}
                    MenuProps={{
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
                        color: "#6B7280",
                        fontSize: { xs: "13px", sm: "14px", md: "16px" },
                      }}
                    >
                      {field.placeholder ?? "Select an option"}
                    </MenuItem>

                    {/* Options */}
                    {field.options?.map((opt: any, idx: number) => (
                      <MenuItem
                        key={idx}
                        value={opt.value ?? opt}
                        sx={{
                          py: 1.5,
                          px: 1.5,
                          borderRadius: 1,
                          backgroundColor: "#FFFFFF",
                          fontSize: { xs: "13px", sm: "14px", md: "16px" },
                          border: "1.5px solid #E5E7EB",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#DCFCE7",
                            transform: "scale(1.02)",
                            border: "1px solid #16A34A",
                          },
                          "&:active": {
                            backgroundColor: "#C6F6D5",
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
                <span className="text-red-500 text-sm md:text-base mt-1 text-center">
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
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000, // 3 seconds default
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
      <div className="relative flex flex-col items-center justify-center  md:p-12  rounded-4xl ">
        <div className="w-full max-w-xl  md:p-8 rounded-2xl  ">
          <div className="w-full h-1 mb-6 bg-gray-300 rounded-full">
            <div
              className="h-1 bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className=" rounded-2xl  mt-3 p-3"
          >
            <div className="flex justify-center items-center mb-5 ">
              <h1 className="text-[16px] text-green-600">Debt Relief Loan</h1>
            </div>

            {steps.map((field, idx) => (
              <div
                key={field.name}
                style={{ display: idx === currentStep ? "block" : "none" }}
              >
                {renderField(field)}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-15 gap-3 w-full">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 text-[16px] sm:text-[15px] font-medium shadow-2xs cursor-pointer"
                >
                  ← Back
                </button>
              )}
              {currentStep < steps.length - 1 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto px-6 sm:px-7 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-[16px] sm:text-[15px] font-medium cursor-pointer"
                >
                  Continue →
                </button>
              )}
            </div>

            {currentStep === steps.length - 1 && (
              <div className="w-full px-3 sm:px-5 py-6 flex mt-5">
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
                mt-3 
                transition ease-in-out duration-200 
                cursor-pointer"
                >
                 {
                  submitLoader?(
                    <div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin h-5 w-5"/>Submitting.</div>
                  ):(
                    "Register"
                  )
                }
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="flex w-full flex-col justify-center items-center sm:mt-3 ">
          <div className="flex items-center justify-center gap-1">
            <ClockIcon className="text-gray-900 mt-1 sm:mt-2" />
            <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold text-gray-700 text-center leading-tight">
              Complete this form in 2 minutes or less
            </p>
          </div>

          <div className="flex items-center justify-center gap-1">
            <Lock className="text-gray-900" />
            <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold text-gray-700 text-center leading-tight mt-[2px]">
              Your information is securely encrypted
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
}
