import { z } from "zod";

export const autoInsuranceSchema = z.object({
  // -------- Step 1 --------
  vehicleYear: z.string().min(1, "Vehicle year is required"),
  vehicleBrand: z.string().min(1, "Vehicle brand is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),

  addSecondVehicle: z.string().min(1, "This field is required"),

  // Flat second vehicle fields
  secondVehicleYear: z.string().optional(),
  secondVehicleBrand: z.string().optional(),
  secondVehicleModel: z.string().optional(),

  // -------- Step 2 --------
  currentlyInsured: z.string().optional(),
  insuranceCompany: z.string().optional(),
  insuranceYears: z.string().optional(),

  homeowner: z.string().min(1, "Required"),
  faultAccident: z.string().min(1, "Required"),
  dui: z.string().min(1, "Required"),
  compareRates: z.string().min(1, "Required"),

  // ---------- Step 3 ----------
  dob: z.string().min(1, "Date of birth is required"),

  gender: z.string().min(1, "Gender is required"),
  married: z.string().min(1, "Required"),
  spouseMilitary: z.string().min(1, "Required"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(15, "First name cannot exceed 15 characters")
    .refine((val) => !/\d/.test(val), "Numbers are not allowed")
    .refine((val) => /^[A-Za-z ]+$/.test(val), "Only letters are allowed")
    .refine((val) => (val.match(/ /g) || []).length <= 1, "Only 1 space allowed"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(15, "Last name cannot exceed 15 characters")
    .refine((val) => !/\d/.test(val), "Numbers are not allowed")
    .refine(
      (val) => /^[A-Za-z ]+$/.test(val),
      "Only letters and spaces are allowed"
    )
    .refine((val) => (val.match(/ /g) || []).length <= 2, "Max 2 spaces allowed"),

  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "ZIP code is required"),

  email: z
    .string()
    .email("Enter a valid email")
    .refine((val) => {
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
      ];
      const domainParts = val.split("@")[1]?.toLowerCase().split(".");
      if (!domainParts || domainParts.length < 2) return false;
      const tld = domainParts.at(-1);
      return allowedTLDs.includes(tld);
    }, "Email must end with a valid domain (.com, .in, .org etc.)"),

  phone: z
    .string()
    .regex(/^[1-9][0-9]{9}$/, "Enter a valid 10-digit phone number"),
});

export type AutoInsuranceType = z.infer<typeof autoInsuranceSchema>;
