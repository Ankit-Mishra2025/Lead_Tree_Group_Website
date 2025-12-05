import { z } from "zod";

export const businessLoanSchema = z.object({
  businessType: z.string().min(1, "Please select your business type."),

  loanAmount: z
    .number()
    .min(1000000, "Amount must be at least ₹10 Lakhs.")
    .max(200000000, "Amount cannot exceed ₹20 Crores."),

  LoanPurpose: z.string().min(1, "Please select the purpose of the loan."),

  loanUrgency: z
    .string()
    .min(1, "Please select how quickly you need the money."),

  loanAmountNeeded: z
    .number()
    .min(500000, "Minimum amount is ₹5 Lakhs.")
    .max(10000000, "Maximum allowed is ₹1 Crore."),

  creditScore: z.string().min(1, "Please select your estimated credit score."),
  zipCode: z.string().regex(/^[0-9]{6}$/, "Enter a valid 6-digit PIN code"),

  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters long.")
    .max(50, "Business name cannot exceed 50 characters.")
    .regex(/^[A-Za-z\s]+$/, "Business name must contain only letters."),

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

  businessIndustry: z.string().min(1, "Please select your business industry."),
});

export type BusinessLoanSchemaType = z.infer<typeof businessLoanSchema>;
