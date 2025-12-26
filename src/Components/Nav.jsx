// import React, { useState, useEffect } from "react";
// import Logo from "../assets/LeadTreeGroup.png";
// import { FormControl, Select, MenuItem, IconButton } from "@mui/material";
// import { Search } from "lucide-react";

// const Nav = () => {
//   const [loanType, setLoanType] = useState({
//     loan: "",
//     home: "",
//     business: "",
//     credit: "",
//   });
//   const [showSearch, setShowSearch] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // ✅ Scroll listener for blur effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setLoanType((prev) => ({ ...prev, [name]: value }));
//   // };

//   // ✅ Fixed and stable Select styling
//   const selectStyle = {
//     fontSize: "0.9rem",
//     fontWeight: 700,
//     color: "white",
//     width: "100px",
//     height: "36px", // fixed height
//     display: "flex",
//     alignItems: "center",
//     "& .MuiSelect-select": {
//       paddingY: "6px",
//       display: "flex",
//       alignItems: "center",
//     },
//     "& .MuiSelect-icon": { color: "white" },
//     "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//   };

//   const formControlStyle = {
//     minWidth: 90,
//     width: 120,
//     height: "36px",
//     display: "flex",
//     alignItems: "center",
//     "& .MuiInputBase-root": {
//       "&::before, &::after": { display: "none" },
//     },
//   };

//   const menuProps = {
//     PaperProps: {
//       sx: {
//         "& .MuiMenuItem-root": {
//           px: 2,
//           py: 0.9,
//           fontSize: "0.95rem",
//           "&:hover": { backgroundColor: "rgb(55, 60, 170)", color: "white" },
//         },
//       },
//     },
//   };

//   return (
//     <div className="relative">
//       {/* ---------- Navbar ---------- */}
//       <div
//         className={`fixed top-0 left-0 w-full h-14 min-h-16 px-6 flex items-center justify-between z-50 transition-all duration-500 ${
//           isScrolled
//             ? "backdrop-blur-md bg-[#05081c] shadow-lg"
//             : "bg-[#05081c] shadow-md"
//         }`}
//       >
      
//         {/* ---------- Left: Logo ---------- */}
//         <div className="flex items-center gap-2">
//           <img
//             src={Logo}
//             alt="LeadTree Logo"
//             className="h-10 w-10 rounded-full object-cover"
//           />
//           <h1 className="text-white font-semibold text-[18px]">
//             LeadTree Group
//           </h1>
//         </div>

      

//         {/* ---------- Right: Buttons ---------- */}
//         <div className="flex items-center gap-3">
//           <button className="px-5 py-1.5 text-white border border-white rounded-3xl hover:bg-green-500 transition font-semibold cursor-pointer">
//             Sign In
//           </button>
//           <button className="px-5 py-1.5 bg-green-600 text-white font-semibold rounded-3xl hover:bg-black hover: border-white transition cursor-pointer">
//             Sign Up
//           </button>
//           <IconButton onClick={() => setShowSearch(true)}>
//             <Search className="text-white" />
//           </IconButton>
//         </div>
//       </div>

//       {/* ---------- Search Overlay ---------- */}
//       {showSearch && (
//         <div className="fixed top-16 left-0 w-full h-18 bg-white shadow-md flex items-center px-6 gap-4 justify-center rounded-md transition-all duration-300 z-40">
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="w-xl border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
//           />
//           <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-30 text-[16px]">
//             Search
//           </button>
//           <button
//             className="ml-2 text-gray-800 hover:text-gray-700 text-[25px]"
//             onClick={() => setShowSearch(false)}
//           >
//             ✕
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Nav;




import React from 'react'
import Logo from "../assets/LeadTreeGroup.png";
const Nav = () => {
  return (
    <div className='w-full flex items-center justify-between p-2  '>
     <div className='flex items-center  flex-row gap-2 w-[60%]'>
      <img src={Logo} className='h-12 w-12 rounded-full'/>
      <h2 className='font-semibold text-[15px] md:text-[17px]'>Lead <span className='text-green-700 font-semibold'>Tree</span> Group</h2>
      </div> 

      <div className='flex items-center w-[40%] px-2 '>
        <ul className='flex items-center font-semibold px-8 gap-10 cursor-pointer'>
          <li className=''>Home</li>
           <li>About</li>
            <li>Contact Us</li>
            <button className='bg-green-600 cursor-pointer rounded-4xl px-3 py-2 font-medium text-[15px] text-white'>Get Started</button>
        </ul>
      </div>

    </div>
  )
}

export default Nav
