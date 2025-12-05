import React, { useState, useEffect } from "react";
import Logo from "../assets/LeadTreeGroup.png";
import { FormControl, Select, MenuItem, IconButton } from "@mui/material";
import { Search } from "lucide-react";

const Nav = () => {
  const [loanType, setLoanType] = useState({
    loan: "",
    home: "",
    business: "",
    credit: "",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Scroll listener for blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setLoanType((prev) => ({ ...prev, [name]: value }));
  // };

  // ✅ Fixed and stable Select styling
  const selectStyle = {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "white",
    width: "100px",
    height: "36px", // fixed height
    display: "flex",
    alignItems: "center",
    "& .MuiSelect-select": {
      paddingY: "6px",
      display: "flex",
      alignItems: "center",
    },
    "& .MuiSelect-icon": { color: "white" },
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  };

  const formControlStyle = {
    minWidth: 90,
    width: 120,
    height: "36px",
    display: "flex",
    alignItems: "center",
    "& .MuiInputBase-root": {
      "&::before, &::after": { display: "none" },
    },
  };

  const menuProps = {
    PaperProps: {
      sx: {
        "& .MuiMenuItem-root": {
          px: 2,
          py: 0.9,
          fontSize: "0.95rem",
          "&:hover": { backgroundColor: "rgb(55, 60, 170)", color: "white" },
        },
      },
    },
  };

  return (
    <div className="relative">
      {/* ---------- Navbar ---------- */}
      <div
        className={`fixed top-0 left-0 w-full h-14 min-h-16 px-6 flex items-center justify-between z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-md bg-[#05081c] shadow-lg"
            : "bg-[#05081c] shadow-md"
        }`}
      >
        {/* ---------- Left: Logo ---------- */}
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="LeadTree Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-white font-semibold text-[18px]">
            LeadTree Group
          </h1>
        </div>

        {/* ---------- Center: Dropdowns ---------- */}

        {/* <div className="flex items-center gap-6">
          {[
            {
              name: "loan",
              label: "Loans",
              options: [
                { value: "personal", label: "Personal Loan" },
                { value: "auto", label: "Auto Loan" },
                { value: "debt-relief", label: "Debt Relief" },
                { value: "auto-refinance", label: "Auto Refinance" },
              ],
            },
            {
              name: "home",
              label: "Home",
              options: [
                { value: "home-loan", label: "Home Loan" },
                { value: "home-purchase", label: "Home Purchase" },
                { value: "home-refurbished", label: "Home Refurbished" },
              ],
            },
            {
              name: "business",
              label: "Business",
              options: [
                { value: "business-loan", label: "Business Loan" },
                { value: "business-establish", label: "Business Establish" },
                { value: "startup-business", label: "Startup Business" },
              ],
            },
            {
              name: "credit",
              label: "Credit",
              options: [
                { value: "credit-loan", label: "Credit Loan" },
                { value: "credit-score", label: "Credit Score" },
                { value: "credit-compare", label: "Credit Compare" },
              ],
            },
          ].map((menu) => (
            <FormControl
              key={menu.name}
              variant="standard"
              sx={formControlStyle}
            >
              <Select
                name={menu.name}
                disableUnderline
                displayEmpty
                value={loanType[menu.name]}
                // onChange={handleChange}
                sx={selectStyle}
                MenuProps={menuProps}
              >
                <MenuItem value="" disabled>
                  {menu.label}
                </MenuItem>
                {menu.options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </div> */}

        {/* ---------- Right: Buttons ---------- */}
        <div className="flex items-center gap-3">
          <button className="px-5 py-1.5 text-white border border-white rounded-3xl hover:bg-green-500 transition font-semibold cursor-pointer">
            Sign In
          </button>
          <button className="px-5 py-1.5 bg-green-600 text-white font-semibold rounded-3xl hover:bg-black hover: border-white transition cursor-pointer">
            Sign Up
          </button>
          <IconButton onClick={() => setShowSearch(true)}>
            <Search className="text-white" />
          </IconButton>
        </div>
      </div>

      {/* ---------- Search Overlay ---------- */}
      {showSearch && (
        <div className="fixed top-16 left-0 w-full h-18 bg-white shadow-md flex items-center px-6 gap-4 justify-center rounded-md transition-all duration-300 z-40">
          <input
            type="text"
            placeholder="Search here..."
            className="w-xl border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-30 text-[16px]">
            Search
          </button>
          <button
            className="ml-2 text-gray-800 hover:text-gray-700 text-[25px]"
            onClick={() => setShowSearch(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
