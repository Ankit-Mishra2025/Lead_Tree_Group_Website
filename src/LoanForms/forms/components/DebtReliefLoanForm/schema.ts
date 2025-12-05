import { z } from "zod";
import { differenceInYears } from "date-fns";

export const debtReliefLoanSchema = z.object({
  debtAmount: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(200000, "Minimum debt amount is ₹2 Lakh")
  ),

   fullName: z
  .string()
  .min(2, "Full name must be at least 2 characters")
  .max(25, "Full name cannot exceed 25 characters")
  .refine((val) => /^[A-Za-z ]+$/.test(val), {
    message: "Only letters and spaces are allowed",
  })
  .refine((val) => !/\d/.test(val), {
    message: "Numbers are not allowed",
  })
  .refine((val) => (val.match(/ /g) || []).length <= 3, {
    message: "Only up to 3 spaces are allowed",
  }),


  EmploymentStatus: z.string().min(1, "Select your employment status"),

  anualIncome: z
    .string()
    .min(1, "Annual income is required")
    .regex(/^[0-9,]+$/, "Only numbers are allowed"),

   email: z
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
    

   phone: z
    .string()
    .regex(
      /^[1-9][0-9]{9}$/,
      "Enter a valid 10-digit phone number (cannot start with 0)"
    ),
  zipCode: z.string().regex(/^[0-9]{6}$/, "Enter a valid 6-digit PIN code"),


  // Date of Birth: accepts Date or string, validates 4-digit year & age >= 18
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


  loanUrgency: z.string().min(1, "Select loan urgency"),

  creditScore: z
    .string()
    .min(1, "Select your credit score")
    .refine(
      (val) => ["excellent", "good", "fair", "poor"].includes(val),
      "Invalid credit score"
    ),
});

// Type for RHF
export type DebtReliefLoanSchemaType = z.infer<typeof debtReliefLoanSchema>;
