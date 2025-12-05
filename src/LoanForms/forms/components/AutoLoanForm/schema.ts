// schema.ts
import { z } from "zod";
import { differenceInYears } from "date-fns";

export const AutoLoan = z.object({
  autoLoanType: z.string().min(1, "Auto Loan type is required"),
  loanPaidTime: z.string().min(1, "Loan paid time usage is required"),
  loanamountTime: z.string().min(1, "Time is required"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(15, "First name cannot exceed 15 characters")
    .refine((val) => !/\d/.test(val), {
      message: "Numbers are not allowed",
    })
    .refine((val) => /^[A-Za-z ]+$/.test(val), {
      message: "Only letters  are allowed",
    })
    .refine((val) => (val.match(/ /g) || []).length <= 1, {
      message: "Only up to 1 spaces allowed",
    }),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(15, "Last name cannot exceed 15 characters")
    .refine((val) => !/\d/.test(val), {
      message: "Numbers are not allowed",
    })
    .refine((val) => /^[A-Za-z ]+$/.test(val), {
      message: "Only letters and spaces are allowed",
    })
    .refine((val) => (val.match(/ /g) || []).length <= 2, {
      message: "Only up to 2 spaces allowed",
    }),

  AnnualIncome: z.string().min(1, "Annual Income Required"),

  dob: z.preprocess(
    (val) => {
      if (val instanceof Date && !isNaN(val.getTime())) return val;
      if (typeof val === "string" && val) return new Date(val);
      return undefined;
    },
    z
      .date({
        required_error: "Choose your Date of Birth",
        invalid_type_error: "Invalid date",
      })
      .refine((date) => {
        if (!date) return false;

        // Year validation
        const yearStr = date.getFullYear().toString();
        if (!/^[1-9][0-9]{3}$/.test(yearStr)) return false;
        const zeroCount = (yearStr.match(/0/g) || []).length;
        if (zeroCount > 3) return false;

        // Age validation
        const age = differenceInYears(new Date(), date);
        if (age < 18) return false;

        // Month & Day validation
        const month = date.getMonth() + 1; // 0-based
        const day = date.getDate();
        if (month > 12 || day > 31) return false;

        return true;
      }, "You must be at least 18 years old and select a valid date")
  ),

  phone: z
    .string()
    .regex(
      /^[1-9][0-9]{9}$/,
      "Enter a valid 10-digit phone number (cannot start with 0)"
    ),
  EmploymentStatus: z.string().min(1, "Employment status is required"),

   AutoMilage: z.string().min(1, "Mileage is required"),
   previousLoan: z.string().min(1, "Select any one"),

  Email: z
    .string()
    .email("Please enter a valid email address.")
    .refine((val) => {
      // Allowed top-level domains (TLDs)
      const allowedTLDs = [
        "com",
        "org",
        "net",
        "in",
       
        "edu",
        "gov",
        "io",
        "info",
        "biz",
        "us",
        "uk",
        "ca",
        "au",
        "de",
        
        // you can expand this list as needed
      ];

      const domainParts = val.split("@")[1]?.toLowerCase().split("."); // split domain by dots
      if (!domainParts || domainParts.length < 2) return false; // must have at least one dot

      const tld = domainParts[domainParts.length - 1]; // get last part
      return allowedTLDs.includes(tld);
    }, "Email must end with a valid domain like .com, .in, .org"),
   creditScore: z.string().min(1, "Credit score is required"),
   AutoModalAndYear: z.string().min(1, "Modal and Year usage is required"),
  loanPurpose: z.string().min(1, "Loan purpose is required"),
 loanAmountValuation: z.number().min(1000000, "Min value 10 Lakh"),
});

export type AutoLoanType = z.infer<typeof AutoLoan>;
